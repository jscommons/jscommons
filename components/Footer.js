import clsx from 'clsx'
import AppLink from '../components/AppLink.js'
import container from '../styles/container.js'

const links = [
  { name: 'Top', href: '/' },
  { name: 'Latest', href: '/latest' },
  { name: 'Post', href: '/post' }
]

export default function Footer () {
  return (
    <div className={clsx(container, 'text-center text-gray-500')}>

      <nav
        className="-mx-4 -my-2 flex flex-wrap justify-center"
        aria-label="Footer"
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

      <div className="mt-6">
        Copyright &copy; 2021 JS Commons. All rights reserved.
      </div>

    </div>
  )
}
