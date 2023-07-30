import "./loadEnvironment.js";
import express from "express";
import cors from "cors";
import router from "./routes/record.js";
import path from "path";
import {fileURLToPath} from 'url';


const PORT: string | number | undefined  = process.env.PORT || undefined;
const app = express();




// Get the current file's path
const __filename = fileURLToPath(import.meta.url);
// Get the current directory's path
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'swagger')))

app.use("/record", router);
// // error handling middleware function
// // can use the error argument to access the error object that was passed to the middleware
// const errorHandler = (error, req, res, next) => {
//   console.log("Error Handling Middleware called");
//   console.log('Path: ', req.path);
//   next(); // (optional) invoking next middleware
// };
// // Add error handling middleware
// app.use(errorHandler);

// start the Express server
if (PORT === undefined) {
  throw new Error("PORT is undefined");
  console.log("Error: PORT is undefined");
  process.exit(1);
}
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

/* Here is the explanation for the code above:
1. We import express and cors, and the route file.
2. We create an instance of express and assign it to the app variable. Then we use cors() middleware, which allows us to make requests from the frontend to the backend.
3. We parse incoming requests with JSON payloads and assign them to req.body property.
4. We set the route for the records endpoint and pass it to the records router.
5. We set the port number and make the app listen on that port. */