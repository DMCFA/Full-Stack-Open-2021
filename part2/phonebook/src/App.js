import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number: '040-1234567' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

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

  const Person = ({persons}) => {
    return (
      persons.map( person =>
        <li style={{listStyle: 'none'}}
        key={person.name}> {person.name} {person.number}</li>
      ))};
  

  return (
    <div>
      <h2>Phonebook</h2>
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
        <ul style={{paddingInlineStart: 0}}>
          <Person persons={persons} />
        </ul>
      </div>
    </div>
  )
}

export default App