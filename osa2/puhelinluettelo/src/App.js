import React, { useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';


const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')


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
