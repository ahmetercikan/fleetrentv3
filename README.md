# FleetRent v2 — Akıllı Filo Yönetim Platformu (yeniden yazım)

Mevcut `fleetrent.com.tr` müşteri panelinin sıfırdan, daha profesyonel bir UI ile
yeniden yazımı. **Vue 3 + Vite + Tailwind v4 + Pinia + Vue Router.**

## Çalıştırma
```bash
npm install
npm run dev     # http://localhost:5174
npm run build   # üretim derlemesi
```

## Mimari
```
src/
├─ assets/main.css        # Tasarım sistemi: renk/tipografi token'ları, light+dark tema
├─ router/                # Rota tanımları (/dashboard/*)
├─ stores/ui.js           # Tema + mobil menü durumu (Pinia)
├─ layouts/               # DashboardLayout (sidebar + topbar kabuğu)
├─ components/
│  ├─ layout/             # AppSidebar, AppTopbar
│  ├─ ui/                 # Button, Card, Badge, StatTile, DataTable, Tabs, Icon, PageHeader
│  └─ charts/             # DonutChart, BarChart (bağımlılıksız saf SVG)
├─ data/mock.js           # TÜM mock veri — gerçek backend'e geçişte burası /api/* olur
└─ views/                 # 11 ekran
```

## Ekranlar (mevcut sistemden haritalanan modüller)
| Ekran | Rota | Karşılık gelen API (gerçek backend) |
|---|---|---|
| Ana Sayfa | `/dashboard` | özet KPI'lar |
| Araçlar | `/dashboard/vehicles` | `GET /api/vehicles?customer_id=` |
| Talep & Teklifler | `/dashboard/quotes` | `/api/quotes`, `/api/customer-workspace/{offers,signatures,rental-suppliers}` |
| Servis / Bakım | `/dashboard/service` | `/api/service-overview`, `/api/suppliers?type=servis` |
| Lastik Yönetimi | `/dashboard/tires` | `/api/tire-overview` |
| Yakıt ve Giderler | `/dashboard/fuel` | `/api/fuel-overview?start_date=&end_date=` |
| Raporlar | `/dashboard/reports` | `/api/reports` |
| Filo Kontrol & Tasarruf | `/dashboard/savings` | `/api/vehicles` + `/api/vehicle-expenses` (client-side analiz) |
| Tedarikçi İşlemleri | `/dashboard/requests` | `/api/requests`, `/api/suppliers` |
| Kullanıcılar ve Yetkiler | `/dashboard/users` | `/api/customer/users` |
| Ayarlar + Entegrasyonlar | `/dashboard/settings` | `/api/customer/{documents,users,delivery-forms,settings/gps,settings/utts}` |

**Henüz yapılmamış (orijinalde "Yakında"):** Sözleşmeler, Şoförlü Araçlar, HGS & Cezalar, Faturalar, Bildirimler.

## Tedarikçi Portalı (`/supplier/*`)
İkinci panel — araç sahibi/kiralayan tarafı. Accordion menü, `/api/supplier-workspace/*` + `/api/team/supplier/session`.
Sol alttaki **"Tedarikçi Portalına Geç" / "Müşteri Paneline Geç"** ile iki panel arası geçiş.

- **Ana Sayfa** (`/supplier`) · **Günlük Operasyonlar** (`/supplier/operations`) — özel ekranlar
- **Araçlar** grubu: vehicles, maintenance, service, tire, damage, policies (Sigorta & Kasko), hgs, fines (TPC), fuel, sales
- **Kiralamalar** grubu: reservations, rentals, offers, contracts, deliveries, returns, marketplace (İhaleler)
- **Müşteriler** (customers)
- **Muhasebe** grubu: invoices, accounting, approvals
- **Raporlar** grubu: reports, planning
- **Ayarlar** grubu: settings, branches (Şube & Lokasyon), users

> Çoğu tedarikçi ekranı aynı "filtreli liste" kalıbında olduğu için tek bir
> `SupplierListView` + `data/supplierScreens.js` config'i ile üretiliyor. Her
> ekranın başlığı/stat'ları/kolonları buradan düzenlenir; özelleşmesi gerekeni
> kendi bileşenine ayırmak kolay.

## Entegrasyonlar (orijinal sistemden tespit edildi)
- **GPS Araç Takip** — Arvento / Mobiliz / Trio Mobil / FiloTürk / Infotech / Özel Webhook. Canlı stream (15sn/1dk/5dk).
- **UTTS Taşıt Tanıma** — Darphane UTTS API / Shell / BP FleetPass / Petrol Ofisi / Opet. Otomatik fiş/harcama çekme.
- **E-imza** — sözleşme & teslim şartı ıslak/dijital imza teyidi (`signatureApi`).
- **Export** — CSV / PDF rapor çıktıları.

## Gerçek backend'e bağlama
`vite.config.js` içindeki proxy'yi aç:
```js
server: { proxy: { '/api': { target: 'https://fleetrent.com.tr', changeOrigin: true } } }
```
Sonra `src/data/mock.js` yerine her view'da `/api/*` çağrıları yap (axios/fetch).
Şekiller gerçek yanıtlarla uyumlu tutuldu (hepsi `customer_id` bazlı multi-tenant).

## Tasarım sistemi
- Font: **Outfit** · Vurgu: indigo-mavi (`--color-brand-*`)
- Light + Dark tema (üst bardaki ay/güneş ikonu, `localStorage`'da saklanır)
- Tüm renkler `:root` token'ları; markalaşma için `main.css`'teki değerleri değiştir yeter.
