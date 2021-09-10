import React, { useContext, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useDrag } from 'react-dnd'
import styled, { css } from 'styled-components'
import { rgba } from 'polished'

import ResizableBox from '../ui/ResizableBox'
import ChatMessage from './ChatMessage'
import disablePointerEventsContext from '../contexts/disablePointerEventsContext'
import ThemeFullScreenMode from '../ThemeFullScreenMode'

const PositionalDiv = styled.div`
  position: fixed;

  ${props =>
    props.currentPosition === 0 &&
    css`
      top: 0;
      left: 0;
    `}

  ${props =>
    props.currentPosition === 1 &&
    css`
      top: 0;
      right: 0;
    `}

  ${props =>
    props.currentPosition === 2 &&
    css`
      bottom: 0;
      left: 0;
    `}

  ${props =>
    props.currentPosition === 3 &&
    css`
      bottom: 0;
      right: 0;
    `}
`

const Container = styled.div`
  background-color: ${rgba('#1c7ed6', 0.4)};
  pointer-events: auto;
  overflow: auto;
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const ChatBox = ({ currentPosition }) => {
  const livechat = useSelector(state => state.livechat)
  const { width, height } = useSelector(state => state.resizableBox)

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const { disablePointerEvents, setDisablePointerEvents } = useContext(disablePointerEventsContext)

  useEffect(() => {
    // If we are dragging dont disable any pointer events on other components.
    if (isDragging) {
      setDisablePointerEvents(false)
      debugger
      return
    }

    // Otherwise, disable pointer-events
    setDisablePointerEvents(true)
  }, [isDragging])

  return (
    <ThemeFullScreenMode>
      <PositionalDiv currentPosition={currentPosition}>
        <ResizableBox width={width} height={height}>
          <Container disablePointerEvents={disablePointerEvents} className="wtf" ref={drag}>
            {livechat.chatMessages.map(({ chatMessage, authorPhotoNode, authorName }) => (
              <ChatMessage chatMessage={chatMessage} authorPhotoNode={authorPhotoNode} authorName={authorName} />
            ))}
          </Container>
        </ResizableBox>
      </PositionalDiv>
    </ThemeFullScreenMode>
  )
}

export default ChatBox
