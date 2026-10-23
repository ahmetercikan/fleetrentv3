import { createRouter, createWebHistory } from 'vue-router'
import DashboardLayout from '@/layouts/DashboardLayout.vue'
import SupplierLayout from '@/layouts/SupplierLayout.vue'

// Tedarikçi liste ekranları — hepsi aynı yapılandırılabilir görünümü kullanır
const supplierListKeys = [
  'vehicles', 'maintenance', 'service', 'tire', 'damage', 'policies', 'hgs', 'fines', 'fuel', 'sales',
  'reservations', 'rentals', 'offers', 'contracts', 'deliveries', 'returns', 'marketplace',
  'customers', 'invoices', 'accounting', 'approvals', 'reports', 'planning', 'settings', 'branches', 'users',
]
const supplierListRoutes = supplierListKeys.map((k) => ({
  path: k, name: `supplier-${k}`, component: () => import('@/views/supplier/SupplierListView.vue'),
}))

const routes = [
  { path: '/', redirect: '/dashboard' },
  {
    path: '/dashboard',
    component: DashboardLayout,
    children: [
      { path: '', name: 'dashboard', component: () => import('@/views/DashboardView.vue'), meta: { title: 'Ana Sayfa' } },
      { path: 'vehicles', name: 'vehicles', component: () => import('@/views/VehiclesView.vue'), meta: { title: 'Araçlar' } },
      { path: 'quotes', name: 'quotes', component: () => import('@/views/QuotesView.vue'), meta: { title: 'Talep & Teklifler' } },
      { path: 'service', name: 'service', component: () => import('@/views/ServiceView.vue'), meta: { title: 'Servis / Bakım' } },
      { path: 'tires', name: 'tires', component: () => import('@/views/TiresView.vue'), meta: { title: 'Lastik Yönetimi' } },
      { path: 'fuel', name: 'fuel', component: () => import('@/views/FuelView.vue'), meta: { title: 'Yakıt ve Giderler' } },
      { path: 'reports', name: 'reports', component: () => import('@/views/ReportsView.vue'), meta: { title: 'Raporlar' } },
      { path: 'savings', name: 'savings', component: () => import('@/views/SavingsView.vue'), meta: { title: 'Filo Kontrol & Tasarruf' } },
      { path: 'requests', name: 'requests', component: () => import('@/views/RequestsView.vue'), meta: { title: 'Tedarikçi İşlemleri' } },
      { path: 'users', name: 'users', component: () => import('@/views/UsersView.vue'), meta: { title: 'Kullanıcılar ve Yetkiler' } },
      { path: 'settings', name: 'settings', component: () => import('@/views/SettingsView.vue'), meta: { title: 'Ayarlar' } },
    ],
  },
  {
    path: '/supplier',
    component: SupplierLayout,
    children: [
      { path: '', name: 'supplier-dashboard', component: () => import('@/views/supplier/SupplierDashboard.vue') },
      { path: 'operations', name: 'supplier-operations', component: () => import('@/views/supplier/SupplierOperations.vue') },
      ...supplierListRoutes,
    ],
  },
]

export default createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})
