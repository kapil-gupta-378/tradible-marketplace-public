import { Meta, StoryObj } from '@storybook/react'

import NotificationModal from '.'

const meta: Meta<typeof NotificationModal> = {
  title: 'Molecules/Modal/NotificationModal',
  component: NotificationModal,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
    isModal: {
      boolean: {
        default: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof NotificationModal>

export const Notificationmodal: Story = {
  args: {
    className: '',
    isModal: true,
  },
}
