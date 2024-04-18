import { Meta, StoryObj } from '@storybook/react'

import SearchBarMobile from '.'

const meta: Meta<typeof SearchBarMobile> = {
  title: 'Molecules/Search/SearchBarMobile',
  component: SearchBarMobile,
  argTypes: {},
}

export default meta
type Story = StoryObj<typeof SearchBarMobile>

export const SolidSearchBarMobile: Story = {
  args: {},
}
