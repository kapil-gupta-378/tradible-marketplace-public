import { roles } from 'utils'

export const mobileHeaderUrl = [
  {
    title: 'Explore',
    authenticated: false,
    child: [
      {
        title: 'Marketplace',
        url: '/explore/marketplace',
      },

      {
        title: 'Auctions',
        url: '/explore/auctions',
      },

      {
        title: 'Collections',
        url: '/explore/collections',
      },

      {
        title: 'Users',
        url: '/explore/users',
      },
    ],
  },

  {
    title: 'Portfolio',
    authenticated: false,
    child: [
      {
        title: 'Analytics',
        url: '/portfolio/analytics?duration=1H',
      },

      {
        title: 'Portfolio',
        url: '/portfolio/portfolio',
      },
    ],
  },

  {
    title: 'Listings',
    authenticated: false,
    child: [
      {
        title: 'Listings',
        url: '/selling/listings',
        notShow: [roles.user],
      },

      {
        title: 'Orders',
        url: '/selling/orders',
      },

      {
        title: 'Bids',
        url: '/selling/bids',
        notShow: [roles.user],
      },
    ],
  },
]
