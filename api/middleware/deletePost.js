import Post from '../models/Post.mjs'

export default async function deletePost (ctx) {
  const post = await Post.query().findOne({
    id: ctx.params.id,
    accountId: ctx.session.account.id
  })

  await post.$query().patch({ deleted: true })

  ctx.status = 204
}
