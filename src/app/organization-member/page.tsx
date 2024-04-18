import OrganizationMemberTemplate from 'design-systems/Templates/OrganizationMemberTemplate'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Organization',
  description: 'Set Up an Organization Member',
}

const OrganizationMemberPage: React.FC = () => {
  return <OrganizationMemberTemplate />
}

export default OrganizationMemberPage
