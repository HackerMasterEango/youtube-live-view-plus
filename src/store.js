import { createStore, combineReducers } from 'redux'
import liveChatReducer from './reducers/livechat'
import resizableBoxReducer from './reducers/resizableBox'

const reducer = combineReducers({
  livechat: liveChatReducer,
  resizableBox: resizableBoxReducer
})

const store = createStore(reducer)

export default store
