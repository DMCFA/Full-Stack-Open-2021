import React from 'react'

const Persons = ({searchKey, persons}) => {
    const namesToShow = !searchKey ? persons : persons.filter
    (person => person.name.toLowerCase().includes(searchKey.toLocaleLowerCase()));
    return (
      namesToShow.map( person =>
        <li style={{listStyle: 'none'}}
        key={person.name}> {person.name} {person.number}</li>
      ))};

export default Persons