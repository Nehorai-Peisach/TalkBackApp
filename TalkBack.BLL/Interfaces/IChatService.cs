using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalkBack.DAL.Models;

namespace TalkBack.BLL.Interfaces
{
    public interface IChatService
    {
        void CreateChat();
        List<Message> GetChat(User sender, User reciver);
        void SendMessage(Message message);
    }
}
