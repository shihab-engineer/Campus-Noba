import React, { useState } from 'react'
import { Megaphone, Send } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { COURSES } from '../../data/seed.js'
import { SectionTitle, EmptyState } from '../../components/UI.jsx'

export default function AdvisoryTab() {
  const { db, addItem } = useData()
  const { currentUser } = useAuth()
  const [courseCode, setCourseCode] = useState(COURSES[0].code)
  const [message, setMessage] = useState('')
  const notices = db.broadcasts.filter(b => b.authorId === currentUser.id)

  function send(e) {
    e.preventDefault()
    if (!message.trim()) return
    addItem('broadcasts', { title: `${courseCode} Class Notice`, body: message, priority: 'normal', authorId: currentUser.id, postedAt: new Date().toISOString().slice(0, 10) })
    const students = db.users.filter(u => u.role === 'student')
    students.forEach(s => addItem('notifications', { userId: s.id, title: `${courseCode} Class Notice`, body: message, time: 'just now', read: false, icon: 'megaphone' }))
    setMessage('')
  }

  return (
    <div className="space-y-6">
      <SectionTitle title="Advisory Broadcaster" subtitle="Publish class-specific timeline notices, curriculum updates, and lab requirements" />

      <form onSubmit={send} className="card p-5 space-y-4">
        <div>
          <label className="label">Target Course</label>
          <select className="input" value={courseCode} onChange={e => setCourseCode(e.target.value)}>
            {COURSES.map(c => <option key={c.code} value={c.code}>{c.code} {c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Notice</label>
          <textarea className="input min-h-[100px]" required value={message} onChange={e => setMessage(e.target.value)} placeholder="e.g. Lab 5 report deadline extended to Sunday 11:59 PM." />
        </div>
        <button type="submit" className="btn-primary flex items-center gap-2 text-sm"><Send size={15} /> Publish Notice</button>
      </form>

      <div>
        <p className="text-sm font-bold text-slate-500 mb-2">Your Published Notices</p>
        <div className="space-y-2">
          {notices.length === 0 && <EmptyState text="You haven't published any notices yet." />}
          {notices.map(n => (
            <div key={n.id} className="card p-4 flex gap-3">
              <div className="w-9 h-9 rounded-lg bg-nova-50 text-nova-600 flex items-center justify-center shrink-0"><Megaphone size={16} /></div>
              <div>
                <p className="font-semibold text-slate-800 text-sm">{n.title}</p>
                <p className="text-xs text-slate-500 mt-1">{n.body}</p>
                <p className="text-[11px] text-slate-400 mt-1">{n.postedAt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
