import { useContext } from 'react'
import { Auth } from '@supabase/ui'
import Link from 'next/link'
import clsx from 'clsx'
import { AppContext } from '../lib/context.js'
import BrandHeading from '../components/BrandHeading.js'
import container from '../styles/container.js'
import AppLink from '../components/AppLink.js'

const links = [
  { name: 'Top', href: '/' },
  { name: 'Latest', href: '/latest' },
  { name: 'Post', href: '/post' }
]

export default function Header () {
  const { user } = Auth.useUser()
  const ctx = useContext(AppContext)

  return (
    <div className={clsx(container, 'flex items-center mt-6')}>

      <BrandHeading />

      <nav
        className="flex flex-wrap ml-8"
        aria-label="Header"
      >

        {links.map(link => (
          <div key={link.name} className="px-4 py-2">
            <AppLink
              href={link.href}
              className="text-lg text-gray-400 hover:text-gray-200"
            >
              {link.name}
            </AppLink>
          </div>
        ))}

      </nav>

      <nav className="ml-auto">
        {ctx.profile
          ? (
              <div className="ml-auto">
                {ctx.profile.username}
              </div>
            )
          : (
              <Link href="/login">
                <a>Login</a>
              </Link>
            )
        }
      </nav>

    </div>
  )
}
