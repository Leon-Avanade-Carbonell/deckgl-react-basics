'use client'

import { Button } from '@/components/ui/button'
import { Toggle } from '@/components/ui/toggle'
import useDeckHook from '@/hooks/use-deck-hook'
import { layersAtom } from '@/store/layers-atom'
import { currentViewStateAtom } from '@/store/map-atom'
import { useAtomValue } from 'jotai'
import { Eye, EyeOff } from 'lucide-react'

export default function SidePanel() {
  const { flyToCoordinate, toggleLayerVisibility, visibleLayers } =
    useDeckHook()
  const layers = useAtomValue(layersAtom)
  const layerIds = Object.keys(layers)
  const currentViewState = useAtomValue(currentViewStateAtom)

  return (
    <>
      <div className="flex w-full flex-col gap-4 p-2">
        <div className="flex flex-col gap-4">
          <Button
            onClick={() =>
              flyToCoordinate({
                longitude: -122.4,
                latitude: 37.74,
              })
            }
          >
            Fly to San Francisco
          </Button>
        </div>
        <div className="max-w-sm">
          {JSON.stringify(currentViewState, null, 4)}
        </div>
        <div>
          {layerIds.map((id) => (
            <div key={id} className="flex h-12 items-center justify-between">
              <div>{id}</div>
              <div>
                <Toggle
                  size="sm"
                  onPressedChange={() => toggleLayerVisibility(id)}
                >
                  {visibleLayers.includes(id) ? (
                    <Eye className="text-primary" />
                  ) : (
                    <EyeOff className="text-secondary" />
                  )}
                </Toggle>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
