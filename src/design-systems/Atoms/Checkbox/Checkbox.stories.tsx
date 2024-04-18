import { Meta, StoryObj } from '@storybook/react'

import { Checkbox } from '.'

const meta: Meta<typeof Checkbox> = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  argTypes: {
    id: {
      control: 'text',
      defaultValue: 'checkbox',
    },
    checked: {
      control: 'boolean',
      defaultValue: false,
    },
    disabled: {
      control: 'boolean',
      defaultValue: false,
    },
    value: {
      table: {
        disabled: true,
      },
    },
    label: {
      control: 'text',
      defaultValue: 'Label Here',
    },
  },
}
export default meta
type Story = StoryObj<typeof Checkbox>

export const Checkboxs: Story = {
  args: {
    label: 'click me',
  },
}
