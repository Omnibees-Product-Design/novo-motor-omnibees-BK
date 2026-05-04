import type { PointOfInterest } from '../types/hotel'
import {
  ArrowRightIcon,
  BeachIcon,
  ChurchIcon,
  LeafIcon,
  OldTownIcon,
  PlaneIcon,
  TrainIcon,
} from './icons'
import type { JSX } from 'react'

const POI_ICONS: Record<PointOfInterest['icon'], (p: { className?: string }) => JSX.Element> = {
  beach: p => <BeachIcon {...p} />,
  plane: p => <PlaneIcon {...p} />,
  leaf: p => <LeafIcon {...p} />,
  church: p => <ChurchIcon {...p} />,
  train: p => <TrainIcon {...p} />,
  'old-town': p => <OldTownIcon {...p} />,
}

type Props = {
  about: string[]
  pointsOfInterest: PointOfInterest[]
}

export function AboutHotel({ about, pointsOfInterest }: Props) {
  // Split POIs into two columns; mobile only shows column A.
  const colA = pointsOfInterest.slice(0, Math.ceil(pointsOfInterest.length / 2))
  const colB = pointsOfInterest.slice(Math.ceil(pointsOfInterest.length / 2))

  return (
    <div className="max-w-7xl mx-auto px-4 mt-8">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
        <div className="flex-1 min-w-0">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Sobre o hotel</h2>
          <div className="line-clamp-5 md:line-clamp-none">
            {about.map((p, i) => (
              <p
                key={i}
                className="text-gray-700"
                style={{ fontSize: 14.5, marginTop: i === 0 ? 0 : 12, lineHeight: i === 0 ? 1.5 : 1.75 }}
                dangerouslySetInnerHTML={{ __html: p }}
              />
            ))}
          </div>
          <a
            href="#"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand-500 hover:underline mt-4"
          >
            Ler mais sobre o hotel
            <ArrowRightIcon className="w-4 h-4" />
          </a>
        </div>

        <div className="w-full lg:w-[480px] lg:flex-shrink-0">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Pontos de interesse</h2>
          <div className="bg-gray-50 rounded-xl overflow-hidden p-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
              <div className="flex flex-col gap-1">
                {colA.map(p => (
                  <PoiRow key={p.name} item={p} />
                ))}
              </div>
              <div className="hidden md:flex flex-col gap-1">
                {colB.map(p => (
                  <PoiRow key={p.name} item={p} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function PoiRow({ item }: { item: PointOfInterest }) {
  const Icon = POI_ICONS[item.icon]
  const distance = item.distanceKm.toFixed(1).replace('.', ',') + ' km'
  return (
    <div className="flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
      <div className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center flex-shrink-0">
        <Icon className="w-4 h-4 text-gray-400" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold text-gray-800 leading-tight truncate">
          {item.name}
        </div>
        <div className="text-xs text-gray-400 mt-0.5">
          {item.category} · {distance}
        </div>
      </div>
    </div>
  )
}
