import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { Auth } from '@supabase/ui'
import { supabase } from '../lib/initSupabase.js'
import AppPage from '../components/AppPage.js'
import { AppContext } from '../lib/context.js'

export default function Login () {
  const { user } = Auth.useUser()
  const ctx = useContext(AppContext)
  const router = useRouter()

  useEffect(
    () => {
      if (user && !ctx.profile) {
        supabase
          .from('profiles')
          .select('*')
          .eq('user_id', user.id)
          .then(({ data, error }) => {
            if (error) {
              console.error(error)
            } else {
              const [profile] = data || []

              if (!profile) console.error('No profile data', data)

              ctx.update('profile', profile)
              router.push('/')
            }
          })
      }
    },
    [
      user,
      ctx,
      router
    ]
  )

  return (
    <AppPage>

      <h1>Login</h1>

      <Auth
        supabaseClient={supabase}
        // providers={['github']}
        socialLayout="horizontal"
        socialButtonSize="xlarge"
      />

    </AppPage>
  )
}
