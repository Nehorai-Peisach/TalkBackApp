﻿using System.Collections.Generic;
using TalkBack.DAL.Models;

namespace TalkBack.BLL.Interfaces
{
    public interface IUserService
    {
        List<User> GetUsers();
        User Login(string connection, string username, string password);
        bool Register(string username, string password);
        void ClearConnections();
        void UpdateUser(User user);
    }
}