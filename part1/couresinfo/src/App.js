const Header = ({course}) => <h1>{course}</h1>

const Part = ({part, exercises}) => <p>{part} {exercises}</p>

const Content = (props) => {
  const parts = props.parts.map(
      part => <Part key={part.name} part={part.name} exercises={part.exercises}/>
      )
  return (<div>{parts}</div>)
}
const Total = ({parts}) => <p>Number of exercises {
  parts[0].exercises +
  parts[1].exercises +
  parts[2].exercises
  }</p>


const App = () => {
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
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App