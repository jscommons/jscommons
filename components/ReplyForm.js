import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { TextField, LoadingButton, Alert } from '@generates/swag'
import { StyledForm } from '@generates/swag-squad'
import { http } from '@ianwalter/http'
import TextareaField from '../components/fields/TextareaField.js'
import logger from '../lib/clientLogger.js'
import reduceError from '../lib/reduceError.js'

export default function ReplyForm (props) {
  const router = useRouter()
  const { register, handleSubmit } = useForm()
  const [errorMessage, setErrorMessage] = useState()
  const [feedback, setFeedback] = useState({})

  async function submitReply (body) {
    try {
      setErrorMessage()
      setFeedback({})

      body.threadId = props.threadId
      body.parentId = props.parentId

      const res = await http.post('/api/posts', { body })
      logger.debug('Reply response', res.body)

      router.push(`/posts/${res.body.id}`)
    } catch (err) {
      const reduced = reduceError(err)
      if (reduced.level === 'warn') {
        logger.warn('Submit reply', reduced.err)
      } else {
        logger.error('Submit reply', reduced.err)
      }
      setErrorMessage(reduced.message)
      setFeedback(reduced.feedback)
    }
  }

  return (
    <StyledForm
      onSubmit={handleSubmit(submitReply)}
      css={{ width: '684px', marginLeft: '0' }}
    >

      {errorMessage && (
        <Alert level="error">
          {errorMessage}
        </Alert>
      )}

      <TextareaField
        id="body"
        label="Reply"
        feedback={feedback.body}
        register={register}
        required
      />

      <div>
        <LoadingButton type="submit" primary>
          Submit Reply
        </LoadingButton>
      </div>

    </StyledForm>
  )
}
