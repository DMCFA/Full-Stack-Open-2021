import React, { useState } from 'react'

//Button
const Button = ({ value, text }) => <button onClick={value}>{text}</button> 

//Buttons
const Buttons = ({good, setGood, neutral, setNeutral, bad, setBad}) => {
  return (
    <div>
      <Button text="good" value={() => setGood(good + 1)}/>
      <Button text="neutral" value={() => setNeutral(neutral + 1)}/>
      <Button text="bad" value={() => setBad(bad + 1)}/>
    </div>
  )
}

//Statistic
const Statistic = ({text, value}) => <p style={{ display: 'inline-block' }}>{text} {value}</p>

//Statistics
const Statistics = ({good, neutral, bad}) => {
  let all = good+neutral+bad

  if (all === 0) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <Statistic text="good" value={good} /> < br/>
      <Statistic text="neutral" value={neutral} /> < br/>
      <Statistic text="bad" value={bad} /> < br/>

      <p>all {all}</p>
      <p>average {good + (- bad)/all}</p>
      <p>positive feedback {(good/all)*100}%</p>

    </div>
  )};


//APP
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Buttons good={good} setGood={setGood} neutral={neutral} setNeutral={setNeutral} bad={bad} setBad={setBad}/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
