import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { TextField, LoadingButton, Alert } from '@generates/swag'
import { StyledForm } from '@generates/swag-squad'
import clsx from 'clsx'
import { http } from '@ianwalter/http'
import AppPage from '../components/AppPage.js'
import TextareaField from '../components/fields/TextareaField.js'
import container from '../styles/container.js'
import reduceError from '../lib/reduceError.js'
import logger from '../lib/clientLogger.js'

export default function SubmitPage () {
  const router = useRouter()
  const { register, handleSubmit } = useForm()
  const [errorMessage, setErrorMessage] = useState()
  const [feedback, setFeedback] = useState({})

  async function submitPost (body) {
    try {
      setErrorMessage()
      setFeedback({})

      const res = await http.post('/api/posts', { body })
      logger.debug('Post response', res.body)

      router.push(`/posts/${res.body.id}`)
    } catch (err) {
      const reduced = reduceError(err)
      if (reduced.level === 'warn') {
        logger.warn('Submit post', reduced.err)
      } else {
        logger.error('Submit post', reduced.err)
      }
      setErrorMessage(reduced.message)
      setFeedback(reduced.feedback)
    }
  }

  return (
    <AppPage>
      <div className={clsx(container, 'my-16')}>
        <StyledForm
          onSubmit={handleSubmit(submitPost)}
          css={{ width: '684px' }}
        >

          <div className="text-center">

            <h1 className="text-2xl font-bold mt-0">
              Submit Post
            </h1>

            <div className="text-sm text-gray-600 mt-2">
              Submit a link and/or message to JS Commons below.
            </div>

          </div>

          {errorMessage && (
            <Alert level="error">
              {errorMessage}
            </Alert>
          )}

          <TextField
            id="title"
            label="Title"
            feedback={feedback.title}
            register={register}
            required
          />

          <TextField
            id="link"
            label="Link (optional)"
            feedback={feedback.link}
            placeholder="https://github.com/jscommon/jscommon"
            register={register}
          />

          <TextareaField
            id="body"
            label="Body (optional)"
            feedback={feedback.body}
            register={register}
          />

          <div>
            <LoadingButton type="submit" primary>
              Submit Post
            </LoadingButton>
          </div>

        </StyledForm>
      </div>
    </AppPage>
  )
}
