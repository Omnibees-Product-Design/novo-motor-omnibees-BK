import { useRef, useState } from 'react'
import type { Photo } from '../types/hotel'
import { Lightbox } from './Lightbox'

type Props = {
  photos: Photo[]
  extraCount: number
}

export function PhotoGallery({ photos, extraCount }: Props) {
  const [activeDot, setActiveDot] = useState(0)
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  function handleScroll() {
    const el = carouselRef.current
    if (!el) return
    const idx = Math.round(el.scrollLeft / el.offsetWidth)
    setActiveDot(idx)
  }

  function open(idx: number) {
    setLightboxIdx(idx)
  }

  function close() {
    setLightboxIdx(null)
  }

  function navigate(delta: number) {
    setLightboxIdx(curr => {
      if (curr == null) return curr
      return (curr + delta + photos.length) % photos.length
    })
  }

  const lightboxOpen = lightboxIdx !== null

  return (
    <div className="max-w-7xl mx-auto mt-4">
      {/* Mobile: swipe carousel */}
      <div className="md:hidden relative">
        <div
          ref={carouselRef}
          onScroll={handleScroll}
          className="flex overflow-x-auto snap-x snap-mandatory no-scrollbar"
          style={{ height: 260 }}
        >
          {photos.map((p, i) => (
            <div
              key={p.url + i}
              className="snap-center shrink-0 w-full relative cursor-pointer"
              onClick={() => open(i)}
            >
              <img
                src={p.url}
                className="w-full h-full object-cover"
                alt={p.alt}
              />
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center gap-2 py-3">
          {photos.map((_, i) => (
            <div
              key={i}
              className={
                'w-2 h-2 rounded-full transition-all ' +
                (i === activeDot ? 'bg-brand-500' : 'bg-gray-300')
              }
            />
          ))}
        </div>
      </div>

      {/* Desktop: mosaic grid */}
      <div
        className="hidden md:grid grid-cols-4 grid-rows-2 gap-1 mx-4 rounded-xl overflow-hidden"
        style={{ height: 480 }}
      >
        <div
          className="col-span-2 row-span-2 relative overflow-hidden group cursor-pointer"
          onClick={() => open(0)}
        >
          <img
            src={photos[0]?.url}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            alt={photos[0]?.alt}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
        </div>
        {photos.slice(1, 5).map((p, i) => {
          const idx = i + 1
          const isLast = idx === 4
          return (
            <div
              key={p.url + idx}
              className="relative overflow-hidden group cursor-pointer"
              onClick={() => open(idx)}
            >
              <img
                src={p.url}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                alt={p.alt}
              />
              {isLast ? (
                <div className="absolute inset-0 bg-black/55 group-hover:bg-black/65 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-center text-white font-bold">
                    <span className="block text-2xl">+{extraCount}</span>
                    <span className="block text-xs uppercase tracking-wide">fotos</span>
                  </span>
                </div>
              ) : (
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
              )}
            </div>
          )
        })}
      </div>

      <Lightbox
        photos={photos}
        index={lightboxIdx ?? 0}
        open={lightboxOpen}
        onClose={close}
        onNavigate={navigate}
        onSelect={setLightboxIdx}
      />
    </div>
  )
}
