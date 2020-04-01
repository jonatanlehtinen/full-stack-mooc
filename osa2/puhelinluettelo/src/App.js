import React, { useState, useEffect } from 'react';
import Axios from "axios"

import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    Axios.get('http://localhost:3001/persons').then(response => {
      setPersons(response.data)
    })
  }, [])

  const addToPersons = event => {
    event.preventDefault()
    const filteredPersons = persons.filter(person => person.name === newName)
    if(filteredPersons.length > 0) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({name: newName, number: newNumber}))
      setNewName("")
    }
  }

  const filterPersonsToShow = () => {
    return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter setFilter={setFilter}/>
      <h2>Add a new</h2>
      <PersonForm setName={setNewName} setNumber={setNewNumber} submit={addToPersons}/>
      <h2>Numbers</h2>
      <Persons persons={filterPersonsToShow()}/>
    </div>
  )

}
export default App;
