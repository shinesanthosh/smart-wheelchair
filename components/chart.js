import React from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'

const Chart = ({ data, type }) => {
  const legenFormatter = (value, entry, index, color) => {
    if (type == 'hr') return ['Heart Rate']
    else if (type == 'sp') return ['SpO2']
    else if (type == 'temp') return ['Temperature']
    else return value
  }

  let stroke
  if (type == 'hr') stroke = '#f00'
  else if (type == 'sp') stroke = '#00f'
  else if (type == 'temp') stroke = '#0f0'

  return (
    <ResponsiveContainer width='90%' height={300}>
      <LineChart data={data}>
        <XAxis dataKey='y' />
        <YAxis />
        <Tooltip />
        <Legend formatter={legenFormatter} />
        <CartesianGrid strokeDasharray='3 3' />

        <Line type='monotone' dataKey='x' stroke={stroke} />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default Chart
