import React, { useState } from 'react'
import { CalendarPlus, Users, ListChecks } from 'lucide-react'
import DashboardShell from '../../components/DashboardShell.jsx'
import WorkspaceHeader from '../../components/WorkspaceHeader.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import EventLifecycleTab from './EventLifecycleTab.jsx'
import RosterTab from './RosterTab.jsx'

const TABS = [
  { key: 'events', label: 'Event Lifecycle', icon: CalendarPlus },
  { key: 'roster', label: 'Roster Logs', icon: Users },
]

export default function ClubDashboard() {
  const { currentUser } = useAuth()
  const [active, setActive] = useState('events')
  return (
    <DashboardShell tabs={TABS} active={active} onChange={setActive} roleLabel="Student Club Panel">
      <WorkspaceHeader eyebrow="Student Clubs Dashboard" name={currentUser.name} subtitle={`Club Lead: ${currentUser.leadContact}`} idLabel={`ID: ${currentUser.clubId}`} />
      {active === 'events' && <EventLifecycleTab />}
      {active === 'roster' && <RosterTab />}
    </DashboardShell>
  )
}
