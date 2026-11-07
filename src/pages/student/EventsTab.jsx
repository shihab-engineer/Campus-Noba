import React from 'react'
import { CalendarDays, MapPin, Users, CheckCircle2 } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { SectionTitle, EmptyState, Badge } from '../../components/UI.jsx'

export default function EventsTab() {
  const { db, addItem, patchItem } = useData()
  const { currentUser } = useAuth()

  const events = db.events.filter(e => e.status === 'approved').sort((a, b) => a.date.localeCompare(b.date))

  function register(event) {
    const already = db.registrations.some(r => r.eventId === event.id && r.studentId === currentUser.id)
    if (already) return
    addItem('registrations', { eventId: event.id, studentId: currentUser.id, registeredAt: new Date().toISOString().slice(0, 10) })
    patchItem('events', event.id, { attendees: event.attendees + 1 })
  }

  return (
    <div className="space-y-6">
      <SectionTitle title="Campus Calendar & Club Feed" subtitle="Synchronized hackathons, workshops, and academic timelines" />

      <div className="space-y-4">
        {events.length === 0 && <EmptyState text="No upcoming events yet." />}
        {events.map(e => {
          const club = db.users.find(u => u.clubId === e.clubId)
          const isRegistered = db.registrations.some(r => r.eventId === e.id && r.studentId === currentUser.id)
          return (
            <div key={e.id} className="card p-5">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <Badge tone="purple">{e.category}</Badge>
                  <p className="font-bold text-slate-800 mt-2 text-base">{e.title}</p>
                  <p className="text-xs text-slate-400 mt-0.5">Organized by {club?.name}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-600">
                <span className="flex items-center gap-1.5"><CalendarDays size={14} className="text-nova-500" /> {e.date} • {e.time}</span>
                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-nova-500" /> {e.venue}</span>
              </div>
              <p className="text-sm text-slate-500 mt-3 leading-relaxed">{e.description}</p>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100">
                <span className="flex items-center gap-1.5 text-xs text-slate-500"><Users size={14} /> {e.attendees} students attending</span>
                <button onClick={() => register(e)} disabled={isRegistered}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 ${isRegistered ? 'bg-emerald-50 text-emerald-600' : 'bg-nova-500 hover:bg-nova-600 text-white'}`}>
                  {isRegistered ? <><CheckCircle2 size={14} /> Registered</> : 'Register Now'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
