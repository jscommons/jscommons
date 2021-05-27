import { useState, useEffect, useContext } from 'react'
import clsx from 'clsx'
import { supabase } from '../lib/initSupabase.js'
import { AppContext } from '../lib/context.js'
import AppPage from '../components/AppPage.js'
import PostList from '../components/PostList.js'
import container from '../styles/container.js'

export default function Top () {
  const ctx = useContext(AppContext)
  const [posts, setPosts] = useState()

  useEffect(
    () => {
      supabase
        .rpc('get_top_posts', { profile_id: ctx.profile.id })
        .then(({ data, error }) => {
          if (error) {
            console.error(error)
          } else {
            console.info('Posts data', data)
            setPosts(data)
          }
        })
    },
    [ctx.profile.id]
  )

  return (
    <AppPage>
      <div className={clsx(container, 'my-8')}>
        <PostList posts={posts} />
      </div>
    </AppPage>
  )
}
