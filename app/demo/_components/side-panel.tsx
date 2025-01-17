'use client'

import { Button } from '@/components/ui/button'
import useDeckHook from '@/hooks/use-deck-hook'

export default function SidePanel() {
  const { flyToCoordinate } = useDeckHook()
  return (
    <>
      <div className="w-full p-5">
        <Button
          onClick={() =>
            flyToCoordinate({
              longitude: -122.4,
              latitude: 37.74,
            })
          }
        >
          Cats are just a big fluffy duff
        </Button>
      </div>
    </>
  )
}
