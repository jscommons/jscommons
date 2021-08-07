import { useContext } from 'react'
import { css } from '@stitches/react'
import Link from 'next/link'
import Image from 'next/image'
import clsx from 'clsx'
import { StyledDiv, StyledLink, StyledMenuItem } from '@generates/swag'
import { UserMenu } from '@generates/swag-squad'
import { HiOutlineAdjustments, HiOutlineLogout } from 'react-icons/hi'
import { AppContext } from '../lib/context.js'
import container from '../styles/container.js'
import AppLink from '../components/links/AppLink.js'

const navIcon = css({ marginRight: '.5em', fontSize: '1.25em' })()

export default function Header () {
  const ctx = useContext(AppContext)

  const links = [
    { name: 'Top', href: '/' },
    { name: 'Latest', href: '/latest' },
    { name: 'Submit', href: ctx.account.id ? '/submit' : '/sign-in?to=/submit' }
  ]

  return (
    <div className={clsx(container, 'flex items-center mt-6')}>

      <Link href="/" passHref={true}>
        <StyledLink css={{ height: '35px' }}>
          <Image
            src="/img/jscommons-logo-yellow.svg"
            height="35"
            width="150"
            alt="JS Commons"
          />
        </StyledLink>
      </Link>

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
              <UserMenu css={{
                avatar: {
                  fontSize: '1.5em',
                  color: '#171717',
                  background: '#FDDC35'
                }
              }}>
                <StyledDiv css={{ display: 'grid' }}>
                  <Link href="/account">
                    <a>
                      <StyledMenuItem>

                        <HiOutlineAdjustments className={navIcon} />

                        Account Settings

                      </StyledMenuItem>
                    </a>
                  </Link>

                  <Link href="/sign-out">
                    <a>
                      <StyledMenuItem onClick={ctx.signOut}>

                        <HiOutlineLogout className={navIcon} />

                        Sign Out

                      </StyledMenuItem>
                    </a>
                  </Link>

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
