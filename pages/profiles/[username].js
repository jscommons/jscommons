import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AppPage from '../../components/AppPage.js'
import { supabase } from '../../lib/initSupabase.js'

export default function Profile () {
  const router = useRouter()
  const [profile, setProfile] = useState()

  useEffect(
    () => {
      if (router.query.username) {
        supabase
          .from('profiles')
          .select('*')
          .eq('username', router.query.username)
          .then(({ data, error }) => {
            if (error) {
              console.error(error)
            } else {
              console.info('Profile data', data)

              const [profile] = data || []
              setProfile(profile)
            }
          })
      }
    },
    [
      router
    ]
  )

  return (
    <AppPage>

      {profile && (
        <div>

          {profile.username}

        </div>
      )}

      {!profile && (
        <div>
          Profile not found
        </div>
      )}

    </AppPage>
  )
}
