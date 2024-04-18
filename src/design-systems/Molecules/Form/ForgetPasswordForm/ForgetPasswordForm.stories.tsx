import { Meta, StoryObj } from '@storybook/react'

import ForgetPassword from '.'

import { ThemeProvider } from 'contexts/ThemeContext'

const component = () => {
  return (
    <ThemeProvider>
      <ForgetPassword />
    </ThemeProvider>
  )
}

const meta: Meta<typeof ForgetPassword> = {
  title: 'Molecules/Forms/ForgetPassword',
  component: component,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof ForgetPassword>

export const ForgetPasswords: Story = {
  args: {},
}
