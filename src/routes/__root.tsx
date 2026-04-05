import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import '../styles.css'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1, interactive-widget=resizes-content',
      },
      {
        title: 'Chat with Bun Bun 🐰',
      },
    ],
  }),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
        <script src="https://www.google.com/recaptcha/api.js?render=6Ld8_pksAAAAALv2qpW4VKcwQMV5gXyCdG85A8GE" async defer />
      </body>
    </html>
  )
}
