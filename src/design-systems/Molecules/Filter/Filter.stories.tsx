import { Meta, StoryObj } from '@storybook/react'

import Filters from '.'

import { FilterTypes } from 'interfaces'

export const Filter: FilterTypes[] = [
  {
    title: 'ProductLine',
    submenu: [
      { key: 'Pokemon', label: 'Pokemon', value: 'POKEMON' },
      { key: 'Yu-Gi-Oh!', label: 'Yu-Gi-Oh!', value: 'YU_GI_OH' },
      { key: 'Magic the Gathering!', label: 'Magic the Gathering!', value: 'MAGIC_THE_GATHERING' },
    ],
  },

  {
    title: 'status',
    submenu: [
      { key: 'sold', label: 'sold', value: 'sold' },
      { key: 'out of stock', label: 'out of stock', value: 'out of stock' },
    ],
  },

  {
    title: 'ProductType',
    submenu: [
      { key: 'Cards', label: 'Cards', value: 'CARDS' },
      { key: 'Sealed Products', label: 'Sealed Products', value: 'SEALED_PRODUCTS' },
    ],
  },
]

const meta: Meta<typeof Filters> = {
  title: 'Molecules/Filter',
  component: Filters,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Filters>

export const UserMenuDropdown: Story = {
  args: {
    className: '!w-[500px]',
    productFilter: Filter,
  },
}
