const defaultErrorMessage = `
  There was an issue performing your action. Please try again later or contact
  support if you would like help resolving this issue.
`
const defaultRequestErrorMessage = `
  There was an issue communicating with our servers. Please try again later or
  contact support if you would like help resolving this issue.
`

export default function reduceError (err = {}) {
  const reduced = { level: 'error', message: defaultErrorMessage, err: {} }
  const { request, response } = err

  if (request) {
    // Add some request/response information to the err that will get logged.
    reduced.err.request = { headers: request.headers }
    reduced.err.response = { body: response.body }

    // Set the error message to the message that was returned with the response
    // or a generic request error.
    reduced.message = response.body?.message || defaultRequestErrorMessage

    // Return any field-level validation feedback contained in the respinse.
    if (response.body?.feedback) reduced.feedback = response.body.feedback

    // Set the error level based on the response status.
    if (response.status > 399 && response.status < 500) reduced.level = 'warn'
  } else {
    // If the error is not a request error, log the error as is.
    reduced.err = err
  }

  return reduced
}
