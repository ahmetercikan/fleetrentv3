// ------------------------------------------------------------------
//  FleetRent v2 — Mock veri katmanı
//  Gerçek backend'e geçişte bu dosyanın yerini /api/* çağrıları alır.
//  Şekiller mevcut API yanıtlarıyla uyumlu tutuldu (customer_id bazlı).
// ------------------------------------------------------------------

export const company = {
  id: 8,
  name: 'Ali Filo Kiralama A.Ş.',
  role: 'Filo Yöneticisi',
  city: 'İstanbul',
  district: 'Ümraniye',
}

export const vehicles = [
  { id: 1, plate: '34 FLT 108', brand: 'Volkswagen', model: 'Passat 1.6 TDI', color: 'Antrasit', year: 2023, vin: 'WVWZZZ3CZPE045112', engineNo: 'DFG118823', status: 'active', km: 48230, driver: 'Mehmet Yılmaz', rentStart: '2023-03-01', rentEnd: '2026-03-01', monthly: 28500 },
  { id: 2, plate: '34 FLT 212', brand: 'Ford', model: 'Focus 1.5 TDCi', color: 'Beyaz', year: 2022, vin: '1FADP3F20JL223410', engineNo: 'XWDA55120', status: 'service', km: 71540, driver: 'Ayşe Demir', rentStart: '2022-06-15', rentEnd: '2025-06-15', monthly: 24200 },
  { id: 3, plate: '34 FLT 330', brand: 'Toyota', model: 'Corolla Hybrid', color: 'Gümüş', year: 2024, vin: 'JTDBR32E630045120', engineNo: 'TY2ZR99021', status: 'active', km: 19870, driver: 'Caner Aksoy', rentStart: '2024-01-10', rentEnd: '2027-01-10', monthly: 31200 },
  { id: 4, plate: '34 FLT 441', brand: 'Renault', model: 'Megane 1.3 TCe', color: 'Lacivert', year: 2023, vin: 'VF1RFB00X67889012', engineNo: 'RN13TCE773', status: 'damage', km: 53410, driver: 'Zeynep Arslan', rentStart: '2023-09-01', rentEnd: '2026-09-01', monthly: 26800 },
  { id: 5, plate: '34 FLT 556', brand: 'Mercedes-Benz', model: 'Vito Tourer', color: 'Siyah', year: 2022, vin: 'WDF44760313889201', engineNo: 'MB651BLU90', status: 'active', km: 88120, driver: 'Okan Çelik', rentStart: '2022-02-20', rentEnd: '2025-02-20', monthly: 42500 },
  { id: 6, plate: '34 FLT 677', brand: 'Hyundai', model: 'i20 1.4 MPI', color: 'Kırmızı', year: 2024, vin: 'NLHB251CBMZ445120', engineNo: 'HY14G4LC02', status: 'active', km: 12440, driver: 'Elif Kaya', rentStart: '2024-04-05', rentEnd: '2027-04-05', monthly: 19900 },
  { id: 7, plate: '34 FLT 781', brand: 'Volkswagen', model: 'Transporter', color: 'Beyaz', year: 2021, vin: 'WV2ZZZ7HZMH012233', engineNo: 'VWT6BI2201', status: 'replacement', km: 134200, driver: '—', rentStart: '2021-11-11', rentEnd: '2024-11-11', monthly: 38700 },
  { id: 8, plate: '34 FLT 892', brand: 'Ford', model: 'Kuga 1.5 EcoBlue', color: 'Gri', year: 2023, vin: '1FMCU0F7XKUA12210', engineNo: 'FDK15EB440', status: 'active', km: 41020, driver: 'Burak Şahin', rentStart: '2023-07-18', rentEnd: '2026-07-18', monthly: 33400 },
]

export const vehicleStatusLabels = {
  active: { label: 'Aktif', tone: 'success' },
  service: { label: 'Serviste', tone: 'warning' },
  damage: { label: 'Hasarlı', tone: 'danger' },
  replacement: { label: 'İkame Bekliyor', tone: 'info' },
}

export const kpis = {
  totalVehicles: vehicles.length,
  activeContracts: vehicles.filter((v) => v.status === 'active').length,
  monthlyKm: 42380,
  monthlyFuel: 186400,
  monthlyInvoice: 254900,
}

// Son 6 ay maliyet kırılımı (grafik)
export const monthlyCost = [
  { month: 'May', fuel: 142000, service: 38000, other: 21000 },
  { month: 'Haz', fuel: 156000, service: 24000, other: 18500 },
  { month: 'Tem', fuel: 171000, service: 61000, other: 23000 },
  { month: 'Ağu', fuel: 168000, service: 29000, other: 19500 },
  { month: 'Eyl', fuel: 179000, service: 44000, other: 26000 },
  { month: 'Eki', fuel: 186400, service: 33000, other: 24900 },
]

