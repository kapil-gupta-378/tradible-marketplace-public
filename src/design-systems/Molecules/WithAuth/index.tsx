'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
export default function withAuth(WrappedComponent: React.FC<any>) {
  return function AuthenticatedComponent(props: any) {
    const router = useRouter()
    // Redirect to the login page if the user is not authenticated
    if (!localStorage.getItem('tradible')) {
      router.push('/login') // Redirect to your login page
      return null // Render nothing while redirecting
    }

    // If the user is authenticated, render the protected component
    return <WrappedComponent {...props} />
  }
}
