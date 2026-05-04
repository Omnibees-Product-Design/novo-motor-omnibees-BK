import { useState } from 'react'
import { Logo } from './Logo'
import { GlobeIcon, MenuIcon } from './icons'
import { MobileMenu } from './MobileMenu'

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="bg-brand-500" data-sticky-chrome="header">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center" aria-label="UX HOTÉIS">
          <Logo />
        </a>
        <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-white">
          <button className="px-3 py-2 hover:bg-white/10 rounded">Ofertas</button>
          <button className="px-3 py-2 hover:bg-white/10 rounded">BRL</button>
          <button className="px-3 py-2 hover:bg-white/10 rounded flex items-center gap-1.5">
            <GlobeIcon className="w-4 h-4" />
            PT
          </button>
          <button className="ml-2 px-4 py-2 border border-white/60 text-white rounded font-semibold hover:bg-white/10">
            Minha conta
          </button>
        </nav>
        <button
          className="md:hidden text-white p-1 -mr-1"
          onClick={() => setMobileOpen(o => !o)}
          aria-label="Menu"
        >
          <MenuIcon className="w-6 h-6" />
        </button>
      </div>
      <MobileMenu open={mobileOpen} />
    </header>
  )
}
