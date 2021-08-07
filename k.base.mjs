import kdotRedis from '@generates/kdot-redis'

const config = {
  context: 'do-nyc1-prod',
  namespace: 'jscommons',
  apps: {
    redis: kdotRedis({ tag: '6', localPort: 11020 }),
    jscommons: {
      image: { repo: 'generates/jscommons' },
      ports: {
        app: { port: 11019, hosts: ['jscommons.com'] }
      },
      dependsOn: ['redis'],
      env: {
        PORT: '11019',
        REDIS_HOST: 'redis',
        REDIS_PORT: '6379',
        APP_BASE_URL: 'https://jscommons.com'
      },
      secrets: {
        app: { env: ['APP_KEYS'] },
        db: { keys: ['DB_URL'] },
        email: { keys: ['POSTMARK_API_KEY'] }
      }
    }
  },
  secrets: {
    db: { env: ['DB_URL'] },
    email: { env: ['POSTMARK_API_KEY'] }
  },
  imagePullPolicy: 'Always'
}

export default config
