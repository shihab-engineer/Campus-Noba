import React from 'react'
import { Briefcase, MapPin, Clock, CheckCircle2 } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { SectionTitle, EmptyState, Badge } from '../../components/UI.jsx'
import { today, isPast } from '../../utils/date.js'

export default function CareersTab() {
  const { db, addItem, patchItem } = useData()
  const { currentUser } = useAuth()

  function apply(job) {
    const already = db.applications.some(a => a.jobId === job.id && a.studentId === currentUser.id)
    if (already || isPast(job.deadline)) return
    addItem('applications', { jobId: job.id, studentId: currentUser.id, appliedAt: today(), status: 'submitted' })
    patchItem('jobs', job.id, { applicants: job.applicants + 1 })
  }

  return (
    <div className="space-y-6">
      <SectionTitle title="Corporate Placements & Internships" subtitle="Verified corporate vacancies matching your DIU skill tags" />

      <div className="space-y-4">
        {db.jobs.length === 0 && <EmptyState text="No openings posted right now." />}
        {db.jobs.map(job => {
          const partner = db.users.find(u => u.id === job.partnerId)
          const applied = db.applications.some(a => a.jobId === job.id && a.studentId === currentUser.id)
          const closed = isPast(job.deadline)
          const skillMatches = job.skills.filter(s => (currentUser.skills || []).includes(s)).length
          return (
            <div key={job.id} className="card p-5">
              <div className="flex items-start justify-between gap-3 flex-wrap">
                <div>
                  <Badge tone={job.type === 'Internship' ? 'blue' : 'green'}>{job.type}</Badge>
                  <p className="font-bold text-slate-800 mt-2 text-base">{job.title}</p>
                  <p className="text-sm text-nova-600 font-semibold">{partner?.name} • {job.location}</p>
                </div>
                <span className="font-extrabold text-emerald-600 text-sm whitespace-nowrap">৳ {job.salary}</span>
              </div>
              <p className="text-sm text-slate-500 mt-3 leading-relaxed">{job.description}</p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {job.skills.map(s => <span key={s} className={`tag ${(currentUser.skills || []).includes(s) ? '!bg-nova-100 !text-nova-700' : ''}`}>{s}</span>)}
              </div>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-100 flex-wrap gap-2">
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5"><Clock size={13} /> Deadline {job.deadline}</span>
                  <span>{job.applicants} applicants{skillMatches > 0 ? ` • ${skillMatches} skill match${skillMatches > 1 ? 'es' : ''} with you` : ''}</span>
                </div>
                <button onClick={() => apply(job)} disabled={applied || closed}
                  className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 ${applied ? 'bg-emerald-50 text-emerald-600' : closed ? 'bg-slate-100 text-slate-400 cursor-not-allowed' : 'bg-nova-500 hover:bg-nova-600 text-white'}`}>
                  {applied ? <><CheckCircle2 size={14} /> Applied</> : closed ? 'Applications Closed' : 'Apply With Portfolio'}
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
