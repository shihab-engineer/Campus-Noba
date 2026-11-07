import React, { useMemo, useState } from 'react'
import { Sparkles, Check, Clock3 } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { COURSES, SKILL_POOL } from '../../data/seed.js'
import { SectionTitle, EmptyState, Badge } from '../../components/UI.jsx'
import { today } from '../../utils/date.js'

export default function PartnerFinderTab() {
  const { db, addItem, patchItem } = useData()
  const { currentUser } = useAuth()
  const [courseCode, setCourseCode] = useState(COURSES[0].code)
  const [requiredSkills, setRequiredSkills] = useState(['React', 'Node.js'])

  function toggleSkill(skill) {
    setRequiredSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill])
  }

  const candidates = useMemo(() => {
    return db.users
      .filter(u => u.role === 'student' && u.id !== currentUser.id)
      .map(u => {
        const overlap = (u.skills || []).filter(s => requiredSkills.includes(s))
        // No skills selected → no score to show
        const matchPct = requiredSkills.length ? Math.round((overlap.length / requiredSkills.length) * 100) : null
        return { ...u, matchPct }
      })
      .sort((a, b) => (b.matchPct ?? 0) - (a.matchPct ?? 0))
  }, [db.users, requiredSkills, currentUser.id])

  const myRequestsSent = db.matchRequests.filter(r => r.senderId === currentUser.id)
  const myRequestsReceived = db.matchRequests.filter(r => r.receiverId === currentUser.id && r.status === 'pending')

  function connect(candidate) {
    const already = db.matchRequests.find(r => r.senderId === currentUser.id && r.receiverId === candidate.id && r.courseCode === courseCode)
    if (already) return
    addItem('matchRequests', {
      senderId: currentUser.id,
      receiverId: candidate.id,
      courseCode,
      message: `Hey! Want to team up for the ${courseCode} project?`,
      status: 'pending',
      createdAt: today(),
    })
    addItem('notifications', {
      userId: candidate.id,
      title: 'New Team Match Request',
      body: `${currentUser.name} requested to connect for the ${courseCode} project team.`,
      time: 'just now', read: false, icon: 'user',
    })
  }

  function respond(reqId, status) {
    patchItem('matchRequests', reqId, { status })
    const req = db.matchRequests.find(r => r.id === reqId)
    if (req) {
      addItem('notifications', {
        userId: req.senderId,
        title: status === 'accepted' ? 'Collaboration Request Accepted' : 'Collaboration Request Declined',
        body: `Your request for ${req.courseCode} was ${status}.`,
        time: 'just now', read: false, icon: 'user',
      })
    }
  }

  return (
    <div className="space-y-6">
      <SectionTitle title="Peer Team Matchmaker" subtitle="Match CampusNova peers by Course ID & missing skill tags" />

      <div className="card p-5 space-y-4">
        <div>
          <label className="label">Select Course</label>
          <select className="input" value={courseCode} onChange={e => setCourseCode(e.target.value)}>
            {COURSES.map(c => <option key={c.code} value={c.code}>{c.code} {c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="label">Required Skills</label>
          <div className="flex flex-wrap gap-2">
            {SKILL_POOL.map(s => (
              <button key={s} onClick={() => toggleSkill(s)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${requiredSkills.includes(s) ? 'bg-nova-500 border-nova-500 text-white' : 'border-slate-200 text-slate-600 hover:border-slate-300'}`}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {myRequestsReceived.length > 0 && (
        <div className="card p-5">
          <p className="font-bold text-slate-800 mb-3 flex items-center gap-2"><Clock3 size={16} className="text-amber-500" /> Pending Requests For You</p>
          <div className="space-y-2">
            {myRequestsReceived.map(r => {
              const sender = db.users.find(u => u.id === r.senderId)
              return (
                <div key={r.id} className="flex items-center justify-between gap-3 bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{sender?.name}</p>
                    <p className="text-xs text-slate-500">{r.courseCode} • {r.message}</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button onClick={() => respond(r.id, 'accepted')} className="px-3 py-1.5 rounded-lg bg-emerald-500 text-white text-xs font-bold">Accept</button>
                    <button onClick={() => respond(r.id, 'rejected')} className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-600 text-xs font-bold">Decline</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        {candidates.length === 0 && <EmptyState text="No students found. Adjust your skill filters." />}
        {candidates.map(c => {
          const sentReq = myRequestsSent.find(r => r.receiverId === c.id && r.courseCode === courseCode)
          return (
            <div key={c.id} className="card p-4">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold shrink-0" style={{ background: c.avatarColor }}>{c.name.charAt(0)}</div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-bold text-slate-800 truncate">{c.name}</p>
                    {c.matchPct !== null && <Badge tone={c.matchPct >= 50 ? 'green' : c.matchPct > 0 ? 'amber' : 'slate'}>{c.matchPct}% Match</Badge>}
                  </div>
                  <p className="text-xs text-slate-500 mt-1">{c.dept} • Batch {c.batch} • CGPA {c.cgpa}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {(c.skills || []).map(s => <span key={s} className="tag">{s}</span>)}
                    {(c.skills || []).length === 0 && <span className="text-xs text-slate-400">No skill tags yet</span>}
                  </div>
                  <button
                    disabled={!!sentReq}
                    onClick={() => connect(c)}
                    className={`mt-3 w-full text-xs font-bold rounded-xl py-2 flex items-center justify-center gap-1.5 transition ${sentReq ? 'bg-slate-100 text-slate-400' : 'bg-nova-500 hover:bg-nova-600 text-white'}`}>
                    {sentReq ? <><Check size={14} /> Request Sent</> : <><Sparkles size={14} /> Connect</>}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
