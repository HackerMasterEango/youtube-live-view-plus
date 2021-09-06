import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background-color: ${props => (props.isOver ? 'purple' : 'none')};
  height: 100%;
  width: 100%;
`

const DropBox = ({ isOver, canDrop, children }) => {
  return (
    <Wrapper canDrop={canDrop} isOver={isOver}>
      {children}
    </Wrapper>
  )
}

export default DropBox
