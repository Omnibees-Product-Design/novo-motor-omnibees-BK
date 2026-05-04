import { useEffect } from 'react'

/**
 * Replica a lógica de pin/unpin do header + search bar do protótipo:
 *
 *   - normal: ambos no fluxo natural; search bar é `position: sticky; top: 0`
 *     enquanto o header desaparece para cima.
 *   - compact (scroll down após threshold): ambos fixos; header escondido
 *     acima do viewport, search bar fica no topo.
 *   - full (scroll up após threshold): ambos fixos; header visível em cima,
 *     search bar logo abaixo.
 *
 * Usa um placeholder injectado para preservar a altura do documento quando
 * os elementos passam a `position: fixed`.
 */
export function useStickyChrome() {
  useEffect(() => {
    const header = document.querySelector<HTMLElement>('header[data-sticky-chrome="header"]')
    const search = document.querySelector<HTMLElement>('section[data-sticky-chrome="search"]')
    if (!header || !search) return

    let headerH = header.offsetHeight
    let naturalTop = headerH + search.offsetHeight

    const EASE = 'top 0.24s cubic-bezier(0.4, 0, 0.2, 1)'

    const placeholder = document.createElement('div')
    placeholder.style.height = `${naturalTop}px`
    placeholder.style.display = 'none'
    header.parentNode?.insertBefore(placeholder, header)

    let lastScrollY = window.scrollY
    let state: 'normal' | 'compact' | 'full' = 'normal'

    const pin = () => {
      ;[header, search].forEach(el => {
        el.style.position = 'fixed'
        el.style.left = '0'
        el.style.right = '0'
        el.style.transition = 'none'
      })
      header.style.zIndex = '51'
      search.style.zIndex = '50'
      placeholder.style.display = 'block'
    }

    const unpin = () => {
      ;[header, search].forEach(el => {
        el.style.transition = 'none'
        el.style.position = ''
        el.style.top = ''
        el.style.left = ''
        el.style.right = ''
        el.style.zIndex = ''
      })
      placeholder.style.display = 'none'
    }

    const animateTo = (showHeader: boolean) => {
      header.style.transition = EASE
      search.style.transition = EASE
      requestAnimationFrame(() => {
        header.style.top = showHeader ? '0' : `-${headerH}px`
        search.style.top = showHeader ? `${headerH}px` : '0'
      })
    }

    const fixBoth = (showHeader: boolean) => {
      const next = showHeader ? 'full' : 'compact'
      if (state === next) return
      const wasNormal = state === 'normal'
      state = next

      if (wasNormal) {
        pin()
        header.style.top = showHeader ? '0' : `-${headerH}px`
        search.style.top = showHeader ? `${headerH}px` : '0'
        requestAnimationFrame(() => {
          header.style.transition = EASE
          search.style.transition = EASE
        })
      } else {
        animateTo(showHeader)
      }
    }

    const onScroll = () => {
      const y = window.scrollY
      const goingDown = y > lastScrollY
      lastScrollY = y

      if (y <= naturalTop) {
        if (state !== 'normal') {
          state = 'normal'
          unpin()
        }
      } else if (goingDown) {
        fixBoth(false)
      } else {
        fixBoth(true)
      }
    }

    const onResize = () => {
      // Re-mede sem alterar o estado actual.
      const wasFixed = state !== 'normal'
      if (wasFixed) {
        // Para medir corretamente, voltar a fluxo natural rapidamente
        const prevPosH = header.style.position
        const prevPosS = search.style.position
        header.style.position = ''
        search.style.position = ''
        headerH = header.offsetHeight
        naturalTop = headerH + search.offsetHeight
        header.style.position = prevPosH
        search.style.position = prevPosS
      } else {
        headerH = header.offsetHeight
        naturalTop = headerH + search.offsetHeight
      }
      placeholder.style.height = `${naturalTop}px`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      placeholder.remove()
    }
  }, [])
}
