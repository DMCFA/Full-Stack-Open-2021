import React, { useState } from 'react'

//Button
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button> 

//Feedback Numbers
const FeedbackCounter = ({text, handleClick}) => <p style={{ display: 'inline-block' }}>{text} {handleClick}</p>

// a proper place to define a component
const Statistics = ({good, neutral, bad}) => {
  let all = good+neutral+bad
  return (
    <div>
      <FeedbackCounter text="good" handleClick={good} /> < br/>
      <FeedbackCounter text="neutral" handleClick={neutral} /> < br/>
      <FeedbackCounter text="bad" handleClick={bad} /> < br/>

      <p>all {all}</p>
      <p>average {good + (- bad)/all}</p>
      <p>positive feedback {(good/all)*100}%</p>

    </div>
  )};


//APP
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

//Good Btn
  const handleGood = () => {
    setGood(good + 1)
  }

//Neutral Btn
  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  //Bad Btn
  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text={'Good'} />
      <Button handleClick={handleNeutral} text={'Neutral'} />
      <Button handleClick={handleBad} text={'Bad'} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
