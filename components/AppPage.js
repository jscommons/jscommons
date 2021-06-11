import { useEffect, useContext } from 'react'
import clsx from 'clsx'
import { AppContext } from '../lib/context.js'
import Header from './Header.js'
import Footer from './Footer.js'

export default function AppPage ({ children, ...props }) {
  const ctx = useContext(AppContext)

  useEffect(
    () => {
      // if (user && !ctx.profile.id) {
      //   supabase
      //     .from('profiles')
      //     .select('*')
      //     .eq('user_id', user.id)
      //     .then(({ data, error }) => {
      //       if (error) {
      //         console.error(error)
      //       } else {
      //         const [profile] = data || []

      //         console.info('Profile data', data)

      //         ctx.update('profile', profile)
      //       }
      //     })
      // }
    },
    [
      // user,
      ctx
    ]
  )

  return (
    <div className="flex flex-col min-h-screen">

      <Header {...props} />

      <main className="flex-1">
        {children}
      </main>

      <Footer />

    </div>
  )
}
