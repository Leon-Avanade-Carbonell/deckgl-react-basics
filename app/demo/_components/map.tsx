'use client'

import 'maplibre-gl/dist/maplibre-gl.css'
import BaseMap, { mapViewStateAtom } from '@/components/map/base-map'
import { useSetAtom } from 'jotai'
import { useCallback } from 'react'
import { FlyToInterpolator } from 'deck.gl'

export default function MapComponent() {
  const setMapViewState = useSetAtom(mapViewStateAtom)

  const flyToCity = useCallback(
    ({ lat, lon }: { lat: number; lon: number }) => {
      setMapViewState((view) => ({
        ...view,
        longitude: lon,
        latitude: lat,
        zoom: 12,
        transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
        transitionDuration: 'auto',
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  return (
    <>
      <div className="flex-row- flex justify-between">
        <div className="grow">
          <BaseMap height="80vh" width="500px" />
        </div>
        <div>
          <button onClick={() => flyToCity({ lon: -122.4, lat: 37.74 })}>
            Test
          </button>
        </div>
      </div>
    </>
  )
}
