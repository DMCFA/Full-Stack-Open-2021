import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Part = (props) => {
  return (
      props.part.map(i => <li key={i.id}>
      {i.name} {i.exercises}
      </li>    
  )
  )};

const Content = ({ course }) => {
  return (
    <ul style={{listStyle: 'none'}}>
      <Part part={course.parts} />
    </ul>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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
      }
    ]
  }

  return <Course course={course} />
}


ReactDOM.render(<App />, document.getElementById('root'))