import React, { useEffect, useState } from 'react'
import { ChromePicker } from 'react-color'

const ColorSelector = ({ popupref, color, setColor }) => {
  return (
    <div ref={popupref}>
      <ChromePicker
        disableAlpha
        color={color}
        onChangeComplete={color => setColor(color.hex)}
      />
    </div>
  )
}

export default ColorSelector
