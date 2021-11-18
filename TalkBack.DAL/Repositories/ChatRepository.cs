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
        MyMongoDb db = new MyMongoDb("Chats");

        public void Add(Chat chat)
        {
            var collection = db.Client.GetCollection<Chat>(table);
            collection.InsertOne(chat);
        }
        public Chat Get(Chat chat)
        {
            var collection = db.Client.GetCollection<Chat>(table);
            var filter = Builders<Chat>.Filter.Eq("ChatId", chat.ChatId);

            return collection.Find(filter).First();
        }
        public List<Chat> GetAll() => db.Client.GetCollection<Chat>(table).Find(new BsonDocument()).ToList();
        public void Remove(Chat chat)
        {
            var collection = db.Client.GetCollection<Chat>(table);
            var filter = Builders<Chat>.Filter.Eq("ChatId", chat.ChatId);
            collection.DeleteOne(filter);
        }
        public void Update(Chat chat)
        {
            var collection = db.Client.GetCollection<Chat>(table);
            var filter = Builders<Chat>.Filter.Eq("ChatId", chat.ChatId);

            collection.ReplaceOne(filter, chat);
        }
    }
}
