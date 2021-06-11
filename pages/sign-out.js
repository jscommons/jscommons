import { useEffect, useContext, useRef } from 'react'
import { AppContext } from '../lib/context.js'

export default function SignOutPage () {
  const ctx = useContext(AppContext)
  const signOut = useRef(ctx.signOut)

  useEffect(
    () => ctx.account.id && signOut.current(),
    [
      ctx.account.id,
      signOut
    ]
  )

  return (
    <div>
      Logging out...
    </div>
  )
}
