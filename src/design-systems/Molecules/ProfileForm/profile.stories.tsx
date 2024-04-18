import { Meta, StoryObj } from '@storybook/react'

import { ProfileForm } from '.'

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
type Story = StoryObj<typeof ProfileForm>

export const ProfileForms: Story = () => <ProfileForm />
ProfileForms.args = {
  className: 'visible',
}
