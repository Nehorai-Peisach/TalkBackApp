using MongoDB.Bson.Serialization.Attributes;
using System;

namespace TalkBack.DAL.Models
{
    public class Message
    {
        [BsonId]
        public Guid MessageId { get; set; }
        public string Sender { get; set; }
        public string Reciver { get; set; }
        public DateTime Date { get; set; }
        public string Text { get; set; }
    }
}
