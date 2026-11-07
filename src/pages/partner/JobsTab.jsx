import React, { useState } from 'react'
import { Plus, Trash2, Users } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { SKILL_POOL } from '../../data/seed.js'
import { SectionTitle, EmptyState, Badge, Modal } from '../../components/UI.jsx'

export default function JobsTab() {
  const { db, addItem, removeItem } = useData()
  const { currentUser } = useAuth()
  const [showCreate, setShowCreate] = useState(false)
  const [form, setForm] = useState({ title: '', type: 'Full Time', salary: '', location: '', deadline: '', description: '', skills: [] })

  const myJobs = db.jobs.filter(j => j.partnerId === currentUser.id)

  function toggleSkill(s) {
    setForm(f => ({ ...f, skills: f.skills.includes(s) ? f.skills.filter(x => x !== s) : [...f.skills, s] }))
  }

  function submit(e) {
    e.preventDefault()
    if (!form.title.trim()) return
    addItem('jobs', { ...form, partnerId: currentUser.id, applicants: 0, postedAt: new Date().toISOString().slice(0, 10) })
    setShowCreate(false)
    setForm({ title: '', type: 'Full Time', salary: '', location: '', deadline: '', description: '', skills: [] })
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Placement Ad Management"
        subtitle="Publish, modify, and monitor corporate internship vacancies and job entries"
        action={<button onClick={() => setShowCreate(true)} className="btn-primary flex items-center gap-2 text-sm"><Plus size={16} /> Post Vacancy</button>}
      />

      <div className="space-y-3">
        {myJobs.length === 0 && <EmptyState text="You haven't posted any jobs yet." />}
        {myJobs.map(job => {
          const applicants = db.applications.filter(a => a.jobId === job.id)
          return (
            <div key={job.id} className="card p-4 flex items-start gap-4">
              <div className="flex-1 min-w-0">
                <Badge tone={job.type === 'Internship' ? 'blue' : 'green'}>{job.type}</Badge>
                <p className="font-semibold text-slate-800 mt-1.5">{job.title}</p>
                <p className="text-xs text-slate-400 mt-1">{job.location} • Deadline {job.deadline}</p>
                <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-nova-600"><Users size={13} /> {applicants.length} applicants</div>
              </div>
              <button onClick={() => removeItem('jobs', job.id)} className="w-8 h-8 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 flex items-center justify-center shrink-0"><Trash2 size={15} /></button>
            </div>
          )
        })}
      </div>

      {showCreate && (
        <Modal title="Post Vacancy Opportunity" onClose={() => setShowCreate(false)} wide>
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="label">Job Title</label>
              <input className="input" required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} />
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="label">Type</label>
                <select className="input" value={form.type} onChange={e => setForm(f => ({ ...f, type: e.target.value }))}>
                  <option>Full Time</option><option>Internship</option><option>Part Time</option>
                </select>
              </div>
              <div>
                <label className="label">Salary Range</label>
                <input className="input" placeholder="20,000 – 30,000 / month" value={form.salary} onChange={e => setForm(f => ({ ...f, salary: e.target.value }))} />
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="label">Location</label>
                <input className="input" required value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} />
              </div>
              <div>
                <label className="label">Application Deadline</label>
                <input className="input" type="date" required value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} />
              </div>
            </div>
            <div>
              <label className="label">Required Skills</label>
              <div className="flex flex-wrap gap-2">
                {SKILL_POOL.map(s => (
                  <button type="button" key={s} onClick={() => toggleSkill(s)} className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${form.skills.includes(s) ? 'bg-nova-500 border-nova-500 text-white' : 'border-slate-200 text-slate-600'}`}>{s}</button>
                ))}
              </div>
            </div>
            <div>
              <label className="label">Description</label>
              <textarea className="input min-h-[90px]" required value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
            </div>
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={() => setShowCreate(false)} className="btn-secondary flex-1">Cancel</button>
              <button type="submit" className="btn-primary flex-1">Publish Job</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
