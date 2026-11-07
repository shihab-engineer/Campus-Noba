import React, { useState } from 'react'
import { Plus, Search, Tag, ShieldAlert } from 'lucide-react'
import { useData } from '../../context/DataContext.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import { SectionTitle, EmptyState, Badge, Modal } from '../../components/UI.jsx'
import { today } from '../../utils/date.js'

const CATEGORIES = ['Textbook', 'Electronics', 'Lab Gear', 'Study Notes', 'Other']
const CONDITIONS = ['Like New', 'Good', 'Fair']

export default function BazaarTab() {
  const { db, addItem, patchItem } = useData()
  const { currentUser } = useAuth()
  const [query, setQuery] = useState('')
  const [showPost, setShowPost] = useState(false)
  const [reportTarget, setReportTarget] = useState(null)
  const [contactTarget, setContactTarget] = useState(null)
  const [contactMsg, setContactMsg] = useState('')
  const [form, setForm] = useState({ title: '', price: '', category: CATEGORIES[0], condition: CONDITIONS[1] })

  const filtered = db.bazaarItems.filter(i => i.status === 'available' && i.title.toLowerCase().includes(query.toLowerCase()))

  function submitPost(e) {
    e.preventDefault()
    if (!form.title.trim() || !form.price) return
    addItem('bazaarItems', {
      title: form.title, price: Number(form.price), category: form.category, condition: form.condition,
      sellerId: currentUser.id, status: 'available', postedAt: today(),
    })
    setShowPost(false)
    setForm({ title: '', price: '', category: CATEGORIES[0], condition: CONDITIONS[1] })
  }

  function markSold(id) { patchItem('bazaarItems', id, { status: 'sold' }) }

  const alreadyReported = (itemId) =>
    db.reports.some(r => r.targetType === 'bazaar' && r.targetId === itemId && r.reportedBy === currentUser.id && r.status === 'open')

  function submitReport(reason) {
    if (alreadyReported(reportTarget.id)) { setReportTarget(null); return }
    addItem('reports', { targetType: 'bazaar', targetId: reportTarget.id, reason, reportedBy: currentUser.id, status: 'open', createdAt: today() })
    setReportTarget(null)
  }

  function openContact(item) {
    setContactTarget(item)
    setContactMsg(`Hi! Is "${item.title}" still available?`)
  }

  function submitContact(e) {
    e.preventDefault()
    if (!contactMsg.trim()) return
    const item = contactTarget
    addItem('bazaarChats', {
      itemId: item.id, buyerId: currentUser.id, sellerId: item.sellerId,
      message: contactMsg.trim(), createdAt: today(),
    })
    addItem('notifications', {
      userId: item.sellerId,
      title: `Buyer interested in "${item.title}"`,
      body: `${currentUser.name} (${currentUser.email}): ${contactMsg.trim()}`,
      time: 'just now', read: false, icon: 'user',
    })
    setContactTarget(null)
    setContactMsg('')
  }

  return (
    <div className="space-y-6">
      <SectionTitle
        title="Campus Peer Bazaar"
        subtitle="Buy, sell, or trade secondhand textbooks & gear"
        action={<button onClick={() => setShowPost(true)} className="btn-primary flex items-center gap-2 text-sm"><Plus size={16} /> Post Item</button>}
      />

      <div className="relative">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input className="input pl-10" placeholder="Search textbooks, electronics, lab kits..." value={query} onChange={e => setQuery(e.target.value)} />
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.length === 0 && <EmptyState text="No items listed right now." />}
        {filtered.map(item => {
          const seller = db.users.find(u => u.id === item.sellerId)
          const isMine = item.sellerId === currentUser.id
          return (
            <div key={item.id} className="card p-4 flex flex-col">
              <div className="flex items-center justify-between">
                <Badge tone={item.condition === 'Like New' ? 'green' : 'amber'}>{item.condition}</Badge>
                <span className="font-extrabold text-nova-600">৳ {item.price} BDT</span>
              </div>
              <p className="font-semibold text-slate-800 mt-2">{item.title}</p>
              <p className="text-xs text-slate-400 mt-1 flex items-center gap-1"><Tag size={12} /> {item.category} • by {seller?.name}</p>
              <div className="mt-auto pt-3 flex gap-2">
                {isMine ? (
                  <button onClick={() => markSold(item.id)} className="btn-secondary flex-1 text-xs py-2">Mark as Sold</button>
                ) : (
                  <>
                    {db.bazaarChats.some(c => c.itemId === item.id && c.buyerId === currentUser.id)
                      ? <button onClick={() => openContact(item)} className="btn-secondary flex-1 text-xs py-2">Message Sent · Send Again</button>
                      : <button onClick={() => openContact(item)} className="btn-primary flex-1 text-xs py-2">Contact Seller</button>}
                    <button onClick={() => setReportTarget(item)} disabled={alreadyReported(item.id)}
                      title={alreadyReported(item.id) ? 'You already reported this listing' : 'Report listing'}
                      className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 ${alreadyReported(item.id) ? 'border-red-200 bg-red-50 text-red-400 cursor-not-allowed' : 'border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200'}`}><ShieldAlert size={15} /></button>
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>

      {showPost && (
        <Modal title="Post Peer Bazaar Trade Listing" onClose={() => setShowPost(false)}>
          <form onSubmit={submitPost} className="space-y-4">
            <div>
              <label className="label">Item Title</label>
              <input className="input" required value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} placeholder="Operating System Textbook" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Price (BDT)</label>
                <input className="input" type="number" required min="0" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} />
              </div>
              <div>
                <label className="label">Category</label>
                <select className="input" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                  {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="label">Condition</label>
              <select className="input" value={form.condition} onChange={e => setForm(f => ({ ...f, condition: e.target.value }))}>
                {CONDITIONS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="flex gap-3 pt-1">
              <button type="button" onClick={() => setShowPost(false)} className="btn-secondary flex-1">Cancel</button>
              <button type="submit" className="btn-primary flex-1">Publish Trade Listing</button>
            </div>
          </form>
        </Modal>
      )}

      {contactTarget && (
        <Modal title="Contact Seller" onClose={() => setContactTarget(null)}>
          <form onSubmit={submitContact} className="space-y-4">
            <p className="text-sm text-slate-500">
              Message {db.users.find(u => u.id === contactTarget.sellerId)?.name} about "{contactTarget.title}" (৳ {contactTarget.price} BDT).
              They'll get a notification with your email so they can reply.
            </p>
            <textarea className="input min-h-[100px]" required value={contactMsg} onChange={e => setContactMsg(e.target.value)} />
            <div className="flex gap-3">
              <button type="button" onClick={() => setContactTarget(null)} className="btn-secondary flex-1">Cancel</button>
              <button type="submit" className="btn-primary flex-1">Send Message</button>
            </div>
          </form>
        </Modal>
      )}

      {reportTarget && (
        <Modal title="Report Listing" onClose={() => setReportTarget(null)}>
          <p className="text-sm text-slate-500 mb-4">Tell us what's wrong with "{reportTarget.title}". A system admin will review it.</p>
          <div className="space-y-2">
            {['Suspicious / scam listing', 'Prohibited item', 'Duplicate post', 'Misleading price or condition'].map(reason => (
              <button key={reason} onClick={() => submitReport(reason)} className="w-full text-left px-4 py-2.5 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50 text-sm font-medium text-slate-700">
                {reason}
              </button>
            ))}
          </div>
        </Modal>
      )}
    </div>
  )
}