export const fleetDistribution = [
  { label: 'Binek', value: 5, tone: '#3b5bfd' },
  { label: 'Ticari', value: 2, tone: '#10b981' },
  { label: 'Hybrid/EV', value: 1, tone: '#f59e0b' },
]

export const contractStatus = { active: 6, ending30: 2, expired: 1 }

export const upcomingDates = [
  { date: '2026-11-11', type: 'Sözleşme Bitişi', vehicle: '34 FLT 781', tone: 'danger' },
  { date: '2026-11-20', type: 'Periyodik Bakım', vehicle: '34 FLT 212', tone: 'warning' },
  { date: '2026-12-02', type: 'Muayene', vehicle: '34 FLT 556', tone: 'info' },
]

export const quotes = [
  { id: 'TKF-2041', type: 'Kurumsal', vehicle: '5x Binek (Corolla Hybrid)', supplier: 'Otokoç Filo', term: '36 ay', monthly: 30800, status: 'pending', date: '2026-10-18' },
  { id: 'TKF-2039', type: 'R2R', vehicle: '2x Transporter', supplier: 'Vdf Filo', term: '24 ay', monthly: 39500, status: 'revision', date: '2026-10-15' },
  { id: 'TKF-2035', type: 'Bireysel', vehicle: '1x i20', supplier: 'Garenta', term: '12 ay', monthly: 20400, status: 'accepted', date: '2026-10-09' },
  { id: 'TKF-2030', type: 'Kurumsal', vehicle: '3x Kuga', supplier: 'Avis Filo', term: '36 ay', monthly: 34100, status: 'rejected', date: '2026-10-02' },
]

export const quoteStatusLabels = {
  pending: { label: 'Onay Bekliyor', tone: 'warning' },
  revision: { label: 'Revizyon İstendi', tone: 'info' },
  accepted: { label: 'Kabul Edildi', tone: 'success' },
  rejected: { label: 'Reddedildi', tone: 'danger' },
}

export const signatures = [
  { id: 'IMZ-5521', doc: 'Kiralama Sözleşmesi — TKF-2035', status: 'signed', date: '2026-10-10' },
  { id: 'IMZ-5518', doc: 'Teslim Tutanağı — 34 FLT 677', status: 'pending', date: '2026-10-11' },
]

export const serviceRecords = [
  { id: 'IS-9012', date: '2026-10-14', plate: '34 FLT 212', model: 'Ford Focus', type: 'Periyodik Bakım', desc: '40.000 km bakımı', status: 'open', amount: 8450, workOrder: 'IE-331' },
  { id: 'IS-9008', date: '2026-10-06', plate: '34 FLT 441', model: 'Renault Megane', type: 'Hasar / Kaza', desc: 'Ön tampon değişimi', status: 'inprogress', amount: 14200, workOrder: 'IE-329' },
  { id: 'IS-9001', date: '2026-09-28', plate: '34 FLT 556', model: 'Mercedes Vito', type: 'Lastik', desc: '4 adet kış lastiği', status: 'done', amount: 21600, workOrder: 'IE-320' },
  { id: 'IS-8994', date: '2026-09-19', plate: '34 FLT 108', model: 'VW Passat', type: 'Yol Yardım', desc: 'Akü takviye', status: 'done', amount: 0, workOrder: 'IE-316' },
]

export const serviceStatusLabels = {
  open: { label: 'Açık', tone: 'warning' },
  inprogress: { label: 'İşlemde', tone: 'info' },
  done: { label: 'Tamamlandı', tone: 'success' },
}

export const tires = [
  { id: 1, plate: '34 FLT 108', model: 'VW Passat', brand: 'Michelin', size: '205/55 R16', setNo: 'TK-01', produced: '2023-02', changed: '2024-10', season: 'Dört Mevsim', status: 'good', remainingKm: 18000 },
  { id: 2, plate: '34 FLT 556', model: 'Mercedes Vito', brand: 'Bridgestone', size: '225/65 R16C', setNo: 'TK-07', produced: '2022-01', changed: '2023-11', season: 'Kış', status: 'change', remainingKm: 2000 },
  { id: 3, plate: '34 FLT 330', model: 'Toyota Corolla', brand: 'Goodyear', size: '215/60 R16', setNo: 'TK-03', produced: '2024-01', changed: '—', season: 'Yaz', status: 'warning', remainingKm: 6500 },
]

export const tireStatusLabels = {
  good: { label: 'İyi', tone: 'success' },
  warning: { label: 'Yaklaşan', tone: 'warning' },
  change: { label: 'Değişim Gerekli', tone: 'danger' },
}

