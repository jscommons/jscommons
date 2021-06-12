import { useContext } from 'react'
import Link from 'next/link'
import clsx from 'clsx'
import { StyledDiv } from '@generates/swag'
import { UserMenu, StyledUserMenuItem } from '@generates/swag-squad'
import { AppContext } from '../lib/context.js'
import BrandHeading from '../components/BrandHeading.js'
import container from '../styles/container.js'
import AppLink from '../components/AppLink.js'

const links = [
  { name: 'Top', href: '/' },
  { name: 'Latest', href: '/latest' },
  { name: 'Submit', href: '/submit' }
]

export default function Header () {
  const ctx = useContext(AppContext)

  return (
    <div className={clsx(container, 'flex items-center mt-6')}>

      <BrandHeading />

      <nav
        className="flex flex-wrap items-center ml-8"
        aria-label="Header"
      >

        {links.map(link => (
          <div key={link.name} className="px-5">
            <AppLink
              href={link.href}
              className={clsx(
                'text-lg hover:text-gray-100',
                'transition duration-200'
              )}
            >
              {link.name}
            </AppLink>
          </div>
        ))}

      </nav>

      <nav className="ml-auto">
        {ctx.account.id
          ? (
              <UserMenu name={ctx.account.username}>
                <StyledDiv css={{ display: 'grid' }}>

                  <StyledUserMenuItem>

                    Account Settings

                  </StyledUserMenuItem>

                  <StyledUserMenuItem onClick={ctx.signOut}>

                    Sign Out

                  </StyledUserMenuItem>

                </StyledDiv>
              </UserMenu>
            )
          : (
              <Link href="/sign-in">
                <a>Sign In</a>
              </Link>
            )
        }
      </nav>

    </div>
  )
}
