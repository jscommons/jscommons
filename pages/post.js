import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form, Field } from 'formik'
import clsx from 'clsx'
import AppPage from '../components/AppPage.js'
import { supabase } from '../lib/initSupabase.js'
import { AppContext } from '../lib/context.js'
import TextControl from '../components/controls/TextControl.js'
import container from '../styles/container.js'
import TextareaControl from '../components/controls/TextareaControl.js'
import primaryButton from '../styles/buttons/primaryButton.js'

export default function Post () {
  const ctx = useContext(AppContext)
  const router = useRouter()

  async function submitPost (values, { setSubmitting }) {
    setSubmitting(true)

    const { data, error } = await supabase
      .from('posts')
      .insert({ ...values, author: ctx.profile.id })

    if (error) {
      console.error(error)
    } else {
      const [post] = data || []

      if (!post) console.error('No post data', data)

      router.push(`/posts/${post.id}`)
    }
  }

  return (
    <AppPage>
      <Formik
        initialValues={{ title: '', link: '', body: '' }}
        onSubmit={submitPost}
      >
        {({ isSubmitting }) => (
          <Form className={clsx(container, 'my-8 grid gap-6')}>

            <h1 className="text-xl text-gray-200 mb-4">
              Create a new post!
            </h1>

            <TextControl id="title" label="Title" />

            <TextControl
              id="link"
              label="Link (optional)"
              placeholder="https://github.com/jscommon/jscommon"
            />

            <TextareaControl id="body" label="Body (optional)" />

            <button
              type="submit"
              className={clsx(primaryButton, 'w-48 mt-2')}
            >
              Submit Post
            </button>

          </Form>
        )}
      </Formik>

    </AppPage>
  )
}
