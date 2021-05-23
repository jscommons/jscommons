import { useState, useEffect } from 'react'
import { supabase } from '../lib/initSupabase.js'
import AppPage from '../components/AppPage.js'

export default function Top () {
  const [posts, setPosts] = useState()

  useEffect(
    () => {
      supabase
        .from('posts')
        .select('*')
        .then(({ data, error }) => {
          if (error) {
            console.error(error)
          } else {
            console.info('Posts data', data)
            setPosts(data)
          }
        })
    },
    []
  )

  return (
    <AppPage>

      {posts?.map(post => (
        <div key={post.id}>
          {post.title}
        </div>
      ))}

    </AppPage>
  )
}
