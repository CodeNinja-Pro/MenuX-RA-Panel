import { Typography } from '@mui/material'
import React from 'react'
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer
} from 'recharts'

import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'

export default function StatisticChart (props) {
  const data = [
    {
      name: '0',
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: '2',
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: '4',
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: '6',
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: '8',
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: '10',
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: '12',
      uv: 3490,
      pv: 4300,
      amt: 2100
    },
    {
      name: '14',
      uv: 3490,
      pv: 4300,
      amt: 2100
    },
    {
      name: '16',
      uv: 3490,
      pv: 4300,
      amt: 2100
    },
    {
      name: '18',
      uv: 3490,
      pv: 4300,
      amt: 2100
    },
    {
      name: '20',
      uv: 3490,
      pv: 4300,
      amt: 2100
    },
    {
      name: '22',
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
  ]

  return (
    <>
      <div style={{ width: '100%', height: 430 }}>
        <ResponsiveContainer>
          <AreaChart
            data={data}
            margin={{ top: 40, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
                <stop offset='5%' stopColor={'#0074D9'} stopOpacity={0.8} />
                <stop offset='95%' stopColor={'#ffffff'} stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey='name' />
            <YAxis />
            <CartesianGrid strokeDasharray='3 3' />
            <Tooltip />
            <Area
              type='monotone'
              dataKey='uv'
              stroke={'#0074D9'}
              fillOpacity={1}
              fill='url(#colorUv)'
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </>
  )
}
