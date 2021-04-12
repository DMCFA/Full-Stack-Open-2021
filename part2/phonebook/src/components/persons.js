import React from 'react'

const Persons = ({searchKey, persons, remove}) => {
    const namesToShow = !searchKey ? persons : persons.filter
    (person => person.name.toLowerCase().includes(searchKey.toLocaleLowerCase()));

    return (
      namesToShow.map( person =>
        <li style={{listStyle: 'none'}}
        key={person.name}> {person.name} {person.number}
        <button onClick={() => remove(person.id, person.name)}>delete</button>
        </li>
      ))};

export default Persons