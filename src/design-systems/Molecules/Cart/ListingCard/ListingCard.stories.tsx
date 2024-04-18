import { Meta, Story } from '@storybook/react'

import ListCart from '.'
const data = {
  image: 'https://corgistudio.fra1.digitaloceanspaces.com/l_66d067e9-14fd-456a-85d2-791dbcff8eb1/image/75.png',
  store: 'TheCardCollector',
  mintedBy: 'You',
  date: '10/10/2022',
  time: '09:08',
}

const meta: Meta = {
  title: 'Molecules/Cart/List cart',
  argTypes: {
    className: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta

export const ListCarts: Story = () => <ListCart cartData={data} className={''} state="listings" />
