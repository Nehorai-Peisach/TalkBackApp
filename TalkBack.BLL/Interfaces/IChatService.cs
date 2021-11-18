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
        void CreateChat(Chat chat);
        Chat GetChat(string sender, string reciver);
        void SendMessage(Chat chat, Message message);
        void Update(Chat chat);
    }
}