export const tireSummary = { good: 1, warning: 1, change: 1, force: 0 }
export const tireSeasons = [{ label: 'Yaz', value: 1 }, { label: 'Kış', value: 1 }, { label: 'Dört Mevsim', value: 1 }, { label: 'Diğer', value: 0 }]

export const fuelKpi = { total: 186400, liters: 8740, avgConsumption: 7.8, avgPrice: 44.2, prevTotal: 179000 }

export const fuelDaily = [
  { day: '01', cost: 5200, liters: 118 }, { day: '05', cost: 7400, liters: 168 },
  { day: '09', cost: 6100, liters: 139 }, { day: '13', cost: 8900, liters: 201 },
  { day: '17', cost: 7700, liters: 174 }, { day: '21', cost: 9300, liters: 210 },
  { day: '23', cost: 6600, liters: 150 },
]

export const fuelByType = [
  { label: 'Dizel', value: 72, tone: '#3b5bfd' },
  { label: 'Benzin', value: 18, tone: '#10b981' },
  { label: 'LPG', value: 7, tone: '#f59e0b' },
  { label: 'Elektrik', value: 3, tone: '#0ea5e9' },
]

export const fuelRecords = [
  { id: 1, date: '2026-10-21', plate: '34 FLT 556', station: 'Shell Ümraniye', type: 'Dizel', liters: 72, amount: 3184 },
  { id: 2, date: '2026-10-20', plate: '34 FLT 108', station: 'Opet Kadıköy', type: 'Dizel', liters: 54, amount: 2387 },
  { id: 3, date: '2026-10-19', plate: '34 FLT 677', station: 'BP Maltepe', type: 'Benzin', liters: 41, amount: 1890 },
]

export const topFuelConsumers = [
  { plate: '34 FLT 556', model: 'Mercedes Vito', liters: 1420, cost: 62700 },
  { plate: '34 FLT 781', model: 'VW Transporter', liters: 1180, cost: 52100 },
  { plate: '34 FLT 108', model: 'VW Passat', liters: 980, cost: 43300 },
]

export const savingsFindings = [
  { category: 'Yakıt', finding: '34 FLT 556 ortalama üstü tüketim', proof: '9.4 L/100km (filo ort. 7.8)', amount: 8400, action: 'İncele' },
  { category: 'Kullanım', finding: '34 FLT 677 düşük kullanım', proof: '410 km/ay', amount: 19900, action: 'İade öner' },
  { category: 'HGS', finding: '34 FLT 441 düşük HGS bakiyesi', proof: '₺120 kaldı', amount: 0, action: 'Yükle' },
]

export const users = [
  { id: 1, name: 'Ali Burak Erçikan', email: 'aliburak@filo.com', role: 'Yönetici', status: 'active', lastLogin: '2026-10-23' },
  { id: 2, name: 'Selin Öztürk', email: 'selin@filo.com', role: 'Operasyon', status: 'active', lastLogin: '2026-10-22' },
  { id: 3, name: 'Kerem Aydın', email: 'kerem@filo.com', role: 'Görüntüleyici', status: 'invited', lastLogin: '—' },
]

export const userRoleLabels = {
  active: { label: 'Aktif', tone: 'success' },
  invited: { label: 'Davet Edildi', tone: 'warning' },
  passive: { label: 'Pasif', tone: 'danger' },
}

export const documents = [
  { key: 'vergi', name: 'Vergi Levhası', required: true, uploaded: true },
  { key: 'imza', name: 'İmza Sirküleri', required: true, uploaded: true },
  { key: 'oda', name: 'Oda Kayıt & Faaliyet Belgesi', required: true, uploaded: false },
  { key: 'sicil', name: 'Ticaret Sicil Gazetesi', required: true, uploaded: false },
]

export const integrations = {
  gps: {
    connected: true,
    providers: ['Arvento Mobile Systems', 'Mobiliz Takip Sistemleri', 'Trio Mobil', 'FiloTürk GPS', 'Infotech GPS', 'Özel REST Webhook API'],
    provider: 'Arvento Mobile Systems',
    refreshOptions: ['Her 15 saniyede bir (Canlı Stream)', 'Her 1 dakikada bir', 'Her 5 dakikada bir'],
    refresh: 'Her 15 saniyede bir (Canlı Stream)',
  },
  utts: {
    connected: true,
    providers: ['Darphane Ulusal Taşıt Tanıma Sistemi (UTTS API)', 'Shell Taşıt Tanıma', 'BP FleetPass', 'Petrol Ofisi AutoMatic', 'Opet Otobil'],
    provider: 'Darphane Ulusal Taşıt Tanıma Sistemi (UTTS API)',
    syncOptions: ['Günlük Otomatik Fiş/Harcama Çekme', 'Anlık Yakıt Alımı Bildirimi', 'Aylık Fatura İçe Aktarımı'],
    sync: 'Günlük Otomatik Fiş/Harcama Çekme',
  },
}

