using System.Collections.Generic;
using TalkBack.DAL.Models;

namespace TalkBack.DAL.Interfaces
{
    public interface IChatRepository
    {
        void Add(Chat chat);
        void Remove(Chat chat);
        Chat Get(Chat chat);
        List<Chat> GetAll();
        void Update(Chat chat);
    }
}
