import React from 'react'
import { useData } from '../../context/DataContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { SectionTitle, EmptyState } from '../../components/UI.jsx'

export default function RosterTab() {
  const { db } = useData()
  const { currentUser } = useAuth()
  const myEvents = db.events.filter(e => e.clubId === currentUser.clubId)

  return (
    <div className="space-y-6">
      <SectionTitle title="Roster Management Logs" subtitle="Active membership registries for each club event" />
      {myEvents.length === 0 && <EmptyState text="No events to show rosters for." />}
      {myEvents.map(e => {
        const regs = db.registrations.filter(r => r.eventId === e.id)
        return (
          <div key={e.id} className="card p-5">
            <p className="font-bold text-slate-800">{e.title}</p>
            <p className="text-xs text-slate-400 mb-3">{regs.length} registered attendees</p>
            {regs.length === 0 ? (
              <p className="text-sm text-slate-400">No registrations yet.</p>
            ) : (
              <div className="divide-y divide-slate-100">
                {regs.map(r => {
                  const student = db.users.find(u => u.id === r.studentId)
                  return (
                    <div key={r.id} className="flex items-center justify-between py-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: student?.avatarColor }}>{student?.name.charAt(0)}</div>
                        <div>
                          <p className="text-sm font-semibold text-slate-800">{student?.name}</p>
                          <p className="text-[11px] text-slate-400">{student?.studentId}</p>
                        </div>
                      </div>
                      <span className="text-xs text-slate-400">{r.registeredAt}</span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
