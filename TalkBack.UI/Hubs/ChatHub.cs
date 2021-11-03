using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TalkBack.UI.Hubs
{
    public class ChatHub : Hub
    {
        private readonly string botUser;
        private readonly IDictionary<string, MyUser> connections;

        public ChatHub(IDictionary<string, MyUser> connections)
        {
            botUser = "Bot";
            this.connections = connections;
        }

        public override Task OnDisconnectedAsync(Exception exception)
        {
            if (connections.TryGetValue(Context.ConnectionId,out MyUser userConnection))
            {
                connections.Remove(Context.ConnectionId);
                Clients.Group(userConnection.Password)
                    .SendAsync("ReceiveMessage", botUser, $"{userConnection.Username} has left.");

                SendConnectedUsers(userConnection.Password);
            }
            return base.OnDisconnectedAsync(exception);
        }

        public async Task SendMessage(string message)
        {
            if (connections.TryGetValue(Context.ConnectionId, out MyUser userConnection))
            {
                await Clients.Group(userConnection.Password)
                    .SendAsync("ReceiveMessage", userConnection.Username, message);
            }
        }

        public async Task LoginUser(MyUser userConnection)
        {


            await Groups.AddToGroupAsync(Context.ConnectionId, userConnection.Password);

            connections[Context.ConnectionId] = userConnection;

            await Clients.Group(userConnection.Password).SendAsync("ReceiveMessage", botUser, $"{userConnection.Username} has joined {userConnection.Password}");

            await SendConnectedUsers(userConnection.Password);
        }

        public Task SendConnectedUsers(string room)
        {
            var users = connections.Values
                .Where(c => c.Password == room)
                .Select(c => c.Username);

            return Clients.Group(room).SendAsync("UsersInRoom", users);
        }
    }
}
