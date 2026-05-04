const fmt = (n: number) => 'R$ ' + n.toFixed(2).replace('.', ',')

type Props = {
  qty: number
  nights: number
  oldTotal: number
  total: number
}

export function MobileBookingBar({ qty, nights, oldTotal, total }: Props) {
  if (qty <= 0) return null
  const showOld = oldTotal !== total
  return (
    <div
      className="md:hidden"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fff',
        borderTop: '1px solid #e5e7eb',
        padding: '12px 16px',
        zIndex: 50,
        boxShadow: '0 -4px 16px rgba(0,0,0,.1)',
      }}
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-xs text-gray-500">
            {qty} quarto · {nights} noites
          </div>
          {showOld && (
            <div className="text-gray-400 line-through text-xs">{fmt(oldTotal)}</div>
          )}
          <div className="text-lg font-bold text-gray-900">{fmt(total)}</div>
        </div>
        <button className="bg-brand-500 hover:bg-brand-600 text-white font-bold py-2.5 px-6 rounded text-sm transition-colors shrink-0">
          Reservar →
        </button>
      </div>
    </div>
  )
}
