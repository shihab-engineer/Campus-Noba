# CampusNova — Student Collaboration Hub

A working prototype of the **CampusNova** platform described in the SE231 Capstone
report (DIU, Summer 2026). Built with **React + Vite + Tailwind CSS**, using
browser `localStorage` as a lightweight database — so everything you do (upload
a resource, post a bazaar item, approve a file, register for an event, post a
job, etc.) is saved and persists across page reloads, no backend server needed.

## ✅ Implemented, matching the report

- Multi-role signup/login (Student, Faculty, Student Club, Industry Partner,
  University Admin, System Admin) with school-domain email validation (FR01, FR02)
- **Student Workspace**: Peer Team Matchmaker (FR03), Course Resource Library
  (FR04), Campus Peer Bazaar (FR15), Campus Calendar / Club Feed (FR14),
  Corporate Placements & Internships
- **Faculty Portal**: Asset Vetting / approve-reject with verified badges (FR05),
  Collaboration Metrics graphs (FR06), Advisory Broadcaster
- **Student Clubs Dashboard**: Event Lifecycle Tracker, Roster Management Logs (FR13)
- **Industry Partners Dashboard**: Placement Ad Management (FR11), Talent
  Portfolio Filter (FR12)
- **University Administration Dashboard**: Master Bulletin Broadcasting (FR07),
  Compliance & Operational Audits (FR08), Partner Verification Check
- **System Administration Dashboard**: User Permission Adjustments (FR09),
  Content Moderation / Soft-Deletion (FR10), System Health & Audit Trail
- Notifications bell with live in-app alerts across all roles
- Same visual language as the Figma prototype in the report: dark indigo/purple
  gradient workspace header, rounded cards, bottom nav on mobile / sidebar on desktop

## 🚀 Run it in VS Code

1. Open this folder in VS Code (`File → Open Folder…`).
2. Open a terminal (`` Ctrl+` ``) and run:
   ```bash
   npm install
   npm run dev
   ```
3. Open the printed local URL (usually **http://localhost:5173**).

To build a static production copy:
```bash
npm run build
npm run preview
```

## 🔑 Demo accounts (password for all: `pass123`)

| Role              | Email                          |
|-------------------|---------------------------------|
| Student           | shihab@diu.edu.bd              |
| Faculty           | johora@diu.edu.bd              |
| Student Club      | cpc@diu.edu.bd                 |
| Industry Partner  | hr@brainstation23.com          |
| University Admin  | admin@diu.edu.bd               |
| System Admin      | root@campusnova.io             |

You can also click a role button on the Login screen to auto-fill the demo
credentials, or register a brand-new account from the Register page (note:
Industry Partner accounts require University Admin approval before they can log in —
approve them from the University Admin → Partner Verification tab).

## 🗂 Project structure

```
Campus-Noba/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── src/
    ├── main.jsx                 # App entry point
    ├── App.jsx                  # Routes
    ├── index.css                # Tailwind + global styles
    ├── context/
    │   ├── AuthContext.jsx
    │   └── DataContext.jsx
    ├── data/
    │   └── seed.js              # Demo seed data
    ├── components/              # Shared UI
    │   ├── DashboardShell.jsx
    │   ├── WorkspaceHeader.jsx
    │   ├── NotificationBell.jsx
    │   └── UI.jsx
    └── pages/
        ├── auth/        Login, Register
        ├── student/     StudentDashboard, PartnerFinderTab, StudyHubTab, BazaarTab, EventsTab, CareersTab
        ├── faculty/     FacultyDashboard, VettingTab, MetricsTab, AdvisoryTab
        ├── club/        ClubDashboard, EventLifecycleTab, RosterTab
        ├── partner/     PartnerDashboard, JobsTab, TalentSearchTab
        ├── uni-admin/   UniAdminDashboard, BulletinTab, AnalyticsTab, PartnerVerificationTab
        └── sys-admin/   SysAdminDashboard, UsersTab, ModerationTab, SystemHealthTab
```

## Resetting demo data

Log in as **System Admin** → **System Health** tab → **Reset Demo Data** to wipe
localStorage back to the original seed data.

---
Built to match the CampusNova SE231 System Analysis & Design Capstone report
(Student: Md Abdulla Al Amin Shihab, ID 242-35-815, DIU).
