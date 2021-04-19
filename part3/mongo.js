/* eslint-disable no-unused-vars */
const mongoose = require('mongoose')

if (process.argv.length < 3) {
	console.log('Please provide the password as an argument: node mongo.js <password>')
	process.exit(1)
}

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@fs21.4x1nq.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = new mongoose.Schema({
	name: String,
	number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
	name: process.argv[3],
	number: process.argv[4]
})

if (person.name === undefined || person.number === undefined) {
	console.log('phonebook:')
	Person.find({}).then(result => {
		result.forEach(person => {
			console.log(`${person.name} ${person.number}`)
			mongoose.connection.close()
		})
	})

} else {
	person.save().then(result => {
		console.log(`added ${person.name} number ${person.number} to phonebook`)
		mongoose.connection.close()
	})}

