import React, { useState } from 'react'
import { FileCheck2, BarChart3, Megaphone } from 'lucide-react'
import DashboardShell from '../../components/DashboardShell.jsx'
import WorkspaceHeader from '../../components/WorkspaceHeader.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import VettingTab from './VettingTab.jsx'
import MetricsTab from './MetricsTab.jsx'
import AdvisoryTab from './AdvisoryTab.jsx'

const TABS = [
  { key: 'vetting', label: 'Asset Vetting', icon: FileCheck2 },
  { key: 'metrics', label: 'Collaboration Metrics', icon: BarChart3 },
  { key: 'advisory', label: 'Advisory Broadcaster', icon: Megaphone },
]

export default function FacultyDashboard() {
  const { currentUser } = useAuth()
  const [active, setActive] = useState('vetting')
  return (
    <DashboardShell tabs={TABS} active={active} onChange={setActive} roleLabel={`${currentUser.designation} • ${currentUser.dept}`}>
      <WorkspaceHeader eyebrow="Faculty Portal" name={currentUser.name.split(' ')[0]} subtitle={`${currentUser.designation} • ${currentUser.dept}`} idLabel={`ID: ${currentUser.facultyId}`} />
      {active === 'vetting' && <VettingTab />}
      {active === 'metrics' && <MetricsTab />}
      {active === 'advisory' && <AdvisoryTab />}
    </DashboardShell>
  )
}
