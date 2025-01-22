import {
  LayerByIDType,
  layersAtom,
  visibleLayersByIdAtom,
} from '@/store/layers-atom'
import { mapViewStateAtom } from '@/store/map-atom'
import { useAtom, useSetAtom } from 'jotai'
import { useCallback } from 'react'

export default function useDeckHook() {
  const setMapViewState = useSetAtom(mapViewStateAtom)
  const setLayers = useSetAtom(layersAtom)

  const [visibleLayers, setVisibleLayers] = useAtom(visibleLayersByIdAtom)

  const setLayerById = ({ id, layer }: LayerByIDType) =>
    setLayers((layers) => ({ ...layers, [id]: layer }))

  /**
   * Updates the map view state to fly to the specified coordinates with an optional zoom level.
   *
   * @param {Object} params - The parameters for the fly-to operation.
   * @param {number} params.latitude - The latitude of the target location.
   * @param {number} params.longitude - The longitude of the target location.
   * @param {number} [params.zoom=12] - The zoom level for the map view (default is 12).
   */
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

  const toggleLayerVisibility = useCallback(
    (id: string) => {
      setVisibleLayers((layers) =>
        layers.includes(id)
          ? layers.filter((layerId) => layerId !== id)
          : [...layers, id]
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  return { flyToCoordinate, setLayerById, visibleLayers, toggleLayerVisibility }
}
