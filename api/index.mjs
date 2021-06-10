import nrg from '@ianwalter/nrg'

import queryPosts from './middleware/queryPosts.js'
import getPost from './middleware/getPost.js'
import addPost from './middleware/addPost.js'
import vote from './middleware/vote.js'

const app = nrg.createApp({
  name: 'JS Commons',
  next: { enabled: true },
  db: { client: 'mysql' }
})

app.get('/api/session', ...nrg.session)

app.post('/api/sign-in', ...nrg.login)

app.get('/api/posts', queryPosts)

app.get('/api/posts/:id', getPost)

app.post('/api/posts', addPost)

app.post('/api/vote', vote)

export default app
