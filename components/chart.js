import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts'

const Chart = ({ data, type }) => {
  

  const legenFormatter = (value, entry, index, color) => {
    if(type == 'hr') return ['Heart Rate']
    else if(type == 'sp') return ['SpO2']
    else if(type == 'temp') return ['Temperature']
    else return value
  }

  let stroke
  if (type == 'hr') stroke = '#f00'
  else if (type == 'sp') stroke = '#00f'
  else if (type == 'temp') stroke = '#0f0'
  

  return (
    <LineChart width={600} height={300} data={data}>
      <XAxis dataKey='y' />
      <YAxis />
      <Tooltip />
      <Legend formatter={legenFormatter} />
      <CartesianGrid strokeDasharray='3 3' />
      
      <Line type='monotone' dataKey='x' stroke={stroke} />
      
    
    </LineChart>
  )
}

export default Chart
