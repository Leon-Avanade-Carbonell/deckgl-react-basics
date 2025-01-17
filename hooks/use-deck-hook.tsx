import { mapViewStateAtom } from '@/store/map-atom'
import { useSetAtom } from 'jotai'
import { useCallback } from 'react'

export default function useDeckHook() {
  const setMapViewState = useSetAtom(mapViewStateAtom)

  const flyToCoordinate = useCallback(
    ({
      latitude,
      longitude,
      zoom = 12,
    }: {
      latitude: number
      longitude: number
      zoom?: number
    }) => {
      setMapViewState((view) => ({
        ...view,
        longitude,
        latitude,
        zoom,
      }))
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return { flyToCoordinate }
}
