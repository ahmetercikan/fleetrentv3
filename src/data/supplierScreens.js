// Tedarikçi liste ekranlarının yapılandırması + örnek veriler.
// SupplierListView bu config'i okuyup tutarlı, filtrelenebilir bir liste ekranı üretir.
import { sampleRentals, sampleInvoices, sampleCustomers, TL } from './supplier'

export const badgeTones = {
  // yeşil
  'Aktif': 'success', 'Ödendi': 'success', 'Tamamlandı': 'success', 'Kirada': 'success',
  'Onaylandı': 'success', 'İmzalı': 'success', 'Geçerli': 'success', 'Kapandı': 'success', 'Satıldı': 'success',
  // sarı
  'Bitişe Yakın': 'warning', 'Açık': 'warning', 'Beklemede': 'warning', 'Teslim Bekliyor': 'warning',
  'Serviste': 'warning', 'Revize': 'warning', 'Yenilenecek': 'warning', 'Taslak': 'warning', 'İtirazda': 'warning',
  // kırmızı
  'Gecikmiş': 'danger', 'İptal': 'danger', 'Reddedildi': 'danger', 'Ödenmedi': 'danger', 'Hasarlı': 'danger',
  // mavi / info
  'Havuzda': 'info', 'Açık İhale': 'info', 'Teklif Verildi': 'info', 'Satışta': 'info', 'İncelemede': 'info',
}

const statusCol = { key: 'status', label: 'Durum', align: 'center', badge: true }
const plateCol = { key: 'plate', label: 'Plaka', mono: true }

// ---- Örnek veri setleri ----
const fleet = [
  { id: 1, plate: '34 FLT 904', vehicle: 'VW Passat 1.6 TDI', class: 'Binek', branch: 'Merkez', km: 48230, status: 'Kirada' },
  { id: 2, plate: '34 ABC 12', vehicle: 'Ford Focus 1.5', class: 'Binek', branch: 'Kadıköy', km: 71540, status: 'Serviste' },
  { id: 3, plate: '34 XYZ 77', vehicle: 'Toyota Corolla HB', class: 'Binek', branch: 'Merkez', km: 19870, status: 'Kirada' },
  { id: 4, plate: '34 KLM 51', vehicle: 'Mercedes Vito', class: 'Ticari', branch: 'Merkez', km: 88120, status: 'Havuzda' },
  { id: 5, plate: '34 DEF 30', vehicle: 'Renault Megane', class: 'Binek', branch: 'Kadıköy', km: 53410, status: 'Hasarlı' },
  { id: 6, plate: '34 GHI 88', vehicle: 'Hyundai i20', class: 'Binek', branch: 'Merkez', km: 12440, status: 'Kirada' },
  { id: 7, plate: '34 TRN 19', vehicle: 'VW Transporter', class: 'Ticari', branch: 'Merkez', km: 134200, status: 'Satışta' },
  { id: 8, plate: '34 KUG 42', vehicle: 'Ford Kuga 1.5', class: 'SUV', branch: 'Kadıköy', km: 41020, status: 'Kirada' },
]
const fleetCols = [plateCol, { key: 'vehicle', label: 'Marka / Model' }, { key: 'class', label: 'Sınıf' }, { key: 'branch', label: 'Şube' }, { key: 'km', label: 'KM', align: 'right' }, statusCol]

const reservations = [
  { id: 'RZ-512', customer: 'LogiTech A.Ş.', vehicle: 'Binek x3', date: '2026-10-26', detail: '12 ay kurumsal', status: 'Beklemede' },
  { id: 'RZ-508', customer: 'Ekspres Lojistik', vehicle: 'Ticari x2', date: '2026-10-24', detail: '24 ay R2R', status: 'Onaylandı' },
  { id: 'RZ-503', customer: 'Birey — M. Demir', vehicle: 'i20', date: '2026-10-20', detail: '12 ay bireysel', status: 'İptal' },
]
const offers = [
  { id: 'TKF-7021', customer: 'LogiTech A.Ş.', detail: '3x Corolla Hybrid · 36 ay', amount: 30800, date: '2026-10-18', status: 'Beklemede' },
  { id: 'TKF-7019', customer: 'Ekspres Lojistik', detail: '2x Transporter · 24 ay', amount: 39500, date: '2026-10-15', status: 'Revize' },
  { id: 'TKF-7012', customer: 'Birey — Z. Arslan', detail: '1x i20 · 12 ay', amount: 20400, date: '2026-10-09', status: 'Onaylandı' },
]
const offerCols = [{ key: 'id', label: 'Teklif No', mono: true }, { key: 'customer', label: 'Müşteri' }, { key: 'detail', label: 'Paket' }, { key: 'amount', label: 'Aylık', align: 'right', money: true }, { key: 'date', label: 'Tarih' }, statusCol]

