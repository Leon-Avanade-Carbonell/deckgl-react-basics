'use client'

import { Map, useControl } from 'react-map-gl/maplibre'
import { MapboxOverlay } from '@deck.gl/mapbox'
import { DeckProps } from '@deck.gl/core'
import { ScatterplotLayer } from '@deck.gl/layers'
import 'maplibre-gl/dist/maplibre-gl.css'

function DeckGLOverlay(props: DeckProps) {
  const overlay = useControl<MapboxOverlay>(() => new MapboxOverlay(props))
  overlay.setProps(props)
  return null
}

export default function MapComponent() {
  const layers = [
    new ScatterplotLayer({
      id: 'deckgl-circle',
      data: [{ position: [0.45, 51.47] }],
      getPosition: (d) => d.position,
      getFillColor: [255, 0, 0, 100],
      getRadius: 1000,
      beforeId: 'watername_ocean', // In interleaved mode render the layer under map labels
    }),
  ]

  return (
    <Map
      initialViewState={{
        longitude: 0.45,
        latitude: 51.47,
        zoom: 11,
      }}
      style={{ height: '100vh' }}
      mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
    >
      <DeckGLOverlay layers={layers} />
    </Map>
  )
}
