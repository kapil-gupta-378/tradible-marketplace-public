import { Metadata } from 'next'
import OrganizationAnalyticsTemplate from 'design-systems/Templates/OrganizationAnalyticsTemplate'

export const metadata: Metadata = {
  title: 'Organization analytics',
  description: 'See analytics for Organization',
}

const OrganizationPage: React.FC = () => {
  return <OrganizationAnalyticsTemplate />
}

export default OrganizationPage
