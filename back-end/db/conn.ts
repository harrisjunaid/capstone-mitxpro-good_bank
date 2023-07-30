// official library to provide interface to communicate with MongoDB from Node.js
import { MongoClient, Db } from "mongodb";

// get the URI of the database from the environment variables
type URI = string | undefined;
const uri: URI = process.env.ATLAS_URI || undefined;
if (uri === undefined) {
  throw new Error('Failed to get MongoDB URI from environment variable');
}
const client = new MongoClient(uri);

// connect to Mongo Atlas cluster
let conn: MongoClient | undefined;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

if (conn === undefined) {
  throw new Error('Failed to connect to MongoDB client: conn is undefined');
}
let db: Db = conn.db("good_bank");
// database object
// to access the database and its collections
export default db;

/* Here is the explanation for the code above:
1. The first line imports the MongoClient class from the mongodb module.
2. The second line gets the database URI from the environment variables. The || "" part is there to avoid an error if the variable is not set. The value is not a real database URI, it's just a placeholder. We'll use a real URI later.
3. The third line creates a new instance of the MongoClient class.
4. The fourth line connects to the database. The connection is asynchronous, so we have to use await.
5. The fifth line gets the good_bank database. The db property is created by the connect method.
6. The last line exports the database object. */