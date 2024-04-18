import { Meta, StoryObj } from '@storybook/react'

import Footer from '.'

const meta: Meta<typeof Footer> = {
  title: 'Organisms/FooterComponent',
  component: Footer,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Footer>

export const FooterComponent: Story = {
  args: {
    className: '!bottom-2',
  },
}
