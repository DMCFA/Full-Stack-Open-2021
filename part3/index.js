require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const app = express()

const Person = require('./models/person')

app.use(express.json())
app.use(cors())
app.use(express.static('build'))

morgan.token('body', (request, response) => JSON.stringify(request.body));

app.use(morgan(':method :url :status :req[content-length] - :response-time ms  :body'));


app.get('/api/persons/', (request, response) => {
    Person.find({})
    .then(persons => {
        response.json(persons)
    })
});


app.get('/info/', (request, response) => {
    const entries = persons.length
    const date = new Date ()
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end(`Phonebook has info for ${entries} people. ${date}`)

})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id)
    .then(persons => {
        response.json(persons)
    })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
});

app.post('/api/persons', (request, response) => {
    const body = request.body
//     const personName = persons.map(person => person.name)

//     if(!body.name) {
//         return response.status(400).json({
//             error: 'name is missing'
//         })
//     } else if (!body.number) {
//         return response.status(400).json({
//             error: 'number is missing'
//         })
//     } else if (personName.includes(body.name)) {
//         return response.status(400).json({
//             error: 'name must be unique'
//     })
// }

    const person = new Person ({
        name: body.name,
        number: body.number
    })

    person.save()
    .then(savedPerson => {
        response.json(savedPerson)
    })
});

//ERROR HANDLER//
const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted ID'})
    }
    next(error)
}

app.use(errorHandler)

//PORT//
PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})