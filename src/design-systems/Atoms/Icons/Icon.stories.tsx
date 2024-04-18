import { Meta, StoryObj } from '@storybook/react'
import type { ComponentType } from 'react'

import { IconProps } from './interface'

import CartIcon, {
  CloseIcon,
  DownArrow,
  FilterIcon,
  GridViewIcon,
  ListViewIcon,
  ListingIcon,
  LogoutIcon,
  MyItemIcon,
  NotificationBackIcon,
  NotificationIcon,
  LinkIcon,
  EmailIcon,
  TelegramIcon,
  FacebookIcon,
  TwitterIcon,
  InfoIcon,
  PayPalIcon,
} from '.'

const meta: Meta = {
  title: 'Atoms/Icons',
  argTypes: {
    className: {
      defaultValue: 'w-14 h-14',

      table: {
        disabled: true,
      },
    },
  },
}

interface ComponentProps extends IconProps {
  Icon: ComponentType<IconProps>
}

export default meta
type Story = StoryObj<typeof CartIcon>

export const SearchIconStory: Story = () => <MyItemIcon className="" />
SearchIconStory.args = {
  className: 'h-12 w-12',
}
export const NotificationIcons: Story = () => <NotificationIcon className="" />
NotificationIcons.args = {
  className: 'h-12 w-12',
}
export const ListingIcons: Story = () => <ListingIcon className="" />
ListingIcons.args = {
  className: 'h-12 w-12',
}
export const CartIcons: Story = () => <CartIcon className="" />
CartIcons.args = {
  className: 'h-12 w-12',
}
export const LogoutIcons: Story = () => <LogoutIcon className="" />
LogoutIcons.args = {
  className: 'h-12 w-12',
}
export const FilterIcons: Story = () => <FilterIcon className="" />
FilterIcons.args = {
  className: 'h-12 w-12',
}
export const GridViewIcons: Story = () => <GridViewIcon className="" />
GridViewIcons.args = {
  className: 'h-12 w-12',
}
export const ListViewIcons: Story = () => <ListViewIcon className="" />
ListViewIcons.args = {
  className: 'h-12 w-12',
}
export const DownArrows: Story = () => <DownArrow className="" />
DownArrows.args = {
  className: 'h-12 w-12',
}
export const CloseIcons: Story = () => <CloseIcon className="" />
CloseIcons.args = {
  className: 'h-12 w-12',
}
export const NotificationBackIcons: Story = () => <NotificationBackIcon className="" />
NotificationBackIcons.args = {
  className: 'h-12 w-12',
}

export const TwitterIcons: Story = () => <TwitterIcon className="" />
TwitterIcons.args = {
  className: 'h-12 w-12',
}

export const FacebookIcons: Story = () => <FacebookIcon className="" />
FacebookIcons.args = {
  className: 'h-12 w-12',
}

export const TelegramIcons: Story = () => <TelegramIcon className="" />
TelegramIcons.args = {
  className: 'h-12 w-12',
}

export const EmailIcons: Story = () => <EmailIcon className="" />
EmailIcons.args = {
  className: 'h-12 w-12',
}

export const LinkIcons: Story = () => <LinkIcon className="" />
LinkIcons.args = {
  className: 'h-12 w-12',
}

export const CheckIcons: Story = () => <LinkIcon className="" />
CheckIcons.args = {
  className: 'h-12 w-12',
}

export const InfoIcons: Story = () => <InfoIcon className="" />
InfoIcons.args = {
  className: 'h-12 w-12',
}

export const PayPalIcons: Story = () => <PayPalIcon className="" />
PayPalIcons.args = {
  className: 'h-12 w-12',
}
