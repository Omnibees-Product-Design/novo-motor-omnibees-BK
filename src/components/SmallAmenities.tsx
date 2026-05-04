import type { JSX } from 'react'
import type { SmallAmenity } from '../types/hotel'
import {
  GymIcon,
  ParkingFreeIcon,
  ParkingIcon,
  PoolIcon,
  PoolIndoorIcon,
  PoolOutdoorIcon,
  SpaIcon,
  WheelchairIcon,
  WifiIcon,
  GlobeIcon,
} from './icons'

const ICONS: Record<SmallAmenity['icon'], (props: { className?: string }) => JSX.Element> = {
  wheelchair: ({ className }) => <WheelchairIcon className={className} />,
  // The prototype reuses the globe svg for "Internet Banda Larga".
  'wifi-broad': ({ className }) => <GlobeIcon className={className} />,
  'parking-paid': ({ className }) => <ParkingIcon className={className} />,
  'parking-free': ({ className }) => <ParkingFreeIcon className={className} />,
  spa: ({ className }) => <SpaIcon className={className} />,
  gym: ({ className }) => <GymIcon className={className} />,
  pool: ({ className }) => <PoolIcon className={className} />,
  'pool-outdoor': ({ className }) => <PoolOutdoorIcon className={className} />,
  'pool-indoor': ({ className }) => <PoolIndoorIcon className={className} />,
  wifi: ({ className }) => <WifiIcon className={className} />,
}

export function SmallAmenities({ items }: { items: SmallAmenity[] }) {
  return (
    <div className="max-w-7xl mx-auto px-4 mt-4">
      <div className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-2 pb-1 -mx-4 px-4 md:mx-0 md:px-0 md:pb-0 md:grid md:grid-cols-10 md:gap-2">
        {items.map(it => {
          const Icon = ICONS[it.icon]
          return (
            <div
              key={it.label}
              className="snap-start flex flex-col items-start gap-2.5 py-4 px-3 bg-white border border-gray-200 rounded-xl hover:border-gray-300 hover:shadow-sm transition-all cursor-default shrink-0 md:w-auto md:h-auto md:shrink md:snap-align-none"
              style={{ width: 114, height: 114 }}
            >
              <div className="w-10 h-10 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon className="w-5 h-5 text-gray-500" />
              </div>
              <span className="text-xs font-medium text-gray-600 text-left leading-tight">
                {it.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
