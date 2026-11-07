import React, { useState } from 'react'
import { Upload, Download, ThumbsUp, FileText, Search } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { COURSES } from '../../data/seed.js'
import { SectionTitle, EmptyState, Badge, Modal } from '../../components/UI.jsx'

export default function StudyHubTab() {
  const { db, addItem, patchItem } = useData()
  const { currentUser } = useAuth()
  const [query, setQuery] = useState('')
  const [showUpload, setShowUpload] = useState(false)
  const [form, setForm] = useState({ title: '', courseCode: COURSES[0].code, fileType: 'PDF' })

  const filtered = db.resources.filter(r =>
    r.title.toLowerCase().includes(query.toLowerCase()) || r.courseCode.toLowerCase().includes(query.toLowerCase())
  )

  function upvote(id) {
    patchItem('resources', id, { upvotes: (db.resources.find(r => r.id === id)?.upvotes || 0) + 1 })
  }

  function submitUpload(e) {
    e.preventDefault()
    if (!form.title.trim()) return
    addItem('resources', {
      title: form.title, courseCode: form.courseCode, fileType: form.fileType, sizeLabel: `${(Math.random() * 4 + 0.5).toFixed(1)} MB`,
      status: 'pending', badge: null, upvotes: 0, uploaderId: currentUser.id, uploadedAt: new Date().toISOString().slice(0, 10),
    })
    setShowUpload(false)
    setForm({ title: '', courseCode: COURSES[0].code, fileType: 'PDF' })
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Course Resource Library"
        subtitle="Course notes & slides with professor verified badges"
        action={<button onClick={() => setShowUpload(true)} className="btn-primary flex items-center gap-2 text-sm"><Upload size={16} /> Upload</button>}
      />

      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input className="input pl-10" placeholder="Search by title or course code" value={query} onChange={e => setQuery(e.target.value)} />
      </div>

      <div className="space-y-3">
        {filtered.length === 0 && <EmptyState text="No resources match your search." />}
        {filtered.map(r => {
          const uploader = db.users.find(u => u.id === r.uploaderId)
          return (
            <div key={r.id} className="card p-4 flex items-start gap-4">
              <div className="w-11 h-11 rounded-xl bg-nova-50 text-nova-600 flex items-center justify-center shrink-0"><FileText size={20} /></div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge tone="purple">{r.courseCode}</Badge>
                  <span className="text-xs text-slate-400">{r.fileType} • {r.sizeLabel}</span>
                  {r.status === 'approved'
                    ? <Badge tone="green">{r.badge || 'Professor Verified'}</Badge>
                    : <Badge tone="amber">Pending Vetting</Badge>}
                </div>
                <p className="font-semibold text-slate-800 mt-1.5">{r.title}</p>
                <p className="text-xs text-slate-400 mt-1">By {uploader?.name} • Uploaded {r.uploadedAt}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <button onClick={() => upvote(r.id)} className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-nova-600">
                  <ThumbsUp size={14} /> {r.upvotes}
                </button>
                <button disabled={r.status !== 'approved'} className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 ${r.status === 'approved' ? 'bg-nova-500 text-white hover:bg-nova-600' : 'bg-slate-100 text-slate-400'}`}>
                  <Download size={13} /> Download
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {showUpload && (
        <Modal title="Upload Academic Study File" onClose={() => setShowUpload(false)}>
          <form onSubmit={submitUpload} className="space-y-4">
            <div>
              <label className="label">Document Title</label>
              <input className="input" required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="e.g. SE231 Midterm Revision Notes" />
            </div>
            <div>
              <label className="label">Course Code</label>
              <select className="input" value={form.courseCode} onChange={e => setForm(f => ({ ...f, courseCode: e.target.value }))}>
                {COURSES.map(c => <option key={c.code} value={c.code}>{c.code} {c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="label">File Type</label>
              <select className="input" value={form.fileType} onChange={e => setForm(f => ({ ...f, fileType: e.target.value }))}>
                <option>PDF Document</option>
                <option>DOCX Document</option>
                <option>PPTX Slides</option>
              </select>
            </div>
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={() => setShowUpload(false)} className="btn-secondary flex-1">Cancel</button>
              <button type="submit" className="btn-primary flex-1">Submit for Faculty Vetting</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}
