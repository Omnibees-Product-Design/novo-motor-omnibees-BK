import type { JSX } from 'react'
import type { AmenityCategory } from '../types/hotel'
import {
  CalendarIcon,
  CheckIcon,
  HeartIcon,
  HomeIcon,
  UtensilsIcon,
} from './icons'

const CATEGORY_ICONS: Record<AmenityCategory['icon'], (p: { className?: string }) => JSX.Element> = {
  home: p => <HomeIcon {...p} />,
  utensils: p => <UtensilsIcon {...p} />,
  heart: p => <HeartIcon {...p} />,
  calendar: p => <CalendarIcon {...p} />,
}

type Props = {
  hotelName: string
  categories: AmenityCategory[]
}

export function AmenitiesGrid({ hotelName, categories }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-12">
      <h2 className="font-bold text-gray-900 mb-6" style={{ fontSize: 20 }}>
        Comodidades do {hotelName}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map(cat => {
          const Icon = CATEGORY_ICONS[cat.icon]
          return (
            <div key={cat.title} className="bg-white border border-gray-200 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-brand-50 text-brand-500 rounded-full flex items-center justify-center shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-gray-900" style={{ fontSize: 16 }}>
                  {cat.title}
                </h3>
              </div>
              <ul className="space-y-2">
                {cat.items.map(label => (
                  <li
                    key={label}
                    className="flex items-center gap-2 text-gray-700"
                    style={{ fontSize: 13 }}
                  >
                    <CheckIcon className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    {label}
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </section>
  )
}
