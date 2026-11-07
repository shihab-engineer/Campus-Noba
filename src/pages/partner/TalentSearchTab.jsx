import React, { useState } from 'react'
import { Send, GraduationCap } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { SKILL_POOL } from '../../data/seed.js'
import { SectionTitle, EmptyState, Badge } from '../../components/UI.jsx'

export default function TalentSearchTab() {
  const { db, addItem } = useData()
  const { currentUser } = useAuth()
  const [filters, setFilters] = useState([])
  const [invited, setInvited] = useState([])

  function toggleFilter(s) {
    setFilters(prev => prev.includes(s) ? prev.filter(x => x !== s) : [...prev, s])
  }

  const students = db.users.filter(u => u.role === 'student')
  const results = filters.length === 0 ? students : students.filter(s => filters.every(f => (s.skills || []).includes(f)))

  function invite(student) {
    addItem('notifications', { userId: student.id, title: 'Interview Invitation', body: `${currentUser.name} sent you an interview invitation via CampusNova.`, time: 'just now', read: false, icon: 'user' })
    setInvited(prev => [...prev, student.id])
  }

  return (
    <div className="space-y-6">
      <SectionTitle title="Talent Portfolio Filter" subtitle="Screen the student candidate database using specific technical skill filters" />

      <div className="card p-5">
        <label className="label">Skill Filters</label>
        <div className="flex flex-wrap gap-2">
          {SKILL_POOL.map(s => (
            <button key={s} onClick={() => toggleFilter(s)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${filters.includes(s) ? 'bg-nova-500 border-nova-500 text-white' : 'border-slate-200 text-slate-600'}`}>{s}</button>
          ))}
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        {results.length === 0 && <EmptyState text="No candidates match those filters." />}
        {results.map(s => (
          <div key={s.id} className="card p-4">
            <div className="flex items-start gap-3">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ background: s.avatarColor }}>{s.name.charAt(0)}</div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-slate-800">{s.name}</p>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5"><GraduationCap size={12} /> {s.dept} • Batch {s.batch} • CGPA {s.cgpa}</p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {(s.skills || []).map(sk => <Badge key={sk} tone={filters.includes(sk) ? 'green' : 'slate'}>{sk}</Badge>)}
                </div>
                <button onClick={() => invite(s)} disabled={invited.includes(s.id)}
                  className={`mt-3 w-full text-xs font-bold rounded-xl py-2 flex items-center justify-center gap-1.5 ${invited.includes(s.id) ? 'bg-slate-100 text-slate-400' : 'bg-nova-500 hover:bg-nova-600 text-white'}`}>
                  <Send size={13} /> {invited.includes(s.id) ? 'Invitation Sent' : 'Send Interview Call'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
