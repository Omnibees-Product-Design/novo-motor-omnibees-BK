import type { ReviewSource, ReviewsBlock } from '../types/hotel'
import { ThumbsUpIcon } from './icons'

const fmtCount = (n: number) => n.toLocaleString('pt-PT')
const fmtScore = (n: number) => n.toString().replace('.', ',')

const SOURCE_LOGO: Record<ReviewSource, { url?: string; isTrip?: boolean; alt: string }> = {
  booking: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Booking.com_Icon_2022.svg',
    alt: 'Booking.com',
  },
  expedia: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Expedia_Icon_2023.png',
    alt: 'Expedia',
  },
  tripadvisor: { isTrip: true, alt: 'TripAdvisor' },
}

function SourceLogo({
  source,
  size = 24,
}: {
  source: ReviewSource
  size?: number
}) {
  const cfg = SOURCE_LOGO[source]
  if (cfg.isTrip) {
    return (
      <span
        style={{
          display: 'inline-flex',
          width: size,
          height: size,
          borderRadius: 4,
          overflow: 'hidden',
          background: '#34E0A1',
          flexShrink: 0,
        }}
      >
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/9/94/Tripadvisor-logo-circle-owl-icon-black-green.svg"
          width={size}
          height={size}
          alt={cfg.alt}
          style={{ objectFit: 'cover' }}
        />
      </span>
    )
  }
  return (
    <img
      src={cfg.url}
      width={size}
      height={size}
      alt={cfg.alt}
      style={{ borderRadius: size <= 20 ? 3 : 4 }}
    />
  )
}

export function Reviews({ block }: { block: ReviewsBlock }) {
  return (
    <section
      id="avaliacoes"
      className="max-w-7xl mx-auto px-4 mt-12 scroll-mt-[84px] md:scroll-mt-[95px]"
    >
      <h2 className="font-bold text-gray-900 mb-6" style={{ fontSize: 20 }}>
        Avaliações dos hóspedes
      </h2>

      {/* Mobile compact score */}
      <div className="md:hidden flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-4 py-3 mb-5">
        <div className="bg-brand-500 text-white font-bold text-lg w-12 h-10 rounded-tl-lg rounded-tr-lg rounded-br-lg flex items-center justify-center leading-none shrink-0">
          {fmtScore(block.score)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-sm font-bold text-gray-900">
            {block.scoreLabel}{' '}
            <span className="font-normal text-gray-500 text-xs">
              · {fmtCount(block.count)} avaliações
            </span>
          </div>
          <div className="flex items-center gap-1.5 mt-1">
            <SourceLogo source="booking" size={20} />
            <SourceLogo source="expedia" size={20} />
            <SourceLogo source="tripadvisor" size={20} />
          </div>
        </div>
      </div>

      {/* Desktop big score + bars */}
      <div className="hidden md:flex bg-white border border-gray-200 rounded-lg p-6 mb-6 flex-row gap-8">
        <div
          className="flex flex-col items-center justify-center"
          style={{ minWidth: 120 }}
        >
          <div className="bg-brand-500 text-white font-bold text-4xl w-20 h-20 rounded-tl-xl rounded-tr-xl rounded-br-xl flex items-center justify-center leading-none mb-2">
            {fmtScore(block.score)}
          </div>
          <div className="font-bold text-gray-900 text-sm">{block.scoreLabel}</div>
          <div className="text-xs text-gray-500 mt-0.5">
            {fmtCount(block.count)} avaliações
          </div>
          <div className="flex items-center gap-2 mt-3">
            <SourceLogo source="booking" />
            <SourceLogo source="expedia" />
            <SourceLogo source="tripadvisor" />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-3">
          {block.bars.map(b => (
            <div key={b.label} className="flex items-center gap-3">
              <span className="text-xs text-gray-600 w-32 shrink-0">{b.label}</span>
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-brand-500 rounded-full"
                  style={{ width: `${(b.value / 10) * 100}%` }}
                />
              </div>
              <span className="text-xs font-semibold text-gray-900 w-6 text-right">
                {fmtScore(b.value)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {block.items.map((r, i) => (
          <div key={i} className="bg-gray-50 rounded-lg p-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-brand-100 text-brand-700 font-bold text-sm flex items-center justify-center shrink-0">
                  {r.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-gray-900">{r.author}</div>
                  <div className="text-xs text-gray-500">
                    {r.origin} · {r.date}
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-1.5 shrink-0">
                <SourceLogo source={r.source} />
                <div
                  className="bg-brand-500 text-white text-xs font-bold px-2 rounded-tl rounded-tr rounded-br leading-none flex items-center"
                  style={{ height: 24 }}
                >
                  {fmtScore(r.score)}
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-700 leading-relaxed">{r.text}</p>
            <div className="mt-3 flex gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <ThumbsUpIcon className="w-3.5 h-3.5" />
                {r.helpful} útil
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 text-center">
        <button className="text-sm text-brand-500 font-semibold hover:underline">
          Ver todas as {fmtCount(block.count)} avaliações →
        </button>
      </div>
    </section>
  )
}