const contracts = [
  { id: 'SZL-4012', customer: 'LogiTech A.Ş.', plate: '34 FLT 904', period: '36 ay', end: '2027-09-01', status: 'İmzalı' },
  { id: 'SZL-4008', customer: 'Ekspres Lojistik', plate: '34 ABC 12', period: '24 ay', end: '2026-11-15', status: 'Bitişe Yakın' },
  { id: 'SZL-4020', customer: 'Birey — Z. Arslan', plate: '34 GHI 88', period: '12 ay', end: '2027-04-05', status: 'Taslak' },
]
const contractCols = [{ key: 'id', label: 'Sözleşme No', mono: true }, { key: 'customer', label: 'Müşteri' }, plateCol, { key: 'period', label: 'Süre', align: 'center' }, { key: 'end', label: 'Bitiş' }, statusCol]

const deliveries = [
  { id: 'TS-2210', plate: '34 FLT 904', customer: 'LogiTech A.Ş.', type: 'Teslim', date: '2026-10-22', status: 'Teslim Bekliyor' },
  { id: 'TS-2204', plate: '34 GHI 88', customer: 'Birey — Z. Arslan', type: 'Teslim', date: '2026-10-19', status: 'Tamamlandı' },
  { id: 'TS-2198', plate: '34 ABC 12', customer: 'Ekspres Lojistik', type: 'İade', date: '2026-10-17', status: 'İncelemede' },
]
const deliveryCols = [{ key: 'id', label: 'Kayıt No', mono: true }, plateCol, { key: 'customer', label: 'Müşteri' }, { key: 'type', label: 'Tür', align: 'center' }, { key: 'date', label: 'Tarih' }, statusCol]

const policies = [
  { id: 'POL-9012', plate: '34 FLT 904', type: 'Kasko + Trafik', insurer: 'Anadolu Sigorta', end: '2027-03-01', status: 'Geçerli' },
  { id: 'POL-9008', plate: '34 KLM 51', type: 'Kasko', insurer: 'Allianz', end: '2026-11-20', status: 'Yenilenecek' },
  { id: 'POL-8999', plate: '34 DEF 30', type: 'Trafik', insurer: 'Axa', end: '2026-10-28', status: 'Yenilenecek' },
]
const policyCols = [{ key: 'id', label: 'Poliçe No', mono: true }, plateCol, { key: 'type', label: 'Tür' }, { key: 'insurer', label: 'Sigorta Şirketi' }, { key: 'end', label: 'Bitiş' }, statusCol]

const damage = [
  { id: 'HSR-331', plate: '34 DEF 30', date: '2026-10-12', detail: 'Ön tampon + sağ far', status: 'İncelemede' },
  { id: 'HSR-320', plate: '34 ABC 12', date: '2026-09-28', detail: 'Yan panel çizik', status: 'Tamamlandı' },
]
const damageCols = [{ key: 'id', label: 'Dosya No', mono: true }, plateCol, { key: 'date', label: 'Tarih' }, { key: 'detail', label: 'Hasar' }, statusCol]

const maintenance = [
  { id: 1, plate: '34 ABC 12', vehicle: 'Ford Focus', detail: '40.000 km bakımı', date: '2026-10-28', status: 'Beklemede' },
  { id: 2, plate: '34 KLM 51', vehicle: 'Mercedes Vito', detail: '90.000 km bakımı', date: '2026-11-05', status: 'Beklemede' },
]
const maintCols = [plateCol, { key: 'vehicle', label: 'Araç' }, { key: 'detail', label: 'İşlem' }, { key: 'date', label: 'Planlanan', align: 'center' }, statusCol]

