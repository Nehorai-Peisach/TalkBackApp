using MongoDB.Driver;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TalkBack.DAL.DataBases
{
    class MyMongoDb
    {
        public IMongoDatabase Client;

        public MyMongoDb(string database)
        {
            var settings = MongoClientSettings.FromConnectionString("mongodb+srv://ofeking8:talkback123@talkback.lq4qn.mongodb.net/TalkBack?retryWrites=true&w=majority");
            var client = new MongoClient(settings);
            Client = client.GetDatabase(database);
        }
    }
}
