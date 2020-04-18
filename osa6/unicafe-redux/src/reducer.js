const initialState = {
  good: 0,
  ok: 0,
  bad: 0
}

const counterReducer = (state = initialState, action) => {
  console.log(action)
  switch (action.type) {
    case 'GOOD':
      const newGoods = state.good + 1
      return {...state, good: newGoods}
    case 'OK':
      const newOKs = state.ok + 1
      return {...state, ok: newOKs}
    case 'BAD':
      const newBads = state.bad + 1
      return {...state, bad: newBads}
    case 'ZERO':
      return initialState
    default: return state
  }
  
}

export default counterReducer