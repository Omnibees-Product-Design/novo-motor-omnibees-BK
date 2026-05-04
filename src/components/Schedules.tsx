import type { JSX } from 'react'
import type { Schedule } from '../types/hotel'
import { ClockIcon, CoffeeIcon, LoginIcon, LogoutIcon } from './icons'

const ICONS: Record<Schedule['icon'], (p: { className?: string }) => JSX.Element> = {
  login: p => <LoginIcon {...p} />,
  logout: p => <LogoutIcon {...p} />,
  breakfast: p => <CoffeeIcon {...p} strokeWidth={2} />,
  clock: p => <ClockIcon {...p} />,
}

type Props = {
  hotelName: string
  schedules: Schedule[]
}

export function Schedules({ hotelName, schedules }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-12">
      <h2 className="font-bold text-gray-900 mb-6" style={{ fontSize: 20 }}>
        Horários do {hotelName}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {schedules.map(s => {
          const Icon = ICONS[s.icon]
          return (
            <div
              key={s.title}
              className="rounded-xl p-5"
              style={{ background: 'rgba(69,57,249,0.07)' }}
            >
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-4 shadow-sm text-brand-500">
                <Icon className="w-5 h-5" />
              </div>
              <div className="text-xs font-semibold text-brand-500 uppercase tracking-wide mb-1">
                {s.title}
              </div>
              <div className="text-xl font-bold text-gray-900 mb-2">{s.value}</div>
              <div
                className="text-gray-600"
                style={{ fontSize: 13, lineHeight: 1.7 }}
              >
                {s.description}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
