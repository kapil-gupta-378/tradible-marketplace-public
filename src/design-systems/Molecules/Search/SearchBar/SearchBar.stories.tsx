import { Meta, StoryObj } from '@storybook/react'

import SearchBar from '.'

const meta: Meta<typeof SearchBar> = {
  title: 'Molecules/Search/SearchBar',
  component: SearchBar,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
    showSearchResults: {
      boolean: {
        default: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof SearchBar>

export const SolidSearchBar: Story = {
  args: {
    showSearchResults: true,
  },
}
