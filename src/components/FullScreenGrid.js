import React, { useState } from 'react'
import styled from 'styled-components'
import ChatBox from './ChatBox'
import DropBox from './DropBox'

import DropWrapper from './DropWrapper'

const Container = styled.div`
  display: grid;
  grid-template-columns: 200px 200px;
  height: 100%;
  row-gap: 20%;
  background-color: blue;
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

  const [currentPosition, setCurrentPosition] = useState(0)

  const onDrop = (dropLayerId, monitor, dropLayers) => {
    console.log(monitor.targetId)
    debugger
    setDropLayers(
      [0, 1, 2, 3].map(id => ({
        id,
        hasChatBox: id === dropLayerId
      }))
    )

    setCurrentPosition(dropLayerId)
  }

  return (
    <Container>
      {dropLayers.map(dropLayer => {
        return (
          <DropWrapper dropLayerId={dropLayer.id} dropLayers={dropLayers} onDrop={onDrop}>
            {dropLayer.hasChatBox ? <ChatBox currentPosition={currentPosition} /> : <DropBox />}
          </DropWrapper>
        )
      })}
    </Container>
  )
}

export default FullScreenGrid
