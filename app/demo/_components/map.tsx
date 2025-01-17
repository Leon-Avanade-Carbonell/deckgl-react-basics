'use client'

import 'maplibre-gl/dist/maplibre-gl.css'
import BaseMap from '@/components/map/base-map'
import useDeckHook from '@/hooks/use-deck-hook'

export default function MapComponent() {
  const { flyToCoordinate } = useDeckHook()

  return (
    <>
      <div className="flex-row- flex justify-between">
        <div className="w-[75%]" style={{ width: '75%' }}>
          <BaseMap height="100vh" width="80vw" />
        </div>
        <div>
          <button
            onClick={() => {
              flyToCoordinate({ longitude: -122.4, latitude: 37.74 })
            }}
          >
            Test
          </button>
        </div>
      </div>
    </>
  )
}
