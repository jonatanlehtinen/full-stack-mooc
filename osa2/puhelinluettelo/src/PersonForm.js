import React from 'react'


const PersonForm = ({ setName, setNumber, submit }) => {
  return (
    <form>
      <div>
        name: <input onChange={name => setName(name.target.value)}/>
      </div>
      <div>
        number: <input onChange={number => setNumber(number.target.value)}/>
        </div>
      <div>
        <button type="submit" onClick={submit}>add</button>
      </div>
  </form>
  )
}

export default PersonForm