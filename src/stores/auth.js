import { defineStore } from 'pinia'

// Demo kullanıcılar — test amaçlı (statik, backend yok).
// Gerçek sistemde bu doğrulama /api/team/*/session üzerinden yapılır.
const DEMO_USERS = [
  {
    email: 'musteri@fleetrent.com.tr',
    password: 'Filo2026!',
    role: 'customer',
    name: 'Ali Filo Kiralama A.Ş.',
    home: '/dashboard',
  },
  {
    email: 'tedarikci@fleetrent.com.tr',
    password: 'Tedarik2026!',
    role: 'supplier',
    name: 'Ali Filo Kiralama A.Ş.',
    home: '/supplier',
  },
]

function loadUser() {
  try {
    return JSON.parse(localStorage.getItem('fr-auth') || 'null')
  } catch {
    return null
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({ user: loadUser() }),
  getters: {
    isAuthed: (s) => !!s.user,
    role: (s) => s.user?.role || null,
    home: (s) => s.user?.home || '/login',
  },
  actions: {
    login(email, password) {
      const found = DEMO_USERS.find(
        (u) => u.email.toLowerCase() === String(email).trim().toLowerCase() && u.password === password
      )
      if (!found) return { ok: false, error: 'E-posta veya parola hatalı.' }
      const { password: _pw, ...safe } = found
      this.user = safe
      localStorage.setItem('fr-auth', JSON.stringify(safe))
      return { ok: true, user: safe }
    },
    logout() {
      this.user = null
      localStorage.removeItem('fr-auth')
    },
  },
})
