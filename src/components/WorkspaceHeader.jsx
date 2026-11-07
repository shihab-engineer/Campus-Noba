import React from 'react'

export default function WorkspaceHeader({ eyebrow, name, subtitle, idLabel }) {
  return (
    <div className="rounded-2xl bg-gradient-to-br from-nova-600 via-nova-500 to-blue-600 text-white px-6 py-6 shadow-card relative overflow-hidden">
      <div className="absolute -right-10 -top-10 w-40 h-40 rounded-full bg-white/10" />
      <div className="absolute -right-4 bottom-0 w-24 h-24 rounded-full bg-white/10" />
      <div className="relative flex items-center justify-between">
        <div>
          <p className="text-[11px] font-semibold tracking-widest text-white/70 uppercase">{eyebrow}</p>
          <h1 className="text-xl sm:text-2xl font-extrabold mt-1">Welcome Back, {name} 👋</h1>
          {subtitle && <p className="text-white/80 text-sm mt-1">{subtitle}</p>}
        </div>
        {idLabel && (
          <div className="text-right text-xs text-white/70 hidden sm:block">{idLabel}</div>
        )}
      </div>
    </div>
  )
}
