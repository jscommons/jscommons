import { subDays } from 'date-fns'
import { accounts } from './01_accounts.mjs'

const earlier = subDays(new Date(), 0.5)

export const posts = {
  nrg: {
    id: 'nrg',
    title: '@ianwalter/nrg - A batteries-included Node.js web framework',
    link: 'https://github.com/ianwalter/nrg',
    body: `
      I'm working on a Node.js web framework that basically takes Koa and adds
      a layer on top of it to make common application use cases like sessions,
      database connections, and testing easier to set up.
    `,
    accountId: accounts.general.id,
    createdAt: earlier,
    updatedAt: earlier
  },
  headlessui: {
    id: 'headlessui',
    title: 'Headless UI',
    link: 'https://headlessui.dev/',
    body: `
      Completely unstyled, fully accessible UI components, designed to integrate
      beautifully with Tailwind CSS.
    `,
    accountId: accounts.general.id
  }
}

export async function seed (knex) {
  await knex('posts').del()
  await knex('posts').insert(Object.values(posts))
}
