import React from 'react'
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button
} from '@mui/material'
import ProductImage from '../../assets/common/statistic/product.png'
import { Link } from 'react-router-dom'

export default function ItemRankingForm (props) {
  const items = props.items.slice().reverse()
  const parentMenus = props.parentMenus.slice().reverse()
  const times = props.times.slice().reverse()
  const unit = props.unit

  return (
    <>
      <Card sx={{ boxShadow: 'none', height: '400px', overflow: 'auto' }}>
        <CardContent>
          <Typography
            marginBottom={'20px'}
            fontWeight={'bold'}
            fontSize={'20px'}
            textAlign={'left'}
          >
            {props.title}
          </Typography>
          {items?.map((item, index) => (
            <Box
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
              margin={2}
              color={'#5e5873'}
              sx={{ cursor: 'pointer' }}
              onClick={() => {}}
            >
              <Box display={'flex'}>
                <CardMedia
                  component={'img'}
                  image={ProductImage}
                  sx={{ width: '60px', borderRadius: '10px' }}
                  alt='Product Image'
                />
                <Box
                  marginLeft={'20px'}
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'center'}
                >
                  <Typography textAlign={'left'}>{item}</Typography>
                  <Typography textAlign={'left'}>
                    {parentMenus[index]}
                  </Typography>
                </Box>
              </Box>
              <Box>
                <Typography>{times[index] + ' ' + unit}</Typography>
              </Box>
            </Box>
          ))}
        </CardContent>
      </Card>
    </>
  )
}
