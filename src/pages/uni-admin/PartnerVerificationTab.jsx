import React from 'react'
import { CheckCircle2, XCircle, Building2 } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { SectionTitle, EmptyState, Badge } from '../../components/UI.jsx'

export default function PartnerVerificationTab() {
  const { db, patchItem } = useData()
  const pending = db.users.filter(u => u.role === 'partner' && u.approveStatus === 'pending')
  const approved = db.users.filter(u => u.role === 'partner' && u.approveStatus === 'approved')

  return (
    <div className="space-y-6">
      <SectionTitle title="Partner Verification Check" subtitle="Review and clear background corporate credentials before granting data access" />

      <div className="space-y-3">
        {pending.length === 0 && <EmptyState text="No pending corporate accounts." />}
        {pending.map(p => (
          <div key={p.id} className="card p-4 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0"><Building2 size={20} /></div>
            <div className="flex-1">
              <p className="font-semibold text-slate-800">{p.name}</p>
              <p className="text-xs text-slate-400">{p.email} • Reg No. {p.regNum}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => patchItem('users', p.id, { approveStatus: 'approved' })} className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold flex items-center gap-1.5"><CheckCircle2 size={14} /> Approve</button>
              <button onClick={() => patchItem('users', p.id, { approveStatus: 'rejected' })} className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-bold flex items-center gap-1.5"><XCircle size={14} /> Reject</button>
            </div>
          </div>
        ))}
      </div>

      <div>
        <p className="text-sm font-bold text-slate-500 mb-2">Approved Corporate Partners</p>
        <div className="space-y-2">
          {approved.map(p => (
            <div key={p.id} className="flex items-center justify-between px-4 py-2.5 rounded-xl bg-white border border-slate-100 text-sm">
              <span className="text-slate-700">{p.name}</span>
              <Badge tone="green">Verified</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
