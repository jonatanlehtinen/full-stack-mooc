import Axios from "axios"

const baseURL = "/api/persons"

const getPersons = () => {
  const request = Axios.get(baseURL)
  return request.then(response =>  response.data )
}

const postNewPerson = person => {
  const request = Axios.post(baseURL, person)
  return request.then(response => response.data)
}

const deletePerson = id => {
  const request = Axios.delete(baseURL + "/" + id,)
  return request.then(response => response.data)
}

const updatePerson = person => {
  const request = Axios.put(baseURL + "/" + person.id, person)
  return request.then(response => response.data)
}

export { getPersons, postNewPerson, deletePerson, updatePerson }