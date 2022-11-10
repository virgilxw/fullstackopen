const express = require('express')
const app = express()

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.use(express.json())

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people </p> ${Date()}`)
})

const generateId = (id) => {
    if (persons.some(person => person.id === id) || typeof id === 'undefined') {
        return generateId(Math.round(Math.random() * 1000))
    } else {
        return id
    }
}

app.post('/api/persons', (request, response) => {
    const body = request.body

    console.log(body.name.toLowerCase())

    if (!body) {
      return response.status(400).json({ 
        error: 'content missing' 
      })
    } else if (persons.some(person => person.name.toLowerCase() === body.name.toLowerCase() && persons.some(person => person.number === body.number))) {
        return response.status(403).json({ 
            error: 'Duplicate entry found' 
          })
    } else if (persons.some(person => person.name.toLowerCase() === body.name.toLowerCase())) {
        return response.status(403).json({ 
            error: 'Name already exists' 
          })
    }else if (persons.some(person => person.number === body.number)) {
        return response.status(403).json({ 
            error: 'Number already exists' 
          })
    }

    const person = {
      id: generateId(),
      name: body.name,
      number: body.number
    }
  
    persons = persons.concat(person)
  
    response.json(person)
  })

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
