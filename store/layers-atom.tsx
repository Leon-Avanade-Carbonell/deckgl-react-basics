import { Layer } from 'deck.gl'
import { atom } from 'jotai'

export type LayerByIDType = {
  id: string
  layer: Layer
}

export const layersAtom = atom<Record<string, Layer>>({})

export const visibleLayersByIdAtom = atom<string[]>([])
