'use client'
import 'assets/css/main.css'
import 'react-toastify/dist/ReactToastify.css'
import { ThemeProvider } from 'next-themes'
import { ToastContainer } from 'react-toastify'
import Head from 'next/head'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { PropsWithChildren, useMemo } from 'react'
import { usePathname } from 'next/navigation'

import AppHeader from '../design-systems/Organisms/AppHeader'

import Login from './(auth)/login/page'
import Signup from './(auth)/signup/page'
import ForgetPassword from './(auth)/forget-password/page'

import GlobalContextProvider from 'contexts'
import NoFirstRender from 'design-systems/Atoms/NoFirstRender'
import Footer from 'design-systems/Organisms/Footer'
import VerifyUser from './(auth)/verify-user/page'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

function Providers({ children }: PropsWithChildren) {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        {children}
      </QueryClientProvider>
    </>
  )
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const isShowFooter = useMemo(() => {
    const hiddenFooterRoutes = ['/item-list', '/item-upload']
    return !hiddenFooterRoutes.includes(pathname)
  }, [pathname])

  return (
    <html lang="en">
      <Head>
        <meta charSet="utf-8" />
        <meta content="IE=edge" httpEquiv="X-UA-Compatible" />
        <meta
          content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, user-scalable=no, viewport-fit=cover"
          name="viewport"
        />
        <meta content="yes" name="apple-mobile-web-app-capable" />
        <meta content="default" name="apple-mobile-web-app-status-bar-style" />
        <meta content="yes" name="mobile-web-app-capable" />
        <meta content="website" name="og:type" property="og:type" />
        <meta content="summary_large_image" name="twitter:card" />
      </Head>
      <body className="dark:bg-[#191c1f]">
        <ThemeProvider attribute="class">
          <NoFirstRender>
            <Providers>
              <GlobalContextProvider>
                <div className="m-0 min-h-screen bg-white p-0 text-center dark:bg-[#191c1f]">
                  <div className="mx-auto flex min-h-[inherit] flex-col justify-between overflow-x-hidden">
                    {pathname === '/login' ||
                    pathname === '/signup' ||
                    pathname === '/forget-password' ||
                    pathname === '/verify-user' ? (
                      <>
                        {pathname === '/verify-user' && <VerifyUser />}
                        {pathname === '/login' && <Login />}
                        {pathname === '/signup' && <Signup />}
                        {pathname === '/forget-password' && <ForgetPassword />}
                      </>
                    ) : (
                      <>
                        <div>
                          <AppHeader>{children}</AppHeader>
                        </div>
                        {isShowFooter && <Footer />}
                      </>
                    )}
                  </div>
                </div>
                <ToastContainer
                  autoClose={1000}
                  closeOnClick
                  draggable
                  hideProgressBar
                  newestOnTop
                  pauseOnFocusLoss
                  pauseOnHover
                  position="top-right"
                  rtl={false}
                />
              </GlobalContextProvider>
            </Providers>
          </NoFirstRender>
        </ThemeProvider>
      </body>
    </html>
  )
}
