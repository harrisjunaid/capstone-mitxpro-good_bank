import express from "express";
// data access class 
import  usersDal from "../db/users-dal.js";
// ObjectId is a class that takes a string and returns an object that mongodb understands
import { ObjectId } from "mongodb";

const router = express.Router();
//  *********** CRUD ***********
// create a new record.
router.post("/", async (req, res) => {
  console.log("POSTING:  from / collection.insertOne(user)", JSON.stringify(req.body), "in request")
  let user = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    balance: req.body.balance,
  };
  try {
    let result = await usersDal.createUser(user);
    res.send(result).status(200); // 
  } catch (error) { 
    console.error(error);
    res.send(error).status(500);
  }
});
// list of all the records.
router.get("/", async (req, res) => {
  let results = await usersDal.readAllUsers();
  res.send(results).status(200);
});
// get a single record by email
router.get("/:email", async (req, res) => {
  let query = {email: req.params.email};
  let result = await usersDal.findUserByEmail(query);

  if (!result) {
    res.send("Not found").status(404);
  }
  else {
    res.send(result).status(200);
  }
});
// update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const update =  {
    $set: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      balance: req.body.balance,
    }
  };

  let result = await usersDal.updateUserById(query, update);
  if (!result) res.send("Not found").status(404);
  res.send(result).status(200);
});
// delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) }; // MONGO QUERY
  let result = await usersDal.deleteUserById(query); // MONGO RESULT
  if (!result) res.send("Not found").status(404);
  else {
    res.send(result).status(200);
  }
});

export default router;