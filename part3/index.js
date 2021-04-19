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

//GET//
app.get('/info/', (request, response) => {
    Person.estimatedDocumentCount({}).then((entries) => {
    const date = new Date ()
    response.writeHead(200, { 'Content-Type': 'text/plain' })
    response.end(`Phonebook has info for ${entries} people. ${date}`)
    })
});

app.get('/api/persons/', (request, response, next) => {
    Person.find({})
    .then(persons => {
        response.json(persons)
    })
    .catch(error => next(error))
});

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(persons => {
        response.json(persons)
    })
    .catch(error => next(error))
});

//DELETE//

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end()
    })
    .catch(error => next(error))
});

//POST//
app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const person = new Person ({
        name: body.name,
        number: body.number
    })

    person.save()
    .then(savedPerson => {
        response.json(savedPerson)
    })
    .catch(error => next(error))
});

//UPDATE//
app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body

    const person = {
        name: body.name,
        number: body.number
    }

    Person.findByIdAndUpdate(request.params.id, person, { new: true, runValidators: true })
    .then(updatedNote => response.json(updatedNote))
    .catch(error => next(error))
})

//ERROR HANDLER//
const errorHandler = (error, request, response, next) => {
    console.log(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted ID'})
    }
    else if (error.name === 'ValidationError') {
        return response.status(400).json({error: error.message})
    }
    next(error)
}

app.use(errorHandler)

//PORT//
PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});