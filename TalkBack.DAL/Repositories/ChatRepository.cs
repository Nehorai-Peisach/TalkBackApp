using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using TalkBack.DAL.DataBases;
using TalkBack.DAL.Interfaces;
using TalkBack.DAL.Models;

namespace TalkBack.DAL.Repositories
{
    public class ChatRepository : IChatRepository
    {
        static string table = "AllChats";
        MyMongoDb db = new MyMongoDb("Users");

        public void Add(Chat input)
        {
            var collection = db.Client.GetCollection<Chat>(table);
            collection.InsertOne(input);
        }
        public Chat Get(string username)
        {
            var collection = db.Client.GetCollection<Chat>(table);
            var filter = Builders<Chat>.Filter.Eq("Username", username);

            return collection.Find(filter).First();
        }
        public List<Chat> GetAll() => db.Client.GetCollection<Chat>(table).Find(new BsonDocument()).ToList();
        public void Remove(string username)
        {
            var collection = db.Client.GetCollection<Chat>(table);
            var filter = Builders<Chat>.Filter.Eq("Username", username);
            collection.DeleteOne(filter);
        }
        public void Update(Chat input, string username)
        {
            var collection = db.Client.GetCollection<Chat>(table);
            var filter = Builders<Chat>.Filter.Eq("Username", username);

            collection.ReplaceOne(filter, input);
        }
    }
}