const hgs = [
  { id: 1, plate: '34 FLT 904', device: 'HGS-77213', balance: 420, status: 'Aktif' },
  { id: 2, plate: '34 KLM 51', device: 'HGS-77219', balance: 120, status: 'Beklemede' },
]
const hgsCols = [plateCol, { key: 'device', label: 'Etiket No', mono: true }, { key: 'balance', label: 'Bakiye', align: 'right', money: true }, statusCol]

const fines = [
  { id: 'TPC-9921', plate: '34 DEF 30', date: '2026-10-12', detail: 'Hız limiti', amount: 1282, status: 'Ödenmedi' },
  { id: 'TPC-9910', plate: '34 FLT 904', date: '2026-10-03', detail: 'Hatalı park', amount: 993, status: 'Ödendi' },
]
const fineCols = [{ key: 'id', label: 'Ceza No', mono: true }, plateCol, { key: 'date', label: 'Tarih' }, { key: 'detail', label: 'Tür' }, { key: 'amount', label: 'Tutar', align: 'right', money: true }, statusCol]

const sales = [
  { id: 'SAT-114', plate: '34 TRN 19', detail: 'VW Transporter · 134.200 km', amount: 685000, status: 'Satışta' },
  { id: 'SAT-108', plate: '34 OLD 09', detail: 'Fiat Egea · 198.000 km', amount: 420000, status: 'Satıldı' },
]
const salesCols = [{ key: 'id', label: 'İlan No', mono: true }, plateCol, { key: 'detail', label: 'Araç' }, { key: 'amount', label: 'Fiyat', align: 'right', money: true }, statusCol]

const marketplace = [
  { id: 'IH-2041', customer: 'Mega Market A.Ş.', detail: '10x binek · 36 ay', date: '2026-11-01', status: 'Açık İhale' },
  { id: 'IH-2038', customer: 'Kuzey İnşaat', detail: '5x pickup · 24 ay', date: '2026-10-30', status: 'Teklif Verildi' },
  { id: 'IH-2030', customer: 'Hızlı Kargo', detail: '20x panelvan · 48 ay', date: '2026-10-25', status: 'Kapandı' },
]
const marketCols = [{ key: 'id', label: 'İhale No', mono: true }, { key: 'customer', label: 'Talep Eden' }, { key: 'detail', label: 'İhtiyaç' }, { key: 'date', label: 'Son Teklif', align: 'center' }, statusCol]

const approvals = [
  { id: 'ON-521', detail: 'TKF-7019 revizyon onayı', date: '2026-10-21', by: 'Serkan Yıldız', status: 'Beklemede' },
  { id: 'ON-518', detail: 'İade mutabakat kapanışı', date: '2026-10-20', by: 'Deniz Kaya', status: 'Onaylandı' },
]
const approvalCols = [{ key: 'id', label: 'Kayıt No', mono: true }, { key: 'detail', label: 'Konu' }, { key: 'by', label: 'Talep Eden' }, { key: 'date', label: 'Tarih' }, statusCol]

const returnsRows = [
  { id: 'IA-1120', plate: '34 ABC 12', customer: 'Ekspres Lojistik', date: '2026-10-17', detail: 'KM aşımı mutabakatı', status: 'İncelemede' },
  { id: 'IA-1114', plate: '34 OLD 09', customer: 'LogiTech A.Ş.', date: '2026-10-05', detail: 'Hasarsız iade', status: 'Tamamlandı' },
]
const returnCols = [{ key: 'id', label: 'Kayıt No', mono: true }, plateCol, { key: 'customer', label: 'Müşteri' }, { key: 'detail', label: 'Detay' }, { key: 'date', label: 'Tarih' }, statusCol]

const fuelRows = [
  { id: 1, plate: '34 KLM 51', detail: 'Ekim · 1.420 L', amount: 62700, date: '2026-10-01' },
  { id: 2, plate: '34 TRN 19', detail: 'Ekim · 1.180 L', amount: 52100, date: '2026-10-01' },
]
const fuelCols = [plateCol, { key: 'detail', label: 'Dönem / Tüketim' }, { key: 'amount', label: 'Maliyet', align: 'right', money: true }, { key: 'date', label: 'Tarih' }]

