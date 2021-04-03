import React, { useState } from 'react'
import Filter from './components/filter'

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

  const Person = () => {
    return (
      namesToShow.map( person =>
        <li style={{listStyle: 'none'}}
        key={person.name}> {person.name} {person.number}</li>
      ))};
  
  const namesToShow = !searchKey ? persons : persons.filter
  (person => person.name.toLowerCase().includes(searchKey.toLocaleLowerCase()));

  return (
    <div>
      <h1>Phonebook</h1>
      < Filter searchKey={searchKey} changeSearch={changeSearch}/>
      <h2>Add New</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
          value={newName}
          onChange={changeName} />
        </div>
        <div>
          number: <input 
          value={newNumber}
          onChange={changeNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        <ul style={{paddingInlineStart: 0, padding: '5px 0px'}}>
          <Person persons={persons} />
        </ul>
      </div>
    </div>
  )
}

export default App