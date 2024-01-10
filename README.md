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

```

## Node

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

Let's visualize in the html page the result of the query

```javascript
app.get("/", async (req, res) => {
  // A query
  // We want to await the query because we don't know how long it will take
  const allAnimals = await db.collection("animals").find().toArray();
  res.send(`<p>Welcome to the homepage</p> ${allAnimals.map(animal => `<p>${animal.name} - ${animal.species}</p>`).join('')}`)
  
})
```

Returning a string with some html like this is messy, not organized. Developers would use a template engine such as `ejs`

# Ejs 

```bash 
npm install ejs
```

Let's tell express to use ejs

```javascript 

const app = express()
// Here
app.set("view engine", "ejs")
// Set the folder of the views (templates)
app.set("views", "./views")
```
In views/home.js 

```html 
<h1>Welcome!</h1>
<ul>
  <% allAnimals.forEach(function(animal) { %>
      <li> <%= animal.name %> - <%= animal.species %></li>
    <% })  %>
</ul>
```

The equal sign means that we want to escape the content 
Now we have the same list as before.

We want the admin to be able to change the data in real time without refreshing the whole page, how do we do that?

To prepare for that, let's create a view for the admin:

views/admin.js
```html 
<!DOCTYPE html>
<html lang="en">
<meta charset="UTF-8">
<title>Page Title</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link rel="stylesheet" href="">
<style>
</style>
<script src=""></script>
<body>
  <div id="app"></div>
  <script src="/main.js"></script>
<
</body>
</html>
```
server.js
```javascript 
app.get("/admin", (req, res) => {
  res.render("admin")
})
```

Let's create a new folder called `public` with a file called `main.js`
Inside main.js let's just
```javascript
alert(1)
```

Let's add this in server.js 
```javascript 
app.set("views", "./views")
app.use(express.static("public"))
```

Let's create src/index.js

Now in main.js we are writing actual javascript code that will be run in admin.ejs!
We have prepared for using react.

## React 

Server side rendering will only get us so far, but in the modern age we need a way to update the page instead of refreshing the whole page. Here is where React steps is.

```bash 
npm install react react-dom @babel/core @babel/presec-react babel/loader webpack webpack-cli webpack-node-externals npm-run-all 
```

The key of all of this is webpack, let's create a configuration file in the root directory called `webpack.config.js` with this content 

```javascript
const nodeExternals = require("webpack-node-externals")
const path = require("path")

const typicalReact = {
  rules: [
    {
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-react"]
        }
      }
    }
  ]
}

const clientConfig = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "public"),
    filename: "main.js"
  },
  mode: "development",
  module: typicalReact
}

const serverConfig = {
  entry: "./server.js",
  output: {
    path: __dirname,
    filename: "server-compiled.js"
  },
  externals: [nodeExternals()],
  target: "node",
  mode: "production",
  module: typicalReact
}

module.exports = [clientConfig, serverConfig]
```

We are loading the tools to convert jsx into regular javascript, the index is localted into /src/index.js, that we want to output it into the public folder and call it main.js 

Let's add this entries to scripts in the `package.json`

```json
  "scripts": {
    "dev": "run-p ourserver ourwebpack",
    "ourwebpack": "webpack --watch",
 
```
Now we can run with 

```bash
npm run dev
```

Finally, we are writing a bit of react. Inside stc/index.js 
```javascript
import React from "react"
import {createRoot} from "react-dom/client"

// The main app
function App() {
  
  return (
    <div>
      <h1>Hello</h1>
      <p>Hey, this is from react</p>
    </div>
  )
}

// Everything will be rendered wher the app id is set 
const root = createRoot(document.querySelector("#app"))
root.render(<App />)
```

We are writing a special form of html, called jsx, but the browser can't understand it. So webpack will convert this code and convert it into regular javascript

Let's output some content 
```javascript 
// The main app
function App() {
 
  const animals = [{name: "miao", species: "cat"}, {name: "bau", species: "dog"}]

  return (
    <div>
      <h1>Hello</h1>
      <p>Hey, this is from react</p>
      {animals.map(function(animal) {
        return <AnimalCard name={animal.name} species={animal.species}/>
      })}
    </div>
  )
}

function AnimalCard(props) {
  return <p>Hi, my name is {props.name} and I am a {props.species}</p>
}
```

Let's use the actual data from the query. We can create a new route to get the result of the query 
```javascript
app.get("/api/animals", async (req, res) => {
  const allAnimals = await db.collection("animals").find().toArray();
  // This will send raw json
  res.json(allAnimals)
})
```
To pass the values to react, there are many ways, we are gonna use axios

```bash
npm install axios
```

```javascript 
import React, {useState, useEffect} from "react"
import {createRoot} from "react-dom/client"
import Axios from "axios"

// The main app
function App() {
 
  // const animals = [{name: "miao", species: "cat"}, {name: "bau", species: "dog"}]
  
  // the animals and the function to set those will be empty at the start 
  const [animals, setAnimals] = useState([])

  // update the animals
  useEffect(() => {
    async function go() {
      const response = await Axios.get("/api/animals")
      setAnimals(response.data)
    }
    go()
  }, [])

  return (
    <div>
      <h1>Hello</h1>
      <p>Hey, this is from react</p>
      {animals.map(function(animal) {
        return <AnimalCard name={animal.name} species={animal.species}/>
      })}
    </div>
  )
}
```

min 1:00:09
