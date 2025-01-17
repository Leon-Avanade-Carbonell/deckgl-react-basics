'use client'

import BaseMap from '@/components/map/base-map'
import BasicLayer from '@/components/map/layers/basic'

export default function MapComponent() {
  return (
    <>
      <BasicLayer />
      <BaseMap height="100vh" width="80vw" />
    </>
  )
}
