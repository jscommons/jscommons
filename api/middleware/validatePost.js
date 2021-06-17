import { SchemaValidator, isString, isUrl } from '@ianwalter/nrg-validation'

const canBeEmptyIfReply = {
  validate (input, state, ctx) {
    if (ctx.input.threadId && ctx.input.parentId) return { isValid: true }
    return { isValid: input?.length }
  }
}
const canBeEmptyIfPost = {
  validate (input, state, ctx) {
    if (ctx.input.title && ctx.input.link) return { isValid: true }
    return { isValid: input?.length }
  }
}
const postValidator = new SchemaValidator({
  title: { isString, canBeEmptyIfReply },
  link: { isString, isUrl, canBeEmptyIfReply },
  body: { isString, canBeEmptyIfPost },
  threadId: { isString, canBeEmptyIfPost },
  parentId: { isString, canBeEmptyIfPost }
})

export default async function validatePost (ctx, next) {
  const logger = ctx.logger.ns('validation.post')
  logger.debug('Validate post')

  const validation = await postValidator.validate(ctx.req.body)
  if (validation.isValid) {
    return next()
  } else {
    logger.warn('Validate post failed', validation.feedback)
    logger.debug('Validate post failed', validation)

    ctx.status = 400
    ctx.body = { feedback: validation.feedback }
  }
}
