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
