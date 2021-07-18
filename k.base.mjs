import kdotRedis from '@generates/kdot-redis'

const config = {
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
        'db-credentials': {
          values: [
            'APP_KEYS',
            'DB_URL'
          ]
        }
      }
    }
  }
}

export default config
