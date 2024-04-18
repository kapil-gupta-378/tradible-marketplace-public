import { Meta, StoryObj } from '@storybook/react'

import LoginForm from '.'

import { ThemeProvider } from 'contexts/ThemeContext'

const component = () => {
  return (
    <ThemeProvider>
      <LoginForm />
    </ThemeProvider>
  )
}

const meta: Meta<typeof LoginForm> = {
  title: 'Molecules/Forms/LoginForm',
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
type Story = StoryObj<typeof LoginForm>

export const LoginForms: Story = {
  args: {},
}
