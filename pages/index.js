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
      let query = supabase.from('scored_posts')

      if (ctx.profile.id) {
        query = query
          .select('*, author(username), votes(*)')
          .eq('votes.profile_id', ctx.profile.id)
      } else {
        query = query.select('*, author(username)')
      }

      query
        .eq('scored_posts.author', 'profiles.id')
        .is('parent_id', null)
        .order('total_score', { ascending: false })
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
