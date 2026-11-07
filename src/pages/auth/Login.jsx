import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff, GraduationCap } from 'lucide-react'
import { useAuth } from '../../context/AuthContext.jsx'

const DEMO_ACCOUNTS = [
  { label: 'Student', email: 'shihab@diu.edu.bd' },
  { label: 'Faculty', email: 'johora@diu.edu.bd' },
  { label: 'Student Club', email: 'cpc@diu.edu.bd' },
  { label: 'Industry Partner', email: 'hr@brainstation23.com' },
  { label: 'University Admin', email: 'admin@diu.edu.bd' },
  { label: 'System Admin', email: 'root@campusnova.io' },
]

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPw, setShowPw] = useState(false)
  const [error, setError] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    setError('')
    const res = login(email, password)
    if (!res.ok) { setError(res.error); return }
    navigate('/app')
  }

  function fillDemo(demoEmail) {
    setEmail(demoEmail)
    setPassword('pass123')
    setError('')
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
          <p className="text-white/50 text-sm mt-1">Student Collaboration Hub</p>
        </div>

        <div className="bg-nova-900 rounded-2xl overflow-hidden shadow-2xl border border-white/10">
          <div className="px-6 pt-6 pb-5">
            <h2 className="text-white text-xl font-bold">Sign in to your Account</h2>
            <p className="text-white/50 text-sm mt-0.5">Sign in to account</p>
          </div>
          <form onSubmit={handleSubmit} className="bg-white rounded-t-2xl px-6 pt-6 pb-6 space-y-4">
            <div>
              <label className="label">Username or Email</label>
              <input className="input" type="email" required placeholder="you@diu.edu.bd" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <div>
              <label className="label">Password</label>
              <div className="relative">
                <input className="input pr-10" type={showPw ? 'text' : 'password'} required placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} />
                <button type="button" onClick={() => setShowPw(s => !s)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                  {showPw ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              </div>
              <div className="text-right mt-1.5">
                <span className="text-xs text-nova-500 font-semibold cursor-default">Forgot Password?</span>
              </div>
            </div>
            {error && <p className="text-sm text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">{error}</p>}
            <button type="submit" className="btn-primary w-full py-3 uppercase tracking-wide text-sm">Login</button>
            <p className="text-center text-sm text-slate-500">Don't have an account? <Link to="/register" className="text-nova-600 font-semibold">Register</Link></p>
          </form>
        </div>

        <div className="mt-5 bg-white/5 border border-white/10 rounded-2xl p-4">
          <p className="text-white/60 text-xs font-semibold uppercase tracking-wide mb-2">Quick demo access (password: pass123)</p>
          <div className="flex flex-wrap gap-2">
            {DEMO_ACCOUNTS.map(d => (
              <button key={d.email} onClick={() => fillDemo(d.email)} type="button" className="text-xs font-semibold bg-white/10 hover:bg-white/20 text-white px-3 py-1.5 rounded-lg transition">
                {d.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