// key = route son parçası
export const supplierScreens = {
  vehicles: { eyebrow: 'Filo', title: 'Araçlar', subtitle: 'Filonuzdaki tüm araçları ve yaşam döngüsünü yönetin.',
    stats: [{ label: 'Toplam Araç', value: 42, icon: 'car', tone: 'brand' }, { label: 'Kirada', value: 28, icon: 'key', tone: 'success' }, { label: 'Havuzda', value: 7, icon: 'parking', tone: 'info' }, { label: 'Serviste', value: 4, icon: 'wrench', tone: 'warning' }],
    columns: fleetCols, rows: fleet, primary: 'Yeni Araç' },
  maintenance: { eyebrow: 'Filo Sağlığı', title: 'Bakım Önerileri', subtitle: 'KM ve tarihe göre bakımı yaklaşan araçlar.', columns: maintCols, rows: maintenance, primary: 'İş Emri Aç' },
  service: { eyebrow: 'Filo', title: 'Servis & Bakım', subtitle: 'Servis iş emirleri ve bakım geçmişi.', columns: maintCols, rows: maintenance, primary: 'Yeni İş Emri' },
  tire: { eyebrow: 'Filo', title: 'Lastik Yönetimi', subtitle: 'Lastik stoğu, değişim ve rotasyon planı.',
    columns: [plateCol, { key: 'detail', label: 'Takım / Ebat' }, { key: 'date', label: 'Değişim' }, statusCol],
    rows: [{ id: 1, plate: '34 KLM 51', detail: 'TK-07 · 225/65 R16C', date: '2026-10-28', status: 'Beklemede' }], primary: 'Yeni Kayıt' },
  damage: { eyebrow: 'Filo', title: 'Hasar & Kaza', subtitle: 'Hasar kayıtları, ekspertiz ve tazminat süreçleri.', columns: damageCols, rows: damage, primary: 'Hasar Bildir' },
  policies: { eyebrow: 'Filo', title: 'Sigorta & Kasko', subtitle: 'Poliçe takibi, yenileme tarihleri ve teminatlar.',
    stats: [{ label: 'Aktif Poliçe', value: 40, icon: 'shield', tone: 'brand' }, { label: '30 Gün İçinde Bitiş', value: 2, icon: 'clock', tone: 'warning' }, { label: 'Geçmiş', value: 0, icon: 'alert', tone: 'danger' }],
    columns: policyCols, rows: policies, primary: 'Poliçe Ekle' },
  hgs: { eyebrow: 'Filo', title: 'HGS', subtitle: 'HGS etiketleri, bakiye ve geçiş kayıtları.', columns: hgsCols, rows: hgs, primary: 'Bakiye Yükle' },
  fines: { eyebrow: 'Filo', title: 'TPC — Trafik Cezaları', subtitle: 'Trafik para cezaları ve müşteriye yansıtma.', columns: fineCols, rows: fines },
  fuel: { eyebrow: 'Gider', title: 'Yakıt Giderleri', subtitle: 'Araç bazında yakıt tüketimi ve maliyet.', columns: fuelCols, rows: fuelRows },
  sales: { eyebrow: 'Filo', title: 'Araç Satışları', subtitle: 'İkinci el satış süreci ve amortisman.', columns: salesCols, rows: sales, primary: 'Satışa Çıkar' },

  reservations: { eyebrow: 'Kiralama', title: 'Rezervasyonlar', subtitle: 'Gelen rezervasyon talepleri ve onay durumu.',
    columns: [{ key: 'id', label: 'Rez. No', mono: true }, { key: 'customer', label: 'Müşteri' }, { key: 'vehicle', label: 'Araç' }, { key: 'detail', label: 'Detay' }, { key: 'date', label: 'Tarih' }, statusCol],
    rows: reservations, primary: 'Yeni Rezervasyon' },
  rentals: { eyebrow: 'Kiralama', title: 'Kiralamalar', subtitle: 'Araç bazında teslimat, iade ve müşteri atamalarını takip edin.',
    stats: [{ label: 'Toplam Kayıt', value: sampleRentals.length, icon: 'doc', tone: 'brand' }, { label: 'Aktif', value: 2, icon: 'check-circle', tone: 'success' }, { label: 'Bitişe Yakın', value: 1, icon: 'clock', tone: 'warning' }],
    columns: [{ key: 'id', label: 'Kayıt No', mono: true }, { key: 'vehicle', label: 'Araç / Plaka' }, { key: 'customer', label: 'Müşteri' }, { key: 'date', label: 'Tarih' }, { key: 'amount', label: 'Tutar', align: 'right', money: true }, { key: 'end', label: 'Bitiş' }, statusCol],
    rows: sampleRentals, primary: 'Yeni Kiralama' },
  offers: { eyebrow: 'Kiralama', title: 'Teklifler', subtitle: 'Müşterilere gönderilen teklifler ve revizyonlar.', columns: offerCols, rows: offers, primary: 'Yeni Teklif' },
  contracts: { eyebrow: 'Kiralama', title: 'Sözleşmeler', subtitle: 'İmzalı sözleşmeler ve e-imza teyitleri.', columns: contractCols, rows: contracts },
  deliveries: { eyebrow: 'Operasyon', title: 'Teslimatlar', subtitle: 'Araç teslim tutanakları ve ekspertiz formları.', columns: deliveryCols, rows: deliveries, primary: 'Teslimat Oluştur' },
  returns: { eyebrow: 'Operasyon', title: 'İadeler & Mutabakat', subtitle: 'İade teslim alımı, hasar/km mutabakatı ve kapanış.', columns: returnCols, rows: returnsRows },
  marketplace: { eyebrow: 'Pazar', title: 'Kiralama İhaleleri', subtitle: 'Açık talep ihalelerine teklif verin, filonuzu değerlendirin.',
    stats: [{ label: 'Açık İhale', value: 1, icon: 'offer', tone: 'info' }, { label: 'Teklif Verilen', value: 1, icon: 'check-circle', tone: 'success' }, { label: 'Kapanan', value: 1, icon: 'folder', tone: 'neutral' }],
    columns: marketCols, rows: marketplace, primary: 'Teklif Ver' },

  invoices: { eyebrow: 'Muhasebe', title: 'Faturalar', subtitle: 'Kesilen faturalar, tahsilat durumu ve açık bakiye.',
    stats: [{ label: 'Toplam Fatura', value: TL(83900), icon: 'receipt', tone: 'brand' }, { label: 'Ödendi', value: TL(28500), icon: 'check-circle', tone: 'success' }, { label: 'Açık', value: TL(24200), icon: 'clock', tone: 'warning' }, { label: 'Gecikmiş', value: TL(31200), icon: 'alert', tone: 'danger' }],
    columns: [{ key: 'id', label: 'Kayıt No', mono: true }, { key: 'vehicle', label: 'Araç / Plaka' }, { key: 'customer', label: 'Müşteri' }, { key: 'date', label: 'Tarih' }, { key: 'amount', label: 'Tutar', align: 'right', money: true }, statusCol],
    rows: sampleInvoices, primary: 'Fatura Kes' },
  accounting: { eyebrow: 'Muhasebe', title: 'Muhasebe', subtitle: 'Faturalara bağlı tahsilat ve ödemeler ile açık bakiyeleri tek ekrandan takip edin.',
    stats: [{ label: 'Tahsilat', value: TL(28500), icon: 'wallet', tone: 'success' }, { label: 'Ödemeler', value: TL(12400), icon: 'wallet', tone: 'warning' }, { label: 'Açık Alacak', value: TL(55400), icon: 'folder', tone: 'danger' }, { label: 'Kayıtlı Ciro', value: TL(1620000), icon: 'trending', tone: 'brand' }],
    columns: [{ key: 'id', label: 'Kayıt No', mono: true }, { key: 'vehicle', label: 'Araç / Plaka' }, { key: 'customer', label: 'Müşteri' }, { key: 'date', label: 'Tarih' }, { key: 'amount', label: 'Tutar', align: 'right', money: true }, statusCol],
    rows: sampleInvoices },
  approvals: { eyebrow: 'Muhasebe', title: 'Onay & Yetki', subtitle: 'Bekleyen onaylar ve yetki talepleri.', columns: approvalCols, rows: approvals },

  customers: { eyebrow: 'CRM', title: 'Müşteriler', subtitle: 'Kurumsal ve bireysel müşteri portföyünüz.',
    stats: [{ label: 'Toplam Müşteri', value: sampleCustomers.length, icon: 'users', tone: 'brand' }, { label: 'Kurumsal', value: 2, icon: 'building', tone: 'info' }, { label: 'Bireysel', value: 1, icon: 'user', tone: 'success' }],
    columns: [{ key: 'name', label: 'Müşteri' }, { key: 'type', label: 'Tip' }, { key: 'vehicles', label: 'Araç', align: 'center' }, { key: 'balance', label: 'Bakiye', align: 'right', money: true }, statusCol],
    rows: sampleCustomers, primary: 'Müşteri Ekle' },

  reports: { eyebrow: 'Analiz', title: 'Raporlar', subtitle: 'Filo, kiralama ve finansal raporlar.',
    columns: [{ key: 'id', label: 'Rapor', mono: true }, { key: 'detail', label: 'Açıklama' }, { key: 'date', label: 'Dönem' }],
    rows: [{ id: 'R-Filo', detail: 'Filo doluluk ve durum raporu', date: 'Ekim 2026' }, { id: 'R-Gelir', detail: 'Gelir / maliyet özeti', date: 'Ekim 2026' }, { id: 'R-Musteri', detail: 'Müşteri bazında ciro', date: 'Ekim 2026' }] },
  planning: { eyebrow: 'Karar Desteği', title: 'Filo Planlama & Karar', subtitle: 'Doluluk, amortisman ve yenileme kararları.',
    columns: [{ key: 'plate', label: 'Plaka', mono: true }, { key: 'detail', label: 'Öneri' }, statusCol],
    rows: [{ id: 1, plate: '34 TRN 19', detail: 'Amortisman tamam — satış öner', status: 'İncelemede' }, { id: 2, plate: '34 KLM 51', detail: 'Düşük doluluk — havuza al', status: 'Beklemede' }] },

  settings: { eyebrow: 'Sistem', title: 'Ayarlar', subtitle: 'Şirket, entegrasyon ve sistem ayarları.',
    columns: [{ key: 'id', label: 'Ayar', mono: true }, { key: 'detail', label: 'Açıklama' }, statusCol],
    rows: [{ id: 'Entegrasyon', detail: 'GPS & UTTS bağlantıları', status: 'Aktif' }, { id: 'E-Fatura', detail: 'E-fatura entegratörü', status: 'Aktif' }, { id: 'E-İmza', detail: 'Dijital imza sağlayıcı', status: 'Aktif' }] },
  branches: { eyebrow: 'Sistem', title: 'Şube ve Lokasyonlar', subtitle: 'Şubeler, teslim noktaları ve depo lokasyonları.',
    columns: [{ key: 'name', label: 'Şube' }, { key: 'city', label: 'Şehir' }, { key: 'vehicles', label: 'Araç', align: 'center' }, statusCol],
    rows: [{ id: 1, name: 'Merkez', city: 'İstanbul', vehicles: 30, status: 'Aktif' }, { id: 2, name: 'Kadıköy', city: 'İstanbul', vehicles: 12, status: 'Aktif' }], primary: 'Şube Ekle' },
  users: { eyebrow: 'Sistem', title: 'Kullanıcılar ve Yetkiler', subtitle: 'Portal kullanıcıları ve rol bazlı erişim.',
    columns: [{ key: 'name', label: 'Ad Soyad' }, { key: 'role', label: 'Rol' }, { key: 'branch', label: 'Şube' }, statusCol],
    rows: [{ id: 1, name: 'Ali Burak Erçikan', role: 'Şirket Sahibi', branch: 'Merkez', status: 'Aktif' }, { id: 2, name: 'Serkan Yıldız', role: 'Operasyon', branch: 'Merkez', status: 'Aktif' }, { id: 3, name: 'Deniz Kaya', role: 'Muhasebe', branch: 'Kadıköy', status: 'Aktif' }], primary: 'Kullanıcı Davet Et' },
}
