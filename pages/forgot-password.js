import { useState } from 'react'
import clsx from 'clsx'
import { http } from '@ianwalter/http'
import { ForgotPasswordForm } from '@generates/swag-squad'
import { Alert } from '@generates/swag'
import AppPage from '../components/AppPage.js'
import container from '../styles/container.js'

export default function ForgotPasswordPage () {
  const [successMessage, setSuccessMessage] = useState()

  async function submitForgotPassword (body) {
    try {
      setSuccessMessage()
      await http.post('/api/forgot-password', { body })
      setSuccessMessage('Sent!')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <AppPage>
      <div className={clsx(container, 'my-16')}>
        <ForgotPasswordForm
          onSubmit={submitForgotPassword}
          header={(
            <div className="text-center mb-4">

              <h1 className="text-2xl font-bold mt-0">
                Forgot Password
              </h1>

              <div className="text-sm text-gray-600 mt-2">
                No problem! Submit your email address below and we’ll send you
                a link that will allow you to reset your password.
              </div>

              {successMessage && (
                <Alert level="success" css={{ marginTop: '2em' }}>
                  {successMessage}
                </Alert>
              )}

            </div>
          )}
        />
      </div>
    </AppPage>
  )
}
