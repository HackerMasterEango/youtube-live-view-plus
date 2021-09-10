import React, { useState } from 'react'
import styled from 'styled-components'
import ChatBox from './ChatBox'
import DropBox from '../ui/DropBox'

import DropWrapper from '../ui/DropWrapper'
import ThemeFullScreenMode from '../ThemeFullScreenMode'
import disablePointerEventsContext from '../contexts/disablePointerEventsContext'

const Container = styled.div`
  display: grid;
  grid-template-columns: 200px 200px;
  height: 100%;
  row-gap: 20%;

  width: 100%;
  justify-content: space-between;
`

const FullScreenGrid = () => {
  // TODO: probably need actual state in this array later
  const [dropLayers, setDropLayers] = useState([
    {
      id: 0,
      hasChatBox: true
    },
    {
      id: 1,
      hasChatBox: false
    },
    {
      id: 2,
      hasChatBox: false
    },
    {
      id: 3,
      hasChatBox: false
    }
  ])

  // Keep track whether we are disabling pointer events throughout the component hiearchy
  // for fullscreen mode view. Basically user should be able to pause/play/resume video when wanted.
  const [disablePointerEvents, setDisablePointerEvents] = useState(true)

  const [currentPosition, setCurrentPosition] = useState(0)

  const onDrop = (dropLayerId, monitor, dropLayers) => {
    setDropLayers(
      [0, 1, 2, 3].map(id => ({
        id,
        hasChatBox: id === dropLayerId
      }))
    )

    setCurrentPosition(dropLayerId)
  }

  return (
    <ThemeFullScreenMode>
      <disablePointerEventsContext.Provider value={{ disablePointerEvents, setDisablePointerEvents }}>
        <Container>
          {dropLayers.map(dropLayer => {
            return (
              <DropWrapper dropLayerId={dropLayer.id} dropLayers={dropLayers} onDrop={onDrop}>
                {dropLayer.hasChatBox ? <ChatBox currentPosition={currentPosition} /> : <DropBox />}
              </DropWrapper>
            )
          })}
        </Container>
      </disablePointerEventsContext.Provider>
    </ThemeFullScreenMode>
  )
}

export default FullScreenGrid
