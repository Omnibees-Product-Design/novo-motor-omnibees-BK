import { useMemo, useState } from 'react'
import type { Hotel, Rate, Room } from '../types/hotel'
import { RateConditionList } from './RateCondition'
import { AlertCircleIcon, CheckIcon, PersonFillIcon } from './icons'
import { MobileRoomCards } from './MobileRoomCards'
import { MobileBookingBar } from './MobileBookingBar'

const fmt = (n: number) =>
  'R$ ' + n.toFixed(2).replace('.', ',')

export type Quantities = Record<string, number>

type Props = {
  hotel: Hotel
}

/**
 * Top-level wrapper for the rooms section. Owns the booking state
 * (quantity-by-rate-id) which is then read by the desktop table, the
 * mobile cards, the summary panel and the mobile sticky bar.
 */
export function Disponibilidade({ hotel }: Props) {
  const [qty, setQty] = useState<Quantities>({})

  function setRateQty(rateId: string, value: number) {
    setQty(prev => ({ ...prev, [rateId]: value }))
  }

  // Flatten rate lookup by id (used by the totals reducer).
  const ratesById = useMemo(() => {
    const m = new Map<string, Rate>()
    hotel.rooms.forEach(r => r.rates.forEach(rt => m.set(rt.id, rt)))
    return m
  }, [hotel.rooms])

  const totals = useMemo(() => {
    let totalQty = 0
    let totalPrice = 0
    let totalOld = 0
    for (const [id, q] of Object.entries(qty)) {
      if (q <= 0) continue
      const rate = ratesById.get(id)
      if (!rate) continue
      totalQty += q
      totalPrice += q * rate.pricePerNight * hotel.nights
      totalOld += q * rate.originalPricePerNight * hotel.nights
    }
    return { totalQty, totalPrice, totalOld }
  }, [qty, ratesById, hotel.nights])

  return (
    <section id="disponibilidade" className="max-w-7xl mx-auto px-4 mt-8">
      {/* Mobile heading */}
      <h2 className="md:hidden text-xl font-bold text-gray-900 mb-3">Disponibilidade</h2>
      {/* Desktop blue header */}
      <div className="hidden md:block bg-brand-500 text-white px-4 py-3 rounded-t-md">
        <h2 className="text-xl font-bold">Disponibilidade</h2>
      </div>

      <div className="md:bg-white md:border md:border-gray-300 md:rounded-b-md">
        {/* Mobile cards */}
        <MobileRoomCards
          rooms={hotel.rooms}
          nights={hotel.nights}
          qty={qty}
          onQtyChange={setRateQty}
        />

        {/* Desktop table + summary panel */}
        <div className="hidden md:flex">
          <div className="flex-1 min-w-0">
            <table className="rooms w-full text-sm">
              <thead className="text-gray-800 text-xs font-bold uppercase">
                <tr>
                  <th
                    className="text-left px-3 py-3 bg-gray-100 border-b border-r border-gray-200 sticky z-10"
                    style={{ width: '28%', top: 79 }}
                  >
                    Tipo de acomodação
                  </th>
                  <th
                    className="text-left px-3 py-3 bg-gray-100 border-b border-r border-gray-200 sticky z-10"
                    style={{ width: '11%', top: 79 }}
                  >
                    Capacidade
                  </th>
                  <th
                    className="text-left px-3 py-3 bg-gray-100 border-b border-r border-gray-200 sticky z-10"
                    style={{ width: '25%', top: 79 }}
                  >
                    Preço para {hotel.nights} noites
                  </th>
                  <th
                    className="text-left px-3 py-3 bg-gray-100 border-b border-r border-gray-200 sticky z-10"
                    style={{ width: '28%', top: 79 }}
                  >
                    Suas opções
                  </th>
                  <th
                    className="text-left px-3 py-3 bg-gray-100 border-b border-gray-200 sticky z-10"
                    style={{ width: '8%', top: 79 }}
                  >
                    Selecione
                  </th>
                </tr>
              </thead>
              <tbody>
                {hotel.rooms.map((room, roomIdx) => (
                  <RoomRows
                    key={room.id}
                    room={room}
                    nights={hotel.nights}
                    isFirst={roomIdx === 0}
                    qty={qty}
                    onQtyChange={setRateQty}
                  />
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary panel */}
          <div className="w-52 flex-shrink-0 border-l border-gray-200 flex flex-col">
            <div className="sticky" style={{ top: 79 }}>
              <div className="bg-gray-100 text-xs font-bold uppercase tracking-wide px-4 py-3 border-b border-gray-200 z-10">
                <span className="opacity-0 select-none" aria-hidden="true">
                  ·
                </span>
              </div>
              <div className="flex flex-col px-4 py-5">
                {totals.totalQty > 0 ? (
                  <FilledPanel
                    qty={totals.totalQty}
                    nights={hotel.nights}
                    oldTotal={totals.totalOld}
                    total={totals.totalPrice}
                  />
                ) : (
                  <EmptyPanel />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <MobileBookingBar
        qty={totals.totalQty}
        nights={hotel.nights}
        oldTotal={totals.totalOld}
        total={totals.totalPrice}
      />
    </section>
  )
}

function EmptyPanel() {
  return (
    <div className="flex flex-col gap-3">
      <button
        disabled
        className="w-full bg-gray-100 text-gray-400 font-bold py-2.5 px-3 rounded text-sm cursor-not-allowed"
      >
        Reservar →
      </button>
      <div className="flex items-center gap-1.5 text-gray-500" style={{ fontSize: 12 }}>
        <span className="text-green-600 font-bold">
          <CheckIcon className="w-3.5 h-3.5 flex-shrink-0" />
        </span>{' '}
        Confirmação imediata
      </div>
    </div>
  )
}

function FilledPanel({
  qty,
  nights,
  oldTotal,
  total,
}: {
  qty: number
  nights: number
  oldTotal: number
  total: number
}) {
  const showOld = oldTotal !== total
  return (
    <div className="flex flex-col">
      <div className="text-xs text-gray-600 mb-1">
        {qty} quarto × {nights} noites
      </div>
      {showOld && (
        <div className="text-gray-400 line-through text-xs">{fmt(oldTotal)}</div>
      )}
      <div className="text-xl font-bold text-gray-900 mt-0.5">{fmt(total)}</div>
      <div className="text-gray-500 mt-1" style={{ fontSize: 12 }}>
        Impostos e taxas incluídos
      </div>
      <button className="mt-5 w-full bg-brand-500 hover:bg-brand-600 text-white font-bold py-2.5 px-3 rounded text-sm transition-colors">
        Reservar →
      </button>
      <div className="mt-3 space-y-1.5">
        <div className="flex items-center gap-1.5 text-gray-600" style={{ fontSize: 12 }}>
          <span className="text-green-600 font-bold">
            <CheckIcon className="w-3.5 h-3.5 flex-shrink-0" />
          </span>{' '}
          Confirmação imediata
        </div>
        <div className="flex items-center gap-1.5 text-gray-600" style={{ fontSize: 12 }}>
          <span className="text-green-600 font-bold">
            <CheckIcon className="w-3.5 h-3.5 flex-shrink-0" />
          </span>{' '}
          Sem taxas extras
        </div>
      </div>
    </div>
  )
}

/**
 * Renders all <tr> rows for a single room (one row per rate).
 * The first rate row carries the rowSpan'd description / capacity cells.
 */
function RoomRows({
  room,
  nights,
  isFirst,
  qty,
  onQtyChange,
}: {
  room: Room
  nights: number
  isFirst: boolean
  qty: Quantities
  onQtyChange: (rateId: string, val: number) => void
}) {
  const span = room.rates.length
  const topBorder = isFirst ? 'border-t border-gray-200' : 'border-t-2 border-gray-300'

  return (
    <>
      {room.rates.map((rate, idx) => {
        const value = qty[rate.id] ?? 0
        const selectStyle =
          value > 0
            ? { borderColor: '#4539F9', borderWidth: 1 }
            : undefined

        return (
          <tr key={rate.id} className={idx === 0 ? topBorder : 'border-t border-gray-200'}>
            {idx === 0 && (
              <>
                <td rowSpan={span} className="px-3 py-4 border-r border-gray-200 align-top">
                  <a href="#" className="text-brand-500 font-bold underline text-base">
                    {room.name}
                  </a>
                  {room.fewLeft != null && (
                    <div className="flex items-center gap-1 mt-1.5">
                      <AlertCircleIcon className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                      <span
                        className="font-semibold text-orange-600"
                        style={{ fontSize: 12 }}
                      >
                        Restam apenas {room.fewLeft}
                      </span>
                    </div>
                  )}
                  <div className="text-xs text-gray-600 mt-2 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <BedSvg /> <span>{room.bed}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ResizeSvg /> <span>{room.area}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ViewSvg /> <span>{room.view}</span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2" style={{ fontSize: 12 }}>
                    {room.amenities.map(a => (
                      <span
                        key={a}
                        className="px-1.5 py-0.5 bg-gray-100 text-gray-700 rounded"
                      >
                        {a}
                      </span>
                    ))}
                  </div>
                  <a
                    href="#"
                    className="text-brand-500 text-xs hover:underline font-medium mt-2 inline-block"
                  >
                    Ver detalhes do quarto ›
                  </a>
                </td>
                <td rowSpan={span} className="px-3 py-4 border-r border-gray-200 align-top">
                  <div className="flex items-center gap-1 text-gray-700">
                    {Array.from({ length: rate.adults }).map((_, i) => (
                      <PersonFillIcon key={i} className="w-4 h-4" />
                    ))}
                  </div>
                  <div className="text-xs text-gray-700 mt-1">{rate.adults} adultos</div>
                </td>
              </>
            )}

            {/* Price column */}
            <td className="px-3 py-4 border-r border-gray-200 align-top">
              {rate.originalPricePerNight !== rate.pricePerNight && (
                <div className="text-gray-400 line-through text-xs">
                  {fmt(rate.originalPricePerNight * nights)}
                </div>
              )}
              <div className="text-base font-bold text-gray-900">
                {fmt(rate.pricePerNight * nights)}
              </div>
              <div className="text-gray-600" style={{ fontSize: 12 }}>
                Inclui impostos e taxas
              </div>
              {rate.badges.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {rate.badges.map((b, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center bg-green-700 text-white px-1.5 rounded"
                      style={{ fontSize: 12, height: 22 }}
                    >
                      {b.label}
                    </span>
                  ))}
                </div>
              )}
            </td>

            {/* Conditions column */}
            <td className="px-3 py-4 border-r border-gray-200 align-top">
              <RateConditionList rate={rate} />
            </td>

            {/* Quantity select */}
            <td className="px-3 py-4 align-top">
              <select
                value={String(value)}
                onChange={e => onQtyChange(rate.id, parseInt(e.target.value, 10))}
                style={selectStyle}
                className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm focus:outline-none focus:border-brand-500"
              >
                {Array.from({ length: rate.maxQuantity + 1 }).map((_, i) => (
                  <option key={i} value={i}>
                    {i}
                  </option>
                ))}
              </select>
            </td>
          </tr>
        )
      })}
    </>
  )
}

/* ── small inline svgs reused inside the table cell ───────────── */
function BedSvg() {
  return (
    <svg
      className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8" />
      <path d="M4 10V7a1 1 0 011-1h14a1 1 0 011 1v3" />
      <path d="M10 10h4" />
      <path d="M2 18h20" />
    </svg>
  )
}
function ResizeSvg() {
  return (
    <svg
      className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  )
}
function ViewSvg() {
  return (
    <svg
      className="w-3.5 h-3.5 text-gray-400 flex-shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M3 20l5.5-10 4 6 3-4 5.5 8H3z" />
      <circle cx="17" cy="7" r="2" />
    </svg>
  )
}
