import { useContext } from 'react'
import { useRouter } from 'next/router'
import { TextField } from '@generates/swag'
import { StyledForm } from '@generates/swag-squad'
import clsx from 'clsx'
import { http } from '@ianwalter/http'
import AppPage from '../components/AppPage.js'
import { AppContext } from '../lib/context.js'
import TextareaControl from '../components/controls/TextareaControl.js'
import primaryButton from '../styles/buttons/primaryButton.js'
import container from '../styles/container.js'

export default function SubmitPage () {
  const ctx = useContext(AppContext)
  const router = useRouter()

  async function submitPost (values, { setSubmitting }) {
    setSubmitting(true)
    try {
      const body = { ...values, author: ctx.profile.id }
      const res = await http.post('/api/posts', { body })
      router.push(`/posts/${res.body.id}`)
    } catch (err) {
      console.error(err)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <AppPage>
      <div className={clsx(container, 'my-16')}>
        <StyledForm css={{ width: '684px' }}>

          <h1 className="text-xl text-gray-200 mb-4">
            Submit a new post!
          </h1>

          <TextField id="title" label="Title" />

          <TextField
            id="link"
            label="Link (optional)"
            placeholder="https://github.com/jscommon/jscommon"
          />

          {/* <TextareaControl id="body" label="Body (optional)" /> */}

          <button
            type="submit"
            className={clsx(primaryButton, 'w-48 mt-2')}
          >
            Submit Post
          </button>

        </StyledForm>
      </div>
    </AppPage>
  )
}
