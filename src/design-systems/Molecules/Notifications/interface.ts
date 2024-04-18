export interface NotificationsProps {
  className?: string
  label: string
  secondaryLabel?: string
  check?: boolean
  key?: string
}

export interface NotificationItemProps {
  label: string
  secondaryLabel?: string
  check?: boolean
  handleChange: (label: string) => void
  postNotificationLoading?: boolean
}
