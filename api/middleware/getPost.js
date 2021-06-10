import Post from '../models/Post.mjs'

export default async function getPost (ctx) {
  ctx.body = await Post.query()
    .withGraphJoined('[author, replies]')
    .findById(ctx.params.id)
}
