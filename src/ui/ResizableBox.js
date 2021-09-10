import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { resizeBoxEnded } from '../reducers/resizableBox'

const ResizableBoxWrapper = styled.div`
  // Allow pointeir events on this container
  pointer-events: auto;
  width: ${props => props.width}px;
  height: ${props => props.height}px;
`

const Resizers = styled.div`
  & > .resizer {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    position: absolute;
  }
`

const TopLeftResizer = styled.div`
  left: -5px;
  top: -5px;
  cursor: nwse-resize; /*resizer cursor*/
`

const TopMiddleResizer = styled.div`
  left: 50%;
  top: -5px;
  transform: translateX(-50%);
  cursor: nwse-resize; /*resizer cursor*/
`

const TopRightResizer = styled.div`
  right: -5px;
  top: -5px;
  cursor: nesw-resize;
`

const BottomLeftResizer = styled.div`
  left: -5px;
  bottom: -5px;
  cursor: nesw-resize;
`

const BottomRightResizer = styled.div`
  right: -5px;
  bottom: -5px;
  cursor: nwse-resize;
`

const ResizableBox = ({ width, height, children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    /*Make resizable div by Hung Nguyen*/
    function makeResizableDiv(div) {
      const element = document.querySelector(div)

      const resizers = document.querySelectorAll(div + ' .resizer')
      const minimum_size = 20
      let original_width = 0
      let original_height = 0
      let original_x = 0
      let original_y = 0
      let original_mouse_x = 0
      let original_mouse_y = 0
      for (let i = 0; i < resizers.length; i++) {
        const currentResizer = resizers[i]
        currentResizer.addEventListener('mousedown', function (e) {
          e.preventDefault()
          original_width = parseFloat(getComputedStyle(element, null).getPropertyValue('width').replace('px', ''))
          original_height = parseFloat(getComputedStyle(element, null).getPropertyValue('height').replace('px', ''))
          original_x = element.getBoundingClientRect().left
          original_y = element.getBoundingClientRect().top
          original_mouse_x = e.pageX
          original_mouse_y = e.pageY
          window.addEventListener('mousemove', resize)
          window.addEventListener('mouseup', stopResize)
        })

        function resize(e) {
          if (currentResizer.classList.contains('bottom-right')) {
            const width = original_width + (e.pageX - original_mouse_x)
            const height = original_height + (e.pageY - original_mouse_y)
            if (width > minimum_size) {
              element.style.width = width + 'px'
            }
            if (height > minimum_size) {
              element.style.height = height + 'px'
            }
          } else if (currentResizer.classList.contains('bottom-left')) {
            const height = original_height + (e.pageY - original_mouse_y)
            const width = original_width - (e.pageX - original_mouse_x)
            if (height > minimum_size) {
              element.style.height = height + 'px'
            }
            if (width > minimum_size) {
              element.style.width = width + 'px'
              element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
            }
          } else if (currentResizer.classList.contains('top-right')) {
            const width = original_width + (e.pageX - original_mouse_x)
            const height = original_height - (e.pageY - original_mouse_y)
            if (width > minimum_size) {
              element.style.width = width + 'px'
            }
            if (height > minimum_size) {
              element.style.height = height + 'px'
              element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
            }
          } else if (currentResizer.classList.contains('top-middle')) {
            const height = original_height - (e.pageY - original_mouse_y)

            if (height > minimum_size) {
              element.style.height = height + 'px'
              element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
            }
          } else {
            const width = original_width - (e.pageX - original_mouse_x)
            const height = original_height - (e.pageY - original_mouse_y)
            if (width > minimum_size) {
              element.style.width = width + 'px'
              element.style.left = original_x + (e.pageX - original_mouse_x) + 'px'
            }
            if (height > minimum_size) {
              element.style.height = height + 'px'
              element.style.top = original_y + (e.pageY - original_mouse_y) + 'px'
            }
          }

          //   childElement.style.width = element.style.width
          //   childElement.style.height = element.style.height
          //   childElement.style.top = element.style.top
          //   childElement.style.left = element.style.left
        }

        function stopResize() {
          window.removeEventListener('mousemove', resize)
          dispatch(
            resizeBoxEnded({
              width: parseFloat(element.style.width.replace('px', '')),
              height: parseFloat(element.style.height.replace('px', ''))
            })
          )
        }
      }
    }

    makeResizableDiv('.resizable')
  }, [])

  return (
    <ResizableBoxWrapper width={width} height={height} className="resizable">
      {children}
      <Resizers className="resizers">
        <TopLeftResizer className="resizer top-left" />
        <TopRightResizer className="resizer top-right" />

        <TopMiddleResizer className="resizer top-middle" />
        <BottomLeftResizer className="resizer bottom-left" />
        <BottomRightResizer className="resizer bottom-right" />
      </Resizers>
    </ResizableBoxWrapper>
  )
}

export default ResizableBox
