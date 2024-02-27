import { useRouter } from 'next/router'
import { useEffect } from 'react'

/**
 * This is a development only page.
 * It uses the useRouter hook from next/router and the useEffect hook from react.
 * If the NODE_ENV is not 'development', it redirects to the home page.
 * @returns A div containing a message that this page is only available in development.
 */
export default function DevOnlyPage() {
  const router = useRouter()

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      // Redirect to home page if not in development
      router.push('/')
    }
  }, [router])

  return (
    <div>
      <h1>This page is only available in development</h1>
    </div>
  )
}
