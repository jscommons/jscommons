import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { supabase } from '../lib/initSupabase.js'
import AppPage from '../components/AppPage.js'
import PostList from '../components/PostList.js'
import container from '../styles/container.js'

export default function Top () {
  const [posts, setPosts] = useState()

  useEffect(
    () => {
      supabase
        .from('scored_posts')
        .select('*, author(username)')
        .eq('scored_posts.author', 'profiles.id')
        .order('score', { ascending: false })
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
        <PostList posts={posts} />
      </div>
    </AppPage>
  )
}
