import { raw } from 'objection'
import Post from '../models/Post.mjs'

export default async function queryPosts (ctx) {
  const {
    orderBy = 'score'
  } = ctx.query

  ctx.body = await Post.query()
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
    .withGraphJoined('[author, votes]')
    .where('votes.accountId', ctx.session.account.id)
    .orderBy(orderBy, 'DESC')
    .limit(30)
}
