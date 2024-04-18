'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const useLogout = () => {
  const navigate = useRouter()

  useEffect(() => {
    const data = localStorage.getItem('tradible')
    if (!data) {
      toast.warn('Please login with you credentials.')
      navigate.push('/login')
    }
  }, [navigate])
}

export default useLogout
