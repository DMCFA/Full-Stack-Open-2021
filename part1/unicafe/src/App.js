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
const Statistic = ({text, value, symbol}) => <tr><td>{text} {value} {symbol}</td></tr>

//Statistics
const Statistics = ({good, neutral, bad}) => {
  let all = good+neutral+bad

  if (all === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
          <Statistic text="good" value={good} />
          <Statistic text="neutral" value={neutral} />
          <Statistic text="bad" value={bad} />
          <Statistic text="all" value={all} />
          <Statistic text="average" value={good + (- bad)/all} />
          <Statistic text="positive feedback" value={(good/all)*100} symbol="%"/>
      </tbody>
    </table>
  )};


//APP
const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const symbol = "%"

  return (
    <div>
      <h1>give feedback</h1>
      <Buttons good={good} setGood={setGood} neutral={neutral} setNeutral={setNeutral} bad={bad} setBad={setBad}/>
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad} symbol={symbol}/>
    </div>
  )
}

export default App
