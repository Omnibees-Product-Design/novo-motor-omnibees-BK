/**
 * White-label runtime theming.
 *
 * O serviço PULL (a ser ligado pelo Pedro) devolve um BrandTheme por hotel.
 * Aplicamos as cores como CSS custom properties no <html>, e o Tailwind v4
 * reaproveita-as automaticamente em todas as classes `*-brand-*`.
 */
export type BrandTheme = {
  brand50?: string
  brand100?: string
  brand200?: string
  brand300?: string
  brand400?: string
  brand500?: string
  brand600?: string
  brand700?: string
  brand800?: string
  brand900?: string
}

const KEY_MAP: Record<keyof BrandTheme, string> = {
  brand50:  '--color-brand-50',
  brand100: '--color-brand-100',
  brand200: '--color-brand-200',
  brand300: '--color-brand-300',
  brand400: '--color-brand-400',
  brand500: '--color-brand-500',
  brand600: '--color-brand-600',
  brand700: '--color-brand-700',
  brand800: '--color-brand-800',
  brand900: '--color-brand-900',
}

export function applyBrandTheme(theme: BrandTheme) {
  const root = document.documentElement
  for (const [key, value] of Object.entries(theme)) {
    if (!value) continue
    const cssVar = KEY_MAP[key as keyof BrandTheme]
    if (cssVar) root.style.setProperty(cssVar, value)
  }
}
