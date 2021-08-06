import { useState } from 'react'
import clsx from 'clsx'
import { http } from '@ianwalter/http'
import { ForgotPasswordForm } from '@generates/swag-squad'
import { Alert } from '@generates/swag'
import { useForm } from 'react-hook-form'
import AppPage from '../components/AppPage.js'
import container from '../styles/container.js'
import reduceError from '../lib/reduceError.js'
import logger from '../lib/clientLogger.js'

export default function ForgotPasswordPage () {
  const [successMessage, setSuccessMessage] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const [feedback, setFeedback] = useState({})
  const form = useForm()

  async function submitForgotPassword (body) {
    try {
      setSuccessMessage()
      await http.post('/api/forgot-password', { body })
      setSuccessMessage('Sent!')
    } catch (err) {
      const reduced = reduceError(err)
      if (reduced.level === 'warn') {
        logger.warn('Sign in', reduced.err)
      } else {
        logger.error('Sign in', reduced.err)
      }
      setErrorMessage(reduced.message)
      setFeedback(reduced.feedback)
    }
  }

  return (
    <AppPage>
      <div className={clsx(container, 'my-16')}>
        <ForgotPasswordForm
          form={form}
          onSubmit={submitForgotPassword}
          feedback={feedback}
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

              {errorMessage && (
                <Alert level="error" css={{ marginTop: '2em' }}>
                  {errorMessage}
                </Alert>
              )}

            </div>
          )}
        />
      </div>
    </AppPage>
  )
}
