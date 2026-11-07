import React from 'react'
import { Users, FileText, ShoppingBag, CalendarDays, Briefcase, ShieldAlert } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { SectionTitle, StatCard } from '../../components/UI.jsx'

export default function AnalyticsTab() {
  const { db } = useData()
  const byRole = ['student', 'faculty', 'club', 'partner'].map(role => ({
    role, count: db.users.filter(u => u.role === role).length,
  }))
  const maxUsers = Math.max(1, ...byRole.map(r => r.count))

  return (
    <div className="space-y-6">
      <SectionTitle title="Compliance & Operational Audits" subtitle="Aggregate institutional platform growth, user traffic patterns, and data logs" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Users" value={db.users.length} icon={Users} tint="#6440c9" />
        <StatCard label="Resources Shared" value={db.resources.length} icon={FileText} tint="#0891b2" />
        <StatCard label="Bazaar Listings" value={db.bazaarItems.length} icon={ShoppingBag} tint="#f59e0b" />
        <StatCard label="Campus Events" value={db.events.length} icon={CalendarDays} tint="#16a34a" />
        <StatCard label="Job Postings" value={db.jobs.length} icon={Briefcase} tint="#2563eb" />
        <StatCard label="Open Reports" value={db.reports.filter(r => r.status === 'open').length} icon={ShieldAlert} tint="#dc2626" />
      </div>

      <div className="card p-5">
        <p className="font-bold text-slate-800 mb-4">Users by Role</p>
        <div className="space-y-3">
          {byRole.map(r => (
            <div key={r.role}>
              <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1 capitalize">
                <span>{r.role.replace('_', ' ')}</span>
                <span>{r.count}</span>
              </div>
              <div className="h-2.5 rounded-full bg-slate-100 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-nova-500 to-blue-500 rounded-full" style={{ width: `${(r.count / maxUsers) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
