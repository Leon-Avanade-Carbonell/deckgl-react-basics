import Map from './_components/map'
import SidePanel from './_components/side-panel'

export default function DemoPage() {
  return (
    <>
      <div className="flex flex-row">
        <Map />
        <SidePanel />
      </div>
    </>
  )
}
