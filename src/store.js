import { createStore, combineReducers } from 'redux'
import liveChatReducer from './reducers/livechat'

const reducer = combineReducers({
  livechat: liveChatReducer
})

const store = createStore(reducer)

export default store
