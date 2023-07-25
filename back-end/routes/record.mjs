import express from "express";
import { db } from "../db/index.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();
//  *********** CRUD ***********
// This section will help you create a new record.
router.post("/", async (req, res) => {
  console.log("POSTING:  from / collection.insertOne(newDocument)", JSON.stringify(req.body), "in request")
  let newDocument = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    balance: req.body.balance,
  };
  try {
    let collection = await db.collection("records");
    let result = await collection.insertOne(newDocument);
    res.send(result).status(204);
  } catch (error) { // Handle any errors that may occur
    console.error(error);
    res.send(error).status(500);
  }
});

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("records");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// :id
// // This section will help you get a single record by id
// router.get("/:id", async (req, res) => {
//   let collection = await db.collection("records");
//   let query = {_id: new ObjectId(req.params.id)};
//   let result = await collection.findOne(query);

//   if (!result) res.send("Not found").status(404);
//   else res.send(result).status(200);
// });

// :email
// This section will help you get a single record by email
router.get("/:email", async (req, res) => {
  console.log("GETTING:  from /:email collection.findOne(query)", JSON.stringify(req.params.email), "in request")
  let collection = await db.collection("records");
  let query = {email: req.params.email};
  let result = await collection.findOne(query);

  if (!result) {
    console.log("GETTING:  from /:email failed")
    res.send("Not found").status(404);
  }
  else {
    res.send(result).status(200);
    console.log("GETTING:  from /:email success", JSON.stringify(result), "in response")
  }
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  console.log("PATCHING:  from /:id")
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      balance: req.body.balance,
    }
  };

  let collection = await db.collection("records");
  let result = await collection.updateOne(query, updates);
  // console.log("PATCHED RESULT:  from /:id")
  // console.log(result)
  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  console.log("DELETING:  from /:id")
  const query = { _id: new ObjectId(req.params.id) }; // MONGO QUERY
  const collection = db.collection("records"); // MONGO COLLECTION
  let result = await collection.deleteOne(query); // MONGO RESULT
  if (!result) res.send("Not found").status(404);
  else {
    console.log("DELETED RESULT:  from /:id")
    res.send(result).status(200);
    // bingDeleteFirebaseUser(result.email)  // DELETE FROM FIREBASE
  }
});

export default router;