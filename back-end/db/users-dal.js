import db from "./conn.js";

//  class that handles CRUD operations for a records collection
class UsersDAL {
  constructor() {
    this.db = db
    this.collection = this.db.collection("records");
  }

  // Create a new user document
  async createUser(user) {
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

const usersDAL = new UsersDAL()
// database object from data access class UsersDAL
// can be used in routes, controllers, or middleware functions
export default usersDAL

