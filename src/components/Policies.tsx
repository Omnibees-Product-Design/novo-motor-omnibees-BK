import type { Policy } from '../types/hotel'

type Props = {
  hotelName: string
  policies: Policy[]
}

export function Policies({ hotelName, policies }: Props) {
  return (
    <section className="max-w-7xl mx-auto px-4 mt-12">
      <h2 className="font-bold text-gray-900 mb-6" style={{ fontSize: 20 }}>
        Políticas gerais do {hotelName}
      </h2>
      <div className="bg-white border border-gray-200 rounded-lg divide-y divide-gray-100">
        {policies.map(p => (
          <details key={p.title} className="group">
            <summary className="flex items-center justify-between px-6 py-4 cursor-pointer select-none">
              <span
                className="font-semibold text-gray-900"
                style={{ fontSize: 16 }}
              >
                {p.title}
              </span>
              <svg
                className="w-4 h-4 text-gray-400 transition-transform group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </summary>
            <div
              className="px-6 pb-5 text-gray-700 space-y-2"
              style={{ fontSize: 14.5, lineHeight: 1.7 }}
            >
              {p.paragraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </details>
        ))}
      </div>
    </section>
  )
}
