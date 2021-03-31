import React from 'react';
import ReactDOM from 'react-dom';

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

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Course courses={courses} />
}

ReactDOM.render(<App />, document.getElementById('root'))