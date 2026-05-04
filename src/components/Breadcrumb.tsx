import type { BreadcrumbItem } from '../types/hotel'

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <div className="hidden md:block max-w-7xl mx-auto px-4 py-3 text-xs text-gray-600">
      {items.map((item, i) => {
        const isLast = i === items.length - 1
        return (
          <span key={item.label}>
            {item.href && !isLast ? (
              <a href={item.href} className="hover:underline text-brand-500">
                {item.label}
              </a>
            ) : (
              <span className="text-gray-800 font-medium">{item.label}</span>
            )}
            {!isLast && ' › '}
          </span>
        )
      })}
    </div>
  )
}
