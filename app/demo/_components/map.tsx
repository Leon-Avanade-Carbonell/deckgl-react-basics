'use client'

import BaseMap from '@/components/map/base-map'
import BasicLayer from '@/components/map/layers/basic'

export default function MapComponent() {
  return (
    <>
      <div className="grow-1 min-w-[80%]">
        <BasicLayer />
        <BaseMap height="100vh" width="100%" />
      </div>
    </>
  )
}
