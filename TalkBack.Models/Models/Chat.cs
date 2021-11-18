using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;

namespace TalkBack.DAL.Models
{
    public class Chat
    {
        [BsonId]
        public Guid ChatId { get; set; }
        public string[] Users { get; set; }
        public List<Message> Messages { get; set; }
    }
}