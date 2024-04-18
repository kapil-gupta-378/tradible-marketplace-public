'use client' // Error components must be Client Components

import { useRouter } from 'next/navigation'

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const router = useRouter()

  return (
    <div className="flex h-[100vh] flex-col items-center justify-center">
      <h2>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => {
            router.push('/')
          }
        }
      >
        Go to home
      </button>
    </div>
  )
}
