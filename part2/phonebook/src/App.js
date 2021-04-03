import React, { useState } from 'react'
import Filter from './components/filter'
import Person from './components/person'
import Persons from './components/persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Mark James', number: '020-5764839' },
    { name: 'Linda Darling', number: '044-7654321' },
    { name: 'Romeo Kramer', number: '056-0192837' },
    { name: 'Marlo Scott', number: '020-6622717' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchKey, setSearchKey ] = useState('')

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
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
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