import { useContext } from 'react'
import { css } from '@stitches/react'
import Link from 'next/link'
import clsx from 'clsx'
import { StyledDiv } from '@generates/swag'
import { UserMenu, StyledUserMenuItem } from '@generates/swag-squad'
import { HiOutlineAdjustments, HiOutlineLogout } from 'react-icons/hi'
import { AppContext } from '../lib/context.js'
import BrandHeading from '../components/BrandHeading.js'
import container from '../styles/container.js'
import AppLink from '../components/AppLink.js'
import { useRouter } from 'next/router'

const links = [
  { name: 'Top', href: '/' },
  { name: 'Latest', href: '/latest' },
  { name: 'Submit', href: '/submit' }
]
const navIcon = css({ marginRight: '.5em', fontSize: '1.25em' })()

export default function Header () {
  const ctx = useContext(AppContext)
  const router = useRouter()

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
              <UserMenu css={{
                avatar: {
                  fontSize: '1.5em',
                  color: '#171717',
                  background: '#FDDC35'
                }
              }}>
                <StyledDiv css={{ display: 'grid' }}>

                  <StyledUserMenuItem onClick={() => router.push('/account')}>

                    <HiOutlineAdjustments className={navIcon} />

                    Account Settings

                  </StyledUserMenuItem>

                  <StyledUserMenuItem onClick={ctx.signOut}>

                    <HiOutlineLogout className={navIcon} />

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
