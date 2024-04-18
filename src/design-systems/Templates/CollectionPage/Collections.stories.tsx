import { Meta, StoryObj } from '@storybook/react'

import CollectionPage from '.'

const meta: Meta<typeof CollectionPage> = {
  title: 'Organisms/Explore/CollectionPage',
  component: CollectionPage,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof CollectionPage>

export const Collection: Story = {
  args: {
    className: '',
  },
}
