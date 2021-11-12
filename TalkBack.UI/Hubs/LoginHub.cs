using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using TalkBack.BLL.Interfaces;
using TalkBack.DAL.Models;

namespace TalkBack.UI.Hubs
{
    public class LoginHub : Hub
    {
        private static string room = "LoggedInUsers"; 
        private IUserService service;
        public LoginHub(IUserService service)
        {
            this.service = service;
            service.ClearConnections();
        }

        public async Task LoginUser(User user)
        {
            var output = service.Login(Context.ConnectionId, user.Username, user.Password);

            await Groups.AddToGroupAsync(Context.ConnectionId, room);
            await Clients.Group(room).SendAsync("IsLogined", output);
        }

        public async Task RegisterUser(User user)
        {
            var output = service.Register(user.Username, user.Password);
            await Clients.Group(room).SendAsync("IsRegistered", output);
        }
    }
}
