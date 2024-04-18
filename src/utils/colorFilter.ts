/* eslint-disable @typescript-eslint/no-unused-vars */

export function colorFilter(_color: string) {
  let color: string
  switch (_color?.toLowerCase()) {
    case 'black':
      color = 'bg-black'
      break
    case 'blue':
      color = 'bg-blue-600'
      break
    case 'green':
      color = 'bg-green-600'
      break
    case 'purple':
      color = 'bg-purple-600'
      break
    case 'gold':
      color = 'bg-[#FFD700]'
      break
    default:
      color = 'bg-white'
      break
  }
  return color
}

export interface LinegraphTypes {
  labels: string[]
  datasets: datasetsTypes[]
}

export interface datasetsTypes {
  label: string
  data: number[]
  fill: boolean
  borderColor: string
}

export interface GraphOption {
  maintainAspectRatio: boolean
}
