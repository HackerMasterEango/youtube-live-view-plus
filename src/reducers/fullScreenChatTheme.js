const actionTypes = {
  INIT_THEMES: 'INIT_THEMES',
  ADD_THEME: 'ADD_THEME',
  GET_THEME: 'GET_THEME',
  DELETE_THEME: 'DELETE_THEME',
  EDIT_THEME_: 'EDIT_THEME'
}

const initialState = [
  {
    darkMode: {
      id: 0,
      name: 'Dark Mode',
      font: 'Ubuntu',
      colors: {
        chatBox: '#212529',
        chatItem: {
          paddingTop: 5,
          paddingBottom: 5,
          paddingLeft: 5,
          paddingRight: 5,
          backgroundColor: '#343a40',
          textColor: '#fff'
        }
      }
    }
  }
]

const fullScreenChatThemeReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_THEMES:
      return action.payload
    default:
      return state
  }
}

export const getThemes = themes => {
  return { type: actionTypes.INIT_THEMES, payload: themes }
}

export default fullScreenChatThemeReducer
