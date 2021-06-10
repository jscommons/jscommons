import Vote from '../models/Vote.mjs'

export default async function vote (ctx) {
  const vote = await Vote.query().findOne({
    postId: ctx.req.body.postId,
    accountId: ctx.session.account.id
  })

  if (vote) {
    await vote.$query().patch({ value: ctx.req.body.value })
    ctx.body = vote
  } else {
    ctx.body = await Vote.query().insert({
      value: ctx.req.body.value,
      postId: ctx.req.body.postId,
      accountId: ctx.session.account.id
    })
  }
}
