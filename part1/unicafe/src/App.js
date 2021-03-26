import React, { useState } from 'react'

//Title
const Title = ({ title }) => <h1>{title}</h1>

//Button
const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button> 

//Subtitle
const SubTitle = ({ subTitle }) => <h2>{subTitle}</h2>

//Counter
const FeedbackCounter = ({text}) => <p style={{ display: 'inline-block' }}>{text}</p>

//Average
const Average = ({text, avgTotal}) => <p>{text} {avgTotal}</p>

//Positive Feedback
const PosFeedback = ({text, posPerc, percSym}) => <p>{text} {posPerc} {percSym}</p>


//APP
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const [avg, setAvg] = useState([])
  const title = 'give feedback'
  const subTitle = 'statistics'

//Good Btn
  const handleGood = () => {
    setAvg(avg.concat(1))
    setAll(all + 1)
    setGood(good + 1)
  }

//Neutral Btn
  const handleNeutral = () => {
    setAvg(avg.concat(0))
    setAll(all + 1)
    setNeutral(neutral + 1)
  }

  //Bad Btn
  const handleBad = () => {
    setAvg(avg.concat(-1))
    setAll(all + 1)
    setBad(bad + 1)
  }

  //Sum of all
  const sum = avg.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

  //Average
  const avgTotal = sum/avg.length

  //Positive percentage
  const posPerc = ((good/all)*100)

  return (
    <div>
      <Title title={title} />
      <Button handleClick={handleGood} text={'Good'} />
      <Button handleClick={handleNeutral} text={'Neutral'} />
      <Button handleClick={handleBad} text={'Bad'} />
      <SubTitle subTitle={subTitle} />
      <FeedbackCounter text={'Good'} /> {good} < br/>
      <FeedbackCounter text={'Neutral'} /> {neutral} < br/>
      <FeedbackCounter text={'Bad'} /> {bad} < br/>
      <FeedbackCounter text={'All'} /> {all} < br/>
      <Average text={'Average'} avgTotal={avgTotal}/>
      <PosFeedback text={'Positive'} posPerc={posPerc} percSym={'%'}/>
    </div>
  )
}

export default App
