import { useState, useEffect, useContext } from 'react'
import clsx from 'clsx'
import { http } from '@ianwalter/http'
import { AppContext } from '../lib/context.js'
import AppPage from '../components/AppPage.js'
import PostList from '../components/PostList.js'
import container from '../styles/container.js'

export default function TopPage () {
  const ctx = useContext(AppContext)
  const [posts, setPosts] = useState()

  useEffect(
    () => {
      http
        .get('/api/posts?orderBy=score')
        .then(res => {
          console.info('Posts data', res.body)
          setPosts(res.body)
        })
        .catch(err => {
          console.error(err)
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
