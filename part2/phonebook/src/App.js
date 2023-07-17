import { useEffect, useState } from 'react'
import axios from 'axios'
import {create, deleteContact, upDate} from './req_phonebook/services'
import './styles/index.css'

const Person = ({person, removeContact}) => {
  return (
    <>
    <p>{person.name} {person.number}</p>
    <Button button={{type: 'button', text: 'delete',  buttonClick: () => removeContact(person)}} />
    </>
  )
}

const Persons = ({filtered, removeContact}) => {
  return (
    <div>{filtered.map((person) => <Person key={person.id} person={person} removeContact={removeContact} />)}
    </div>
  )
}

const Filter = ({search, handleSearch}) => {
  return (
       <>
       filter shown with <input
        type="search"
        name='search'
        value={search}
        onChange={handleSearch}
      />
       </>
  )
}

const Input = ({anInput}) => {
  return (
      <div>
      {anInput.name}: <input 
      type={anInput.type}
      value={anInput.newFeature}
      name={anInput.name}
      onChange={anInput.change}
      />
    </div>
  )
}

const Button = ({button}) => {
  return (
    <div>
    <button onClick={button.buttonClick} type={button.type}>{button.text}</button>
   </div>
  )
}

const PersonForm = ({handleSubmit, inputs, buttons}) => {
  return (
    <div>
        <form onSubmit={handleSubmit}>
          {inputs.map((anInput, index) => <Input key={index} anInput={anInput} />)}

        <Button button={buttons} />
      </form>
    </div>
  )
}

const Notification = ({ message, err }) => {
  if (message === null) {
    return null
  }
  return (
    <div className={err ? 'error' : 'notification'}>
      {message}
    </div>
  )
  }

const App = () => {
  const [persons, setPersons] = useState([])
  const [filtered, setFiltered] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [notificationMsg, setNotificationMsg] = useState('')
  const [errormsg, setErrormsg] = useState(false)
  
  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then(response => setPersons(response.data))
  }, [])

  const handleSubmit = (event) => {
    event.preventDefault()
    if (nameFound()) {
      const person = persons.find(p => p.name === newName)
      if (window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`) && !numberFound()) {
        updateContact(person, newNumber)
      }else {
        alert(`${newNumber} is already added to phonebook`)
      }
    }else if (numberFound()) {
      alert(`${newNumber} is already added to phonebook`)
    }else if (newName && newNumber) {
      const newContact = {name: newName, number: newNumber}
      create(newContact)
      .then((response) => {
        setPersons([...persons, response])
        setMessage(`Added ${response.name}`)
      })
    }
    setNewName('')
    setNewNumber('')
  }

  const updateContact = (person, newNumber) => {
    const newPerson = {...person, number: newNumber}
    upDate(person.id, newPerson)
    .then(response => {
      setPersons(persons.map(p => p.id !== person.id ? p : response))
      setMessage(`Updated ${response.name}`)
    })
    .catch(error => console.log(error.mesage))
  }

  const setMessage = (msg) => {
    setNotificationMsg(msg)

    setTimeout(() => {
      setNotificationMsg('')
      setErrormsg(false)
    }, 3000)
  }

  const removeContact = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      deleteContact(person.id)
      .then(response => setPersons(persons.filter(p => p.id !== person.id)))
      .catch(error => {
        setErrormsg(true)
        setMessage(`Information of ${person.name} has already been removed from server`)
        setPersons(persons.filter(p => p.id !== person.id))
      })
    }
  }

  const nameFound = () => {
    return persons.find(person => person.name === newName)
  }

  const numberFound = () => {
    return persons.find(person => person.number === newNumber)
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearch(event.target.value)
    filteredNames()
  }

  const filteredNames = () => {
    setFiltered(persons.filter(person => person.name.toLowerCase().startsWith(search)))
  }
  return (
    <div>
      <h2>Phonebook</h2>

      {(notificationMsg) && <Notification message={notificationMsg} err={errormsg}/>}

      <Filter search={search} handleSearch={handleSearchChange} />
  
      <h2>add a new</h2>
      <PersonForm 
        handleSubmit={handleSubmit}
        inputs = {[{name: 'name', type: 'text', newFeature: newName, change: handleNameChange}, {name: 'number', type: 'tel', newFeature: newNumber, change:handleNumberChange}]}
        buttons = {{type: 'submit', text: 'add'}}
      />
   
      <h3>Numbers</h3>
      <Persons removeContact={removeContact} filtered={search ? filtered : persons}/>
    </div>
  )
}

export default App