using Microsoft.AspNetCore.SignalR;
using System;
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

        public async Task EndGame(Chat chat, string color)
        {
            if (chat == null) return;

            var currentUser = userService.GetUsers().Find(x => x.ConnectionId == Context.ConnectionId);
            var tmp = chat.Users.First(x => x != currentUser.Username);
            var otherUser = userService.GetUsers().Find(x => x.Username == tmp);
            
            
            if(currentUser.PlayWith!= null && currentUser.PlayWith == otherUser.Username && otherUser.PlayWith == currentUser.Username)
            {
                if(color != null) await SendMessage(currentUser.Username, chat, $"The color: {color} win the the game.", false);
                else await SendMessage(currentUser.Username, chat, $"{currentUser.Username} has left the game.", false);
                
                currentUser.PlayWith = null;
                otherUser.PlayWith = null;
                userService.UpdateUser(currentUser);
                userService.UpdateUser(otherUser);
                await Clients.Group(otherUser.Username).SendAsync("EndGame");
                await Clients.Group(currentUser.Username).SendAsync("EndGame");
            }
            
        }

        public async Task WantToPlayWith(Chat chat)
        {
            var currentUser = userService.GetUsers().Find(x => x.ConnectionId == Context.ConnectionId);
            var tmp = chat.Users.First(x => x != currentUser.Username);
            var otherUser = userService.GetUsers().Find(x => x.Username == tmp);

            if(currentUser.PlayWith != null)
            await Clients.Group(currentUser.PlayWith).SendAsync("WantToPlayWithYou", currentUser.Username, false);

            currentUser.PlayWith = otherUser.Username;
            userService.UpdateUser(currentUser);
            await CheckIfCanPlay(currentUser, otherUser, chat);
            await Clients.Group(currentUser.PlayWith).SendAsync("WantToPlayWithYou", currentUser.Username, true);
        }

        public async Task CheckIfCanPlay(User currentUser, User otherUser, Chat chat)
        {
            if (!(currentUser.PlayWith == otherUser.Username && otherUser.PlayWith == currentUser.Username)) return;

            await Groups.AddToGroupAsync(currentUser.Username, chat.ChatId.ToString());
            await Groups.AddToGroupAsync(otherUser.Username, chat.ChatId.ToString());

            await Clients.Group(chat.ChatId.ToString()).SendAsync("CanPlay");
            await StartGame(currentUser, otherUser, chat);
        }

        public async Task StartGame(User currentUser, User otherUser, Chat chat)
        {
            await Clients.Group(currentUser.Username).SendAsync("GetColor", "white");
            await Clients.Group(otherUser.Username).SendAsync("GetColor", "black");

            await Clients.Group(chat.ChatId.ToString()).SendAsync("Turn", "white");
        }

        public async Task GetChat(string currentUser, string otherUser)
        {
            if(otherUser == "allChat")
            {
                var chat = chatService.GetChat("", otherUser);
                await Groups.AddToGroupAsync(Context.ConnectionId, chat.ChatId.ToString());
                await Clients.Group(chat.ChatId.ToString()).SendAsync("GetChat", chat);
            }
            else if (currentUser != null && otherUser != null)
            {
                var other = userService.GetUsers().FirstOrDefault(x => x.Username == otherUser);
                var current = userService.GetUsers().FirstOrDefault(x => x.Username == currentUser);

                var chat = chatService.GetChat(currentUser, otherUser);
                if(current.CurrentChat != null)
                    await Disconnect(current.ConnectionId, current.CurrentChat.ChatId.ToString());
                current.CurrentChat = chat;
                userService.UpdateUser(current);
                
                await Groups.AddToGroupAsync(Context.ConnectionId, chat.ChatId.ToString());
                await Clients.Group(chat.ChatId.ToString()).SendAsync("GetChat", chat);
            }
        }

        public async Task SendMessage(string currentUsername, Chat chat, string text, bool isFromUser)
        {
            var reciverUsername = chat.Users.First(x => x != currentUsername);
            var sender = "";
            var reciver = "";

            if(chat.Users.FirstOrDefault(x => x == "allChat") != default)
            {
                sender = currentUsername;
                reciver = "All";
                reciverUsername = "allChat";
            }
            else if (isFromUser) {
                sender = currentUsername;
                reciver = reciverUsername;
            }
            else
            {
                sender = "Server";
                reciver = "All";
            }

            chat.Messages.Add(new Message()
            {
                Sender = sender,
                Reciver = reciver,
                Date = DateTime.Now.ToString("HH:mm"),
                Text = text
            });
            chatService.Update(chat);

            await GetChat(currentUsername, reciverUsername);
            await Clients.Group(chat.ChatId.ToString()).SendAsync("SendMessage", true);
        }

        public async Task LoginUser(User user)
        {
            var output = userService.Login(Context.ConnectionId, user.Username, user.Password);
            if (output != null)
            {
                if(output.ConnectionId != null)
                {
                    await Groups.AddToGroupAsync(Context.ConnectionId, Context.ConnectionId);
                    await Clients.Group(Context.ConnectionId).SendAsync("IsLogined", null);
                }
                else
                {
                    output.ConnectionId = Context.ConnectionId;
                    userService.UpdateUser(output);
                    await Groups.AddToGroupAsync(output.ConnectionId, output.Username);
                    await Clients.Group(output.Username).SendAsync("IsLogined", output);
                }
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
                EndGame(user.CurrentChat, null);
                Disconnect(user.ConnectionId, user.Username);
                user.ConnectionId = default;
                user.PlayWith = default;
                user.CurrentChat = default;
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
