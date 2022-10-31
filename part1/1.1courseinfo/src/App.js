const Header = (props) => {
  return (
    <>
      <h1>{props.name}</h1>
    </>
  )
}


const Content = (props) => {
  return (
    <>
    {props.parts.map( x => (<p> {x.name}: {x.exercises} </p>))}
    </>
  )
}

const Total = (props) => {

  const total = props.course.parts.reduce((previousValue, currentValue) => previousValue + currentValue.exercises, 0)
  return (
    <p>Number of exercises: {total}</p>
  )
}

const App = () => {
  // const-definitions
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total course={course} />
    </div>
  )
}

export default App