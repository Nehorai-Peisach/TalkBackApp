using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;
using TalkBack.BLL.Interfaces;
using TalkBack.DAL.Models;

namespace TalkBack.UI.Hubs
{
    public class MainHub : Hub
    {
        private string room = "MainRoom";
        private string nextRoom = "ChatRoom";
        private IUserService service;
        public MainHub(IUserService service) => this.service = service;

        public Task LoginUser(User user)
        {
            var flag = service.Login(user.Username, user.Password);
            var temp = room;
            if(flag) temp = nextRoom;

            Groups.AddToGroupAsync(Context.ConnectionId, temp);
            return Clients.Group(temp).SendAsync("IsLogin", flag);
        }

        public Task ResisterUser(User user)
        {
            var flag = service.Register(user.Username, user.Password);
            Groups.AddToGroupAsync(Context.ConnectionId, room);
            return Clients.Group(room).SendAsync("IsRegister", flag);
        }
    }
}
