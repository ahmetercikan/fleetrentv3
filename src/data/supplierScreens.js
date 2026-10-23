// Tedarikçi liste ekranlarının yapılandırması.
// SupplierListView bu config'i okuyup tutarlı bir liste ekranı üretir.
import { sampleRentals, sampleInvoices, sampleCustomers, TL } from './supplier'

const rentalCols = [
  { key: 'id', label: 'Kayıt No', mono: true },
  { key: 'vehicle', label: 'Araç / Plaka' },
  { key: 'customer', label: 'Müşteri' },
  { key: 'date', label: 'Tarih' },
  { key: 'amount', label: 'Tutar', align: 'right', money: true },
  { key: 'end', label: 'Bitiş' },
  { key: 'status', label: 'Durum', align: 'center', badge: true },
]
const invoiceCols = [
  { key: 'id', label: 'Kayıt No', mono: true },
  { key: 'vehicle', label: 'Araç / Plaka' },
  { key: 'customer', label: 'Müşteri' },
  { key: 'date', label: 'Tarih' },
  { key: 'amount', label: 'Tutar', align: 'right', money: true },
  { key: 'status', label: 'Durum', align: 'center', badge: true },
]

const emptyCols = [
  { key: 'id', label: 'Kayıt No', mono: true },
  { key: 'vehicle', label: 'Araç / Plaka' },
  { key: 'detail', label: 'Detay' },
  { key: 'date', label: 'Tarih' },
  { key: 'status', label: 'Durum', align: 'center', badge: true },
]

export const badgeTones = {
  'Aktif': 'success', 'Ödendi': 'success', 'Tamamlandı': 'success',
  'Bitişe Yakın': 'warning', 'Açık': 'warning', 'Beklemede': 'warning',
  'Gecikmiş': 'danger', 'İptal': 'danger',
}

