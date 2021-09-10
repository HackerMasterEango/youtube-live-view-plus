const actionTypes = {
  ADD: 'ADD'
}

// const initialState = {
//   chatMessages: []
// }

const initialState = {
  chatMessages: []
}

const liveChatReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD:
      return {
        ...state,
        chatMessages: [...state.chatMessages, action.payload]
      }
    default:
      return state
  }
}

export const addLiveChat = liveChatObj => {
  return { type: actionTypes.ADD, payload: liveChatObj }
}

export default liveChatReducer
