import 'tailwindcss/tailwind.css'
import { useState } from 'react'
import { Auth } from '@supabase/ui'
import * as dotter from '@generates/dotter'
import { merge } from '@generates/merger'
import { supabase } from '../lib/initSupabase.js'
import { defaultContext, AppContext } from '../lib/context.js'

export default function App ({ Component, pageProps }) {
  const [ctx, setCtx] = useState(defaultContext)

  ctx.update = function updateContext (key, value) {
    // Merge the updates values into the context object.
    if (typeof key === 'string') key = dotter.set({}, key, value)
    const updated = merge({}, ctx, key)

    // Update the context state.
    setCtx(updated)
  }

  return (
    <Auth.UserContextProvider supabaseClient={supabase}>
      <AppContext.Provider value={ctx}>
        <Component {...pageProps} />
      </AppContext.Provider>
    </Auth.UserContextProvider>
  )
}
