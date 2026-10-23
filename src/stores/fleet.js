import { defineStore } from 'pinia'
import { vehicles as seed } from '@/data/mock'

const LS_KEY = 'fr-fleet'

function load() {
  try {
    const saved = JSON.parse(localStorage.getItem(LS_KEY) || 'null')
    if (Array.isArray(saved) && saved.length) return saved
  } catch {
    /* yoksay */
  }
  return seed.map((v) => ({ ...v }))
}

export const useFleetStore = defineStore('fleet', {
  state: () => ({ vehicles: load() }),
  getters: {
    byStatus: (s) => (st) => s.vehicles.filter((v) => v.status === st),
    nextId: (s) => (s.vehicles.reduce((m, v) => Math.max(m, v.id), 0) + 1),
  },
  actions: {
    persist() {
      try { localStorage.setItem(LS_KEY, JSON.stringify(this.vehicles)) } catch { /* yoksay */ }
    },
    add(v) {
      const rec = {
        id: this.nextId,
        plate: v.plate || '—',
        brand: v.brand || '—',
        model: v.model || '',
        color: v.color || 'Beyaz',
        year: Number(v.year) || new Date().getFullYear(),
        vin: v.vin || '—',
        engineNo: v.engineNo || '—',
        status: v.status || 'active',
        km: Number(v.km) || 0,
        driver: v.driver || '—',
        rentStart: v.rentStart || new Date().toISOString().slice(0, 10),
        rentEnd: v.rentEnd || '',
        monthly: Number(v.monthly) || 0,
      }
      this.vehicles.unshift(rec)
      this.persist()
      return rec
    },
    update(id, patch) {
      const i = this.vehicles.findIndex((v) => v.id === id)
      if (i !== -1) { this.vehicles[i] = { ...this.vehicles[i], ...patch }; this.persist() }
    },
    remove(id) {
      this.vehicles = this.vehicles.filter((v) => v.id !== id)
      this.persist()
    },
    reset() {
      this.vehicles = seed.map((v) => ({ ...v }))
      this.persist()
    },
  },
})
