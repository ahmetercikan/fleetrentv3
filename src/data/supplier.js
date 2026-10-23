// ------------------------------------------------------------------
//  FleetRent v2 — Tedarikçi (Supplier) portalı veri + navigasyon
//  Gerçek backend: /api/supplier-workspace/*  ·  /api/team/supplier/session
// ------------------------------------------------------------------
import { TL, NUM } from './mock'
export { TL, NUM }

export const supplier = {
  name: 'Ali Filo Kiralama A.Ş.',
  role: 'Şirket Sahibi',
  branch: 'Merkez · İstanbul',
}

// Sol menü — accordion gruplar (gerçek /supplier-portal yapısı birebir)
export const supplierNav = [
  { label: 'Ana Sayfa', to: '/supplier', icon: 'home' },
  { label: 'Günlük Operasyonlar', to: '/supplier/operations', icon: 'wrench' },
  {
    label: 'Araçlar', icon: 'car', children: [
      { label: 'Araçlar', to: '/supplier/vehicles' },
      { label: 'Bakım Önerileri', to: '/supplier/maintenance' },
      { label: 'Servis & Bakım', to: '/supplier/service' },
      { label: 'Lastik Yönetimi', to: '/supplier/tire' },
      { label: 'Hasar & Kaza', to: '/supplier/damage' },
      { label: 'Sigorta & Kasko', to: '/supplier/policies' },
      { label: 'HGS', to: '/supplier/hgs' },
      { label: 'TPC (Trafik Cezaları)', to: '/supplier/fines' },
      { label: 'Yakıt Giderleri', to: '/supplier/fuel' },
      { label: 'Araç Satışları', to: '/supplier/sales' },
    ],
  },
  {
    label: 'Kiralamalar', icon: 'offer', children: [
      { label: 'Rezervasyonlar', to: '/supplier/reservations' },
      { label: 'Kiralamalar', to: '/supplier/rentals' },
      { label: 'Teklifler', to: '/supplier/offers' },
      { label: 'Sözleşmeler', to: '/supplier/contracts' },
      { label: 'Teslimatlar', to: '/supplier/deliveries' },
      { label: 'İadeler & Mutabakat', to: '/supplier/returns' },
      { label: 'Kiralama İhaleleri', to: '/supplier/marketplace' },
    ],
  },
  { label: 'Müşteriler', to: '/supplier/customers', icon: 'users' },
  {
    label: 'Muhasebe', icon: 'report', children: [
      { label: 'Faturalar', to: '/supplier/invoices' },
      { label: 'Muhasebe', to: '/supplier/accounting' },
      { label: 'Onay & Yetki', to: '/supplier/approvals' },
    ],
  },
  {
    label: 'Raporlar', icon: 'savings', children: [
      { label: 'Raporlar', to: '/supplier/reports' },
      { label: 'Filo Planlama & Karar', to: '/supplier/planning' },
    ],
  },
  {
    label: 'Ayarlar', icon: 'settings', children: [
      { label: 'Ayarlar', to: '/supplier/settings' },
      { label: 'Şube ve Lokasyonlar', to: '/supplier/branches' },
      { label: 'Kullanıcılar ve Yetkiler', to: '/supplier/users' },
    ],
  },
]

// Dashboard snapshot
export const supplierKpi = {
  pendingDelivery: 3, pendingReturn: 2, maintenanceHints: 4, matchPending: 1,
}
export const fleetStatus = [
  { label: 'Toplam Araç', value: 42, icon: 'car', tone: 'brand' },
  { label: 'Kirada', value: 28, icon: 'key', tone: 'success' },
  { label: 'Havuzda', value: 7, icon: 'parking', tone: 'info' },
  { label: 'Serviste', value: 4, icon: 'wrench', tone: 'warning' },
  { label: 'Satışta', value: 2, icon: 'tag', tone: 'neutral' },
  { label: 'Pasif', value: 1, icon: 'pause', tone: 'neutral' },
  { label: 'Hasar', value: 2, icon: 'alert', tone: 'danger' },
]
export const fleetStatusDonut = [
  { label: 'Kirada', value: 28, tone: '#10b981' },
  { label: 'Havuzda', value: 7, tone: '#0ea5e9' },
  { label: 'Serviste', value: 4, tone: '#f59e0b' },
  { label: 'Satışta/Pasif', value: 3, tone: '#8a93a8' },
]

export const opsTasks = [
  { id: 1, job: 'Teslimat — 34 FLT 904', branch: 'Merkez', due: '2026-10-24', owner: 'Serkan Y.', status: 'open' },
  { id: 2, job: 'İade mutabakat — 34 ABC 12', branch: 'Kadıköy', due: '2026-10-23', owner: 'Deniz K.', status: 'late' },
  { id: 3, job: 'Periyodik bakım — 34 XYZ 77', branch: 'Merkez', due: '2026-10-25', owner: 'Servis', status: 'today' },
]
export const opsStatusLabels = {
  open: { label: 'Açık', tone: 'info' }, late: { label: 'Geciken', tone: 'danger' }, today: { label: 'Bugün', tone: 'warning' },
}

export const supplierRevenue = [
  { month: 'May', gelir: 1240000, maliyet: 720000 },
  { month: 'Haz', gelir: 1310000, maliyet: 760000 },
  { month: 'Tem', gelir: 1420000, maliyet: 810000 },
  { month: 'Ağu', gelir: 1380000, maliyet: 790000 },
  { month: 'Eyl', gelir: 1510000, maliyet: 840000 },
  { month: 'Eki', gelir: 1620000, maliyet: 880000 },
]

// Örnek satırlar — liste ekranlarında kullanılır
export const sampleRentals = [
  { id: 'KR-1042', vehicle: '34 FLT 904 · VW Passat', customer: 'LogiTech A.Ş.', date: '2026-09-01', amount: 28500, end: '2027-09-01', status: 'Aktif' },
  { id: 'KR-1039', vehicle: '34 ABC 12 · Ford Focus', customer: 'Ekspres Lojistik', date: '2026-08-15', amount: 24200, end: '2026-11-15', status: 'Bitişe Yakın' },
  { id: 'KR-1035', vehicle: '34 XYZ 77 · Toyota Corolla', customer: 'Birey — Z. Arslan', date: '2026-07-10', amount: 31200, end: '2027-07-10', status: 'Aktif' },
]
export const sampleInvoices = [
  { id: 'FT-2026-0912', vehicle: '34 FLT 904', customer: 'LogiTech A.Ş.', date: '2026-10-01', amount: 28500, status: 'Ödendi' },
  { id: 'FT-2026-0905', vehicle: '34 ABC 12', customer: 'Ekspres Lojistik', date: '2026-10-01', amount: 24200, status: 'Açık' },
  { id: 'FT-2026-0898', vehicle: '34 XYZ 77', customer: 'Birey — Z. Arslan', date: '2026-09-28', amount: 31200, status: 'Gecikmiş' },
]
export const sampleCustomers = [
  { id: 1, name: 'LogiTech A.Ş.', type: 'Kurumsal', vehicles: 12, balance: 0, status: 'Aktif' },
  { id: 2, name: 'Ekspres Lojistik', type: 'Kurumsal', vehicles: 8, balance: 24200, status: 'Aktif' },
  { id: 3, name: 'Zeynep Arslan', type: 'Bireysel', vehicles: 1, balance: 0, status: 'Aktif' },
]
