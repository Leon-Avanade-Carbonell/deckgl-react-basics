import { FlyToInterpolator, MapViewState } from 'deck.gl'
import { atom } from 'jotai'

export const mapViewStateAtom = atom<MapViewState>({
  zoom: 3.5,
  latitude: -27,
  longitude: 135,
  //   longitude: -122.4,
  //   latitude: 37.74,
  pitch: undefined,
  bearing: undefined,
  transitionInterpolator: new FlyToInterpolator({ speed: 2 }),
  transitionDuration: 'auto',
})
