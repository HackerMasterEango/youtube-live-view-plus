/* global chrome*/
import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import ContentScript from './components/ContentScript'

import store from './store'
import listenToLiveChat from './liveChatListener'
import ChatBox from './components/ChatBox'

listenToLiveChat()

render(
  <Provider store={store}>
    <React.StrictMode>
      <ContentScript />
    </React.StrictMode>
  </Provider>,
  document.querySelector('#content-script')
)

// Testing app on index.html
// render(
//   <Provider store={store}>
//     <React.StrictMode>
//       <ChatBox />
//     </React.StrictMode>
//   </Provider>,
//   document.querySelector('#index_app')
// )
