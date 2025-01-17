# Project Setup

```bash
npx create-next-app@latest
```

## Developer Experience for clean codes (optional)

```bash
npm install --save-dev prettier-eslint
npm install --save-dev prettier prettier-plugin-tailwindcss
npm install --save-dev @tanstack/eslint-plugin-query
```

Create a '.prettierrc' file in the root folder

```json
{
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": false,
  "singleQuote": true,
  "plugins": ["prettier-plugin-tailwindcss"]
}
```

## State Management Libraries

The Jotai library works as an alternative to React-Context which allows us to manage states globally (unless scoped)

```bash
npm install jotai
```

TanStack's React-query would be used for handling requests and have in-memory cache which would be used when hiding and showing layers with data

```bash
npm install @tanstack/react-query
npm install --save-dev @tanstack/eslint-plugin-query
```

You will need to create a component to wrap the necessary providers for these state management libraries to work

Create a file 'components/providers.tsx'

```tsx
'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactNode } from 'react'

export default function AppProviders({ children }: { children: ReactNode }) {
  const queryClient = new QueryClient()
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}
```

Then you will wrap RootLayout with the AppProviders.
Edit the `app/layout.tsx` page

```tsx
import AppProviders from '@/components/providers' {/* import the wrapper */}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* apply the wrapper here */}
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  )
}
```

## Mapping Component

```bash
npm install react-map-gl maplibre-gl
npm install deck.gl --save
```

In the DeckGL documents, we want to follow the guides for using map-libre with react-map-gl

## ShadCDN components

TBA

# Building the Map components

## BaseMap