// key = route son parçası
export const supplierScreens = {
  vehicles: { eyebrow: 'Filo', title: 'Araçlar', subtitle: 'Filonuzdaki tüm araçları ve yaşam döngüsünü yönetin.',
    stats: [{ label: 'Toplam Araç', value: 42, icon: '🚗', tone: 'brand' }, { label: 'Kirada', value: 28, icon: '🔑', tone: 'success' }, { label: 'Havuzda', value: 7, icon: '🅿️', tone: 'info' }, { label: 'Serviste', value: 4, icon: '🔧', tone: 'warning' }],
    columns: emptyCols, rows: [], primary: 'Yeni Araç' },
  maintenance: { eyebrow: 'Filo Sağlığı', title: 'Bakım Önerileri', subtitle: 'KM ve tarihe göre bakımı yaklaşan araçlar.', columns: emptyCols, rows: [] },
  service: { eyebrow: 'Filo', title: 'Servis & Bakım', subtitle: 'Servis iş emirleri ve bakım geçmişi.', columns: emptyCols, rows: [], primary: 'Yeni İş Emri' },
  tire: { eyebrow: 'Filo', title: 'Lastik Yönetimi', subtitle: 'Lastik stoğu, değişim ve rotasyon planı.', columns: emptyCols, rows: [], primary: 'Yeni Kayıt' },
  damage: { eyebrow: 'Filo', title: 'Hasar & Kaza', subtitle: 'Hasar kayıtları, ekspertiz ve tazminat süreçleri.', columns: emptyCols, rows: [], primary: 'Hasar Bildir' },
  policies: { eyebrow: 'Filo', title: 'Sigorta & Kasko', subtitle: 'Poliçe takibi, yenileme tarihleri ve teminatlar.', columns: emptyCols, rows: [], primary: 'Poliçe Ekle' },
  hgs: { eyebrow: 'Filo', title: 'HGS', subtitle: 'HGS etiketleri, bakiye ve geçiş kayıtları.', columns: emptyCols, rows: [] },
  fines: { eyebrow: 'Filo', title: 'TPC — Trafik Cezaları', subtitle: 'Trafik para cezaları ve müşteriye yansıtma.', columns: emptyCols, rows: [] },
  fuel: { eyebrow: 'Gider', title: 'Yakıt Giderleri', subtitle: 'Araç bazında yakıt tüketimi ve maliyet.', columns: emptyCols, rows: [] },
  sales: { eyebrow: 'Filo', title: 'Araç Satışları', subtitle: 'İkinci el satış süreci ve amortisman.', columns: emptyCols, rows: [], primary: 'Satışa Çıkar' },

  reservations: { eyebrow: 'Kiralama', title: 'Rezervasyonlar', subtitle: 'Gelen rezervasyon talepleri ve onay durumu.', columns: emptyCols, rows: [], primary: 'Yeni Rezervasyon' },
  rentals: { eyebrow: 'Kiralama', title: 'Kiralamalar', subtitle: 'Araç bazında teslimat, iade ve müşteri atamalarını takip edin.',
    stats: [{ label: 'Toplam Kayıt', value: sampleRentals.length, icon: '📄', tone: 'brand' }, { label: 'Aktif', value: 2, icon: '✅', tone: 'success' }, { label: 'Bitişe Yakın', value: 1, icon: '⏳', tone: 'warning' }],
    columns: rentalCols, rows: sampleRentals, primary: 'Yeni Kiralama' },
  offers: { eyebrow: 'Kiralama', title: 'Teklifler', subtitle: 'Müşterilere gönderilen teklifler ve revizyonlar.', columns: emptyCols, rows: [], primary: 'Yeni Teklif' },
  contracts: { eyebrow: 'Kiralama', title: 'Sözleşmeler', subtitle: 'İmzalı sözleşmeler ve e-imza teyitleri.', columns: emptyCols, rows: [] },
  deliveries: { eyebrow: 'Operasyon', title: 'Teslimatlar', subtitle: 'Araç teslim tutanakları ve ekspertiz formları.', columns: emptyCols, rows: [], primary: 'Teslimat Oluştur' },
  returns: { eyebrow: 'Operasyon', title: 'İadeler & Mutabakat', subtitle: 'İade teslim alımı, hasar/km mutabakatı ve kapanış.', columns: emptyCols, rows: [] },
  marketplace: { eyebrow: 'Pazar', title: 'Kiralama İhaleleri', subtitle: 'Açık talep ihalelerine teklif verin, filonuzu değerlendirin.', columns: emptyCols, rows: [] },

  invoices: { eyebrow: 'Muhasebe', title: 'Faturalar', subtitle: 'Kesilen faturalar, tahsilat durumu ve açık bakiye.',
    stats: [{ label: 'Toplam Fatura', value: TL(83900), icon: '🧾', tone: 'brand' }, { label: 'Ödendi', value: TL(28500), icon: '✅', tone: 'success' }, { label: 'Açık', value: TL(24200), icon: '⏳', tone: 'warning' }, { label: 'Gecikmiş', value: TL(31200), icon: '🔴', tone: 'danger' }],
    columns: invoiceCols, rows: sampleInvoices, primary: 'Fatura Kes' },
  accounting: { eyebrow: 'Muhasebe', title: 'Muhasebe', subtitle: 'Faturalara bağlı tahsilat ve ödemeler ile açık bakiyeleri tek ekrandan takip edin.',
    stats: [{ label: 'Tahsilat', value: TL(28500), icon: '💰', tone: 'success' }, { label: 'Ödemeler', value: TL(12400), icon: '💸', tone: 'warning' }, { label: 'Açık Alacak', value: TL(55400), icon: '📂', tone: 'danger' }, { label: 'Kayıtlı Ciro', value: TL(1620000), icon: '📈', tone: 'brand' }],
    columns: invoiceCols, rows: sampleInvoices },
  approvals: { eyebrow: 'Muhasebe', title: 'Onay & Yetki', subtitle: 'Bekleyen onaylar ve yetki talepleri.', columns: emptyCols, rows: [] },

  customers: { eyebrow: 'CRM', title: 'Müşteriler', subtitle: 'Kurumsal ve bireysel müşteri portföyünüz.',
    stats: [{ label: 'Toplam Müşteri', value: sampleCustomers.length, icon: '👥', tone: 'brand' }, { label: 'Kurumsal', value: 2, icon: '🏢', tone: 'info' }, { label: 'Bireysel', value: 1, icon: '👤', tone: 'success' }],
    columns: [
      { key: 'name', label: 'Müşteri' }, { key: 'type', label: 'Tip' },
      { key: 'vehicles', label: 'Araç', align: 'center' },
      { key: 'balance', label: 'Bakiye', align: 'right', money: true },
      { key: 'status', label: 'Durum', align: 'center', badge: true },
    ], rows: sampleCustomers, primary: 'Müşteri Ekle' },

  reports: { eyebrow: 'Analiz', title: 'Raporlar', subtitle: 'Filo, kiralama ve finansal raporlar.', columns: emptyCols, rows: [] },
  planning: { eyebrow: 'Karar Desteği', title: 'Filo Planlama & Karar', subtitle: 'Doluluk, amortisman ve yenileme kararları.', columns: emptyCols, rows: [] },

  settings: { eyebrow: 'Sistem', title: 'Ayarlar', subtitle: 'Şirket, entegrasyon ve sistem ayarları.', columns: emptyCols, rows: [] },
  branches: { eyebrow: 'Sistem', title: 'Şube ve Lokasyonlar', subtitle: 'Şubeler, teslim noktaları ve depo lokasyonları.', columns: [
    { key: 'name', label: 'Şube' }, { key: 'city', label: 'Şehir' }, { key: 'vehicles', label: 'Araç', align: 'center' }, { key: 'status', label: 'Durum', align: 'center', badge: true },
  ], rows: [{ id: 1, name: 'Merkez', city: 'İstanbul', vehicles: 30, status: 'Aktif' }, { id: 2, name: 'Kadıköy', city: 'İstanbul', vehicles: 12, status: 'Aktif' }], primary: 'Şube Ekle' },
  users: { eyebrow: 'Sistem', title: 'Kullanıcılar ve Yetkiler', subtitle: 'Portal kullanıcıları ve rol bazlı erişim.', columns: [
    { key: 'name', label: 'Ad Soyad' }, { key: 'role', label: 'Rol' }, { key: 'branch', label: 'Şube' }, { key: 'status', label: 'Durum', align: 'center', badge: true },
  ], rows: [{ id: 1, name: 'Ali Burak Erçikan', role: 'Şirket Sahibi', branch: 'Merkez', status: 'Aktif' }, { id: 2, name: 'Serkan Yıldız', role: 'Operasyon', branch: 'Merkez', status: 'Aktif' }], primary: 'Kullanıcı Davet Et' },
}
