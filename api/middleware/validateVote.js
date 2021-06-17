import { SchemaValidator, isString, isNumber } from '@ianwalter/nrg-validation'

const isVoteValue = {
  validate (input) {
    return { isValid: input >= 0 && input <= 1 }
  }
}
const voteValidator = new SchemaValidator({
  value: { isNumber, isVoteValue },
  postId: { isString }
})

export default async function validateVote (ctx, next) {
  const logger = ctx.logger.ns('validation.vote')
  logger.debug('Validate vote')

  const validation = await voteValidator.validate(ctx.req.body)
  if (validation.isValid) {
    return next()
  } else {
    logger.warn('Validate vote failed', validation.feedback)
    logger.debug('Validate vote failed', validation)

    ctx.status = 400
    ctx.body = { feedback: validation.feedback }
  }
}
