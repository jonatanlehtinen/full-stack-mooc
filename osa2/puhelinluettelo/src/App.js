import React, { useState, useEffect } from 'react';
import { getPersons, postNewPerson, deletePerson, updatePerson } from "./api"

import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Notification from './Notification';

import ACTION_TYPES from "./actionTypes"


const App = () => {
  const [ persons, setPersons] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    getPersons().then(data => {
      setPersons(data)
    })
  }, [])

  const addToPersons = event => {
    event.preventDefault()
    const filteredPersons = persons.filter(person => person.name === newName)
    if(filteredPersons.length > 0) {
      const oldPerson = filteredPersons[0]
      const confirmed = window.confirm(`${oldPerson.name} is already added to phonebook, replace the old number with a new one?`)
      if(confirmed) {
        updateNumber(oldPerson)
      }
    } else {
      const newPerson = {name: newName, number: newNumber}
      postNewPerson(newPerson).then(() => {
        setPersons(persons.concat(newPerson))
        setNewName("")
        showNotification({
          action: ACTION_TYPES.ADD,
          personName: newPerson.name,
          successful: true
        })
      }).catch(err => {
        showNotification({
          action: ACTION_TYPES.ADD,
          message: err.response.data.error,
          successful: false
        })
      })
    }
  }

  const updateNumber = oldPerson => {
    const updatedPerson = {...oldPerson, number: newNumber}
    updatePerson(updatedPerson).then(data => {
      setPersons(persons.map(person => {
        if(data.id !== person.id) {
          return person
        } else {
          return data
        }
      }))
      showNotification({
        action: ACTION_TYPES.UPDATE,
        personName: updatedPerson.name,
        successful: true
      })
    }).catch(err => {
      showNotification({
        action: ACTION_TYPES.UPDATE,
        personName: updatedPerson.name,
        successful: false
      })
    })
  }

  const showNotification = notification => {
    setNotification(notification)
    setTimeout(() => setNotification(null), 5000)
  }

  const handleDeletingPerson = personToDelete => {
    const confirmed = window.confirm(`Delete ${personToDelete.name}?`)
    if(confirmed) {
      const filtered = persons.filter(person => person.id !== personToDelete.id)
      setPersons(filtered)
      deletePerson(personToDelete.id).then(() => {
        showNotification({
          action: ACTION_TYPES.DELETE,
          personName: personToDelete.name,
          successful: true
        })
    }).catch(err => {
      showNotification({
        action: ACTION_TYPES.DELETE,
        personName: personToDelete.name,
        successful: false
      })
    })
    }
  }

  const filterPersonsToShow = () => {
    return persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification}/>
      <Filter setFilter={setFilter}/>
      <h2>Add a new</h2>
      <PersonForm setName={setNewName} setNumber={setNewNumber} submit={addToPersons}/>
      <h2>Numbers</h2>
      <Persons persons={filterPersonsToShow()} handleDelete={handleDeletingPerson}/>
    </div>
  )

}
export default App;
