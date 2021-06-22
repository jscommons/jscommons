import Post from '../models/Post.mjs'

export default async function getPost (ctx) {
  const query = Post.query()
    .withGraphJoined('[author, replies.[author, votes]]')

  if (ctx.session.account?.id) {
    query
      .withGraphJoined('votes')
      .modifyGraph(b => b.where('votes.accountId', ctx.session.account.id))
  }

  const post = await query
    .omit(['password', 'enabled', 'emailVerified'])
    .findById(ctx.params.id)

  if (post.deleted) {
    delete post.title
    delete post.link
    post.body = '[deleted]'
  }

  ctx.body = post
}
