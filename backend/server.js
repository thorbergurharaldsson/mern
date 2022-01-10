//requiering express and initializing the app:
import express from "express";
//requiering the cors middleware:
import cors from "cors";
import bodyParser from "body-parser";
import Mongoose from "mongoose";

const app = express();

const PORT = 8080; //we will use port 8080

import router from "./api-routes.js";

// Connecting to mongoDB with mongoose
const uri =
  "mongodb+srv://torbergur:12345@merntest.gferf.mongodb.net/contacts?retryWrites=true&w=majority";
Mongoose.connect(
  uri,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Database connected");
  }
);

app.use(cors()); //telling express to use the cors middleware

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

app.use("/api", router);
app.get("/", (req, res) => {
  res.send("");
});

app.listen(PORT, () => {
  //listen to the port we chose above
  //print to the console that the server is listening
  console.log("listening to port: " + PORT);
});
