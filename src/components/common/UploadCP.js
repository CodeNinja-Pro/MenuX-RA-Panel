import { CardActions, Card, CardMedia } from '@mui/material'
import React, { useState } from 'react'
import { Label } from 'reactstrap'

export default function UploadCP (props) {
  const [url, setUrl] = useState('')

  return (
    <>
      <p>{props.title}</p>
      <Card style={{ height: '250px' }}>
        <CardMedia component='img' height={'200px'} image={url} />
        <CardActions>
          <Box>
            <input
              type='file'
              multiple
              name='item'
              id='file-images'
              placeholder='Images'
              className='file-input__input'
              accept='.jpg,.jpeg,.png'
              onChange={e => {
                props.imageHandleChange(e)
              }}
            />
            <Label
              for='file-images'
              // className='d-flex flex-column file-input__label d-none'
              className='cursor-pointer'
              style={{ width: '50%' }}
            >
              <span className='d-flex flex-column text-center'>Upload</span>
            </Label>
          </Box>
          <Box>
            <Button>Remove</Button>
          </Box>
        </CardActions>
      </Card>
    </>
  )
}
