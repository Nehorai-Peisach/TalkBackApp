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

        public async Task UpdateBoard(Chat chat, string pieceId, string currentPlaceId, string nextPlaceId)
        {
            var lst = new string[] { pieceId, currentPlaceId, nextPlaceId };
            await Clients.Group(chat.ChatId.ToString()).SendAsync("UpdateBoard", lst);
        }

        public async Task RollDice(Chat chat)
        {
            var rnd = new Random();
            await Clients.Group(chat.ChatId.ToString()).SendAsync("GetDice", rnd.Next(1, 7), rnd.Next(1, 7));
        }

        public async Task NextTurn(Chat chat, string color)
        {
            if (color == "white")
                await Clients.Group(chat.ChatId.ToString()).SendAsync("Turn", "black");
            else
                await Clients.Group(chat.ChatId.ToString()).SendAsync("Turn", "white");
        }

        public async Task EndGame(Chat chat)
        {
            if (chat == null) return;

            var currentUser = userService.GetUsers().Find(x => x.ConnectionId == Context.ConnectionId);
            var tmp = chat.Users.First(x => x != currentUser.Username);
            var otherUser = userService.GetUsers().Find(x => x.Username == tmp);

            currentUser.PlayWith = null;
            otherUser.PlayWith = null;
            userService.UpdateUser(currentUser);
            userService.UpdateUser(otherUser);
            await Clients.Group(otherUser.ConnectionId).SendAsync("EndGame");
            await Clients.Group(currentUser.ConnectionId).SendAsync("EndGame");
        }

        public async Task WantToPlayWith(Chat chat)
        {
            var currentUser = userService.GetUsers().Find(x => x.ConnectionId == Context.ConnectionId);
            var tmp = chat.Users.First(x => x != currentUser.Username);
            var otherUser = userService.GetUsers().Find(x => x.Username == tmp);

            currentUser.PlayWith = otherUser.Username;
            userService.UpdateUser(currentUser);
            await CheckIfCanPlay(currentUser, otherUser, chat);
        }

        public async Task CheckIfCanPlay(User currentUser, User otherUser, Chat chat)
        {
            if (!(currentUser.PlayWith == otherUser.Username && otherUser.PlayWith == currentUser.Username)) return;

            await Groups.AddToGroupAsync(currentUser.ConnectionId, chat.ChatId.ToString());
            await Groups.AddToGroupAsync(otherUser.ConnectionId, chat.ChatId.ToString());

            await Clients.Group(chat.ChatId.ToString()).SendAsync("CanPlay");
            await StartGame(currentUser, otherUser, chat);
        }

        public async Task StartGame(User currentUser, User otherUser, Chat chat)
        {
            await Clients.Group(currentUser.ConnectionId).SendAsync("GetColor", "white");
            await Clients.Group(otherUser.ConnectionId).SendAsync("GetColor", "black");

            await Clients.Group(chat.ChatId.ToString()).SendAsync("Turn", "white");
        }

        public async Task GetChat(string currentUser, string otherUser)
        {
            if (currentUser != null && otherUser != null)
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

        public async Task Disconnect(string connectionId, string room)
        {
            await Groups.RemoveFromGroupAsync(connectionId, room);
        }
    }
}
