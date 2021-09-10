import React, { useContext, useEffect } from 'react'
import { useDrop } from 'react-dnd'
import styled from 'styled-components'
import disablePointerEventsContext from '../contexts/disablePointerEventsContext'

const Wrapper = styled.div`
  pointer-events: ${props => (props.disablePointerEvents ? 'none' : 'auto')};
`

const DropWrapper = ({ dropLayerId, dropLayers, onDrop, children }) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: 'ITEM',

    drop: (item, monitor) => {
      // any state needed to change on dorp here i suppose.

      onDrop(dropLayerId, monitor, dropLayers)
    },
    collect: monitor => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop()
    })
  })

  const { disablePointerEvents } = useContext(disablePointerEventsContext)

  return (
    <Wrapper disablePointerEvents={disablePointerEvents} ref={drop} className={'drop-wrapper'}>
      {React.cloneElement(children, { isOver, canDrop })}
    </Wrapper>
  )
}

export default DropWrapper
