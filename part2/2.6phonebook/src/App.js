import { useState, useEffect } from 'react'
import pbService from './services'
import './style.css'

const Notification = ({className, message}) => {
  if (message === null) {
    return null
  }

  return (
    <div className= {`error ${className}`}>
      {message}
    </div>
  )
}

const PersonForm = ({ addPerson, newName, handleNameChange, newNumber, handleNumberChange }) => {
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

const Numbers = ({ persons, setPersons }) => {
  const drop = (person) => {
    if (window.confirm(`Drop ${person["name"]} ?`)) {
      pbService.drop(person.id).then(retrunedBook => {
        pbService.getAll().then(input => setPersons(input))
      })
    }
  }

  return (
    <ul>
      {persons.map(
        (person) => <li key={person.id}>{person.name} {person.number}<button onClick={() => {drop(person)}}>delete</button></li>
      )}
    </ul>
  )
}

const App = () => {
  // Overall storage array for names
  const [persons, setPersons] = useState([])

  // Load original name list from database
  useEffect(() => {
    pbService.getAll().then(input => setPersons(input))
  }, [])

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

  const [goodErrorMessage, setGoodErrorMessage] = useState(null)
  const [badErrorMessage, setBadErrorMessage] = useState(null)

  // Constructor
  const personConstructor = {
    name: newName,
    number: newNumber
  }

  // New person entry handler
  const addPerson = (event) => {
    event.preventDefault()

    const nameMatch = () =>{
      
      return persons.reduce((p, c) => {
        return c.name.includes(newName.toLowerCase())? c: p
      }, false)
    }

    if (nameMatch()) 
    {
      const match= nameMatch()
      if (window.confirm(`${newName} is already added to the phonebook. Replace the old number with the new one entered?`)) {
        pbService.update(match.id, personConstructor).then(retrunedBook => {
          pbService.getAll().then(input => setPersons(input))
        }).catch((error) => {
          console.log(error)
          setBadErrorMessage(
            `${newName} has been already removed from the server`
          )
          setTimeout(() => {
            setBadErrorMessage(null)
          }, 5000)
        })
        setNewName('')
        setNewNumber('')
      }
    } else if (persons.map(person => person.number).includes(newNumber)) {
      alert(newNumber + " is already added to the phonebook")
    }
    else {
      pbService.create(personConstructor).then(retrunedBook => {
        pbService.getAll().then(input => setPersons(input))
        setGoodErrorMessage(
          `${newName} was added to server`
        )
        setTimeout(() => {
          setGoodErrorMessage(null)
        }, 5000)
      }).catch(error => {
        alert(
          `failed to push '${personConstructor.name}' to the server`
        )
      })
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <Notification className="good" message={goodErrorMessage} />
      <Notification className="bad" message={badErrorMessage} />
      <h2>Numbers</h2>
      <Numbers persons={persons} setPersons={setPersons} />
    </div>
  )
}

export default App