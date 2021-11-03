using System.Collections.Generic;
using TalkBack.DAL.Models;

namespace TalkBack.DAL.Interfaces
{
    public interface IChatRepository
    {
        void Add(Chat input);
        void Remove(string username);
        Chat Get(string username);
        List<Chat> GetAll();
        void Update(Chat input, string username);
    }
}
