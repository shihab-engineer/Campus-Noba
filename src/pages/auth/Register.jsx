import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { GraduationCap, User, BookOpen, Users, Briefcase, ShieldCheck } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'

const ROLES = [
  { key: 'student', label: 'Student', icon: User, hint: 'DIU enrolled students' },
  { key: 'faculty', label: 'Faculty', icon: BookOpen, hint: 'Instructors & lecturers' },
  { key: 'club', label: 'Student Club', icon: Users, hint: 'Club panels & leads' },
  { key: 'partner', label: 'Industry Partner', icon: Briefcase, hint: 'Recruiters, needs admin approval' },
]

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [role, setRole] = useState('student')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [pendingNotice, setPendingNotice] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 6) { setError('Password must be at least 6 characters.'); return }
    const res = register({ role, name, email, password })
    if (!res.ok) { setError(res.error); return }
    if (res.pendingApproval) { setPendingNotice(true); return }
    navigate('/app')
  }

  if (pendingNotice) {
    return (
      <div className="min-h-screen bg-nova-950 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-2xl">
          <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-100 text-amber-600 flex items-center justify-center mb-4"><ShieldCheck size={26} /></div>
          <h2 className="text-lg font-bold text-slate-800">Verification Pending</h2>
          <p className="text-sm text-slate-500 mt-2">Your corporate account has been submitted. University Admin must verify your company credentials before you can log in.</p>
          <Link to="/" className="btn-primary w-full mt-6 inline-block">Back to Login</Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-nova-950 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-nova-500/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="relative w-full max-w-md">
        <div className="flex flex-col items-center mb-6 text-white">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-nova-400 to-blue-500 flex items-center justify-center mb-3 shadow-lg">
            <GraduationCap size={26} />
          </div>
          <h1 className="text-2xl font-extrabold">CampusNova</h1>
          <p className="text-white/50 text-sm mt-1">Create your workspace account</p>
        </div>

        <div className="bg-nova-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <div className="px-6 pt-6 pb-5">
            <h2 className="text-white text-xl font-bold">Register</h2>
            <p className="text-white/50 text-sm mt-0.5">Create your account</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-t-2xl px-6 pt-6 pb-6 space-y-4">
            <div>
              <label className="label">I am a...</label>
              <div className="grid grid-cols-2 gap-2">
                {ROLES.map(r => {
                  const Ico = r.icon
                  const active = role === r.key
                  return (
                    <button type="button" key={r.key} onClick={() => setRole(r.key)}
                      className={`text-left px-3 py-2.5 rounded-xl border transition ${active ? 'border-nova-500 bg-nova-50' : 'border-slate-200 hover:border-slate-300'}`}>
                      <Ico size={16} className={active ? 'text-nova-600' : 'text-slate-400'} />
                      <p className="text-xs font-bold mt-1 text-slate-700">{r.label}</p>
                    </button>
                  )
                })}
              </div>
            </div>
            <div>
              <label className="label">Full Name</label>
              <input className="input" required placeholder="Your full name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div>
              <label className="label">{role === 'partner' ? 'Corporate Email' : 'School Email'}</label>
              <input className="input" type="email" required placeholder={role === 'partner' ? 'you@company.com' : 'you@diu.edu.bd'} value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="label">Password</label>
                <input className="input" type="password" required value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              <div>
                <label className="label">Confirm Password</label>
                <input className="input" type="password" required value={confirm} onChange={e => setConfirm(e.target.value)} />
              </div>
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
            <button type="submit" className="btn-primary w-full py-3 uppercase tracking-wide text-sm">Register</button>
            <p className="text-center text-sm text-slate-500">Already have an account? <Link to="/" className="text-nova-600 font-semibold">Login</Link></p>
          </form>
        </div>
      </div>
    </div>
  )
}
