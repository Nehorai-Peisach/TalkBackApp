using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalkBack.DAL.Models;

namespace TalkBack.BLL.Interfaces
{
    public interface IUserService
    {
        List<User> GetUsers();
        User Login(string connection, string username, string password);
        bool Register(string username, string password);
        void Logout(string username);
        void ClearConnections();
        void Update(User input);
    }
}
