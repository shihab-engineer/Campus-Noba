import React, { useState } from 'react'
import { Users2, BookOpen, ShoppingBag, CalendarDays, Briefcase } from 'lucide-react'
import DashboardShell from '../../components/DashboardShell.jsx'
import WorkspaceHeader from '../../components/WorkspaceHeader.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import PartnerFinderTab from './PartnerFinderTab.jsx'
import StudyHubTab from './StudyHubTab.jsx'
import BazaarTab from './BazaarTab.jsx'
import EventsTab from './EventsTab.jsx'
import CareersTab from './CareersTab.jsx'

const TABS = [
  { key: 'partner', label: 'Partner Finder', icon: Users2 },
  { key: 'study', label: 'Study Hub', icon: BookOpen },
  { key: 'bazaar', label: 'Bazaar', icon: ShoppingBag },
  { key: 'events', label: 'Events', icon: CalendarDays },
  { key: 'careers', label: 'Careers', icon: Briefcase },
]

export default function StudentDashboard() {
  const { currentUser } = useAuth()
  const [active, setActive] = useState('partner')

  return (
    <DashboardShell tabs={TABS} active={active} onChange={setActive} roleLabel={`${currentUser.dept} • Batch ${currentUser.batch}`}>
      <WorkspaceHeader
        eyebrow="Student Workspace"
        name={currentUser.name.split(' ')[0]}
        subtitle={`${currentUser.dept} • Batch ${currentUser.batch}`}
        idLabel={`ID: ${currentUser.studentId}`}
      />
      {active === 'partner' && <PartnerFinderTab />}
      {active === 'study' && <StudyHubTab />}
      {active === 'bazaar' && <BazaarTab />}
      {active === 'events' && <EventsTab />}
      {active === 'careers' && <CareersTab />}
    </DashboardShell>
  )
}
