import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { presetTheme } from './preset'

export default function PresetCP (props) {
  const [themeStyle, setThemeStyle] = useState('')

  useEffect(() => {
    const filtered = presetTheme.filter(theme => theme.name !== themeStyle)
    props.setTheme({
      ...props.theme,
      categoryTextColor: filtered[0].categoryTextColor,
      itemBorderColor: filtered[0].itemBorderColor,
      priceTextColor: filtered[0].priceTextColor,
      itemTextColor: filtered[0].itemTextColor,
      itemBackgroundColor: filtered[0].itemBackgroundColor,
      entireBackgroundColor: filtered[0].entireBackgroundColor,
      mainFont: filtered[0].mainFont,
      secondaryFont: filtered[0].secondaryFont,
      colorMode: filtered[0].colorMode
    })
  }, [themeStyle])

  return (
    <>
      <FormControl sx={{ width: '200px' }}>
        <InputLabel id='demo-simple-select-label'>Theme</InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={themeStyle}
          label='Theme'
          onChange={e => {
            console.log(e.target.value)
            setThemeStyle(e.target.value)
          }}
        >
          {presetTheme.map((theme, index) => (
            <MenuItem value={theme.name} key={index}>
              {theme.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  )
}
