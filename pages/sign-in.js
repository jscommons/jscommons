import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { http } from '@ianwalter/http'
import { Alert } from '@generates/swag'
import { SignInForm } from '@generates/swag-squad'
import AppPage from '../components/AppPage.js'
import { AppContext } from '../lib/context.js'
import container from '../styles/container.js'
import reduceError from '../lib/reduceError.js'
import logger from '../lib/clientLogger.js'

export default function SignInPage () {
  const ctx = useContext(AppContext)
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState()
  const [feedback, setFeedback] = useState({})

  async function signIn (body) {
    try {
      setErrorMessage()
      setFeedback({})

      const res = await http.post('/api/sign-in', { body })
      logger.debug('Sign in response', res.body)
      ctx.update(res.body)
      if (res.body.account.emailVerified) {
        router.push('/')
      } else {
        router.push('/verify-email')
      }
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
        <SignInForm
          onSubmit={signIn}
          feedback={feedback}
          forgotPasswordLinkProps={{
            onClick: () => router.push('/forgot-password')
          }}
          header={(
            <div className="text-center mb-4">

              <h1 className="text-2xl font-bold mt-0">
                Welcome Back!
              </h1>

              <div className="text-sm text-gray-600 mt-2">
                Submit your account credentials below to sign in.
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
