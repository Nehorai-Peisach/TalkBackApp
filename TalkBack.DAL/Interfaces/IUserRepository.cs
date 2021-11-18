using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalkBack.DAL.Models;

namespace TalkBack.DAL.Interfaces
{
    public interface IUserRepository
    {
        void Add(User input);
        void Remove(string username);
        User Get(string username);
        List<User> GetAll();
        void Update(User input);
    }
}
