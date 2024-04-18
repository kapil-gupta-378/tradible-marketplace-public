import { Meta, StoryObj } from '@storybook/react'

import UsersCard from '.'

const meta: Meta<typeof UsersCard> = {
  title: 'Molecules/Cards/UsersCard',
  component: UsersCard,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
    img: {
      control: 'text',
      defaultValue: '5566666',
    },
  },
}

export default meta
type Story = StoryObj<typeof UsersCard>

export const UsersCards: Story = {
  args: {
    className: 'h-64 lg:w-[421px] w-full',
    img: 'https://corgistudio.fra1.digitaloceanspaces.com/l_6bae9744-8b4c-4382-9ba8-a9a30b80657d/images/7987.png',
  },
}
