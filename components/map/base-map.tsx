'use client'

import DeckGL, { DeckGLProps } from '@deck.gl/react'
import Map from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { FlyToInterpolator, MapViewState } from 'deck.gl'
import { atom, useAtomValue } from 'jotai'

interface IBaseMapProps extends DeckGLProps {
  height?: string
  width?: string
}

export const mapViewStateAtom = atom<MapViewState>({
  zoom: 3.5,
  latitude: -27,
  longitude: 135,
  pitch: undefined,
  bearing: undefined,
  transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
  transitionDuration: 'auto',
})

export default function BaseMap({
  height = '100vh',
  width = '100vw',
  ...props
}: IBaseMapProps) {
  const mapViewState = useAtomValue(mapViewStateAtom)
  return (
    <DeckGL
      initialViewState={mapViewState}
      //   viewState={mapViewState}
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
