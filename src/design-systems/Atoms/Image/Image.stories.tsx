import { Meta, StoryObj } from '@storybook/react'

import Image from '.'

import tradiblelogo from 'assets/images/tradiblelogo.png'

const meta: Meta<typeof Image> = {
  title: 'Atoms/Image',
  component: Image,
  argTypes: {
    width: {
      control: 'number',
      defaultValue: 24,
    },
    height: {
      control: 'number',
      defaultValue: 24,
    },
    className: {
      control: 'text',
      defaultValue: '',
    },
    alt: {
      control: 'text',
      defaultValue: 'image-alt',
    },
    isLoading: {
      control: 'boolean',
      defaultValue: false,
    },
    src: {
      table: {
        disabled: true,
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof Image>

// const LEO_IMAGE_LINK =
//   'https://i.seadn.io/gae/nukW3oqsqaxo5DyaVFJj2Ofv5vxv3ni9Fkc4reWGt9cUnSRV2fjWMhr40B2Rnpt9KsHxtVo5KqzHGxMPesHwoSnFq7ktpZD28UBZ?auto=format&w=1000'

// const Template: ComponentStory<typeof Image> = props => <Image {...props} />

export const ImageFromStaticLink: Story = {
  args: {
    width: 100,
    height: 100,
    alt: '100-100-image',
    src: tradiblelogo,
    isLoading: true,
  },
}
