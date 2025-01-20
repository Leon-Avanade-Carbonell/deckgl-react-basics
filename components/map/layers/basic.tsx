import useDeckHook from '@/hooks/use-deck-hook'
import { visibleLayersByIdAtom } from '@/store/layers-atom'
import { ScatterplotLayer } from 'deck.gl'
import { useAtomValue } from 'jotai'
import { useEffect } from 'react'

type BartStation = {
  name: string
  entries: number
  exits: number
  coordinates: [longitude: number, latitude: number]
}

export default function BasicLayer() {
  const id = 'basic-layer'
  const visibleLayers = useAtomValue(visibleLayersByIdAtom)

  const { setLayerById } = useDeckHook()
  const isVisible = visibleLayers.includes(id)

  const addBasicLayer = () => {
    setLayerById({
      id,
      layer: new ScatterplotLayer<BartStation>({
        id: 'ScatterplotLayer',
        data: 'https://raw.githubusercontent.com/visgl/deck.gl-data/master/website/bart-stations.json',

        visible: isVisible,
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
  }

  useEffect(() => {
    addBasicLayer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visibleLayers])

  return null
}
