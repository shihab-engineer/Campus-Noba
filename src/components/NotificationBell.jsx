import React, { useState, useRef, useEffect } from 'react'
import { Bell, FileCheck2, UserPlus2, CalendarClock, Megaphone } from 'lucide-react'
import { useData } from '../context/DataContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const ICONS = {
  file: FileCheck2,
  user: UserPlus2,
  calendar: CalendarClock,
  megaphone: Megaphone,
}

export default function NotificationBell() {
  const { db, update } = useData()
  const { currentUser } = useAuth()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    function onClick(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const mine = db.notifications.filter(n => n.userId === currentUser.id)
  const unread = mine.filter(n => !n.read).length

  function markAllRead() {
    update('notifications', list => list.map(n => n.userId === currentUser.id ? { ...n, read: true } : n))
  }

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(o => !o)} className="relative w-10 h-10 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center transition">
        <Bell size={18} />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{unread}</span>
        )}
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-80 bg-white text-slate-800 rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
            <p className="font-bold">Notifications</p>
            <button onClick={markAllRead} className="text-xs text-nova-500 font-semibold hover:underline">Mark all read</button>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {mine.length === 0 && <p className="text-sm text-slate-400 px-4 py-6 text-center">You're all caught up.</p>}
            {mine.map(n => {
              const Ico = ICONS[n.icon] || Bell
              return (
                <div key={n.id} className={`flex gap-3 px-4 py-3 border-b border-slate-50 ${!n.read ? 'bg-nova-50/60' : ''}`}>
                  <div className="w-8 h-8 rounded-lg bg-nova-100 text-nova-600 flex items-center justify-center shrink-0"><Ico size={15} /></div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-800 truncate">{n.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5 leading-snug">{n.body}</p>
                    <p className="text-[11px] text-slate-400 mt-1">{n.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}
