import 'tailwindcss/tailwind.css'
import 'nprogress/nprogress.css'
import { useState, useEffect } from 'react'
import { nanoid } from 'nanoid'
import { http } from '@ianwalter/http'
import Router from 'next/router'
import * as dotter from '@generates/dotter'
import { merge } from '@generates/merger'
import nprogress from 'nprogress'
import { defaultContext, AppContext } from '../lib/context.js'

nprogress.configure({ showSpinner: false })
Router.events.on('routeChangeStart', () => nprogress.start())
Router.events.on('routeChangeComplete', () => nprogress.done())
Router.events.on('routeChangeError', () => nprogress.done())

export default function App ({ Component, pageProps }) {
  const [ctx, setCtx] = useState(defaultContext)

  ctx.update = function updateContext (key, value) {
    // Merge the updates values into the context object.
    if (typeof key === 'string') key = dotter.set({}, key, value)
    const updated = merge({}, ctx, key)

    // Add the global http csrf-token header.
    http.options.headers = { 'csrf-token': updated.csrfToken }

    // Update the context state.
    setCtx(updated)
  }

  useEffect(
    () => {
      http.before = function httpBeforeHook (request) {
        request.headers['x-request-id'] = nanoid()
      }

      if (ctx.csrfToken === undefined) {
        http.get('/api/session').then(res => ctx.update(res.body))
      }
    },
    [ctx]
  )

  return (
    <AppContext.Provider value={ctx}>
      <Component {...pageProps} />
    </AppContext.Provider>
  )
}
