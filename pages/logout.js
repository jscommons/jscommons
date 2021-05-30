import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function Logout () {
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
