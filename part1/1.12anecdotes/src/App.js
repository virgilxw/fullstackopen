import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const MostVotes = ({text, votes}) => {

  if (text == undefined) {
    return (
      <>
      <h1>Anecdote with most votes</h1>
      <p>No votes yet</p>
      </>
    )
  }

  return (
    <>
    <h1>Anecdote with most votes</h1>
    <p>{text}</p>
    <p>has {votes} votes</p>
    </>)
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const [selected, setSelected] = useState(0)

  const initVotes = {}
  anecdotes.map((i, n) => initVotes[n] = 0)

  const [votes, setVotes] = useState(initVotes)
  const [max, setMax] = useState(-1)

  let newNum = selected

  const change_anecdote = (anecdotes) => {
    do {
      newNum = Math.round(Math.random() * (anecdotes.length) - 0.5)
    } while (newNum === selected);

    return (
      setSelected(newNum)
    )
  }

  const upvote = (selected) =>{
    setVotes({...votes,[selected]: votes[selected]+1})

    const keys = Object.keys(votes)
    keys.sort((a, b) => votes[b] - votes[a])
    setMax(keys[0])
  }

  return (
    <div>
      {anecdotes[selected]}
      <br />
      <p>has {votes[selected]} votes</p>
      <br />
      <Button onClick={() => upvote(selected)} text="vote"/>
      <Button onClick={() => change_anecdote(anecdotes)} text="next anecdote" />
      <br />
      <MostVotes text={anecdotes[max]} votes={votes[max]}/>
    </div>
  )
}

export default App