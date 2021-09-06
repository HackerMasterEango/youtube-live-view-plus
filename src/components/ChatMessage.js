import React from 'react'
import styled from 'styled-components'

const MessageWrapper = styled.div`
  color: #343a40;
  background-color: #4dabf7;
`

const ChatMessage = ({ chatMessage, authorPhotoNode, authorName, children }) => {
  return <MessageWrapper>{chatMessage}</MessageWrapper>
}

export default ChatMessage
