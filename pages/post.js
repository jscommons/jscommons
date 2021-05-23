import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Formik, Form, Field } from 'formik'
import AppPage from '../components/AppPage.js'
import { supabase } from '../lib/initSupabase.js'
import { AppContext } from '../lib/context.js'

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
          <Form>

            <Field
              name="title"
            />

            <Field
              name="link"
            />

            <Field
              type="textarea"
              name="body"
            />

            <button type="submit">
              Submit Post
            </button>

          </Form>
        )}
      </Formik>

    </AppPage>
  )
}
