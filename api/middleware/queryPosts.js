import { raw } from 'objection'
import Post from '../models/Post.mjs'

export default async function queryPosts (ctx) {
  const {
    orderBy = 'score'
  } = ctx.query

  const query = Post.query()
    .select(
      'posts.*',
      raw(`
        COALESCE(
          (SELECT SUM(votes.value) FROM votes WHERE post_id = posts.id),
          0
        ) +
        (
          (UNIX_TIMESTAMP(posts.created_at) - UNIX_TIMESTAMP(NOW())) /
          (60 * 60 * 24)
        ) +
        posts.reply_count
      `).as('score')
    )
    .withGraphJoined('author')

  if (ctx.session.account?.id) {
    query
      .withGraphJoined('votes')
      .modifyGraph(b => b.where('votes.accountId', ctx.session.account.id))
  }

  ctx.body = await query.orderBy(orderBy, 'DESC').limit(30)
}
