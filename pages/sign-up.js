import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import { http } from '@ianwalter/http'
import { SignUpForm } from '@generates/swag-squad'
import { Alert } from '@generates/swag'
import AppPage from '../components/AppPage.js'
import { AppContext } from '../lib/context.js'
import container from '../styles/container.js'
import logger from '../lib/clientLogger.js'
import reduceError from '../lib/reduceError.js'

export default function SignUpPage () {
  const ctx = useContext(AppContext)
  const router = useRouter()
  const [errorMessage, setErrorMessage] = useState()
  const [feedback, setFeedback] = useState({})

  async function signUp (body) {
    try {
      setErrorMessage()
      setFeedback({})

      const res = await http.post('/api/sign-up', { body })
      logger.debug('Sign up response', res.body)
      ctx.update(res.body)
      if (res.body.account.emailVerified) {
        router.push('/')
      } else {
        router.push('/verify-email')
      }
    } catch (err) {
      const reduced = reduceError(err)
      if (reduced.level === 'warn') {
        logger.warn('Sign up', reduced.err)
      } else {
        logger.error('Sign up', reduced.err)
      }
      setErrorMessage(reduced.message)
      setFeedback(reduced.feedback)
    }
  }

  return (
    <AppPage>
      <div className={clsx(container, 'my-16')}>
        <SignUpForm
          onSubmit={signUp}
          feedback={feedback}
          header={(
            <div className="text-center mb-4">

              <h1 className="text-2xl font-bold mt-0">
                Join Us!
              </h1>

              <div className="text-sm text-gray-600 mt-2">
                Submit your information below and join our community.
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
