import nrg from '@ianwalter/nrg'
import Account from './models/Account.mjs'
import queryPosts from './middleware/queryPosts.js'
import getPost from './middleware/getPost.js'
import addPost from './middleware/addPost.js'
import updatePost from './middleware/updatePost.js'
import vote from './middleware/vote.js'
import validatePost from './middleware/validatePost.js'
import validateVote from './middleware/validateVote.js'

const app = nrg.createApp({
  name: 'JS Commons',
  next: { enabled: true },
  db: { client: 'mysql' },
  accounts: {
    models: { Account }
  }
})

app.get('/api/session', ...nrg.session)

app.post('/api/sign-in', ...nrg.login)

app.delete('/api/sign-out', ...nrg.logout)

app.post('/api/forgot-password', ...nrg.forgotPassword)

app.get('/api/posts', queryPosts)

app.get('/api/posts/:id', getPost)

app.post('/api/posts', validatePost, addPost)

// Allow users to update their post.
app.put('/api/posts/:id', validatePost, updatePost)

// Allow users to vote on a post.
app.post('/api/vote', validateVote, vote)

export default app
