import React, { useEffect, useState } from 'react'
import {
  FormControl,
  Select,
  Chip,
  OutlinedInput,
  Stack,
  MenuItem,
  FormHelperText
} from '@mui/material'
import CheckIcon from '@mui/icons-material/Check'
import CancelIcon from '@mui/icons-material/Cancel'

const names = [
  'Humaira Sims',
  'Santiago Solis',
  'Dawid Floyd',
  'Mateo Barlow',
  'Samia Navarro',
  'Kaden Fields',
  'Genevieve Watkins',
  'Mariah Hickman',
  'Rocco Richardson',
  'Harris Glenn'
]

export default function MultipleSelectForm (props) {
  let data = props.items

  return (
    <div>
      <FormControl fullWidth>
        <FormHelperText
          style={{ fontSize: '15px' }}
          id='outlined-weight-helper-text'
        >
          {props.title}
        </FormHelperText>
        <Select
          multiple
          rows={1}
          value={props.selectedItems}
          onChange={e => {
            if (props.selectedItems.length < 3)
              props.handleSelected(e.target.value)
          }}
          input={<OutlinedInput />}
          renderValue={selected => (
            <Stack gap={1} direction='row' flexWrap='wrap'>
              {selected.map((value, index) => (
                <Chip
                  key={index}
                  label={value}
                  onDelete={() =>
                    props.handleSelected(
                      props.selectedItems.filter(item => item !== value)
                    )
                  }
                  deleteIcon={
                    <CancelIcon
                      onMouseDown={event => event.stopPropagation()}
                    />
                  }
                />
              ))}
            </Stack>
          )}
        >
          {data?.map((name, index) => (
            <MenuItem
              key={index}
              value={name}
              sx={{ justifyContent: 'space-between' }}
            >
              {name}
              {props.selectedItems.includes(name) ? (
                <CheckIcon color='info' />
              ) : null}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
