import Axios from "axios"

const getPersons = () => {
  const request = Axios.get('http://localhost:3001/persons')
  return request.then(response =>  response.data )
}

const postNewPerson = person => {
  Axios.post('http://localhost:3001/persons', person)
}

const deletePerson = id => {
  Axios.delete(`http://localhost:3001/persons/${id}`,)
}

const updatePerson = person => {
  const request = Axios.put(`http://localhost:3001/persons/${person.id}`, person)
  return request.then(response => response.data)
}

export { getPersons, postNewPerson, deletePerson, updatePerson }