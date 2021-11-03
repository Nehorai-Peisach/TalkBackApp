using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
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

            if (flag) room = nextRoom;

            Groups.AddToGroupAsync(Context.ConnectionId, room);
            return Clients.Group(room).SendAsync("IsLogin", flag);
        }
    }
}
