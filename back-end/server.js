import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import router from "./routes/record.js";

const PORT = process.env.PORT || 5051;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/record", router);

// start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

/* Here is the explanation for the code above:
1. We import express and cors, and the route file.
2. We create an instance of express and assign it to the app variable. Then we use cors() middleware, which allows us to make requests from the frontend to the backend.
3. We parse incoming requests with JSON payloads and assign them to req.body property.
4. We set the route for the records endpoint and pass it to the records router.
5. We set the port number and make the app listen on that port. */