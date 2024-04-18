import { Meta, StoryObj } from '@storybook/react'

import UpComingCard from '.'

const meta: Meta<typeof UpComingCard> = {
  title: 'Molecules/Cards/UpComingCard',
  component: UpComingCard,
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof UpComingCard>

export const UpComingCards: Story = {
  args: {
    img: 'https://corgistudio.fra1.digitaloceanspaces.com/l_66d067e9-14fd-456a-85d2-791dbcff8eb1/image/75.png',
    releaseDate: 'January 23, 2023',

    setId: '42',
    name: 'Sun & Moon: Unbroken bonds',
    series: 'pokemon',

    totalCards: '232',
    className: '!w-[400px]',
  },
}
