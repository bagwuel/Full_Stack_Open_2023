import React from 'react'

const Header = ({header}) => {
  return (
    <h3>{header}</h3>
  )
}

const Part = ({part}) => {
  return (
    <p>{part.name} {part.exercises}</p>
)}

const Content = ({contents}) => {
  return (
    <div>
      {contents.map(content => <Part key={content.id} part={content}/>)}
    </div>
  )
}

const Total = ({parts}) => {
  const total = parts.reduce((sum, part) => sum += part.exercises, 0)
  return (
    <b>
      total of {total} exercise
      {total < 2 ? "" : "s"}
    </b>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header header={course.name}/>
      <Content contents={course.parts}/>
      <Total parts={course.parts} />
    </div>
  )
}

export default Course