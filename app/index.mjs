import nrg from '@ianwalter/nrg'
import { PSDB } from 'planetscale-node'
import Account from './models/Account.mjs'
import queryPosts from './middleware/queryPosts.js'
import getPost from './middleware/getPost.js'
import addPost from './middleware/addPost.js'
import updatePost from './middleware/updatePost.js'
import deletePost from './middleware/deletePost.js'
import vote from './middleware/vote.js'
import validatePost from './middleware/validatePost.js'
import validateVote from './middleware/validateVote.js'

const db = new PSDB(process.env.DB_BRANCH || 'main')

// Workaround.
db.enabled = true

const app = nrg.createApp({
  name: 'JS Commons',
  next: { enabled: true },
  db,
  accounts: {
    models: { Account }
  }
})

app.post('/api/log', ...nrg.clientLogging)

app.get('/api/session', ...nrg.session)

app.post('/api/sign-up', ...nrg.registration)

app.post('/api/sign-in', ...nrg.login)

app.delete('/api/sign-out', ...nrg.logout)

app.post('/api/forgot-password', ...nrg.forgotPassword)

app.put('/api/account', ...nrg.accountUpdate)

app.get('/api/posts', queryPosts)

app.get('/api/posts/:id', getPost)

app.post('/api/posts', validatePost, addPost)

// Allow users to update their post.
app.put('/api/posts/:id', validatePost, updatePost)

// Allow users to vote on a post.
app.post('/api/vote', validateVote, vote)

// Allow users to delete their posts.
app.delete('/api/posts/:id', deletePost)

export default app
