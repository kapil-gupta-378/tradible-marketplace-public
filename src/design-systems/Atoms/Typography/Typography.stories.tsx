import { Meta, StoryObj } from '@storybook/react'

import Typography from '.'

const meta: Meta<typeof Typography> = {
  title: 'Atoms/Typography',
  component: Typography,
  argTypes: {
    variant: {
      options: ['condensed', 'regular'],
      defaultValue: 'condensed',
    },
    size: {
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'paragraph'],
      defaultValue: 'body',
    },
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Typography>

export const H1: Story = {
  args: {
    variant: 'regular',
    size: 'h1',
    children: 'Test h1',
  },
}

export const H2: Story = {
  args: {
    variant: 'regular',
    size: 'h2',
    children: 'Test h2',
  },
}

export const H3: Story = {
  args: {
    variant: 'regular',
    size: 'h3',
    children: 'Test h3',
  },
}

export const H4: Story = {
  args: {
    variant: 'regular',
    size: 'h4',
    children: 'Test h4',
  },
}

export const H5: Story = {
  args: {
    variant: 'regular',
    size: 'h5',
    children: 'Test h5',
  },
}

export const H6: Story = {
  args: {
    variant: 'regular',
    size: 'h6',
    children: 'Test h6',
  },
}

export const Paragraph: Story = {
  args: {
    variant: 'regular',
    size: 'paragraph',
    children: 'Test paragraph',
  },
}

export const ResponsiveText: Story = {
  args: {
    variant: undefined,
    size: undefined,
    className: 'lg:text-4xl lmd:text-xl text-base dark:text-white',
    children: 'Test Responsive Text',
  },
}
