import { GlobeIcon } from './icons'

export function MobileMenu({ open }: { open: boolean }) {
  if (!open) return null
  return (
    <div className="md:hidden border-t border-white/20">
      <div className="px-4 py-3 flex flex-col gap-1 text-sm font-medium text-white">
        <button className="px-3 py-2.5 hover:bg-white/10 rounded text-left">
          Ofertas
        </button>
        <button className="px-3 py-2.5 hover:bg-white/10 rounded text-left">BRL</button>
        <button className="px-3 py-2.5 hover:bg-white/10 rounded flex items-center gap-1.5 text-left">
          <GlobeIcon className="w-4 h-4" />
          PT
        </button>
        <button className="mt-1 px-4 py-2.5 border border-white/60 text-white rounded font-semibold hover:bg-white/10 text-left">
          Minha conta
        </button>
      </div>
    </div>
  )
}
