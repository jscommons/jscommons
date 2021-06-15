import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { http } from '@ianwalter/http'
import { ResetPasswordForm } from '@generates/swag-squad'
import { Alert } from '@generates/swag'
import AppPage from '../components/AppPage.js'
import { AppContext } from '../lib/context.js'
import container from '../styles/container.js'
import logger from '../lib/clientLogger.js'
import reduceError from '../lib/reduceError.js'

export default function ResetPasswordPage () {
  const ctx = useContext(AppContext)
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState()
  const [feedback, setFeedback] = useState({})

  async function resetPasword (body) {
    try {
      const res = await http.post('/api/reset-password', { body })
      logger.debug('Reset password response', res.body)
      ctx.update(res.body)
      router.push('/')
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

        <ResetPasswordForm
          onSubmit={resetPasword}
          feedback={feedback}
          header={(
            <div className="text-center mb-4">

              <h1 className="text-2xl font-bold mt-0">
                Reset Password
              </h1>

              <div className="text-sm text-gray-600 mt-2">
                Submit a new password below and, if successful, it will be used
                to secure your account.
              </div>

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
