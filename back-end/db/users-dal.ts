import _db from "./conn.js";

const _mongoCollUsersDAL: string = process.env._mongoCollUsersDAL ||"records"

class UsersDAL {
  private _db: any;
  private _collection: any;

  get db() {
    return this._db;
  }
  get collection() {
    return this._collection;
  }    
  constructor() {
    this._db = _db
    this._collection = this._db.collection( _mongoCollUsersDAL);// records new-records
  }

  // Create a new user document
  async createUser(user: object) {
    console.log("POSTING:  from / collection.insertOne(user)", JSON.stringify(user), "in request")
    const result = await this.collection.insertOne(user);
    return result;
  }

  // Read all user documents
  async readAllUsers() {
    console.log("GETTING:  from / collection.find({})")
    const result = await this.collection.find({}).toArray();
    return result;
  }

  // Find a user document by email
  async findUserByEmail(query) {
    console.log("GETTING:  from /:email collection.findOne(query)", JSON.stringify(query), "in request")
    const user = await this.collection.findOne(query);
    return user;
  }

  // Update a user document by id
  async updateUserById(query, update) {
    console.log("PATCHING:  from /:id", JSON.stringify(query), JSON.stringify(update))
    const result = await this.collection.updateOne(query, update);
    return result;
  }

  // Delete a user document by id
  async deleteUserById(query) {
    console.log("DELETING:  from /:id", JSON.stringify(query))
    const result = await this.collection.deleteOne(query);
    return result;
  }
}

// const usersDal: UsersDAL = new UsersDAL();
// database object from data access class UsersDAL
// can be used in routes, controllers, or middleware functions
export default UsersDAL;

