import kdotRedis from '@generates/kdot-redis'

const config = {
  context: 'do-nyc1-prod',
  namespace: 'jscommons',
  apps: {
    redis: kdotRedis({ tag: '6', localPort: 11020 }),
    jscommons: {
      image: { repo: 'ghcr.io/jscommons/jscommons' },
      ports: {
        app: { port: 11019 }
      },
      dependsOn: ['redis'],
      env: {
        PORT: '11019',
        REDIS_HOST: 'redis',
        REDIS_PORT: '11020'
      },
      secrets: {
        app: { env: ['APP_KEYS'] },
        db: { keys: ['DB_URL'] }
      }
    }
  },
  secrets: {
    db: { env: ['DB_URL'] }
  }
}

export default config
