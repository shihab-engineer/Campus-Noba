import React from 'react'
import { ShieldOff, CheckCircle2 } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { SectionTitle, EmptyState, Badge } from '../../components/UI.jsx'

export default function ModerationTab() {
  const { db, patchItem, addItem } = useData()
  const openReports = db.reports.filter(r => r.status === 'open')
  const resolved = db.reports.filter(r => r.status !== 'open')

  function resolve(report, action) {
    patchItem('reports', report.id, { status: action })
    if (action === 'removed' && report.targetType === 'bazaar') {
      patchItem('bazaarItems', report.targetId, { status: 'hidden' })
    }
    addItem('auditLogs', { actor: 'System Admin', action: `${action === 'removed' ? 'Soft-deleted' : 'Cleared flags on'} ${report.targetType} item ${report.targetId}`, time: new Date().toLocaleString() })
  }

  return (
    <div className="space-y-6">
      <SectionTitle title="Soft-Deletion Overrides" subtitle="Moderate reported entries to hide flagged repository files or marketplace listings safely" />

      <div className="space-y-3">
        {openReports.length === 0 && <EmptyState text="No open reports. The platform is clean." />}
        {openReports.map(r => {
          const item = r.targetType === 'bazaar' ? db.bazaarItems.find(b => b.id === r.targetId) : null
          const reporter = db.users.find(u => u.id === r.reportedBy)
          return (
            <div key={r.id} className="card p-4 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-red-50 text-red-500 flex items-center justify-center shrink-0"><ShieldOff size={20} /></div>
              <div className="flex-1 min-w-0">
                <Badge tone="red">{r.targetType}</Badge>
                <p className="font-semibold text-slate-800 mt-1.5">{item?.title || r.targetId}</p>
                <p className="text-xs text-slate-500 mt-1">Reason: {r.reason}</p>
                <p className="text-[11px] text-slate-400 mt-1">Reported by {reporter?.name} on {r.createdAt}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => resolve(r, 'removed')} className="px-3.5 py-2 rounded-xl bg-red-500 hover:bg-red-600 text-white text-xs font-bold">Execute Soft-Delete</button>
                <button onClick={() => resolve(r, 'cleared')} className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold flex items-center gap-1.5"><CheckCircle2 size={13} /> Clear Flags</button>
              </div>
            </div>
          )
        })}
      </div>

      <div>
        <p className="text-sm font-bold text-slate-500 mb-2">Resolved Reports</p>
        <div className="space-y-2">
          {resolved.map(r => (
            <div key={r.id} className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white border border-slate-100 text-sm">
              <span className="text-slate-700">{r.targetType} • {r.reason}</span>
              <Badge tone={r.status === 'removed' ? 'red' : 'green'}>{r.status}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
