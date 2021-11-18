using MongoDB.Bson.Serialization.Attributes;
using System;

namespace TalkBack.DAL.Models
{
    public class User
    {
        [BsonId]
        public Guid UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string ConnectionId { get; set; }
    }
}
