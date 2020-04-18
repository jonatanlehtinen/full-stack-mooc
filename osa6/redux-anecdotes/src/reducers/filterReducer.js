
const initialState = ''

const reducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch(action.type) {
    case 'UPDATE_FILTER_TEXT':
      const filterText = action.text
      return filterText
    default:
      return state
  }
}

export const updateFilterText = text => {
  return {
    type: 'UPDATE_FILTER_TEXT',
    text
  }
}

export default reducer