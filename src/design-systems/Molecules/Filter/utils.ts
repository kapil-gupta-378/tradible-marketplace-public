import { Option } from './interface'

export const initialOptions: Option[] = [
  {
    title: 'Price',
    submenu: [
      { key: 'min', label: 'Min', value: '' }, // Set initial value for Min
      { key: 'max', label: 'Max', value: '' }, // Set initial value for Max
    ],
  },
  {
    title: 'Year',
    submenu: [
      { key: 'start', label: 'Start', value: '' }, // Set initial value for Start
      { key: 'end', label: 'End', value: '' }, // Set initial value for End
    ],
  },
]
