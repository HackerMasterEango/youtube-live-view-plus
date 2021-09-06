import React, { useEffect } from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'

const Wrapper = styled.div`
  pointer-events: auto;
`

const DropWrapper = ({ dropLayerId, dropLayers, onDrop, children }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'ITEM',

    drop: (item, monitor) => {
      // any state needed to change on dorp here i suppose.
      debugger
      onDrop(dropLayerId, monitor, dropLayers)
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  })

  return (
    <Wrapper ref={drop} className={'drop-wrapper'}>
      {React.cloneElement(children, { isOver, canDrop })}
    </Wrapper>
  )
}

export default DropWrapper
