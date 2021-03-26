import React, { useState } from 'react'

const Title = ({ title }) => {
  return (
    <h1>{title}</h1>
  )
}

const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button> 

  )
}

const SubTitle = ({ subTitle, text }) => {
  return (
    <h2>{subTitle}</h2>
  )
}

const FeedbackCounter = ({text}) => {
  return (
    <p style={{ display: 'inline-block' }}>{text}</p>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const title = 'give feedback'
  const subTitle = 'statistics'

  const handleGood = () => {
    setGood(good + 1)
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
  }

  const handleBad = () => {
    setBad(bad + 1)
  }

  return (
    <div>
      <Title title={title} />
      <Button handleClick={handleGood} text={'Good'} />
      <Button handleClick={handleNeutral} text={'Neutral'} />
      <Button handleClick={handleBad} text={'Bad'} />
      <SubTitle subTitle={subTitle} />
      <FeedbackCounter text={'Good'} /> {good} < br/>
      <FeedbackCounter text={'Neutral'} /> {neutral} < br/>
      <FeedbackCounter text={'Bad'} /> {bad}
    </div>
  )
}

export default App
