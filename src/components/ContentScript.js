import React from 'react'

import { useSelector } from 'react-redux'
import styled from 'styled-components'

import FullScreenGrid from './FullScreenGrid'
import GlobalStyle from '../globalStyles'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: yellow;
  opacity: 0.4;

  // Maybe we ant actually
  pointer-events: none;
`

const Container = styled.div`
  /* position: absolute;
  top: 50%;
  left: 50%; */
  background-color: green;
  height: 200px;
  width: 200px;
`

const ContentScript = () => {
  const livechat = useSelector(state => state.livechat)

  return (
    <Wrapper>
      <GlobalStyle />
      <DndProvider backend={HTML5Backend}>
        <FullScreenGrid />
      </DndProvider>
    </Wrapper>
  )
}

export default ContentScript
