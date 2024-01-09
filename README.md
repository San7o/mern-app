# MERN: MongoDB, Express, React & Node.js

Following [this](https://www.youtube.com/watch?v=korRfKTDoxE) tutorial


## Project notes

Let's create the project

```bash
mkdir mern-app
cd mern-app
```

This starts the dependencies record of this project
```bash
npm init -y
```
Output:
```
Wrote to /home/santo/Documents/mern-app/package.json:

{
  "name": "mern-app",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}

```
When we update the dependencies of our project, this file will keep track of what we need

## Express

Let's install express
```bash
npm install express
```

And let's use it. First we create a server.js file 

```bash
touch server.js
```

Inside the file:
```javascript
const express = require("express")

// Creating a new instance of express 
const app = express()

// Get request
// Parameters: path, function to be executed
// We'll be passing an anonimous function
// Here req and res are given by express
// - req represents the incoming request that the visitor is sending to the server 
// - res represents the your ability to send a respond to the semderapp.get("/", (req, res) => {
  res.send("Welcome to the homepage")
})

app.get("/admin", (req, res) => {
  res.send("This is the top secret admin page")
})

app.listen(3001)

## Node
```
Let's run out application!

```bash
node server.js
```

We can see the website at `localhost:3001`


## MongoDB

We can setup mongodb with docker.

Let's create a docker compose file:

```bash
touch docker-compose.yml
```

Inside the docker-compose we want to load a mongoDB database, let's just paste this inside:

```yaml
version: "3.9"
services:
  mongo:
    container_name: "mernstackdb"
    image: mongo:5.0.8-focal
    restart: always
    ports:
      - 27017:27017
    volumes:
      - ./db:/data/db
    environment:
      MONGO_INITDB_ROOT_USERNAME: root
      MONGO_INITDB_ROOT_PASSWORD: root
```

And let's run this docker, assuming you have docker-compose installed:
```bash 
docker-compose up -d
```

To start and stop the container you can do 
```bash 
docker-compose start
docker-compose stop
```

We can test the connection with `mongosh`

```bash 
mongosh -u root -p root 

test> show databases
```

Some examples:
```mongodb 
test> use animals
animals> db.animals.insertMany([
...     { name: "Lion", species: "Panthera leo" },
...     { name: "Tiger", species: "Panthera tigris" },
...     { name: "Elephant", species: "Loxodonta africana" },
...     { name: "Giraffe", species: "Giraffa camelopardalis" },
...     { name: "Monkey", species: "Cercopithecidae" }
...     // Add more animal names and species as needed
... ])
animals> db.animals.find({ name: "Lion" })
[
  {
    _id: ObjectId("659d78afeeeae1ea378ef21b"),
    name: 'Lion',
    species: 'Panthera leo'
  }
]
```

Connect to the mongoDB database inside the app

```bash
npm install mongodb
```

Indide server.js:
```javascript 
const {MongoClient} = require("mongodb");
let db

// ------
// -----

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
```
Let's make a query

```javascript
app.get("/", async (req, res) => {

  // A query
  // We want to await the query because we don't know how long it will take
  const allAnimals = await db.collection("animals").find().toArray();
  console.log(allAnimald)
  
  res.send("Welcome to the homepage")
})
```

Now when we'll connect to the website, the output of the query will be displayed in the terminal

---

## Nodemon

Now we want to update the server without restarting it 

```bash 
npm install nodemon 
```

Inside package.json, we want to add this line 
```json
  "scripts": {
    "ourserver": "nodemon server.js",   // Here 
    "test": "echo \"Error: no test specified\" && exit 1"
  },

```

And when we run the server:

```bash 
npm run ourserver 
```

Now It will automatically restart the server every time we save a change to out server file

---

min 27:12
