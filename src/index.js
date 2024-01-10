import React, {useState, useEffect} from "react"
import {createRoot} from "react-dom/client"
import Axios from "axios"
import CreateNewForm from "./components/CreateNewForm"
import AnimalCard from "./components/AnimalCard"

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
    <div className="container">
      <p>
        <a href="/">&laquo; Back to public homepage</a>
      </p>
      <CreateNewForm setAnimals={setAnimals} />
      <div className="animal-grid">
        {animals.map(function (animal) {
          return <AnimalCard key={animal._id} name={animal.name} species={animal.species} photo={animal.photo} id={animal._id} setAnimals={setAnimals} />
        })}
      </div>
    </div>
  )
}

// Everything will be rendered wher the app id is set 
const root = createRoot(document.querySelector("#app"))
root.render(<App />)
