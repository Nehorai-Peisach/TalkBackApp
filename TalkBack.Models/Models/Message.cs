using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TalkBack.DAL.Models
{
    public class Message
    {
        [BsonId]
        public int MessageId { get; set; }
        public string Sender { get; set; }
        public string Reciver { get; set; }
        public DateTime Date { get; set; }
        public string Text { get; set; }
    }
}
