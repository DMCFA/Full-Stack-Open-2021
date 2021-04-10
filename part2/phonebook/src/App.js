import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/filter'
import Person from './components/person'
import Persons from './components/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchKey, setSearchKey ] = useState('')

  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response =>
        setPersons(response.data)
      )
  }, [])

  const addName = (e) => {
    e.preventDefault();
    if (persons.some(e => e.name === newName)) {
      alert(`${newName} is already added to phonebook`)
  } else {
      const personObject = {
      name: newName,
      number: newNumber,
      id: newName
    }
    axios
    .post('http://localhost:3001/persons', personObject)
    .then(res => {
    setPersons(persons.concat(res.data))
    setNewName('')
    setNewNumber('')
    })
  }}

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
      <Persons persons={persons} searchKey={searchKey} />
    </div>
  )
}

export default App