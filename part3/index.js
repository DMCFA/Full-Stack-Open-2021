const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', (request, response) => JSON.stringify(request.body));

app.use(morgan(':method :url :status :req[content-length] - :response-time ms  :body'));


persons = [
    {
        id: 1,
        name: 'Arto Hellas',
        number: '040-123456'
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323523'
    },
    {
        id: 3,
        name: 'Dan Abramov',
        number: '12-43-234345'
    },
    {
        id: 4,
        name: 'Mary Poppendick',
        number: '39-23-6423122'
    }
]

const newId = () => Math.floor(Math.random() * 1000)

app.get('/api/persons/', (request, response) => {
    response.json(persons)
})

app.get('/info/', (request, response) => {
    const entries = persons.length
    const date = new Date ()
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end(`Phonebook has info for ${entries} people. ${date}`)

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

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const body = request.body
    const personName = persons.map(person => person.name)

    if(!body.name) {
        return response.status(400).json({
            error: 'name is missing'
        })
    } else if (!body.number) {
        return response.status(400).json({
            error: 'number is missing'
        })
    } else if (personName.includes(body.name)) {
        return response.status(400).json({
            error: 'name must be unique'
    })
}

    const person = {
        id: newId(),
        name: body.name,
        number: body.number
    }

    persons = persons.concat(person)

    response.json(person)

})

PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})