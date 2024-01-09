const {MongoClient} = require("mongodb");
let db

const express = require("express")

// The databse, will be initialized later

// Creating a new instance of express 
const app = express()

// met request
// Parameters: path, function to be executed
// We'll be passing an anonimous function
// Here req and res are given by express
// - req represents the incoming request that the visitor is sending to the server 
// - res represents the your ability to send a respond to the semder
app.get("/", async (req, res) => {

  // A query
  // We want to await the query because we don't know how long it will take
  const allAnimals = await db.collection("animals").find().toArray();
  console.log(allAnimals)
  
  res.send("Welcome to the homepage")
})

// We are creating the routes before we start the connection (listen())
app.get("/admin", (req, res) => {
  res.send("This is the top secret admin page")
})

async function start() {
  const client = new MongoClient("mongodb://root:root@localhost:27017/animals?&authSource=admin");
  // Let's wait for the connection
  await client.connect()
  // This return the database
  db = client.db()
  // We are connecting to the database before we start the connection
  app.listen(3001)
}

start()

