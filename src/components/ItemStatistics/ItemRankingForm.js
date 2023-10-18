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
  const items = props.items
  const parentMenus = props.parentMenus
  const times = props.times
  return (
    <>
      <Card sx={{ boxShadow: 'none' }}>
        <CardContent>
          <Typography
            marginBottom={'20px'}
            fontWeight={'bold'}
            fontSize={'20px'}
            textAlign={'left'}
          >
            {props.title}
          </Typography>
          {items.map((item, index) => (
            <Link>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                margin={2}
                color={'#5e5873'}
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
                  <Typography>{times[index] + 'sec'}</Typography>
                </Box>
              </Box>
            </Link>
          ))}
        </CardContent>
      </Card>
    </>
  )
}
