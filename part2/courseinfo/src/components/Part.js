import React from 'react'

const Part = ({course}) => {
    return (
        course.map
        (item => <li key={item.id}>{item.name} {item.exercises}</li>)
    )};

export default Part