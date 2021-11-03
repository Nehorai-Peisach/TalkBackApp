using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using TalkBack.DAL.Models;

namespace TalkBack.BLL.Interfaces
{
    public interface IGameService
    {
        void StartGame();
        void RollDice();
        void MovePiece(int pieceNum, int place);
        void SendGameRequest(User opponent);
    }
}
