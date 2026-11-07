import React from 'react'
import { FileText, Users2, ThumbsUp, ShieldCheck } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { SectionTitle, StatCard } from '../../components/UI.jsx'
import { COURSES } from '../../data/seed.js'

export default function MetricsTab() {
  const { db } = useData()
  const totalResources = db.resources.length
  const approved = db.resources.filter(r => r.status === 'approved').length
  const totalUpvotes = db.resources.reduce((s, r) => s + r.upvotes, 0)
  const totalRequests = db.matchRequests.length

  const perCourse = COURSES.map(c => ({
    ...c,
    count: db.resources.filter(r => r.courseCode === c.code).length,
  }))
  const maxCount = Math.max(1, ...perCourse.map(c => c.count))

  return (
    <div className="space-y-6">
      <SectionTitle title="Class Collaboration Metrics" subtitle="Aggregate usage graphs tracking repository files and study group statuses" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Resources" value={totalResources} icon={FileText} tint="#6440c9" />
        <StatCard label="Faculty Verified" value={approved} icon={ShieldCheck} tint="#059669" />
        <StatCard label="Total Upvotes" value={totalUpvotes} icon={ThumbsUp} tint="#f59e0b" />
        <StatCard label="Team Match Requests" value={totalRequests} icon={Users2} tint="#2563eb" />
      </div>

      <div className="card p-5">
        <p className="font-bold text-slate-800 mb-4">Resource Uploads Per Course</p>
        <div className="space-y-3">
          {perCourse.map(c => (
            <div key={c.code}>
              <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1">
                <span>{c.code} — {c.name}</span>
                <span>{c.count}</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-nova-500 to-blue-500 rounded-full" style={{ width: `${(c.count / maxCount) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
