import { useContext } from 'react'
import { Auth } from '@supabase/ui'
import Link from 'next/link'
import { AppContext } from '../lib/context.js'

export default function Header () {
  const { user } = Auth.useUser()
  const ctx = useContext(AppContext)

  return (
    <div>

      <h1>
        <Link href="/">
          <a>JS Commons</a>
        </Link>
      </h1>

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
