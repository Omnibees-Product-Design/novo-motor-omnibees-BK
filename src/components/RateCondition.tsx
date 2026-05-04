import type { Rate, RateCondition as RC } from '../types/hotel'
import {
  CheckIcon,
  CloseIcon,
  CoffeeIcon,
  FullBoardIcon,
  HalfBoardIcon,
  MoonIcon,
  StarIcon,
} from './icons'

function MealIcon({ rate, className }: { rate: Rate; className?: string }) {
  switch (rate.mealPlan) {
    case 'breakfast':
      return <CoffeeIcon className={className} />
    case 'half-board':
      return <HalfBoardIcon className={className} />
    case 'full-board':
      return <FullBoardIcon className={className} />
    case 'all-inclusive':
      return <StarIcon className={className} />
    case 'room-only':
    default:
      return <MoonIcon className={className} />
  }
}

export function RateConditionList({ rate }: { rate: Rate }) {
  return (
    <ul className="text-xs space-y-1.5">
      {rate.conditions.map((c, i) => (
        <li key={i} className="flex gap-1.5 items-center">
          <ConditionRow rate={rate} cond={c} />
        </li>
      ))}
    </ul>
  )
}

function ConditionRow({ rate, cond }: { rate: Rate; cond: RC }) {
  switch (cond.kind) {
    case 'meal-plan':
      return (
        <span className="font-bold text-green-700 flex items-center gap-1.5">
          <MealIcon rate={rate} className="w-3.5 h-3.5 flex-shrink-0" />
          {cond.label}
        </span>
      )
    case 'cancellation-free':
      return (
        <>
          <span className="text-green-600 font-bold">
            <CheckIcon className="w-3.5 h-3.5 flex-shrink-0" />
          </span>
          <span className="font-bold text-green-700">{cond.label}</span>
        </>
      )
    case 'non-refundable':
      return (
        <>
          <span className="text-gray-800 font-bold">
            <CloseIcon className="w-3.5 h-3.5 flex-shrink-0" />
          </span>
          <span className="font-bold text-gray-800">{cond.label}</span>
        </>
      )
    case 'extra':
    default:
      return (
        <>
          <span className="text-green-600">
            <CheckIcon className="w-3.5 h-3.5 flex-shrink-0" />
          </span>
          <span className="text-green-700">{cond.label}</span>
        </>
      )
  }
}
