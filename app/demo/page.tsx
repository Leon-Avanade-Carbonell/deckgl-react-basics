import Map from './_components/map'
import SidePanel from './_components/side-panel'

export default function DemoPage() {
  return (
    <>
      <div className="flex flex-row bg-slate-200">
        <Map />
        <SidePanel />
      </div>
    </>
  )
}
