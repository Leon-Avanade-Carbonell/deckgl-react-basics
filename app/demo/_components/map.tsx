'use client'

import BaseMap from '@/components/map/base-map'
import BasicLayer from '@/components/map/layers/basic'

export default function MapComponent() {
  return (
    <>
      <div className="grow-1 min-w-[80%] rounded-md p-2">
        <BasicLayer />
        <BaseMap height="calc(100vh - 1rem)" width="100%" />
      </div>
    </>
  )
}
