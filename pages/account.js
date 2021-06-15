import { useContext, useState } from 'react'
import clsx from 'clsx'
import { http } from '@ianwalter/http'
import { StyledDiv, Alert } from '@generates/swag'
import { AccountForm, ChangePasswordForm } from '@generates/swag-squad'
import AppPage from '../components/AppPage.js'
import { AppContext } from '../lib/context.js'
import container from '../styles/container.js'
import reduceError from '../lib/reduceError.js'
import logger from '../lib/clientLogger.js'

export default function AccountPage () {
  const ctx = useContext(AppContext)
  const [accountSuccess, setAccountSuccess] = useState()
  const [passwordSuccess, setPasswordSuccess] = useState()
  const [accountError, setAccountError] = useState()
  const [passwordError, setPasswordError] = useState()
  const [accountFeedback, setAccountFeedback] = useState({})
  const [passwordFeedback, setPasswordFeedback] = useState({})

  async function updateAccount (body) {
    try {
      setAccountError()
      setAccountFeedback({})

      const res = await http.post('/api/sign-in', { body })
      logger.debug('Account update response', res.body)
      ctx.update(res.body)
      setAccountSuccess('Account updated!')
    } catch (err) {
      const reduced = reduceError(err)
      if (reduced.level === 'warn') {
        logger.warn('Account update', reduced.err)
      } else {
        logger.error('Account update', reduced.err)
      }
      setAccountError(reduced.message)
      setAccountFeedback(reduced.feedback)
    }
  }

  async function changePassword (body) {
    try {
      setPasswordError()
      setPasswordFeedback({})

      await http.post('/api/sign-in', { body })
      setPasswordSuccess('Password updated!')
    } catch (err) {
      const reduced = reduceError(err)
      if (reduced.level === 'warn') {
        logger.warn('Password update', reduced.err)
      } else {
        logger.error('Password update', reduced.err)
      }
      setPasswordError(reduced.message)
      setAccountFeedback(reduced.feedback)
    }
  }

  return (
    <AppPage>
      <div className={clsx(container, 'my-16')}>

        {ctx.account.id && (
          <AccountForm
            onSubmit={updateAccount}
            defaultValues={ctx.account}
            feedback={accountFeedback}
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

                {accountSuccess && (
                  <Alert level="success" css={{ marginTop: '2em' }}>
                    {accountSuccess}
                  </Alert>
                )}

                {accountError && (
                  <Alert level="error" css={{ marginTop: '2em' }}>
                    {accountError}
                  </Alert>
                )}

              </div>
            )}
          />
        )}

        <StyledDiv css={{ marginTop: '3em' }} />

        <ChangePasswordForm
          onSubmit={changePassword}
          feedback={passwordFeedback}
          header={(
            <div className="text-center mb-4">

              <h1 className="text-2xl font-bold mt-0">
                Change Password
              </h1>

              <div className="text-sm text-gray-600 mt-2">
                Change your password by submitting your existing password and
                new password below.
              </div>

              {passwordSuccess && (
                <Alert level="success" css={{ marginTop: '2em' }}>
                  {passwordSuccess}
                </Alert>
              )}

              {passwordError && (
                <Alert level="error" css={{ marginTop: '2em' }}>
                  {passwordError}
                </Alert>
              )}

            </div>
          )}
        />

      </div>
    </AppPage>
  )
}
