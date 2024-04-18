import { Meta, StoryObj } from '@storybook/react'

import MenuDropdownFilter from '.'

const filtersOptions = [
  { label: 'Trending', value: 'Trending' },
  { label: 'Latest', value: 'Latest' },
  { label: 'Price: lowest price', value: 'Price: lowest price' },
  { label: 'Price: highest price', value: 'Price: highest price' },
]

const meta: Meta<typeof MenuDropdownFilter> = {
  title: 'Molecules/Dropdown/MenuDropdownFilter',
  component: MenuDropdownFilter,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof MenuDropdownFilter>

export const UserMenuDropdown: Story = {
  args: {
    className: 'w-[200px]',
    options: filtersOptions,
    buttonClass: '',
    placeholder: 'Options',
  },
}
