// import { useContext } from 'react'
// import { useRouter } from 'next/router'
import { Formik, Form } from 'formik'
import clsx from 'clsx'
// import { AppContext } from '../lib/context.js'
import TextareaControl from '../components/controls/TextareaControl.js'
import primaryButton from '../styles/buttons/primaryButton.js'

export default function ReplyForm (props) {
  // const ctx = useContext(AppContext)
  // const router = useRouter()

  async function submitPost (values, { setSubmitting }) {
    setSubmitting(true)

    // const { data, error } = await supabase
    //   .from('posts')
    //   .insert({ ...values, profile_id: ctx.profile.id })

    // if (error) {
    //   console.error(error)
    // } else {
    //   console.info('Post data', data)
    //   const [post] = data || []
    //   // TODO:
    //   router.push(`/posts/${post.id}`)
    // }
  }

  return (
    <Formik
      initialValues={{ parent_id: props.parentId, body: '' }}
      onSubmit={submitPost}
    >
      {() => (
        <Form className="my-8 grid gap-6">

          <TextareaControl
            id="body"
            required={true}
            label="Reply"
          />

          <button
            type="submit"
            className={clsx(primaryButton, 'w-48 mt-2')}
          >
            Submit Reply
          </button>

        </Form>
      )}
    </Formik>
  )
}
