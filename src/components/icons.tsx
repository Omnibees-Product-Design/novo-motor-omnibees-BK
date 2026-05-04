/**
 * Inline SVG icons used throughout the booking engine.
 * Lightweight on purpose — no icon library, full control over fill/stroke.
 *
 * Icons follow the Lucide-style 24x24 stroke convention unless otherwise
 * noted. Pass `className` to control size/colour via Tailwind utilities.
 */
import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const stroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  viewBox: '0 0 24 24',
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2} {...props}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  )
}

export function GlobeIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2} {...props}>
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

export function ShareIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2} {...props}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2.5} {...props}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

export function ChevronLeftIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2.5} {...props}>
      <polyline points="15 18 9 12 15 6" />
    </svg>
  )
}

export function ChevronRightIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2.5} {...props}>
      <polyline points="9 18 15 12 9 6" />
    </svg>
  )
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2} {...props}>
      <polyline points="6 9 12 15 18 9" />
    </svg>
  )
}

export function ArrowRightIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2} {...props}>
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  )
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2.5} {...props}>
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

export function PlusIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2.5} {...props}>
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

export function MinusIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2.5} {...props}>
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  )
}

export function TrashIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2} {...props}>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4h6v2" />
    </svg>
  )
}

export function ThumbsUpIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2} {...props}>
      <path d="M14 9V5a3 3 0 00-3-3l-4 9v11h11.28a2 2 0 002-1.7l1.38-9a2 2 0 00-2-2.3H14z" />
      <path d="M7 22H4a2 2 0 01-2-2v-7a2 2 0 012-2h3" />
    </svg>
  )
}

export function AlertCircleIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2} {...props}>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  )
}

export function PersonFillIcon(props: IconProps) {
  // Filled small adult silhouette.
  return (
    <svg fill="currentColor" viewBox="0 0 20 20" {...props}>
      <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
    </svg>
  )
}

export function BedIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M2 20v-8a2 2 0 012-2h16a2 2 0 012 2v8" />
      <path d="M4 10V7a1 1 0 011-1h14a1 1 0 011 1v3" />
      <path d="M2 18h20" />
    </svg>
  )
}

export function ResizeIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <polyline points="15 3 21 3 21 9" />
      <polyline points="9 21 3 21 3 15" />
      <line x1="21" y1="3" x2="14" y2="10" />
      <line x1="3" y1="21" x2="10" y2="14" />
    </svg>
  )
}

export function MountainIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M3 20l5.5-10 4 6 3-4 5.5 8H3z" />
      <circle cx="17" cy="7" r="2" />
    </svg>
  )
}

export function CoffeeIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M18 8h1a4 4 0 010 8h-1" />
      <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  )
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  )
}

export function StarIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

export function HalfBoardIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 002-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2s-5 2-5 10v3h5zm0 0v7" />
    </svg>
  )
}

export function FullBoardIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M2 12h20" />
      <path d="M12 2C7 2 3 6.6 3 12h18C21 6.6 17 2 12 2z" />
      <path d="M8 19h8" />
      <path d="M12 12v7" />
    </svg>
  )
}

export function HomeIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2} {...props}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}

export function UtensilsIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2} {...props}>
      <path d="M18 8h1a4 4 0 010 8h-1" />
      <path d="M2 8h16v9a4 4 0 01-4 4H6a4 4 0 01-4-4V8z" />
      <line x1="6" y1="1" x2="6" y2="4" />
      <line x1="10" y1="1" x2="10" y2="4" />
      <line x1="14" y1="1" x2="14" y2="4" />
    </svg>
  )
}

export function HeartIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2} {...props}>
      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
    </svg>
  )
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2} {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  )
}

export function LoginIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2} {...props}>
      <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4" />
      <polyline points="10 17 15 12 10 7" />
      <line x1="15" y1="12" x2="3" y2="12" />
    </svg>
  )
}

export function LogoutIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2} {...props}>
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  )
}

export function ClockIcon(props: IconProps) {
  return (
    <svg {...stroke} strokeWidth={2} {...props}>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

/* ── Small amenity icons (under hero) ─────────────────────────── */

export function WheelchairIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <circle cx="12" cy="4" r="2" />
      <path d="M19 13c0 4-3 7-7 7s-7-3-7-7" />
      <path d="M12 13V6" />
      <path d="M8 9h8" />
    </svg>
  )
}

export function ParkingIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <rect x="1" y="3" width="15" height="13" rx="2" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
    </svg>
  )
}

export function ParkingFreeIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <rect x="1" y="3" width="15" height="13" rx="2" />
      <path d="M16 8h4l3 3v5h-7V8z" />
      <circle cx="5.5" cy="18.5" r="2.5" />
      <circle cx="18.5" cy="18.5" r="2.5" />
      <polyline points="19 2 22 5 19 8" />
    </svg>
  )
}

export function SpaIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M12 22a7 7 0 007-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 007 7z" />
    </svg>
  )
}

export function GymIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M6 5v14M18 5v14" />
      <path d="M3 8h3M18 8h3M3 16h3M18 16h3" />
      <path d="M6 12h12" />
    </svg>
  )
}

export function PoolIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M2 12c.6.5 1.2 1 2.5 1C7 13 7 11 9.5 11c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1C7 19 7 17 9.5 17c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  )
}

export function PoolOutdoorIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <circle cx="12" cy="5" r="2" />
      <path d="M5 8h14" />
      <path d="M2 14c.6.5 1.2 1 2.5 1C7 15 7 13 9.5 13c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 19c.6.5 1.2 1 2.5 1C7 20 7 18 9.5 18c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  )
}

export function PoolIndoorIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
      <path d="M2 14c.6.5 1.2 1 2.5 1C7 15 7 13 9.5 13c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  )
}

export function WifiIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M5 12.55a11 11 0 0114.08 0" />
      <path d="M1.42 9a16 16 0 0121.16 0" />
      <path d="M8.53 16.11a6 6 0 016.95 0" />
      <circle cx="12" cy="20" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

/* ── POI icons ───────────────────────────────────────────────── */

export function BeachIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M23 12a11.05 11.05 0 00-22 0zm-5 7a3 3 0 01-6 0v-7" />
    </svg>
  )
}

export function PlaneIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 2c-2-2-4-2-5.5-.5L10 5 1.8 6.2c-.5.1-.9.5-.9 1s.4.9.9 1L7 9.5l-2 2.7-.1.8c0 .3.1.5.3.7l1.1 1.1c.2.2.5.3.8.3l.8-.1 2.7-2 1.3 5.2c.1.5.5.9 1 .9s.9-.4 1-.9z" />
    </svg>
  )
}

export function LeafIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M11 20A7 7 0 014 13c0-7 7-11 7-11s7 4 7 11a7 7 0 01-7 7z" />
      <path d="M11 20v-8" />
    </svg>
  )
}

export function ChurchIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <line x1="3" y1="22" x2="21" y2="22" />
      <line x1="6" y1="18" x2="6" y2="11" />
      <line x1="10" y1="18" x2="10" y2="11" />
      <line x1="14" y1="18" x2="14" y2="11" />
      <line x1="18" y1="18" x2="18" y2="11" />
      <polygon points="12,2 20,7 4,7" />
    </svg>
  )
}

export function TrainIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <path d="M4 10h16" />
      <circle cx="8.5" cy="15.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="15.5" cy="15.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

export function OldTownIcon(props: IconProps) {
  return (
    <svg {...stroke} {...props}>
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
      <path d="M9 22V12h6v10" />
    </svg>
  )
}
