'use client'

import 'maplibre-gl/dist/maplibre-gl.css'
import BaseMap from '@/components/map/base-map'

export default function MapComponent() {
  return (
    <>
      <BaseMap height="100vh" width="80vw" />
      {/* <div className="flex flex-row justify-between">
        <div className="w-[75%]" style={{ width: '75%' }}>
          <BaseMap height="100vh" width="80vw" />
        </div>
        <div>
          <SidePanel />
        </div>
      </div> */}
    </>
  )
}
