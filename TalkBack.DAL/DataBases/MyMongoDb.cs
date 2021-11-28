using MongoDB.Driver;

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
