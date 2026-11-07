import React, { useState } from 'react'
import { Plus, CalendarDays, MapPin, Users, Trash2 } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { SectionTitle, EmptyState, Badge, Modal } from '../../components/UI.jsx'

const CATEGORIES = ['Hackathon', 'Seminar', 'Workshop', 'Social', 'Competition']

export default function EventLifecycleTab() {
  const { db, addItem, removeItem, update } = useData()
  const { currentUser } = useAuth()
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({ title: '', category: CATEGORIES[0], venue: '', date: '', time: '', description: '' })

  const myEvents = db.events.filter(e => e.clubId === currentUser.clubId).sort((a, b) => a.date.localeCompare(b.date))

  function deleteEvent(event) {
    if (!confirm(`Delete "${event.title}"? Its registrations will also be removed.`)) return
    removeItem('events', event.id)
    update('registrations', list => list.filter(r => r.eventId !== event.id))
  }

  function submit(e) {
    e.preventDefault()
    if (!form.title.trim() || !form.date) return
    addItem('events', { ...form, clubId: currentUser.clubId, attendees: 0, status: 'approved' })
    const students = db.users.filter(u => u.role === 'student')
    students.forEach(s => addItem('notifications', { userId: s.id, title: 'New Campus Event Published', body: `${form.title} was just added to the campus calendar.`, time: 'just now', read: false, icon: 'calendar' }))
    setShowCreate(false)
    setForm({ title: '', category: CATEGORIES[0], venue: '', date: '', time: '', description: '' })
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Event Lifecycle Tracker"
        subtitle="Create registration events and sync them to the master campus calendar"
        action={<button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2 text-sm"><Plus size={16} /> Create Event</button>}
      />

      <div className="space-y-4">
        {myEvents.length === 0 && <EmptyState text="No events yet. Create your first campus event." />}
        {myEvents.map(e => {
          const regs = db.registrations.filter(r => r.eventId === e.id)
          return (
            <div key={e.id} className="card p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <Badge tone="purple">{e.category}</Badge>
                  <p className="font-bold text-slate-800 mt-2">{e.title}</p>
                </div>
                <button onClick={() => deleteEvent(e)} className="w-8 h-8 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center shrink-0"><Trash2 size={15} /></button>
              </div>
              <div className="flex flex-wrap gap-4 mt-3 text-sm text-slate-600">
                <span className="flex items-center gap-1.5"><CalendarDays size={14} className="text-nova-500" /> {e.date} • {e.time}</span>
                <span className="flex items-center gap-1.5"><MapPin size={14} className="text-nova-500" /> {e.venue}</span>
                <span className="flex items-center gap-1.5"><Users size={14} className="text-nova-500" /> {regs.length} registered</span>
              </div>
            </div>
          )
        })}
      </div>

      {showCreate && (
        <Modal title="Create Campus Event" onClose={() => setShowCreate(false)} wide>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="label">Event Title</label>
              <input className="input" required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="label">Category</label>
                <select className="input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="label">Venue</label>
                <input className="input" required value={form.venue} onChange={e => setForm(f => ({ ...f, venue: e.target.value }))} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="label">Date</label>
                <input className="input" type="date" required value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} />
              </div>
              <div>
                <label className="label">Time</label>
                <input className="input" required placeholder="e.g. 10:00 AM – 04:00 PM" value={form.time} onChange={e => setForm(f => ({ ...f, time: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className="label">Description</label>
              <textarea className="input min-h-[90px]" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={() => setShowCreate(false)} className="btn-secondary flex-1">Cancel</button>
              <button type="submit" className="btn-primary flex-1">Publish Event</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
