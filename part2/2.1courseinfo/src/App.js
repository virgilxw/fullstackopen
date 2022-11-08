const Course = ({ parts }) => {
  return (
    <>
      <ul>
        {parts.map(part => {
          return (
            <li>{part.name} {part.exercises}</li>
          )
        }
        )}
      </ul>
    </>
  )
}

const Total = ({course}) => {

  console.log('%cApp.js line:18 course', 'color: #007acc;', course);
  const total = course.parts.reduce((p, c) => p+c.exercises, 0)
  return(
    <><p><b>Total of {total} parts</b></p></>
  )
}

const Courses = ({ courses }) => {
  return (
    <ul>
      {courses.map(course => {
        return (
          <li id={course.id}>
            <h1>{course.name}</h1>
            <Course parts={course.parts} />
            <Total course={course}/>
          </li>
        )
      })}
    </ul>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return <Courses courses={courses} />
}

export default App