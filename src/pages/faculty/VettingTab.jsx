import React from 'react'
import { FileText, ShieldCheck, XCircle } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { SectionTitle, EmptyState, Badge } from '../../components/UI.jsx'

export default function VettingTab() {
  const { db, patchItem, addItem } = useData()
  const pending = db.resources.filter(r => r.status === 'pending')
  const decided = db.resources.filter(r => r.status !== 'pending')

  function decide(resource, approve) {
    patchItem('resources', resource.id, { status: approve ? 'approved' : 'rejected', badge: approve ? 'Professor Verified' : null })
    addItem('notifications', {
      userId: resource.uploaderId,
      title: approve ? 'Study File Approved!' : 'Study File Rejected',
      body: approve ? `Your resource "${resource.title}" was approved with a Verified Badge.` : `Your resource "${resource.title}" was rejected. Please review and re-upload.`,
      time: 'just now', read: false, icon: 'file',
    })
  }

  return (
    <div className="space-y-6">
      <SectionTitle title="Academic Asset Vetting" subtitle="Review and approve student-uploaded study files before they go public" />

      <div className="space-y-3">
        {pending.length === 0 && <EmptyState text="No pending files. You're all caught up." />}
        {pending.map(r => {
          const uploader = db.users.find(u => u.id === r.uploaderId)
          return (
            <div key={r.id} className="card p-4 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0"><FileText size={20} /></div>
              <div className="flex-1 min-w-0">
                <Badge tone="purple">{r.courseCode}</Badge>
                <p className="font-semibold text-slate-800 mt-1.5">{r.title}</p>
                <p className="text-xs text-slate-400 mt-1">By {uploader?.name} • {r.fileType} • {r.sizeLabel} • Uploaded {r.uploadedAt}</p>
              </div>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => decide(r, true)} className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5"><ShieldCheck size={14} /> Approve & Badge</button>
                <button onClick={() => decide(r, false)} className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold flex items-center gap-1.5"><XCircle size={14} /> Reject / Flag</button>
              </div>
            </div>
          )
        })}
      </div>

      <div>
        <p className="text-sm font-bold text-slate-500 mb-2">Recently Decided</p>
        <div className="space-y-2">
          {decided.slice(0, 6).map(r => (
            <div key={r.id} className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white border border-slate-100 text-sm">
              <span className="text-slate-700 truncate">{r.title}</span>
              <Badge tone={r.status === 'approved' ? 'green' : 'red'}>{r.status}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
