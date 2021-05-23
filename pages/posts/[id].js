import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import AppPage from '../../components/AppPage.js'
import { supabase } from '../../lib/initSupabase.js'

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
              const [post] = data || []

              if (!post) console.error('No post data', data)

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

      {post && (
        <div>

          {post.title}

          {post.body}

        </div>
      )}

      {!post && (
        <div>
          Post not found
        </div>
      )}

    </AppPage>
  )
}
