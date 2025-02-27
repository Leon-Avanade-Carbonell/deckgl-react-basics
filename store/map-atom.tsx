import { FlyToInterpolator, MapViewState } from 'deck.gl'
import { atom } from 'jotai'

export const defaultViewState: MapViewState = {
  zoom: 3.5,
  latitude: -27,
  longitude: 135,
  pitch: undefined,
  bearing: undefined,
  transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
  transitionDuration: 'auto',
}

export const mapViewStateAtom = atom<MapViewState>(defaultViewState)

export const currentViewStateAtom = atom<MapViewState>(defaultViewState)
