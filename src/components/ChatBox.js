import React from 'react'
import { useDrag } from 'react-dnd'
import styled, { css } from 'styled-components'

import ResizableBox from './ResizableBox'

const Container = styled.div`
  /* position: absolute;
  top: 50%;
  left: 50%; */
  background-color: green;
  pointer-events: auto;
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
    resize: both;
  overflow: auto;

  height: 200px;
  width: 500px;
`

const ChatBox = ({ currentPosition }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    collect: monitor => ({
      isDragging: !!monitor.isDragging()
    })
  }))

  const onResize = (e, data) => {
    let newLeft = left
    let newTop = top
    const deltaHeight = data.size.height - height
    const deltaWidth = data.size.width - width

    // For better user experience allows resizing from any angle to "feel" right.
    // Note: If performance is an issue ever removing this feature should improve.
    if (data.handle[0] === 'n') {
      newTop -= deltaHeight
    }
    if (data.handle[data.handle.length - 1] === 'w') {
      newLeft -= deltaWidth
    }

    // dispatch(setSizeBox(key, data.size.width, data.size.height, newLeft, newTop))
  }

  return (
    <ResizableBox width={500} height={200} onResize={(e, data) => onResize(e, data)}>
      <Container currentPosition={currentPosition} ref={drag}>
        {/* {livechat.chatMessages.map(({ chatMessage, authorPhotoNode, authorName }) => (
        <div>{chatMessage}</div>
      ))} */}
      </Container>
    </ResizableBox>
  )
}

export default ChatBox
