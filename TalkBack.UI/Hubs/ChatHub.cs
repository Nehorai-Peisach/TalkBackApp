using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TalkBack.BLL.Interfaces;
using TalkBack.DAL.Models;

namespace TalkBack.UI.Hubs
{
    public class ChatHub : Hub
    {
        private readonly string botUser;
        private static string room = "ChatHub";
        private IUserService userService;
        private IChatService chatService;
        private readonly IDictionary<string, User> connections;

        public ChatHub(IChatService chatService, IUserService userService, IDictionary<string, User> connections)
        {
            this.userService = userService;
            this.chatService = chatService;
            this.connections = connections;
        }

        //public async Task SendMessage(string message)
        //{

        //}

        public async Task LoadUsers(User user)
        {
            var users = userService.GetUsers()
                .Where(c => c.Username != user.Username)
                .Select(c => c.Username).ToList();
            await Groups.AddToGroupAsync(Context.ConnectionId, room);
            await Clients.Group(room).SendAsync("GetUsers", users);
        }
    }
}
