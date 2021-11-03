using System.Collections.Generic;
using TalkBack.BLL.Interfaces;
using TalkBack.DAL.Interfaces;
using TalkBack.DAL.Models;

namespace TalkBack.BLL.Services
{
    public class UserService : IUserService
    {
        private IUserRepository repo;
        public UserService(IUserRepository repo) => this.repo = repo;

        public List<User> GetUsers()
        {
            var collection = repo.GetAll();
            if (collection != null)
                return repo.GetAll();
            return new List<User>();
        }
        public bool Register(string username, string password)
        {
            if (IsExist(username))
                return false;

            repo.Add(new User() { Username = username, Password = password });
            return true;
        }
        public bool Login(string username, string password)
        {
            if (!IsExist(username, password))
                return false;

            repo.Get(username).IsLoggedIn = true;
            return true;
        }
        public void Logout(string username)
        {
            repo.Get(username).IsLoggedIn = false;
        }
        private bool IsExist(string username, string password = null)
        {
            var userInDb = repo.Get(username);
            if (userInDb.Username == username)
            {
                if (password != null)
                    if (userInDb.Password == password)
                        return true;
                    else
                        return false;
                return true;
            }
            return false;
        }
    }
}
