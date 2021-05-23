import { useEffect, useContext } from 'react'
import { Auth } from '@supabase/ui'
import clsx from 'clsx'
import { AppContext } from '../lib/context.js'
import { supabase } from '../lib/initSupabase.js'
import Header from './Header.js'
import Footer from './Footer.js'

export default function AppPage ({ children, ...props }) {
  const { user } = Auth.useUser()
  const ctx = useContext(AppContext)

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

              console.info('Profile data', data)

              ctx.update('profile', profile)
            }
          })
      } else {
        console.log(user, ctx)
      }
    },
    [
      user,
      ctx
    ]
  )

  return (
    <div className={clsx(
      'dark:bg-gray-800 dark:text-gray-300 flex flex-col min-h-screen'
    )}>

      <Header {...props} />

      <main className="flex">
        {children}
      </main>

      <Footer />

    </div>
  )
}
