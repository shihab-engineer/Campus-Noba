// CampusNova seed data — mimics the 6-entity ecosystem described in the SE231 report.
// All data lives in localStorage after first load, so the app is fully interactive
// without needing a real backend.

export const COURSES = [
  { code: 'SE231', name: 'System Analysis & Design' },
  { code: 'CSE111', name: 'Object Oriented Programming' },
  { code: 'SE322', name: 'Web Engineering' },
  { code: 'CSE221', name: 'Data Structures' },
  { code: 'CSE311', name: 'Database Systems' },
]

export const SKILL_POOL = [
  'React', 'Node.js', 'Express', 'UI/UX', 'Python', 'PostgreSQL', 'Flutter',
  'System Design', 'TypeScript', 'Figma', 'Tailwind CSS', 'MongoDB', 'Java',
]

export const SEED_DB = {
  users: [
    { id: 'U-STU-1', role: 'student', name: 'Abdulla Al Amin', email: 'shihab@diu.edu.bd', password: 'pass123', studentId: '242-35-815', dept: 'Software Engineering', batch: '43', cgpa: 3.72, skills: ['React', 'UI/UX', 'Figma'], avatarColor: '#f59e0b' },
    { id: 'U-STU-2', role: 'student', name: 'Md. Mohimenul Islam', email: 'mohimenul@diu.edu.bd', password: 'pass123', studentId: '242-35-820', dept: 'Software Engineering', batch: '43', cgpa: 3.81, skills: ['PostgreSQL', 'Express', 'React', 'Node.js'], avatarColor: '#2563eb' },
    { id: 'U-STU-3', role: 'student', name: 'Ritu Rani Saha', email: 'ritu@diu.edu.bd', password: 'pass123', studentId: '242-35-821', dept: 'Software Engineering', batch: '43', cgpa: 3.65, skills: ['Flutter', 'UI/UX', 'System Design'], avatarColor: '#db2777' },
    { id: 'U-FAC-1', role: 'faculty', name: 'Fatema Tuz Johora', email: 'johora@diu.edu.bd', password: 'pass123', facultyId: 'F-108', dept: 'Software Engineering', designation: 'Lecturer', avatarColor: '#0891b2' },
    { id: 'U-CLB-1', role: 'club', name: 'DIU Computer Programming Club', email: 'cpc@diu.edu.bd', password: 'pass123', clubId: 'C-01', leadContact: 'Nafis Rahman', avatarColor: '#16a34a' },
    { id: 'U-PTR-1', role: 'partner', name: 'Brain Station 23 Ltd.', email: 'hr@brainstation23.com', password: 'pass123', partnerId: 'P-01', regNum: 'BD-REG-4471', approveStatus: 'approved', avatarColor: '#9333ea' },
    { id: 'U-UAD-1', role: 'uni_admin', name: 'Prof. Dr. Yousuf Mahbub', email: 'admin@diu.edu.bd', password: 'pass123', avatarColor: '#334155' },
    { id: 'U-SAD-1', role: 'sys_admin', name: 'System Admin', email: 'root@campusnova.io', password: 'pass123', avatarColor: '#0f172a' },
  ],

  resources: [
    { id: 'R-1', title: 'SE231 System Analysis Complete Lecture Notes & Case Studies', courseCode: 'SE231', uploaderId: 'U-STU-2', fileType: 'PDF', sizeLabel: '4.8 MB', status: 'approved', badge: 'Professor Verified', upvotes: 42, uploadedAt: '2026-07-24' },
    { id: 'R-2', title: 'SE322 Web Engineering Lab Manual & Express Boilerplate', courseCode: 'SE322', uploaderId: 'U-STU-1', fileType: 'PDF', sizeLabel: '3.2 MB', status: 'pending', badge: null, upvotes: 30, uploadedAt: '2026-07-30' },
    { id: 'R-3', title: 'CSE221 Data Structures — Linked List & Tree Cheat Sheet', courseCode: 'CSE221', uploaderId: 'U-STU-3', fileType: 'PDF', sizeLabel: '1.1 MB', status: 'approved', badge: 'Professor Verified', upvotes: 18, uploadedAt: '2026-06-14' },
    { id: 'R-4', title: 'CSE311 Database Systems — Normalization Practice Set', courseCode: 'CSE311', uploaderId: 'U-STU-2', fileType: 'DOCX', sizeLabel: '900 KB', status: 'pending', badge: null, upvotes: 5, uploadedAt: '2026-08-10' },
  ],

  bazaarItems: [
    { id: 'B-1', title: 'System Analysis & Design (6th Edition)', category: 'Textbook', condition: 'Good', price: 450, sellerId: 'U-STU-1', status: 'available', postedAt: '2026-07-20' },
    { id: 'B-2', title: 'Logitech MX Master 3S Wireless Mouse', category: 'Electronics', condition: 'Like New', price: 3320, sellerId: 'U-STU-2', status: 'available', postedAt: '2026-07-22' },
    { id: 'B-3', title: 'Arduino Uno R3 Microcontroller Kit', category: 'Lab Gear', condition: 'Good', price: 1200, sellerId: 'U-STU-3', status: 'available', postedAt: '2026-07-18' },
    { id: 'B-4', title: 'Printed hand-written Notes for OS', category: 'Study Notes', condition: 'Like New', price: 150, sellerId: 'U-STU-1', status: 'available', postedAt: '2026-07-25' },
  ],

  events: [
    { id: 'E-1', title: 'DIU CampusNova Hackathon 2026 – Innovation for Smart Campus', clubId: 'C-01', category: 'Hackathon', venue: 'DIU Smart Auditorium, Knowledge Tower', date: '2026-08-20', time: '09:00 AM – 08:00 PM', description: '36-hour team hackathon focusing on student collaboration solutions, web security, and automated academic workflows. Total prize pool: 50,000 BDT!', attendees: 142, status: 'approved' },
    { id: 'E-2', title: 'DIU Career Fair & Corporate Pitch Summit', clubId: 'C-01', category: 'Seminar', venue: 'Main Plaza, Smart Campus Ashulia', date: '2026-08-25', time: '10:00 AM – 04:00 PM', description: 'Connect directly with 30+ leading tech companies in Bangladesh. Bring your updated CampusNova portfolio.', attendees: 96, status: 'approved' },
  ],

  registrations: [
    { id: 'REG-1', eventId: 'E-1', studentId: 'U-STU-3', registeredAt: '2026-07-30' },
  ],

  jobs: [
    { id: 'J-1', title: 'Junior React & Node.js Software Engineer', partnerId: 'U-PTR-1', type: 'Full Time', salary: '35,000 – 45,000 / month', location: 'Dhaka / Hybrid', skills: ['PostgreSQL', 'Express', 'React', 'Node.js', 'TypeScript'], description: 'We are seeking passionate DIU graduates with strong foundational knowledge in web architecture, modular code design, and REST APIs.', postedAt: '2026-07-24', deadline: '2026-09-15', applicants: 28 },
    { id: 'J-2', title: 'Software Quality Assurance Intern', partnerId: 'U-PTR-1', type: 'Internship', salary: '18,000 – 20,000 / month', location: 'Banani, Dhaka', skills: ['Software Testing', 'JUnit', 'Selenium', 'System Analysis'], description: 'Join our QA automation team to write test scripts, run boundary analysis, and perform integration checks for enterprise web platforms.', postedAt: '2026-07-28', deadline: '2026-09-01', applicants: 14 },
  ],

  applications: [],

  matchRequests: [
    { id: 'MR-1', senderId: 'U-STU-2', receiverId: 'U-STU-1', courseCode: 'SE231', message: 'Hey! Want to team up for the System Analysis capstone?', status: 'pending', createdAt: '2026-08-14' },
  ],

  bazaarChats: [],

  reports: [
    { id: 'RPT-1', targetType: 'bazaar', targetId: 'B-2', reason: 'Suspicious duplicate listing', reportedBy: 'U-STU-3', status: 'open', createdAt: '2026-08-05' },
  ],

  notifications: [
    { id: 'N-1', userId: 'U-STU-1', title: 'Study File Approved!', body: 'Lecturer Fatema Tuz Johora approved your "System Analysis Complete Notes" with a Verified Badge.', time: '10 minutes ago', read: false, icon: 'file' },
    { id: 'N-2', userId: 'U-STU-1', title: 'New Team Match Request', body: 'Md. Mohimenul Islam requested to connect for the SE231 System Analysis project team.', time: '1 hour ago', read: false, icon: 'user' },
    { id: 'N-3', userId: 'U-STU-1', title: 'Hackathon Registration Confirmed', body: 'Your team registration for DIU CampusNova Hackathon 2026 is confirmed.', time: '5 hours ago', read: true, icon: 'calendar' },
  ],

  auditLogs: [
    { id: 'AL-1', actor: 'System Admin', action: 'Soft-deleted bazaar listing B-9 (policy violation)', time: '2026-08-20 14:12' },
    { id: 'AL-2', actor: 'System Admin', action: 'Upgraded role permissions for U-STU-2', time: '2026-08-18 09:40' },
  ],

  broadcasts: [
    { id: 'BC-1', title: 'Mid-Semester Break Notice', body: 'The university will remain closed from Aug 28 to Sep 1 for the mid-semester break.', priority: 'normal', postedAt: '2026-08-22' },
  ],
}
