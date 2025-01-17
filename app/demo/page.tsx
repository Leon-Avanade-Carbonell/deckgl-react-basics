import Map from './_components/map'
import SidePanel from './_components/side-panel'

export default function DemoPage() {
  return (
    <>
      <div className="flex flex-row" id="map">
        <div className="grow-1 min-w-[80%]">
          <Map />
        </div>
        <SidePanel />
      </div>
    </>
  )
}
