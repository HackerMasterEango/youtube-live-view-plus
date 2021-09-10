/* global chrome*/
import React, { useEffect } from 'react'

import { useSelector } from 'react-redux'
import styled from 'styled-components'

import FullScreenGrid from './FullScreenGrid'
import GlobalStyle from '../globalStyles'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import ResizableBox from '../ui/ResizableBox'

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);

  pointer-events: none;

  // TODO: remove you fuck
  display: flex;
  justify-content: center;
  align-items: center;
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
  useEffect(() => {
    chrome.storage.sync.set({ themes: 'hello' }, function () {
      //  A data saved callback omg so fancy
    })
  })

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
