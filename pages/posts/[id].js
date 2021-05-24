import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import AppPage from '../../components/AppPage.js'
import { supabase } from '../../lib/initSupabase.js'
import container from '../../styles/container.js'

export default function Post () {
  const router = useRouter()
  const [post, setPost] = useState()

  useEffect(
    () => {
      if (router.query.id) {
        supabase
          .from('posts')
          .select('*')
          .eq('id', router.query.id)
          .then(({ data, error }) => {
            if (error) {
              console.error(error)
            } else {
              console.info('Post data', data)
              const [post] = data || []
              setPost(post)
            }
          })
      }
    },
    [
      router
    ]
  )

  return (
    <AppPage>
      <div className={clsx(container, 'my-8')}>

        {post && (
          <div>

            <h1 className="text-2xl font-medium">
              {post.title}
            </h1>

            <p className="text-lg mt-2">
              {post.body}
            </p>

          </div>
        )}

        {!post && (
          <div>
            Post not found
          </div>
        )}

      </div>
    </AppPage>
  )
}
