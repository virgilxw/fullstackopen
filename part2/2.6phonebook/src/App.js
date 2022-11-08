import { useState, useEffect } from 'react'
import axios from 'axios'

const PersonForm = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input
          value={newName}
          onChange={handleNameChange}
        />
      </div>
      <div>number: <input
        value={newNumber}
        onChange={handleNumberChange}
      /></div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Numbers = ({ persons }) => {
  return (
    <ul>
      {persons.map((person) => <li key={person.id}>{person.name} {person.number}</li>)}
    </ul>
  )
}

const App = () => {
  // Overall storage array for names
  const [persons, setPersons] = useState([])

  // Load original name list from database
  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  // Name handler
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  // Number handler
  const [newNumber, setNewNumber] = useState('')

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  // New person entry handler
  const addPerson = (event) => {
    event.preventDefault()

    if (persons.map(person => person.name.toLowerCase()).includes(newName.toLowerCase())) {
      alert(newName + " is already added to the phonebook")
    } else if (persons.map(person => person.number).includes(newNumber)) {
      alert(newNumber + " is already added to the phonebook")
    }
    else {

      const personObject = {
        id: persons.length + 1,
        name: newName,
        number: newNumber
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Numbers persons={persons} />
    </div>
  )
}

export default App