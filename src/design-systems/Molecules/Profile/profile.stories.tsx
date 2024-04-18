import { Meta, StoryObj } from '@storybook/react'

import { ProfileCover, ProfileImage } from '.'

const meta: Meta = {
  title: 'Molecules/Profile',
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ProfileCover>

export const ProfileCovers: Story = () => <ProfileCover />
ProfileCovers.args = {
  className: 'visible',
}
export const ProfileImages: Story = () => <ProfileImage />
ProfileImages.args = {
  className: 'visible',
}
