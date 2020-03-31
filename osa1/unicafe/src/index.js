import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const StatisticLine = ({title, value}) => {
  return (
    <tr>
      <td>{title}</td>
      <td>{value}</td>
    </tr>
  )
}

const Statistics = ({good, neutral, bad}) => {
  const calculateAll = () => good + neutral + bad

  const calculateAverage = () => (good + (bad * -1)) / calculateAll()
  
  const calculateShareOfPositives = () => good / calculateAll()

  if(good === 0 && neutral === 0 && bad === 0) {
    return <p>No feedback given</p>
  } else {
    return (
      <table>
        <tbody>
          <StatisticLine title="good" value={good}/>
          <StatisticLine title="neutral" value={neutral}/>
          <StatisticLine title="bad" value={bad}/>
          <StatisticLine title="all" value={calculateAll()}/>
          <StatisticLine title="average" value={calculateAverage()}/>
          <StatisticLine title="positive" value={calculateShareOfPositives()}/>
          </tbody>
      </table>
    )
  }
}

const Button = ({title, onClick}) => <button onClick={onClick}>{title}</button>
  

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)



  return (
    <div>
      <h2>give feedback</h2>
      <Button title="good" onClick={() => setGood(good + 1)} />
      <Button title="neutral" onClick={() => setNeutral(neutral + 1)} />
      <Button title="bad" onClick={() => setBad(bad + 1)} />
      <h2>statistics</h2>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)