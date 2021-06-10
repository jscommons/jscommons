import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { http } from '@ianwalter/http'
import { SignInForm } from '@generates/swag-squad'
import AppPage from '../components/AppPage.js'
import { AppContext } from '../lib/context.js'
import container from '../styles/container.js'

export default function SignInPage () {
  const ctx = useContext(AppContext)
  const router = useRouter()

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
      //         console.info('Profile data', data)
      //         const [profile] = data || []
      //         ctx.update('profile', profile)
      //         router.push('/')
      //       }
      //     })
      // }
    },
    [
      // user,
      ctx,
      router
    ]
  )

  async function signIn (body) {
    try {
      const res = await http.post('/api/sign-in', { body })
      console.info('Account data', res.body)
      ctx.update(res.body)
      if (res.body.account.emailVerified) {
        router.push('/')
      } else {
        router.push('/verify-email')
      }
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <AppPage>
      <div className={clsx(container, 'my-8')}>

        <h1>Login</h1>

        <div className="max-w-xl mx-auto mb-12 text-gray-300">
          {/* <Auth
            supabaseClient={supabase}
            // providers={['github']}
            socialLayout="horizontal"
            socialButtonSize="xlarge"
          /> */}
        </div>

        <SignInForm onSubmit={signIn} />

      </div>
    </AppPage>
  )
}
