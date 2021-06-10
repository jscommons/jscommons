import Post from '../models/Post.mjs'

export default async function addPost (ctx) {
  ctx.body = await Post.query().insert({
    title: ctx.req.body.title,
    link: ctx.req.body.link,
    body: ctx.req.body.body,
    accountId: ctx.session.account.id,
    threadId: ctx.req.body.threadId,
    parentId: ctx.req.body.parentId
  })
}
