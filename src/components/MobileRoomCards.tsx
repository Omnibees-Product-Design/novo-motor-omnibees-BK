import type { Rate, Room } from '../types/hotel'
import { AlertCircleIcon, CheckIcon, MinusIcon, PersonFillIcon, PlusIcon, TrashIcon } from './icons'
import { RateConditionList } from './RateCondition'
import type { Quantities } from './Disponibilidade'

const fmt = (n: number) => 'R$ ' + n.toFixed(2).replace('.', ',')

const MEAL_LABEL: Record<Rate['mealPlan'], string> = {
  breakfast: 'Café da manhã',
  'half-board': 'Meia pensão',
  'full-board': 'Pensão completa',
  'all-inclusive': 'Tudo incluído',
  'room-only': 'Só alojamento',
}

type Props = {
  rooms: Room[]
  nights: number
  qty: Quantities
  onQtyChange: (rateId: string, val: number) => void
}

export function MobileRoomCards({ rooms, nights, qty, onQtyChange }: Props) {
  return (
    <div className="md:hidden mobile-room-cards">
      {rooms.map(room => (
        <div key={room.id} className="p-4">
          <a href="#" className="text-brand-500 font-bold underline text-base">
            {room.name}
          </a>
          {room.fewLeft != null && (
            <div className="flex items-center gap-1 mt-1.5">
              <AlertCircleIcon
                className="w-3.5 h-3.5 text-orange-500 shrink-0"
                strokeWidth={2}
              />
              <span
                className="font-semibold text-orange-600"
                style={{ fontSize: 12 }}
              >
                Restam apenas {room.fewLeft}
              </span>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs text-gray-600">
            <span className="flex items-center gap-1">
              <BedSvg /> {room.bed}
            </span>
            <span className="flex items-center gap-1">
              <ResizeSvg /> {room.area}
            </span>
            <span className="flex items-center gap-1">
              <ViewSvg /> {room.view}
            </span>
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

          <div className="rates-mobile-carousel">
            {room.rates.map(rate => (
              <MobileRateCard
                key={rate.id}
                rate={rate}
                nights={nights}
                qty={qty[rate.id] ?? 0}
                onChange={v => onQtyChange(rate.id, v)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function MobileRateCard({
  rate,
  nights,
  qty,
  onChange,
}: {
  rate: Rate
  nights: number
  qty: number
  onChange: (val: number) => void
}) {
  const tariffName = `${MEAL_LABEL[rate.mealPlan]} · ${rate.refundable ? 'Reembolsável' : 'Não reembolsável'}`
  const isSelected = qty > 0
  const showOld = rate.originalPricePerNight !== rate.pricePerNight

  return (
    <div
      className={
        'rate-card-mobile border border-gray-200 rounded-lg p-3 ' +
        (isSelected ? 'is-selected' : '')
      }
    >
      <div className="rate-top">
        <div className="rate-tariff-name">{tariffName}</div>
        <div className="flex items-center gap-1 text-gray-700 mb-2">
          {Array.from({ length: rate.adults }).map((_, i) => (
            <PersonFillIcon key={i} className="w-4 h-4" />
          ))}
          <span className="text-xs text-gray-700 ml-1">{rate.adults} adultos</span>
        </div>
        <RateConditionList rate={rate} />
      </div>

      <div className="rate-bottom">
        {rate.badges.length > 0 && (
          <div className="rate-badges-row">
            {rate.badges.map((b, i) => (
              <span
                key={i}
                className="inline-flex items-center bg-green-700 text-white px-1.5 rounded"
                style={{ fontSize: 12, height: 20 }}
              >
                {b.label}
              </span>
            ))}
          </div>
        )}
        <div className="rate-price-label">Preço para {nights} noites</div>
        <div className="rate-prices-row">
          {showOld && (
            <span className="rate-old-price">
              {fmt(rate.originalPricePerNight * nights)}
            </span>
          )}
          <span className="rate-final-price">
            {fmt(rate.pricePerNight * nights)}
          </span>
        </div>
        <div className="rate-taxes">Inclui impostos e taxas</div>

        {!isSelected ? (
          <button
            type="button"
            className="btn-selecionar-mobile"
            onClick={e => {
              e.stopPropagation()
              onChange(1)
            }}
          >
            Selecionar
          </button>
        ) : (
          <div className="qty-selector-mobile">
            <button
              type="button"
              aria-label={qty <= 1 ? 'Remover' : 'Diminuir'}
              onClick={e => {
                e.stopPropagation()
                onChange(qty - 1)
              }}
            >
              {qty <= 1 ? (
                <TrashIcon width={14} height={14} strokeWidth={2} />
              ) : (
                <MinusIcon width={14} height={14} />
              )}
            </button>
            <span className="qty-val">{qty}</span>
            <button
              type="button"
              aria-label="Adicionar"
              onClick={e => {
                e.stopPropagation()
                if (qty < rate.maxQuantity) onChange(qty + 1)
              }}
            >
              <PlusIcon width={14} height={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

function BedSvg() {
  return (
    <svg
      className="w-3.5 h-3.5 text-gray-400 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8" />
      <path d="M4 10V7a1 1 0 011-1h14a1 1 0 011 1v3" />
      <path d="M2 18h20" />
    </svg>
  )
}
function ResizeSvg() {
  return (
    <svg
      className="w-3.5 h-3.5 text-gray-400 shrink-0"
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
      className="w-3.5 h-3.5 text-gray-400 shrink-0"
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

// Keep imports we don't directly use referenced in JSDoc to satisfy
// noUnusedLocals when the component isn't rendered with checks.
void CheckIcon
