'use client'

import DeckGL, { DeckGLProps } from '@deck.gl/react'
import Map from 'react-map-gl/maplibre'
import 'maplibre-gl/dist/maplibre-gl.css'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import {
  currentViewStateAtom,
  defaultViewState,
  mapViewStateAtom,
} from '@/store/map-atom'
import { layersAtom } from '@/store/layers-atom'
import { MapViewState } from 'deck.gl'
import { useEffect } from 'react'

interface IBaseMapProps extends DeckGLProps {
  height?: string
  width?: string
  customStyle?: Partial<CSSStyleDeclaration>
  initialViewState?: MapViewState
}

export default function BaseMap({
  height = '100vh',
  width = '100vw',
  customStyle = {},
  initialViewState = defaultViewState,
  ...props
}: IBaseMapProps) {
  const [mapViewState, setMapViewState] = useAtom(mapViewStateAtom)
  const setCurrentViewState = useSetAtom(currentViewStateAtom)

  const layersMap = useAtomValue(layersAtom)
  const layers = Object.values(layersMap)

  useEffect(() => {
    setMapViewState(initialViewState)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <DeckGL
      initialViewState={mapViewState}
      onViewStateChange={(e) => setCurrentViewState(e.viewState)}
      style={{ ...customStyle, height, width, position: 'relative' }}
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
