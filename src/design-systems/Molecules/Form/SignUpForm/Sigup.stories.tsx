import { Meta, StoryObj } from '@storybook/react'

import SignUpForm from '.'

import { ThemeProvider } from 'contexts/ThemeContext'

const component = () => {
  return (
    <ThemeProvider>
      <SignUpForm />
    </ThemeProvider>
  )
}

const meta: Meta<typeof SignUpForm> = {
  title: 'Molecules/Forms/SignUpForm',
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
type Story = StoryObj<typeof SignUpForm>

export const SignUpForms: Story = {
  args: {},
}
