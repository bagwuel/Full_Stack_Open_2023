import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {

  const all = good + neutral + bad
  const average = all / 3
  const positive = `${all && good / all * 100} %`

  return (
    <table>
      <tbody>
        <StatisticLine text="good" value ={good} />
        <StatisticLine text="neutral" value ={neutral} />
        <StatisticLine text="bad" value ={bad} />
        <StatisticLine text="all" value ={all} />
        <StatisticLine text="average" value ={average} />
        <StatisticLine text="positive" value ={positive} />
      </tbody>
    </table>
  )
}

const StatisticLine = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let feedback = true

  if (good === 0 && neutral === 0 && bad === 0)
    feedback = false

  const handlePositive = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleNegative = () => setBad(bad + 1)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handlePositive} text="good" />
      <Button handleClick={handleNeutral} text="neutral" />
      <Button handleClick={handleNegative} text="bad" />
      <br />
      <h1>statistics</h1>
      {feedback ? <Statistics good={good} neutral={neutral} bad ={bad} /> : <p>No feedback given</p>}
    </div>
  )
}

export default App