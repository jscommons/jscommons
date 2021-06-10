import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function LogoutPage () {
  const router = useRouter()

  useEffect(
    () => {
      // supabase.auth.signOut()
      router.push('/')
    },
    [
      router
    ]
  )

  return (
    <div>
      Logging out...
    </div>
  )
}
