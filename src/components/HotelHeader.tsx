import { ShareIcon } from './icons'

type Props = {
  name: string
  address: string
  stars: number
  rating: number
  ratingLabel: string
  reviewsCount: number
}

const fmt = (n: number) => n.toLocaleString('pt-PT')

export function HotelHeader({
  name,
  address,
  stars,
  rating,
  ratingLabel,
  reviewsCount,
}: Props) {
  return (
    <div className="max-w-7xl mx-auto px-4" style={{ paddingTop: 15 }}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-amber-400 text-xl tracking-tight">
              {'★'.repeat(stars)}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">{name}</h1>
          <p className="text-sm mt-1">
            <a className="text-brand-500 hover:underline font-medium" href="#">
              {address}
            </a>
          </p>
        </div>
        <div className="flex items-center gap-3">
          <a href="#avaliacoes" className="flex items-center gap-2 group">
            <div className="bg-brand-500 text-white font-bold text-sm md:text-base w-8 h-8 md:w-10 md:h-10 rounded-tl-md rounded-tr-md rounded-br-md flex items-center justify-center leading-none shrink-0">
              {rating.toString().replace('.', ',')}
            </div>
            {/* Mobile (1 line) */}
            <div className="md:hidden flex items-center gap-1.5 min-w-0">
              <span className="text-xs text-gray-500 whitespace-nowrap group-hover:underline">
                {fmt(reviewsCount)} avaliações
              </span>
              <span className="text-gray-300 text-xs">·</span>
              <span className="text-sm font-bold text-gray-900 group-hover:underline">
                {ratingLabel}
              </span>
            </div>
            {/* Desktop (2 lines) */}
            <div className="hidden md:block">
              <div className="font-bold text-gray-900 text-sm group-hover:underline">
                {ratingLabel}
              </div>
              <div className="text-xs text-gray-500 group-hover:underline">
                {fmt(reviewsCount)} avaliações
              </div>
            </div>
          </a>
          <button
            className="hidden sm:flex w-10 h-10 border border-gray-300 rounded items-center justify-center hover:bg-gray-50"
            aria-label="Partilhar"
          >
            <ShareIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  )
}
