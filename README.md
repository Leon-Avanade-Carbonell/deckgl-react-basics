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

For simplicity of the application, we can use the default settings for the Shadcn components

```bash
npx shadcn@latest init -d
npx shadcn@latest add button select input
```

# Building the Map components

## BaseMap

We want to create a BaseMap that will be used to contain the DeckGL component and the tiles.
Create a new file `components/map/base-map.tsx`

```tsx
'use client'

import DeckGL, { DeckGLProps } from '@deck.gl/react'
import { FlyToInterpolator } from 'deck.gl'
import Map from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'

interface IBaseMapProps extends DeckGLProps {
  height?: string
  width?: string
}

export default function BaseMap({
  height = '100vh',
  width = '100vw',
  ...props
}: IBaseMapProps) {
  return (
    <DeckGL
      initialViewState={{
        zoom: 3.5,
        longitude: -122.4,
        latitude: 37.74,
        pitch: undefined,
        bearing: undefined,
        transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
        transitionDuration: 'auto',
      }}
      style={{ height, width }}
      controller
      {...props}
    >
      <Map
        id="base-map"
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      />
    </DeckGL>
  )
}
```

We can now treat the DeckGL map as a React component

## Creating Layers

For this section of the application, we will take advantage of the Jotai state-management library. This enables use to access state from wherever within the app.

Create a new atom `/store/layers-atom.tsx`

```tsx
import { Layer } from 'deck.gl'
import { atom } from 'jotai'

export type LayerByIDType = {
  id: string
  layer: Layer
}

export const layersAtom = atom<Record<string, Layer>>({})
```

In the `components/map/basemap.tsx` we would want to import the atom and add all the layers in the DeckGL component

```tsx
import { layersAtom } from '@/store/layers-atom'

function BaseMap() {
  const layersMap = useAtomValue(layersAtom)
  const layers = Object.values(layersMap)

  return (
        <DeckGL
          {/* {...props} */}
          layers={layers}
        >
        {/*rest of the codes*/}
        </DeckGL >
  )

}
```

We can now add layers to the DeckGL component with the layers atom.

To simplify adding the layers, we can create a hook that updates the layersAtom.
Create a file `/hooks/use-deck-hook.tsx`

```tsx
import { LayerByIDType, layersAtom } from '@/store/layers-atom'
import { useSetAtom } from 'jotai'

export default function useDeckHook() {
  // We want to be able to index the layers for accessibility
  const setLayerById = ({ id, layer }: LayerByIDType) =>
    setLayers((layers) => ({ ...layers, [id]: layer }))

  return { setLayerById }
}
```

Now that we have access to adding layers, we can start building out one.
We can start with a sample component from DeckGL: https://deck.gl/docs/api-reference/layers/icon-layer

Create a file `/components/map/layers/basic.tsx`

```tsx
import useDeckHook from '@/hooks/use-deck-hook'
import { ScatterplotLayer } from 'deck.gl'

type BartStation = {
  name: string
  entries: number
  exits: number
  coordinates: [longitude: number, latitude: number]
}

export default function BasicLayer() {
  const id = 'basic-layer'

  const { setLayerById } = useDeckHook()
  setLayerById({
    id,
    layer: new ScatterplotLayer<BartStation>({
      id: 'ScatterplotLayer',
      data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json',

      stroked: true,
      getPosition: (d: BartStation) => d.coordinates,
      getRadius: (d: BartStation) => Math.sqrt(d.exits),
      getFillColor: [255, 140, 0],
      getLineColor: [0, 0, 0],
      getLineWidth: 10,
      radiusScale: 6,
      pickable: true,
    }),
  })

  return null
}
```

To check out your reactive layer, you can create a new client-side component and add it to your page

```tsx
'use client'

import BaseMap from '@/components/map/base-map'
import BasicLayer from '@/components/map/layers/basic'

export default function MapComponent() {
  return (
    <>
      <BasicLayer />
      <BaseMap height="100vh" width="80vw" />
    </>
  )
}
```

## Interactivity

If we want to manage the camera / view, we can pass a state to the viewState parameter of the DeckGL component.
See [https://deck.gl/docs/developer-guide/interactivity#externally-manage-view-state](https://deck.gl/docs/developer-guide/interactivity#externally-manage-view-state)

First is to create an atom for the mapViewState.
Create a file `store\map-atom.tsx`

```tsx
import { FlyToInterpolator, MapViewState } from 'deck.gl'
import { atom } from 'jotai'

export const mapViewStateAtom = atom<MapViewState>({
  zoom: 3.5,
  latitude: -27,
  longitude: 135,
  transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
  transitionDuration: 'auto',
})
```

In the basemap, use the mapViewStateAtom and replace the initialViewState

```diff
+ const mapViewState = useAtomValue(mapViewStateAtom)

- initialViewState={{
-   zoom: 3.5,
-   longitude: -122.4,
-   latitude: 37.74,
-   pitch: undefined,
-   bearing: undefined,
-   transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
-   transitionDuration: 'auto',
- }}
+ initialViewState={mapViewState}
```

Now when we update the value of the mapViewStateAtom, the map will pdate the map based on the change in state

### Fly to function

Using the mapViewStateAtom, we can create a function in the use-deck-hook page that we can reuse anywhere in the application

```diff
export default function useDeckHook() {

+ const flyToCoordinate = useCallback(
+   ({
+     latitude,
+     longitude,
+     zoom = 12,
+   }: {
+     latitude: number
+     longitude: number
+     zoom?: number
+   }) => {
+     setMapViewState((view) => ({
+       ...view,
+       longitude,
+       latitude,
+       zoom,
+     }))
+   },
+   // eslint-disable-next-line react-hooks/exhaustive-deps
+   []
+ )

- return { setLayerById }
+ return { flyToCoordinate, setLayerById }

}

```

### Hiding and showing layers

### Async data and composite layers
