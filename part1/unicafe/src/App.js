import { useState } from 'react'

const Statistics = ({good, neutral, bad}) => {

  const all = good + neutral + bad
  const average = all / 3
  const positive = all && good / all * 100

  return (
    <div>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive} %</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  let feedback = true

  if (good === 0 && neutral === 0 && bad === 0)
    feedback = false

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <br />
      <h1>statistics</h1>
      {feedback ? <Statistics good={good} neutral={neutral} bad ={bad } /> : <p>No feedback given</p>}
    </div>
  )
}

export default App