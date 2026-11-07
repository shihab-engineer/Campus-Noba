import React, { createContext, useContext, useEffect, useState } from 'react'
import { useData } from './DataContext.jsx'
import { COURSES } from '../data/seed.js'

const SESSION_KEY = 'campusnova_session_v1'
const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const { db, addItem } = useData()
  const [userId, setUserId] = useState(() => localStorage.getItem(SESSION_KEY) || null)

  useEffect(() => {
    if (userId) localStorage.setItem(SESSION_KEY, userId)
    else localStorage.removeItem(SESSION_KEY)
  }, [userId])

  // A suspended account loses its session immediately
  const sessionUser = db.users.find(u => u.id === userId)
  const currentUser = sessionUser && !sessionUser.suspended ? sessionUser : null

  function login(email, password) {
    const user = db.users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password)
    if (!user) return { ok: false, error: 'Incorrect email or password.' }
    if (user.suspended) {
      return { ok: false, error: 'This account has been suspended. Please contact the System Administrator.' }
    }
    if (user.role === 'partner' && user.approveStatus === 'rejected') {
      return { ok: false, error: 'Your corporate account was not approved by the University Admin.' }
    }
    if (user.role === 'partner' && user.approveStatus !== 'approved') {
      return { ok: false, error: 'Your corporate account is still pending University Admin verification.' }
    }
    setUserId(user.id)
    return { ok: true, user }
  }

  function logout() {
    setUserId(null)
  }

  function register(payload) {
    const exists = db.users.some(u => u.email.toLowerCase() === payload.email.toLowerCase())
    if (exists) return { ok: false, error: 'An account with this email already exists.' }
    const domainRoles = ['student', 'faculty', 'club', 'uni_admin']
    if (domainRoles.includes(payload.role) && !payload.email.toLowerCase().endsWith('@diu.edu.bd')) {
      return { ok: false, error: 'Please use your official @diu.edu.bd school email for this role.' }
    }
    const id = `U-${payload.role.slice(0, 3).toUpperCase()}-${Date.now()}`
    const newUser = {
      id,
      role: payload.role,
      name: payload.name,
      email: payload.email,
      password: payload.password,
      avatarColor: '#6440c9',
      ...(payload.role === 'student' ? { studentId: `242-35-${Math.floor(800 + Math.random() * 199)}`, dept: 'Software Engineering', batch: '43', cgpa: 3.5, skills: [], courses: COURSES.map(c => c.code) } : {}),
      ...(payload.role === 'faculty' ? { facultyId: `F-${Math.floor(100 + Math.random() * 899)}`, dept: 'Software Engineering', designation: 'Lecturer' } : {}),
      ...(payload.role === 'club' ? { clubId: `C-${Math.floor(10 + Math.random() * 89)}`, leadContact: payload.name } : {}),
      ...(payload.role === 'partner' ? { partnerId: `P-${Math.floor(10 + Math.random() * 89)}`, regNum: `BD-REG-${Math.floor(1000 + Math.random() * 8999)}`, approveStatus: 'pending' } : {}),
    }
    addItem('users', newUser)
    if (payload.role === 'partner') {
      return { ok: true, pendingApproval: true }
    }
    setUserId(id)
    return { ok: true, user: newUser }
  }

  return (
    <AuthContext.Provider value={{ currentUser, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider')
  return ctx
}
