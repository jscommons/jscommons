import { useContext } from 'react'
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
      <div className={clsx(container, 'my-16')}>

        <SignInForm
          onSubmit={signIn}
          header={(
            <div className="text-center mb-4">

              <h1 className="text-2xl font-bold mt-0">
                Welcome Back!
              </h1>

              <div className="text-sm text-gray-600 mt-2">
                Enter your account credentials below to sign in.
              </div>

            </div>
          )}
        />

      </div>
    </AppPage>
  )
}
