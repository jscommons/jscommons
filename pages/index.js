import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { supabase } from '../lib/initSupabase.js'
import AppPage from '../components/AppPage.js'
import AppLink from '../components/AppLink.js'
import container from '../styles/container.js'

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
      <div className={clsx(container, 'my-8')}>

        {posts?.map(post => (
          <div key={post.id}>
            <AppLink href={post.link || ('/posts/' + post.id)}>
              {post.title}
            </AppLink>
          </div>
        ))}

      </div>
    </AppPage>
  )
}
