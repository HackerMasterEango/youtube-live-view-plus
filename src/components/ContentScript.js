import React from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 100;
  pointer-events: none;
`

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: green;
  height: 200px;
  width: 200px;
`

const ContentScript = () => {
  const livechat = useSelector(state => state.livechat)

  return (
    <Wrapper>
      <Container>
        {livechat.chatMessages.map(({ chatMessage, authorPhotoNode, authorName }) => (
          <div>{chatMessage}</div>
        ))}
      </Container>
    </Wrapper>
  )
}

export default ContentScript