export const partners = ['Toyota', 'Volkswagen', 'Mercedes-Benz', 'Ford', 'Hyundai', 'BMW', 'Renault', 'Avis Budget', 'Hertz', 'Garenta', 'Otokoç', 'Vdf Filo']

// --- "Yakında" iken tamamlanan modüller ---

export const contracts = [
  { id: 'SZL-3012', plate: '34 FLT 108', supplier: 'Otokoç Filo', start: '2023-03-01', end: '2026-03-01', monthly: 28500, km: 45000, status: 'active', signed: true },
  { id: 'SZL-3008', plate: '34 FLT 556', supplier: 'Vdf Filo', start: '2022-02-20', end: '2025-02-20', monthly: 42500, km: 30000, status: 'ending', signed: true },
  { id: 'SZL-3001', plate: '34 FLT 781', supplier: 'Garenta', start: '2021-11-11', end: '2024-11-11', monthly: 38700, km: 60000, status: 'expired', signed: true },
  { id: 'SZL-3020', plate: '34 FLT 677', supplier: 'Avis Filo', start: '2024-04-05', end: '2027-04-05', monthly: 19900, km: 30000, status: 'draft', signed: false },
]
export const contractStatusLabels = {
  active: { label: 'Aktif', tone: 'success' }, ending: { label: 'Bitişe Yakın', tone: 'warning' },
  expired: { label: 'Süresi Doldu', tone: 'danger' }, draft: { label: 'İmza Bekliyor', tone: 'info' },
}

export const hgsRecords = [
  { id: 1, plate: '34 FLT 108', date: '2026-10-21', location: '15 Temmuz Şehitler Köprüsü', amount: 61, balance: 420 },
  { id: 2, plate: '34 FLT 556', date: '2026-10-20', location: 'FSM Köprüsü', amount: 61, balance: 120 },
  { id: 3, plate: '34 FLT 330', date: '2026-10-19', location: 'Avrasya Tüneli', amount: 155, balance: 890 },
]
export const fines = [
  { id: 'TPC-9921', plate: '34 FLT 441', date: '2026-10-12', type: 'Hız limiti', amount: 1282, status: 'unpaid', driver: 'Zeynep Arslan' },
  { id: 'TPC-9910', plate: '34 FLT 108', date: '2026-10-03', type: 'Hatalı park', amount: 993, status: 'paid', driver: 'Mehmet Yılmaz' },
  { id: 'TPC-9899', plate: '34 FLT 556', date: '2026-09-25', type: 'Emniyet şeridi', amount: 2167, status: 'objection', driver: 'Okan Çelik' },
]
export const fineStatusLabels = {
  unpaid: { label: 'Ödenmedi', tone: 'danger' }, paid: { label: 'Ödendi', tone: 'success' }, objection: { label: 'İtirazda', tone: 'info' },
}
export const invoices = [
  { id: 'FT-2026-1042', supplier: 'Otokoç Filo', date: '2026-10-01', due: '2026-10-15', amount: 28500, status: 'paid' },
  { id: 'FT-2026-1039', supplier: 'Vdf Filo', date: '2026-10-01', due: '2026-10-15', amount: 42500, status: 'open' },
  { id: 'FT-2026-1030', supplier: 'Garenta', date: '2026-09-28', due: '2026-10-12', amount: 38700, status: 'overdue' },
]
export const invoiceStatusLabels = {
  paid: { label: 'Ödendi', tone: 'success' }, open: { label: 'Açık', tone: 'warning' }, overdue: { label: 'Gecikmiş', tone: 'danger' },
}
export const notifications = [
  { id: 1, icon: 'doc', title: 'Sözleşme bitişi yaklaşıyor', body: '34 FLT 781 sözleşmesi 11.11.2026 tarihinde sona eriyor.', time: '2 saat önce', tone: 'danger', unread: true },
  { id: 2, icon: 'wrench', title: 'Periyodik bakım hatırlatması', body: '34 FLT 212 — 40.000 km bakımı planlanmalı.', time: '5 saat önce', tone: 'warning', unread: true },
  { id: 3, icon: 'fuel', title: 'UTTS harcama senkronu', body: 'Dün 3 araç için 7 yakıt fişi otomatik içe aktarıldı.', time: 'Dün', tone: 'info', unread: false },
  { id: 4, icon: 'check-circle', title: 'Teklif kabul edildi', body: 'TKF-2035 teklifi onaylandı, sözleşme imzaya hazır.', time: '2 gün önce', tone: 'success', unread: false },
]

export const TL = (n) => '₺' + Number(n || 0).toLocaleString('tr-TR')
export const NUM = (n) => Number(n || 0).toLocaleString('tr-TR')
