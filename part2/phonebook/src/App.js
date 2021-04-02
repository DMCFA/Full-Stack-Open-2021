import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const addName = (e) => {
    e.preventDefault();
    const personObject = {
      name: newName,
      id: newName
    }
    setPersons(persons.concat(personObject))
    setNewName('')
  }

  const changeName = (e) => {
    setNewName(e.target.value);
  }

  const Person = ({persons}) => {
    return (
      persons.map( person =>
        <li style={{listStyle: 'none'}}
        key={person.name}> {person.name}</li>
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