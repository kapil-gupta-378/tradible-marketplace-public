export const PAGE_ROUTES = {
  home: '/',
  explore: '/explore',
  support: '/support',
  dashboard: '/dashboard',
  profile: (profileId: string) => `/profile/${profileId}`,
  product: (productId: string) => `/product/${productId}`,
  collection: (collectionId: string) => `/collection/${collectionId}`,
  user: (UserId: string) => `/users/${UserId}`,
  assets: (AssetsId: string) => `/assets/${AssetsId}`,
}

export const PUBLIC_ROUTES = [
  PAGE_ROUTES.home,
  PAGE_ROUTES.explore,
  PAGE_ROUTES.support,
  PAGE_ROUTES.collection('[collectionId]'),
  PAGE_ROUTES.profile('[userIdOrAddress]'),
  PAGE_ROUTES.product('[productId]'),
  PAGE_ROUTES.user('[UserId]'),
  PAGE_ROUTES.assets('[AssetsId]'),
]
