const { MongoClient } = require("mongodb");

let cachedClient: any = null;
let cachedDb: any = null;

export async function connectToDatabase() {

    if (cachedClient && cachedDb) {
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }
    let client = new MongoClient(process.env.MONGODB_URL);
    await client.connect().then(() => console.log("Connected Successfully")).catch((err: any) => console.log(err))


    let db = client.db('rentmeroom');
    cachedClient = client;
    cachedDb = db;
    return {
        client: cachedClient,
        db: cachedDb,
    }
}

