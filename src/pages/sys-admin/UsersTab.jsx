import React, { useState } from 'react'
import { Search } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { SectionTitle, Badge } from '../../components/UI.jsx'

const ROLE_LABELS = { student: 'Student', faculty: 'Faculty', club: 'Club', partner: 'Partner', uni_admin: 'Uni Admin', sys_admin: 'Sys Admin' }
const ROLE_TONES = { student: 'blue', faculty: 'purple', club: 'green', partner: 'amber', uni_admin: 'slate', sys_admin: 'red' }

export default function UsersTab() {
  const { db, patchItem, addItem } = useData()
  const [query, setQuery] = useState('')

  const filtered = db.users.filter(u => u.name.toLowerCase().includes(query.toLowerCase()) || u.email.toLowerCase().includes(query.toLowerCase()))

  function toggleSuspend(user) {
    const nextStatus = user.suspended ? false : true
    patchItem('users', user.id, { suspended: nextStatus })
    addItem('auditLogs', { actor: 'System Admin', action: `${nextStatus ? 'Suspended' : 'Reinstated'} account for ${user.name} (${user.id})`, time: new Date().toLocaleString() })
  }

  return (
    <div className="space-y-6">
      <SectionTitle title="Master User Ledger" subtitle="Manage user accounts, restore deleted posts, track errors, and run system backups" />

      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input className="input pl-10" placeholder="Search by name or email" value={query} onChange={e => setQuery(e.target.value)} />
      </div>

      <div className="card overflow-hidden">
        <div className="divide-y divide-slate-100">
          {filtered.map(u => (
            <div key={u.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0" style={{ background: u.avatarColor }}>{u.name.charAt(0)}</div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-slate-800 truncate">{u.name}</p>
                  <p className="text-xs text-slate-400 truncate">{u.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Badge tone={ROLE_TONES[u.role]}>{ROLE_LABELS[u.role]}</Badge>
                {u.suspended && <Badge tone="red">Suspended</Badge>}
                <button onClick={() => toggleSuspend(u)} className={`text-xs font-bold px-3 py-1.5 rounded-lg ${u.suspended ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600 hover:bg-red-50 hover:text-red-600'}`}>
                  {u.suspended ? 'Reinstate' : 'Suspend'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
