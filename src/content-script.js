import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import ContentScript from './components/ContentScript'

import store from './store'
import listenToLiveChat from './liveChatListener'

listenToLiveChat()

render(
  <Provider store={store}>
    <React.StrictMode>
      <ContentScript />
    </React.StrictMode>
  </Provider>,
  document.querySelector('#content-script')
)
