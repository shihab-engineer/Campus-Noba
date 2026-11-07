import React, { useState } from 'react'
import { Users, ShieldAlert, Activity } from 'lucide-react'
import DashboardShell from '../../components/DashboardShell.jsx'
import WorkspaceHeader from '../../components/WorkspaceHeader.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import UsersTab from './UsersTab.jsx'
import ModerationTab from './ModerationTab.jsx'
import SystemHealthTab from './SystemHealthTab.jsx'

const TABS = [
  { key: 'users', label: 'User Permissions', icon: Users },
  { key: 'moderation', label: 'Content Moderation', icon: ShieldAlert },
  { key: 'health', label: 'System Health', icon: Activity },
]

export default function SysAdminDashboard() {
  const { currentUser } = useAuth()
  const [active, setActive] = useState('users')
  return (
    <DashboardShell tabs={TABS} active={active} onChange={setActive} roleLabel="System Administrator">
      <WorkspaceHeader eyebrow="System Admin Dashboard" name={currentUser.name} subtitle="Master Control • Full Platform Access" />
      {active === 'users' && <UsersTab />}
      {active === 'moderation' && <ModerationTab />}
      {active === 'health' && <SystemHealthTab />}
    </DashboardShell>
  )
}
