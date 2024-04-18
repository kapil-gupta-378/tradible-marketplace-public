import React from 'react'

import { ThemeProvider } from './ThemeContext'
import { OverlayProvider } from './OverlayContext'
import { GlobalContextProviderProps } from './interface'
import { DataProvider } from './FilterManager'
import { AuthContextProvider } from './AuthContext'
import { LoaderContextProvider } from './LoaderContext'
import { BulkContextProvider } from './BulkListingContext'
import { CollectorTypeProvider } from './CollectorType'
import { OrganizationContextProvider } from './OrganizationContext'
import { CheckoutContextProvider } from './CheckoutContext'

const GlobalContextProvider: React.FC<GlobalContextProviderProps> = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthContextProvider>
        <BulkContextProvider>
          <LoaderContextProvider>
            <OrganizationContextProvider>
              <CollectorTypeProvider>
                <DataProvider>
                  <CheckoutContextProvider>
                    <OverlayProvider>{children}</OverlayProvider>
                  </CheckoutContextProvider>
                </DataProvider>
              </CollectorTypeProvider>
            </OrganizationContextProvider>
          </LoaderContextProvider>
        </BulkContextProvider>
      </AuthContextProvider>
    </ThemeProvider>
  )
}

export default GlobalContextProvider
