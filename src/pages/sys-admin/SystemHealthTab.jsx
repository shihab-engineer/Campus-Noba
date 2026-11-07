import React from 'react'
import { Server, Database, Activity, RefreshCcw } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { SectionTitle, StatCard, EmptyState } from '../../components/UI.jsx'

export default function SystemHealthTab() {
  const { db, resetDB } = useData()

  function backupNow() {
    const payload = JSON.stringify(db, null, 2)
    const blob = new Blob([payload], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `campusnova-backup-${Date.now()}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <SectionTitle title="System Health Analytics" subtitle="Database index performance and infrastructure backup routines" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Uptime (Demo)" value="99.5%" icon={Server} tint="#16a34a" />
        <StatCard label="Records in DB" value={Object.values(db).reduce((s, arr) => s + (arr?.length || 0), 0)} icon={Database} tint="#6440c9" />
        <StatCard label="Avg. Response" value="<2s" icon={Activity} tint="#2563eb" />
        <StatCard label="Audit Entries" value={db.auditLogs.length} icon={RefreshCcw} tint="#f59e0b" />
      </div>

      <div className="flex flex-wrap gap-3">
        <button onClick={backupNow} className="btn-primary text-sm">Run Snapshot Backup</button>
        <button onClick={() => { if (confirm('Reset all demo data to the original seed? This cannot be undone.')) resetDB() }} className="btn-secondary text-sm">Reset Demo Data</button>
      </div>

      <div>
        <p className="text-sm font-bold text-slate-500 mb-2">Master Audit Trail</p>
        <div className="space-y-2">
          {db.auditLogs.length === 0 && <EmptyState text="No audit entries yet." />}
          {db.auditLogs.map(a => (
            <div key={a.id} className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white border border-slate-100 text-sm">
              <span className="text-slate-700">{a.action}</span>
              <span className="text-xs text-slate-400 shrink-0 ml-3">{a.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
