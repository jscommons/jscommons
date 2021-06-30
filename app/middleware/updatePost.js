export default async function updatePost (ctx) {
  try {
    ctx.logger.debug('Add post', ctx.req.body)
  } catch (err) {
    console.error('ERROR', err)
  }
}
