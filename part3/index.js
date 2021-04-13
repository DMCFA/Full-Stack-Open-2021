const { request, response } = require('express')
const express = require('express')
const app = express()

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

PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})