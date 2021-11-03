using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TalkBack.DAL.Models
{
    public class User
    {
        [BsonId]
        public Guid UserId { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public bool IsLoggedIn { get; set; }
        //public Image MyProperty { get; set; }
        public int Wins { get; set; }
        public int Games { get; set; }
    }
}
