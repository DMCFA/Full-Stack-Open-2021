import React, { useState, useEffect } from 'react'
import Filter from './components/filter'
import Person from './components/person'
import Persons from './components/persons'
import methodService from './services/methods'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchKey, setSearchKey ] = useState('')

  useEffect(() => {
    methodService
      .getAll()
      .then(initialPersons =>
        setPersons(initialPersons)
      )
  }, [])

  const addName = (e) => {
    e.preventDefault();
      const personObject = {
      name: newName,
      number: newNumber,
      id: newName
    }

    if (persons.some(e => e.name.toLowerCase() === newName.toLowerCase())) {
      const confirm = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)

      if (confirm) {
        const personX = persons.find(i => i.name.toLowerCase() === newName.toLowerCase())
        const changedPerson = { ...personX, number: personObject.number}
    
        methodService
          .update(personX.id, changedPerson)
          .then(() => {
            setPersons(persons.map(i => i.id !== personX.id ? i : changedPerson))
          })
          .catch(error => {
            alert (
              `${personX.name} has already been deleted from the server`
            )
            setPersons(persons.filter(i=> i.id !== personX.id))
          })
        }

        else {
          setNewName('')
          setNewNumber('')
        }

    } else {
    methodService
    .create(personObject)
    .then(returnedPerson => {
    setPersons(persons.concat(returnedPerson))
    setNewName('')
    setNewNumber('')
    })
  }}

  const remove = (id, person) => {
    const confirmDelete = window.confirm(`Delete ${person}?`);
    if (confirmDelete) {
      methodService
        .removePerson(id)
        .then(() => setPersons(persons.filter((person) => person.id !== id)))
        .catch((error) => {
          alert(`${person} has already been deleted from the server`)
          setPersons(persons.filter((person) => person.id !== id))
        })

    } else {
      return
    }
  }


  const changeName = (e) => {
    setNewName(e.target.value);
  }

  const changeNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const changeSearch = (e) => {
    setSearchKey(e.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      < Filter searchKey={searchKey} changeSearch={changeSearch}/>
      <h3>Add New</h3>
      <Person addName={addName} newName={newName} changeName={changeName} newNumber={newNumber} changeNumber={changeNumber} />
      <h3>Numbers</h3>
      <Persons persons={persons} searchKey={searchKey} remove={remove}/>
    </div>
  )
}

export default App