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
            var settings = MongoClientSettings.FromConnectionString("mongodb+srv://Admin:talkback123@talkbackdb.fepwp.mongodb.net/TalkBackDb?retryWrites=true&w=majority");
            var client = new MongoClient(settings);
            Client = client.GetDatabase(database);
        }
    }
}
