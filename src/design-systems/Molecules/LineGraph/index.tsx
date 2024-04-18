'use client'
import { memo } from 'react'
import { Line } from 'react-chartjs-2'

import 'chart.js/auto'
import { DataPropsTypes } from './interface'

const LineGraph: React.FC<DataPropsTypes> = ({ data, options, themeMode }) => {
  return (
    <>
      <Line data={data} options={options} />
    </>
  )
}

export default memo(LineGraph)
