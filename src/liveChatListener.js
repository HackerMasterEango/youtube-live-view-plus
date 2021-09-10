import store from './store'
import { addLiveChat } from './reducers/livechat'

const parseLivechatAndCommitToStore = livechatNode => {
  // Author avatar image node
  const authorPhotoNode = livechatNode.querySelector('#author-photo img')

  // Author name text
  const authorName = livechatNode.querySelector('#author-name').innerText

  // TODO: figure out badges later

  // Get live chat message
  const chatMessage = livechatNode.querySelector('#message').innerHTML

  const liveChatObj = {
    authorPhotoNode,
    authorName,
    chatMessage
  }

  store.dispatch(addLiveChat(liveChatObj))
}

const listenToLiveChat = () => {
  const observeLiveChatMessages = liveChatIframe => {
    const liveChatContainer = liveChatIframe.contentDocument

    const livechatMessagesObserver = new MutationObserver((mutations, _) => {
      // Loop through all mutations that occured, filter mutations by recently added nodes, and look for livestream chats and super chats.
      for (let i = 0; i < mutations.length; ++i) {
        for (let j = 0; j < mutations[i].addedNodes.length; ++j) {
          const addednode = mutations[i].addedNodes[j]

          if (!addednode || !addednode.classList) return

          const liveChatNodeAdded = addednode.classList.contains('yt-live-chat-item-list-renderer')

          const superChatAdded = addednode.classList.contains('yt-live-chat-ticker-paid-message-item-renderer')

          // If newly added node is a live chat fire live chat event to browser runtime.
          if (liveChatNodeAdded) {
            parseLivechatAndCommitToStore(addednode)
          }

          // If newly added node is a super chat fire super chat event to browser runtime.
          if (superChatAdded) {
            // console.log(addednode)
          }
        }
      }
    })

    // Have the observer observe foo for changes in chiluren
    livechatMessagesObserver.observe(liveChatContainer, {
      childList: true,
      subtree: true
    })
  }

  // Set up the mutation observer to await for the youtube livechat to appear on the screen.
  const chatAppInitializedObserver = new MutationObserver((_, mutationObserverInstance) => {
    const iframe = Array.from(document.getElementsByTagName('iframe')).find(i =>
      i.classList.contains('ytd-live-chat-frame')
    )
    if (!iframe || !iframe.contentDocument) return

    // If not live chat tags are found, ie no-one has commented in the live chat, then there is nothing to observe and parse so keep waiting.
    const isLiveChatStarted = iframe.contentDocument.getElementsByTagName('yt-live-chat-text-message-renderer').length
    if (!isLiveChatStarted) return

    // Live chat is started, start observing the live chat iframe for changes.
    observeLiveChatMessages(iframe)

    // We found the live-chat can stop observing for its initialization now.
    mutationObserverInstance.disconnect()
  })

  // Observe for live chat window to be initialized
  chatAppInitializedObserver.observe(document, {
    childList: true,
    subtree: true
  })
}

export default listenToLiveChat
