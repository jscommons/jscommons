import { useState, useEffect } from 'react'
import clsx from 'clsx'
import { http } from '@ianwalter/http'
import AppPage from '../components/AppPage.js'
import PostList from '../components/lists/PostList.js'
import container from '../styles/container.js'
import logger from '../lib/clientLogger.js'

export default function TopPage () {
  const [posts, setPosts] = useState()

  useEffect(
    () => {
      http
        .get('/api/posts?orderBy=score')
        .then(res => {
          logger.debug('Posts data', res.body)
          setPosts(res.body)
        })
        .catch(err => logger.error('Top posts', err))
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
