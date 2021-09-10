import { createStore, combineReducers } from 'redux'
import fullScreenChatThemeReducer from './reducers/fullScreenChatTheme'
import liveChatReducer from './reducers/livechat'
import resizableBoxReducer from './reducers/resizableBox'

const reducer = combineReducers({
  livechat: liveChatReducer,
  resizableBox: resizableBoxReducer,
  fullScreenChatTheme: fullScreenChatThemeReducer
})

const store = createStore(reducer)

export default store
