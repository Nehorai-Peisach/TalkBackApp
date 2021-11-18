using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TalkBack.BLL.Interfaces;
using TalkBack.DAL.Models;

namespace TalkBack.UI.Hubs
{
    public class MainHub : Hub
    {
        private IChatService chatService;
        private IUserService userService;
        public MainHub(IChatService chatService, IUserService userService)
        {
            this.chatService = chatService;
            this.userService = userService;
        }

        public async Task GetChat(string currentUser, string otherUser)
        {
            if(currentUser != null && otherUser != null)
            {
                var chat = chatService.GetChat(currentUser, otherUser);
                await Groups.AddToGroupAsync(Context.ConnectionId, chat.ChatId.ToString());
                await Clients.Group(chat.ChatId.ToString()).SendAsync("GetChat", chat);
            }
        }

        public async Task SendMessage(Chat chat, string text)
        {
            var sender = userService.GetUsers().Find(x => x.ConnectionId == Context.ConnectionId);
            var reciver = chat.Users.First(x => x != sender.Username);

            chat.Messages.Add(new Message()
            {
                Sender = sender.Username,
                Reciver = reciver,
                Date = DateTime.Now.ToString("HH:mm"),
                Text = text
            });
            chatService.Update(chat);

            await GetChat(sender.Username, reciver);
            await Clients.Group(chat.ChatId.ToString()).SendAsync("SendMessage", true);
        }

        public async Task LoginUser(User user)
        {
            var output = userService.Login(Context.ConnectionId, user.Username, user.Password);
            if (output != null)
            {
                output.ConnectionId = Context.ConnectionId;
                userService.UpdateUser(output);
                await Groups.AddToGroupAsync(output.ConnectionId, output.Username);
                await Clients.Group(output.Username).SendAsync("IsLogined", output);
            }
        }

        public async Task RegisterUser(User user)
        {
            var output = userService.Register(user.Username, user.Password);
            await Clients.All.SendAsync("IsRegistered", output);
        }

        public async Task LoadUsers()
        {
            var users = userService.GetUsers()
                .ToList();

            await Clients.All.SendAsync("GetUsers", users);
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            var user = userService.GetUsers()
                .Find(x => x.ConnectionId == Context.ConnectionId);
            if (user != null)
            {
                Disconnect(user.ConnectionId, user.Username);
                user.ConnectionId = default;
                userService.UpdateUser(user);
            }
            LoadUsers();
            return base.OnDisconnectedAsync(exception);
        }

        public async Task Disconnect(string connectionId ,string room)
        {
            await Groups.RemoveFromGroupAsync(connectionId, room);
        }
    }
}
