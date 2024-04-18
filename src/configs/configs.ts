/* eslint-disable @typescript-eslint/no-non-null-assertion */

export const config = {
  baseUrl: {
    client: process.env.NEXT_PUBLIC_CLIENT_BASE_URL! as string,
    server: process.env.NEXT_PUBLIC_SERVER_BASE_URL! as string,
  },
  // secret

  // Api
  apiBaseUrl: process.env.NEXT_PUBLIC_API_BASE_URL as string,
}
