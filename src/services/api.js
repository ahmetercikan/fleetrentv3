// ------------------------------------------------------------------
//  FleetRent v2 — API servis katmanı
//  Varsayılan: MOCK (src/data). Gerçek backend'e geçiş için:
//    1) vite.config.js'te /api proxy'sini aç
//    2) .env'e VITE_USE_MOCK=false ekle
//    3) view'larda ilgili api.* fonksiyonlarını çağır
//  Tüm uçlar mevcut fleetrent.com.tr yapısıyla uyumludur.
// ------------------------------------------------------------------
import * as mock from '@/data/mock'

const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'
const CUSTOMER_ID = Number(import.meta.env.VITE_CUSTOMER_ID || 8)

async function http(path, { method = 'GET', body, params } = {}) {
  const url = new URL(path, window.location.origin)
  if (params) Object.entries(params).forEach(([k, v]) => v != null && url.searchParams.set(k, v))
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // oturum çerezleri
    body: body ? JSON.stringify(body) : undefined,
  })
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`)
  return res.json()
}

// Mock gecikmesini simüle eder (gerçekçi yükleme durumları için)
const delay = (data, ms = 180) => new Promise((r) => setTimeout(() => r(data), ms))

export const api = {
  useMock: USE_MOCK,
  customerId: CUSTOMER_ID,

  // --- Müşteri paneli ---
  session: () => (USE_MOCK ? delay(mock.company) : http('/api/team/customer/session')),
  vehicles: () => (USE_MOCK ? delay(mock.vehicles) : http('/api/vehicles', { params: { customer_id: CUSTOMER_ID } })),
  quotes: () => (USE_MOCK ? delay(mock.quotes) : http('/api/quotes', { params: { customer_id: CUSTOMER_ID } })),
  serviceOverview: () => (USE_MOCK ? delay(mock.serviceRecords) : http('/api/service-overview', { params: { customer_id: CUSTOMER_ID } })),
  tireOverview: () => (USE_MOCK ? delay(mock.tires) : http('/api/tire-overview', { params: { customer_id: CUSTOMER_ID } })),
  fuelOverview: (start, end) => (USE_MOCK ? delay(mock.fuelRecords) : http('/api/fuel-overview', { params: { customer_id: CUSTOMER_ID, start_date: start, end_date: end } })),
  reports: () => (USE_MOCK ? delay([]) : http('/api/reports', { params: { customer_id: CUSTOMER_ID } })),
  vehicleExpenses: () => (USE_MOCK ? delay(mock.savingsFindings) : http('/api/vehicle-expenses', { params: { customer_id: CUSTOMER_ID } })),
  contracts: () => (USE_MOCK ? delay(mock.contracts) : http('/api/contracts', { params: { customer_id: CUSTOMER_ID } })),
  invoices: () => (USE_MOCK ? delay(mock.invoices) : http('/api/invoices', { params: { customer_id: CUSTOMER_ID } })),
  users: () => (USE_MOCK ? delay(mock.users) : http('/api/customer/users', { params: { customer_id: CUSTOMER_ID } })),
  documents: () => (USE_MOCK ? delay(mock.documents) : http('/api/customer/documents', { params: { customer_id: CUSTOMER_ID } })),
  gpsSettings: () => (USE_MOCK ? delay(mock.integrations.gps) : http('/api/customer/settings/gps', { params: { customer_id: CUSTOMER_ID } })),
  uttsSettings: () => (USE_MOCK ? delay(mock.integrations.utts) : http('/api/customer/settings/utts', { params: { customer_id: CUSTOMER_ID } })),

  // --- Tedarikçi portalı ---
  supplierSession: () => (USE_MOCK ? delay({}) : http('/api/team/supplier/session')),
  supplierSnapshot: () => (USE_MOCK ? delay({}) : http('/api/supplier-workspace/snapshot')),
  supplierFleet: () => (USE_MOCK ? delay({}) : http('/api/supplier-workspace/fleet/overview')),
  supplierTasks: () => (USE_MOCK ? delay([]) : http('/api/supplier-workspace/fleet/tasks')),
}

export default api
