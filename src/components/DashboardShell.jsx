import React from 'react'
import { LogOut } from 'lucide-react'
import { useAuth } from '../context/AuthContext.jsx'
import NotificationBell from './NotificationBell.jsx'

export default function DashboardShell({ tabs, active, onChange, roleLabel, children }) {
  const { currentUser, logout } = useAuth()

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-nova-950 text-white shrink-0">
        <div className="flex items-center gap-2 px-5 py-5 border-b border-white/10">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-nova-400 to-blue-500 flex items-center justify-center font-black">N</div>
          <div>
            <p className="font-extrabold leading-none">CampusNova</p>
            <p className="text-[11px] text-white/50 mt-0.5">{roleLabel}</p>
          </div>
        </div>
        <nav className="flex-1 py-4 px-3 space-y-1">
          {tabs.map(t => {
            const Ico = t.icon
            const isActive = active === t.key
            return (
              <button key={t.key} onClick={() => onChange(t.key)}
                className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-semibold transition ${isActive ? 'bg-white text-nova-700 shadow' : 'text-white/70 hover:bg-white/10 hover:text-white'}`}>
                <Ico size={17} />
                {t.label}
              </button>
            )
          })}
        </nav>
        <div className="p-3 border-t border-white/10">
          <button onClick={logout} className="w-full flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-semibold text-white/70 hover:bg-white/10 hover:text-white transition">
            <LogOut size={16} /> Log Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-nova-950 text-white px-4 sm:px-6 py-3 flex items-center justify-between lg:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-nova-400 to-blue-500 flex items-center justify-center font-black text-sm">N</div>
            <p className="font-extrabold">CampusNova</p>
          </div>
          <div className="flex items-center gap-2">
            <NotificationBell />
            <button onClick={logout} className="w-9 h-9 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center"><LogOut size={16} /></button>
          </div>
        </header>
        <div className="hidden lg:flex items-center justify-end gap-3 px-6 py-3 bg-white border-b border-slate-200">
          <NotificationBell />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm" style={{ background: currentUser.avatarColor }}>
              {currentUser.name.charAt(0)}
            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold text-slate-800">{currentUser.name}</p>
              <p className="text-[11px] text-slate-400">{roleLabel}</p>
            </div>
          </div>
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 pb-24 lg:pb-6">
          <div className="max-w-6xl mx-auto space-y-6">
            {children}
          </div>
        </main>

        {/* Mobile bottom nav */}
        <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-slate-200 flex items-stretch z-40">
          {tabs.map(t => {
            const Ico = t.icon
            const isActive = active === t.key
            return (
              <button key={t.key} onClick={() => onChange(t.key)}
                className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-2.5 text-[10.5px] font-semibold ${isActive ? 'text-nova-600' : 'text-slate-400'}`}>
                <span className={`w-9 h-7 rounded-full flex items-center justify-center ${isActive ? 'bg-nova-100' : ''}`}><Ico size={16} /></span>
                {t.label.split(' ')[0]}
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
