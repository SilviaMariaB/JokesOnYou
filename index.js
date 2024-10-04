//Create a website that gives the user a joke based on their name.
// HINTS:
// 1. Import express and axios
import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

// 2. Create an express app and set the port number.
const app = express();
const port = 3000;
const API_URL = "https://v2.jokeapi.dev/joke";
var errorCode = "";

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("index.ejs", { setup: "Waiting for name..." });
  });

app.get("/get-joke", async (req, res) => {
    errorCode = ""

    try {
      const result = await axios.get(API_URL + "/Any");
      var setupJoke = "";
      if (result.data.setup != undefined){
        setupJoke = result.data.setup;
      }else {
        setupJoke = result.data.joke;
      }
      //console.log(req.query.name);
      res.render("index.ejs", { setup: setupJoke, delivery: result.data.delivery, insertedName: req.query.name });
      
    } catch (error) {
        console.error("Failed to make request:", error.message);
        errorCode = "No joke to show.";
        res.render("index.ejs", { errorCode : errorCode});
    }
  });

// Listen on your predefined port and start the server.
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });