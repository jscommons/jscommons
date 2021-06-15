import { http } from '@ianwalter/http'

const logger = {}
for (const level of ['debug', 'info', 'warn', 'error']) {
  logger[level] = function (...args) {
    if (level === 'debug' && process.env.NODE_ENV !== 'production') {
      console.debug(...args)
    } else if (level !== 'debug') {
      console[level](...args)
      http.post('/api/log', { body: { message: { level, args } } })
    }
  }
}

export default logger
