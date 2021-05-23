import { useContext } from 'react'
import { Auth } from '@supabase/ui'
import Link from 'next/link'
import clsx from 'clsx'
import { AppContext } from '../lib/context.js'
import BrandHeading from '../components/BrandHeading.js'
import container from '../styles/container.js'

export default function Header () {
  const { user } = Auth.useUser()
  const ctx = useContext(AppContext)

  return (
    <div className={clsx(container, 'mt-6')}>

      <BrandHeading />

      {user
        ? (
            <>

              <Link href="/post">
                <a>Post</a>
              </Link>

              <Link href="/logout">
                <a>Logout</a>
              </Link>

              {ctx.profile?.username}

            </>
          )
        : (
            <Link href="/login">
              <a>Login</a>
            </Link>
          )
      }

    </div>
  )
}
