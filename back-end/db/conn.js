import { MongoClient } from "mongodb";

const uri = process.env.ATLAS_URI || "";

const client = new MongoClient(uri);

let conn;
try {
  conn = await client.connect();
} catch(e) {
  console.error(e);
}

let db = conn.db("good_bank");

export default db;

