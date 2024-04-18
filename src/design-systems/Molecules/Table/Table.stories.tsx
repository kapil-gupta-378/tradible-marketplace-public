import { Meta, StoryObj } from '@storybook/react'

import { tablecolumns, image } from './utils'

import Table from '.'

import Image from 'design-systems/Atoms/Image'

const meta: Meta<typeof Table> = {
  title: 'Molecules/Table',
  component: Table,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },

    columns: {
      control: { type: 'object' },
      defaultValue: [{}],
    },
  },
}

export default meta
type Story = StoryObj<typeof Table>

export const CollectionTable: Story = {
  args: {
    className: 'mt-0',
    columns: tablecolumns,
    data: [<></>],
  },
}
