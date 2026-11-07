import React, { useState } from 'react'
import { Megaphone, BarChart3, ShieldCheck } from 'lucide-react'
import DashboardShell from '../../components/DashboardShell.jsx'
import WorkspaceHeader from '../../components/WorkspaceHeader.jsx'
import { useAuth } from '../../context/AuthContext.jsx'
import BulletinTab from './BulletinTab.jsx'
import AnalyticsTab from './AnalyticsTab.jsx'
import PartnerVerificationTab from './PartnerVerificationTab.jsx'

const TABS = [
  { key: 'bulletin', label: 'Master Bulletin', icon: Megaphone },
  { key: 'analytics', label: 'Compliance Audits', icon: BarChart3 },
  { key: 'partners', label: 'Partner Verification', icon: ShieldCheck },
]

export default function UniAdminDashboard() {
  const { currentUser } = useAuth()
  const [active, setActive] = useState('bulletin')
  return (
    <DashboardShell tabs={TABS} active={active} onChange={setActive} roleLabel="University Administration">
      <WorkspaceHeader eyebrow="Administration Dashboard" name={currentUser.name} subtitle="Executive Supervision Level" />
      {active === 'bulletin' && <BulletinTab />}
      {active === 'analytics' && <AnalyticsTab />}
      {active === 'partners' && <PartnerVerificationTab />}
    </DashboardShell>
  )
}
