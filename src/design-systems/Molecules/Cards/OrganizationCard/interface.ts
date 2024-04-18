export interface OrganizationCardProps {
  id: number
  className?: string
  ProfileImage?: string
  name?: string
  role?: string
  status?: string
  isRemoveOrganization?: boolean
  createdBy?: string | number
  handleSingleOrganization?: () => void
  onClick?: () => void
  isSingleOrganization?: boolean
}
