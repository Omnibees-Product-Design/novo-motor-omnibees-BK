import { useEffect, useRef } from 'react'
import type { Photo } from '../types/hotel'
import { ChevronLeftIcon, ChevronRightIcon, CloseIcon } from './icons'

type Props = {
  photos: Photo[]
  index: number
  open: boolean
  onClose: () => void
  onNavigate: (delta: number) => void
  onSelect: (idx: number) => void
}

export function Lightbox({ photos, index, open, onClose, onNavigate, onSelect }: Props) {
  const thumbsRef = useRef<HTMLDivElement>(null)

  // Lock body scroll while open and bind keyboard navigation.
  useEffect(() => {
    if (!open) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNavigate(-1)
      if (e.key === 'ArrowRight') onNavigate(1)
    }
    document.addEventListener('keydown', onKey)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose, onNavigate])

  // Keep the active thumbnail in view.
  useEffect(() => {
    if (!open) return
    const el = thumbsRef.current?.children[index] as HTMLElement | undefined
    el?.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
  }, [open, index])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 bg-black/95 backdrop-blur-sm"
      style={{ zIndex: 60 }}
      onClick={onClose}
    >
      <div className="absolute top-0 inset-x-0 flex items-center justify-between px-4 py-4 z-10 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
        <span className="text-white text-sm font-medium">
          {index + 1} / {photos.length}
        </span>
        <button
          onClick={e => {
            e.stopPropagation()
            onClose()
          }}
          className="pointer-events-auto w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
        >
          <CloseIcon width={20} height={20} />
        </button>
      </div>
      <div className="absolute inset-0 flex items-center justify-center p-4 pt-20 pb-32 pointer-events-none">
        <img
          src={photos[index]?.url}
          alt={photos[index]?.alt ?? ''}
          className="max-w-full max-h-full object-contain rounded-lg select-none pointer-events-auto"
          onClick={e => e.stopPropagation()}
        />
      </div>
      <button
        onClick={e => {
          e.stopPropagation()
          onNavigate(-1)
        }}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white transition-colors z-10"
        aria-label="Anterior"
      >
        <ChevronLeftIcon width={22} height={22} />
      </button>
      <button
        onClick={e => {
          e.stopPropagation()
          onNavigate(1)
        }}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 items-center justify-center text-white transition-colors z-10"
        aria-label="Próxima"
      >
        <ChevronRightIcon width={22} height={22} />
      </button>
      <div className="absolute bottom-0 inset-x-0 px-4 py-4 z-10 bg-gradient-to-t from-black/80 to-transparent pointer-events-none">
        <div
          ref={thumbsRef}
          className="flex items-center justify-center gap-2 overflow-x-auto no-scrollbar pointer-events-auto"
          onClick={e => e.stopPropagation()}
        >
          {photos.map((p, i) => (
            <button
              key={p.url + i}
              type="button"
              onClick={e => {
                e.stopPropagation()
                onSelect(i)
              }}
              className={
                'shrink-0 w-14 h-14 rounded-lg overflow-hidden transition-all ' +
                (i === index ? 'ring-2 ring-white' : 'opacity-50 hover:opacity-100')
              }
            >
              <img src={p.url} alt={p.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
