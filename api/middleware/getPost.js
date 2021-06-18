import Post from '../models/Post.mjs'

export default async function getPost (ctx) {
  const query = Post.query().withGraphJoined('[author, replies]')

  if (ctx.session.account?.id) {
    query
      .withGraphJoined('votes')
      .modifyGraph(b => b.where('votes.accountId', ctx.session.account.id))
  }

  ctx.body = await query
    .omit(['password', 'enabled', 'emailVerified'])
    .findById(ctx.params.id)
}
