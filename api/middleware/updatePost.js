export default async function addPost (ctx) {
  try {
    ctx.logger.debug('Add post', ctx.req.body)

    ctx.body = await prisma.posts.create({ data: ctx.req.body })
  } catch (err) {
    console.error('ERROR', err)
  }
}
