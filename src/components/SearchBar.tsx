import { SearchIcon } from './icons'

type Props = {
  hotelName: string
  dates: string
  guests: string
}

export function SearchBar({ hotelName, dates, guests }: Props) {
  return (
    <section
      className="bg-brand-500 z-50"
      data-sticky-chrome="search"
      style={{ position: 'sticky', top: 0 }}
    >
      <div className="max-w-7xl mx-auto px-4 pt-2 pb-3 md:pb-5 flex justify-center">
        {/* Mobile compact */}
        <div
          className="md:hidden flex items-stretch w-full bg-white border border-white/30 rounded-lg overflow-hidden shadow-sm"
          style={{ height: 48 }}
        >
          <div className="flex-1 px-4 flex items-center gap-2.5 min-w-0">
            <SearchIcon className="w-4 h-4 text-gray-400 shrink-0" />
            <div className="min-w-0 flex-1">
              <div
                className="font-bold text-gray-800 truncate leading-tight"
                style={{ fontSize: 13 }}
              >
                {hotelName}
              </div>
              <div className="text-gray-400 leading-tight" style={{ fontSize: 11 }}>
                {dates} · {guests.split(' · ')[0]}
              </div>
            </div>
          </div>
          <button className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-5 text-sm transition-all shrink-0">
            Buscar
          </button>
        </div>

        {/* Desktop */}
        <div
          className="hidden md:flex w-full bg-white border border-white/30 rounded-lg md:flex-row overflow-hidden shadow-sm"
          style={{ maxWidth: 770 }}
        >
          <div className="flex-1 px-4 py-2.5 border-b md:border-b-0 md:border-r border-gray-200 flex flex-col justify-center min-w-0">
            <div
              className="font-semibold text-gray-400 uppercase tracking-wide mb-0.5"
              style={{ fontSize: 10 }}
            >
              Hotel / Destino
            </div>
            <input
              className="w-full text-sm font-semibold outline-none text-gray-800 bg-transparent"
              defaultValue={hotelName}
            />
          </div>
          <div className="flex md:contents border-b md:border-b-0">
            <div className="flex-1 md:flex-none md:w-44 px-4 md:px-5 py-2.5 border-r border-gray-200 flex flex-col justify-center">
              <div
                className="font-semibold text-gray-400 uppercase tracking-wide mb-0.5"
                style={{ fontSize: 10 }}
              >
                Datas
              </div>
              <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                {dates}
              </span>
            </div>
            <div className="flex-1 md:flex-none md:w-52 px-4 md:px-5 py-2.5 md:border-r border-gray-200 flex flex-col justify-center">
              <div
                className="font-semibold text-gray-400 uppercase tracking-wide mb-0.5"
                style={{ fontSize: 10 }}
              >
                Hóspedes
              </div>
              <span className="text-sm font-semibold text-gray-800 whitespace-nowrap">
                {guests}
              </span>
            </div>
          </div>
          <button className="bg-brand-500 hover:bg-brand-600 text-white font-bold px-6 text-sm transition-all">
            Buscar
          </button>
        </div>
      </div>
    </section>
  )
}
