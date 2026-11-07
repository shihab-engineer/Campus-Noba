import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { SEED_DB } from '../data/seed.js'

const STORAGE_KEY = 'campusnova_db_v1'
const DataContext = createContext(null)

function loadDB() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      // Add any collections that were introduced after this browser first saved data
      const saved = JSON.parse(raw)
      const fresh = JSON.parse(JSON.stringify(SEED_DB))
      for (const key of Object.keys(fresh)) {
        if (!Array.isArray(saved[key])) saved[key] = fresh[key]
      }
      return saved
    }
  } catch (e) { /* fall through to seed */ }
  return JSON.parse(JSON.stringify(SEED_DB))
}

export function DataProvider({ children }) {
  const [db, setDb] = useState(loadDB)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db))
  }, [db])

  const update = useCallback((collection, updater) => {
    setDb(prev => ({ ...prev, [collection]: updater(prev[collection]) }))
  }, [])

  const addItem = useCallback((collection, item) => {
    update(collection, list => [{ ...item, id: item.id || `${collection.slice(0, 3).toUpperCase()}-${Date.now()}-${Math.random().toString(36).slice(2, 7)}` }, ...list])
  }, [update])

  const patchItem = useCallback((collection, id, patch) => {
    update(collection, list => list.map(x => x.id === id ? { ...x, ...patch } : x))
  }, [update])

  const removeItem = useCallback((collection, id) => {
    update(collection, list => list.filter(x => x.id !== id))
  }, [update])

  const resetDB = useCallback(() => {
    const fresh = JSON.parse(JSON.stringify(SEED_DB))
    setDb(fresh)
  }, [])

  const value = { db, update, addItem, patchItem, removeItem, resetDB }
  return <DataContext.Provider value={value}>{children}</DataContext.Provider>
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used inside DataProvider')
  return ctx
}
