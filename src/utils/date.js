// Dates in the user's local timezone as YYYY-MM-DD.
// (toISOString() uses UTC, which gives yesterday's date in Bangladesh before 6 AM.)
export function localDate(d = new Date()) {
  const pad = n => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function today() {
  return localDate()
}

export function daysFromToday(days) {
  const d = new Date()
  d.setDate(d.getDate() + days)
  return localDate(d)
}

// True when a YYYY-MM-DD date is before today
export function isPast(dateStr) {
  return !!dateStr && dateStr < today()
}
