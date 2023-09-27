import React, { useEffect, useRef } from 'react'
import { Container, Row } from 'reactstrap'
import ColorSelector from './ColorSelector'

const PopUp = ({ handleClose, color, setColor }) => {
  const popupref = useRef(null)

  const handleClickOutside = event => {
    if (popupref.current && !popupref.current.contains(event.target)) {
      handleClose()
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [color])

  return (
    <Container>
      <Row className='popup-box'>
        <ColorSelector popupref={popupref} color={color} setColor={setColor} />
      </Row>
    </Container>
  )
}

export default PopUp
