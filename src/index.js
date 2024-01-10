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

function AnimalCard(props) {
  return <p>Hi, my name is {props.name} and I am a {props.species}</p>
}

// Everything will be rendered wher the app id is set 
const root = createRoot(document.querySelector("#app"))
root.render(<App />)
