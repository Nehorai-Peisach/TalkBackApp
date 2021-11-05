using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Linq;
using TalkBack.DAL.DataBases;
using TalkBack.DAL.Interfaces;
using TalkBack.DAL.Models;

namespace TalkBack.DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        static string table = "AllUsers";
        MyMongoDb db = new MyMongoDb("Users");

        public void Add(User input)
        {
            var collection = db.Client.GetCollection<User>(table);
            collection.InsertOne(input);
        }
        public User Get(string username)
        {
            var collection = db.Client.GetCollection<User>(table);
            var filter = Builders<User>.Filter.Eq(x => x.Username, username);

            return collection.Find(filter).FirstOrDefault();
        }
        public List<User> GetAll() => db.Client.GetCollection<User>(table).Find(new BsonDocument()).ToList();
        public void Remove(string username)
        {
            var collection = db.Client.GetCollection<User>(table);
            var filter = Builders<User>.Filter.Eq(x=> x.Username, username);
            collection.DeleteOne(filter);
        }
        public void Update(User input, string username)
        {
            var collection = db.Client.GetCollection<User>(table);
            var filter = Builders<User>.Filter.Eq(x => x.Username, username);

            collection.ReplaceOne(filter, input);
        }
    }
}
