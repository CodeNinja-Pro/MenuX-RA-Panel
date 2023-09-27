import React, { useState, useEffect, useRef } from 'react'
import iro from '@jaames/iro'

export default function ColorForm (props) {
  const popupref = useRef(null)

  useEffect(() => {
    const colorPicker = iro.ColorPicker(popupref.current, {
      // width: 400,
      // color: '#ffffff'
      layout: [
        {
          component: iro.ui.Wheel
        },
        {
          component: iro.ui.Slider
        },
        {
          component: iro.ui.Slider,
          options: {
            sliderType: 'saturation'
          }
        },
        {
          component: iro.ui.Slider,
          options: {
            sliderType: 'kelvin'
          }
        }
      ]
    })

    colorPicker.on('color:change', color => {
      props.setSelectedColor(color.hexString)
    })

    // return () => {
    //   colorPicker.removeAllListeners()
    // }
  }, [])

  return (
    <>
      <div ref={popupref}></div>
    </>
  )
}
