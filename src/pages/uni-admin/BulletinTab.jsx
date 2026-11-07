import React, { useState } from 'react'
import { Send, Megaphone, AlertTriangle } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { SectionTitle, EmptyState, Badge } from '../../components/UI.jsx'
import { today } from '../../utils/date.js'

export default function BulletinTab() {
  const { db, addItem } = useData()
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [priority, setPriority] = useState('normal')

  function send(e) {
    e.preventDefault()
    if (!title.trim() || !body.trim()) return
    addItem('broadcasts', { title, body, priority, postedAt: today() })
    const audience = db.users.filter(u => u.role !== 'sys_admin' && u.role !== 'uni_admin')
    audience.forEach(u => addItem('notifications', { userId: u.id, title: `${priority === 'urgent' ? '🚨 URGENT: ' : ''}${title}`, body, time: 'just now', read: false, icon: 'megaphone' }))
    setTitle(''); setBody('')
  }

  return (
    <div className="space-y-6">
      <SectionTitle title="Master Bulletin Broadcasting" subtitle="Distribute university-wide alerts, administrative policy shifts, and holiday calendars" />

      <form onSubmit={send} className="card p-5 space-y-4">
        <div>
          <label className="label">Notice Title</label>
          <input className="input" required value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Mid-Semester Break Notice" />
        </div>
        <div>
          <label className="label">Message</label>
          <textarea className="input min-h-[100px]" required value={body} onChange={e => setBody(e.target.value)} />
        </div>
        <div>
          <label className="label">Priority</label>
          <div className="flex gap-2">
            <button type="button" onClick={() => setPriority('normal')} className={`px-4 py-2 rounded-xl text-xs font-bold border ${priority === 'normal' ? 'bg-nova-500 border-nova-500 text-white' : 'border-slate-200 text-slate-600'}`}>Normal</button>
            <button type="button" onClick={() => setPriority('urgent')} className={`px-4 py-2 rounded-xl text-xs font-bold border flex items-center gap-1.5 ${priority === 'urgent' ? 'bg-red-500 border-red-500 text-white' : 'border-slate-200 text-slate-600'}`}><AlertTriangle size={13} /> Urgent</button>
          </div>
        </div>
        <button type="submit" className="btn-primary flex items-center gap-2 text-sm"><Send size={15} /> Broadcast to Campus</button>
      </form>

      <div>
        <p className="text-sm font-bold text-slate-500 mb-2">Recent Broadcasts</p>
        <div className="space-y-2">
          {db.broadcasts.length === 0 && <EmptyState text="No broadcasts sent yet." />}
          {db.broadcasts.map(b => (
            <div key={b.id} className="card p-4 flex gap-3">
              <div className="w-9 h-9 rounded-lg bg-nova-50 text-nova-600 flex items-center justify-center shrink-0"><Megaphone size={16} /></div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-slate-800 text-sm">{b.title}</p>
                  {b.priority === 'urgent' && <Badge tone="red">Urgent</Badge>}
                </div>
                <p className="text-xs text-slate-500 mt-1">{b.body}</p>
                <p className="text-[11px] text-slate-400 mt-1">{b.postedAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
