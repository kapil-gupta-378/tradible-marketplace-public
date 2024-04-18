import { Meta, StoryObj } from '@storybook/react'

import ProfileBanner from '.'

const meta: Meta<typeof ProfileBanner> = {
  title: 'Molecules/ProfileBanner',
  component: ProfileBanner,
}

export default meta
type Story = StoryObj<typeof ProfileBanner>

export const ProfileBanners: Story = {
  args: {
    userName: 'Ollie',
  },
}
