import { useContext } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { http } from '@ianwalter/http'
import { StyledDiv } from '@generates/swag'
import { AccountForm, ChangePasswordForm } from '@generates/swag-squad'
import AppPage from '../components/AppPage.js'
import { AppContext } from '../lib/context.js'
import container from '../styles/container.js'

export default function AccountPage () {
  const ctx = useContext(AppContext)
  const router = useRouter()

  async function updateAccount (body) {
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

  async function changePassword (body) {
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

        <AccountForm
          onSubmit={updateAccount}
          showUsername={true}
          header={(
            <div className="text-center mb-4">

              <h1 className="text-2xl font-bold mt-0">
                Account Settings
              </h1>

              <div className="text-sm text-gray-600 mt-2">
                Update your account settings and confirm your password if
                changing your username or email.
              </div>

            </div>
          )}
        />

        <StyledDiv css={{ marginTop: '4em' }} />

        <ChangePasswordForm
          onSubmit={changePassword}
          header={(
            <div className="text-center mb-4">

              <h1 className="text-2xl font-bold mt-0">
                Change Password
              </h1>

              <div className="text-sm text-gray-600 mt-2">
                Change your password by submitting your existing password and
                new password below.
              </div>

            </div>
          )}
        />

      </div>
    </AppPage>
  )
}
