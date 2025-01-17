'use client'

import DeckGL, { DeckGLProps } from '@deck.gl/react'
import Map from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useAtomValue } from 'jotai'
import { mapViewStateAtom } from '@/store/map-atom'
import { layersAtom } from '@/store/layers-atom'

interface IBaseMapProps extends DeckGLProps {
  height?: string
  width?: string
}

export default function BaseMap({
  height = '100vh',
  width = '100vw',
  ...props
}: IBaseMapProps) {
  const mapViewState = useAtomValue(mapViewStateAtom)

  const layersMap = useAtomValue(layersAtom)
  const layers = Object.values(layersMap)
  return (
    <DeckGL
      initialViewState={mapViewState}
      style={{ height, width, position: 'relative' }}
      controller
      layers={layers}
      {...props}
    >
      <Map
        id="base-map"
        mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
      />
    </DeckGL>
  )
}
