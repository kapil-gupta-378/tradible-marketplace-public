export interface OrganizationsModalProps {
  handleOrganizations: () => void
  isOrganizations: boolean
  render?: boolean
  OrganizationsList?: OrganizationsListTypes[]
}

export interface OrganizationsListTypes {
  name: string
  designation: string
  status: string
}

export interface currentUSerTypes {
  image: string
  name: string
  role: string
}
