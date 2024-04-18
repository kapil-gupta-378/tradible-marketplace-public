import OrganizationTemplate from 'design-systems/Templates/OrganizationPageTemplate'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Organization',
  description: 'Set Up an Organization',
}

const OrganizationPage: React.FC = () => {
  return <OrganizationTemplate />
}

export default OrganizationPage
