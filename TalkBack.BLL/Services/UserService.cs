﻿using System.Collections.Generic;
using TalkBack.BLL.Interfaces;
using TalkBack.DAL.Interfaces;
using TalkBack.DAL.Models;

namespace TalkBack.BLL.Services
{
    public class UserService : IUserService
    {
        private IUserRepository repo;
        public UserService(IUserRepository repo)
        {
            this.repo = repo;
            ClearConnections();
        }

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
        public User Login(string connection, string username, string password)
        {
            if (!IsExist(username, password))
                return null;

            var user = repo.Get(username);
            return user;
        }
        private bool IsExist(string username, string password = null)
        {
            var userInDb = repo.Get(username);
            if (userInDb == null) return false;

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

        public void ClearConnections()
        {
            foreach (var user in repo.GetAll())
            {
                if (user.ConnectionId != default)
                {
                    user.ConnectionId = default;
                    repo.Update(user);
                }
            }
        }

        public void UpdateUser(User user)
        {
            if (user != null)
                repo.Update(user);
        }
    }
}
