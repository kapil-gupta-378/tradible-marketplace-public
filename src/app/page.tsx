import { Metadata } from 'next'

import HomePageTemplate from 'design-systems/Templates/HomePageTemplate'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Test Home Data',
}

const HomePage: React.FC = () => {
  return <HomePageTemplate />
}

export default HomePage
