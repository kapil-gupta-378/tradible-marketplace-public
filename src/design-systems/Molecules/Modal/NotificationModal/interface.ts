export interface NotificationModalProps {
  className?: string
  tabIndex?: number | undefined
  isModal: boolean
  render?: boolean
  onClose: () => void
  isOpen: boolean
  handleNotification: () => void
}
