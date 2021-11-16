using Microsoft.AspNetCore.SignalR;
using System.Linq;
using System.Threading.Tasks;
using TalkBack.BLL.Interfaces;
using TalkBack.DAL.Models;

namespace TalkBack.UI.Hubs
{
    public class MainHub : Hub
    {
        private static string room = "MainHub";
        private IChatService chatService;
        private IUserService userService;
        public MainHub(IChatService chatService, IUserService userService)
        {
            this.chatService = chatService;
            this.userService = userService;
            //userService.ClearConnections();
        }

        public async Task LoginUser(User user)
        {
            var output = userService.Login(Context.ConnectionId, user.Username, user.Password);

            await Groups.AddToGroupAsync(Context.ConnectionId, room);
            await Clients.All.SendAsync("IsLogined", output);
        }

        public async Task RegisterUser(User user)
        {
            var output = userService.Register(user.Username, user.Password);
            await Clients.All.SendAsync("IsRegistered", output);
        }

        public async Task LoadUsers(User user)
        {
            var users = userService.GetUsers()
                .Where(c => c.Username != user.Username).ToList();
            await Clients.All.SendAsync("GetUsers", users);
        }
    }
}
