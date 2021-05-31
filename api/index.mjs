import nrg from '@ianwalter/nrg'

const app = nrg.createApp({
  name: 'JS Commons',
  db: { connection: process.env.DATABASE_URL }
})

export default app
