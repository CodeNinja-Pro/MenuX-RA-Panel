import React, { useEffect } from 'react'
import { Autocomplete, TextField } from '@mui/material'

const fonts = [
  'Poppins',
  'Arial',
  'Calibri',
  'Cambria',
  'Candara',
  'Comic Sans MS',
  'Consolas',
  'Courier New',
  'Georgia',
  'Impact',
  'Times New Roman',
  'Trebuchet MS',
  'Verdana',
  'Segoe UI',
  'Segoe Print',
  'Segoe Script',
  'Segoe UI Symbol',
  'Tahoma',
  'Franklin Gothic Medium',
  'Garamond',
  'Lucida Console',
  'Lucida Sans Unicode',
  'Microsoft Sans Serif',
  'Palatino Linotype',
  'Symbol'
]

export default function FontCP (props) {
  const [value, setValue] = React.useState(props.fontFamily)
  const [inputValue, setInputValue] = React.useState('')

  useEffect(() => {
    console.log('InputChange', inputValue)
  }, [inputValue])

  useEffect(() => {
    console.log('value', value)
    props.setFontFamily(value)
  }, [value])

  return (
    <>
      <Autocomplete
        value={props.fontFamily}
        onChange={(event, newValue) => {
          setValue(newValue)
        }}
        inputValue={inputValue}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue)
        }}
        id='controllable-states-demo'
        options={fonts}
        // sx={{ width: 300 }}
        renderInput={params => <TextField {...params} label='' />}
      />
    </>
  )
}
