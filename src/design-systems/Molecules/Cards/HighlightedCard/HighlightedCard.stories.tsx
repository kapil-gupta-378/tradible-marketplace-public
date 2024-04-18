import { Meta } from '@storybook/react'

import HighlightedCard from '.'

const meta: Meta<typeof HighlightedCard> = {
  title: 'Molecules/Cards/HighlightedCard',
  component: HighlightedCard,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
