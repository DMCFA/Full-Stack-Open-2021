import React from 'react'

const Header = () => <h1>Web development curriculum</h1>

const Title = ({name}) => {
  return (
    <h2>{name}</h2>
  )
}

const Part = ({parts}) => {
  return (
      parts.map(i => <li key={i.id}>
      {i.name} {i.exercises}
      </li>    
  )
  )};

const Content = ({props}) => {
  return (
    <ul style={{listStyle: 'none', paddingInlineStart: 0}}>
      <Part parts={props} />
    </ul>
  )
}

const Total = ({parts}) => {
  const sum = parts.reduce((total, exercise) => total + exercise.exercises, 0)
  return(
    <p><strong>Number of exercises {sum}</strong></p>
  ) 
}

const Course = ({courses}) => {
    return (
      <div>
        <Header />
        <Title name={courses[0].name} />
        <Content props={courses[0].parts} />
        <Total parts={courses[0].parts} />
        <Title name={courses[1].name} />
        <Content props={courses[1].parts} />
        <Total parts={courses[1].parts} />
  
      </div>
    )
  }


export default Course