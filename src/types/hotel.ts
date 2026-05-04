// Domain types for the Omnibees booking engine.
// This file is the contract between the static mock (src/data/hotel.ts)
// and the components. The PULL service will later return data shaped
// exactly like this.

export type BreadcrumbItem = {
  label: string
  href?: string
}

export type Photo = {
  url: string
  alt: string
}

export type Amenity = {
  label: string
}

export type AmenityCategory = {
  /** Lucide-ish icon identifier we render inline */
  icon: 'home' | 'utensils' | 'heart' | 'calendar'
  title: string
  items: string[]
}

export type PointOfInterest = {
  /** small lucide-ish identifier rendered inline */
  icon: 'beach' | 'plane' | 'leaf' | 'church' | 'train' | 'old-town'
  name: string
  category: string
  distanceKm: number
}

export type ScoreBar = {
  label: string
  value: number // 0..10
}

export type ReviewSource = 'booking' | 'expedia' | 'tripadvisor'

export type Review = {
  initials: string
  author: string
  origin: string
  date: string
  source: ReviewSource
  score: number
  text: string
  helpful: number
}

export type ReviewsBlock = {
  score: number // 0..10
  scoreLabel: string
  count: number
  bars: ScoreBar[]
  items: Review[]
}

export type Schedule = {
  /** lucide-ish icon identifier */
  icon: 'login' | 'logout' | 'breakfast' | 'clock'
  title: string
  value: string
  description: string
}

export type Policy = {
  title: string
  paragraphs: string[]
}

/** Tag row identifier rendered as a coloured pill on rate cards. */
export type RateBadge = {
  label: string
  /** small green pill */
  variant: 'discount' | 'last-minute'
}

export type RateMealPlan =
  | 'breakfast'
  | 'half-board'
  | 'full-board'
  | 'all-inclusive'
  | 'room-only'

export type RateConditionKind =
  | 'meal-plan' // bold green
  | 'cancellation-free' // green check
  | 'non-refundable' // grey X
  | 'extra' // generic green check (Wi-Fi, parking…)

export type RateCondition = {
  kind: RateConditionKind
  label: string
}

export type Rate = {
  id: string
  /** original price (R$) per night */
  originalPricePerNight: number
  /** final price (R$) per night */
  pricePerNight: number
  /** Total nights span this booking covers */
  taxesIncluded: boolean
  badges: RateBadge[]
  conditions: RateCondition[]
  mealPlan: RateMealPlan
  refundable: boolean
  /** Maximum quantity that can be selected (room availability) */
  maxQuantity: number
  /** Adults occupancy for this rate */
  adults: number
}

export type Room = {
  id: string
  name: string
  bed: string
  area: string
  view: string
  amenities: string[]
  /** "Restam apenas N" warning */
  fewLeft?: number
  rates: Rate[]
}

export type SmallAmenity = {
  /** lucide-ish identifier */
  icon:
    | 'wheelchair'
    | 'wifi-broad'
    | 'parking-paid'
    | 'parking-free'
    | 'spa'
    | 'gym'
    | 'pool'
    | 'pool-outdoor'
    | 'pool-indoor'
    | 'wifi'
  label: string
}

export type Hotel = {
  name: string
  address: string
  stars: number
  /** numeric rating 0..10 */
  rating: number
  ratingLabel: string
  reviewsCount: number
  breadcrumb: BreadcrumbItem[]
  heroPhotos: Photo[]
  /** how many extra photos overlay shows on the last grid tile */
  extraPhotosCount: number
  /** small icon strip below the hero */
  smallAmenities: SmallAmenity[]
  about: string[]
  pointsOfInterest: PointOfInterest[]
  /** total nights for the active query */
  nights: number
  rooms: Room[]
  reviews: ReviewsBlock
  amenities: AmenityCategory[]
  schedules: Schedule[]
  policies: Policy[]
  /** stay query summary for the search bar */
  query: {
    dates: string
    guests: string
  }
  /** currency used in price formatting */
  currency: 'BRL'
}
