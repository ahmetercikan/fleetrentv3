<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import BrandLogo from '@/components/ui/BrandLogo.vue'
import UiButton from '@/components/ui/UiButton.vue'
import Icon from '@/components/ui/Icon.vue'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const auth = useAuthStore()
const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

function submit() {
  error.value = ''
  loading.value = true
  const res = auth.login(email.value, password.value)
  loading.value = false
  if (!res.ok) { error.value = res.error; return }
  router.push(res.user.home)
}

function quick(role) {
  email.value = role === 'customer' ? 'musteri@fleetrent.com.tr' : 'tedarikci@fleetrent.com.tr'
  password.value = role === 'customer' ? 'Filo2026!' : 'Tedarik2026!'
  submit()
}
</script>

<template>
  <div class="grid min-h-screen lg:grid-cols-2">
    <!-- Sol: form -->
    <div class="flex items-center justify-center px-6 py-12">
      <div class="w-full max-w-sm">
        <BrandLogo :size="40" />
        <h1 class="mt-8 text-2xl font-bold tracking-tight">Tekrar hoş geldiniz</h1>
        <p class="mt-1 text-sm text-ink-soft">Filo yönetim panelinize giriş yapın.</p>

        <form class="mt-8 space-y-4" @submit.prevent="submit">
          <label class="block">
            <span class="mb-1.5 block text-xs font-semibold text-ink-soft">E-posta</span>
            <input v-model="email" type="email" autocomplete="username" placeholder="ornek@fleetrent.com.tr" class="input-base" required />
          </label>
          <label class="block">
            <span class="mb-1.5 block text-xs font-semibold text-ink-soft">Parola</span>
            <input v-model="password" type="password" autocomplete="current-password" placeholder="••••••••" class="input-base" required />
          </label>

          <p v-if="error" class="flex items-center gap-2 rounded-lg bg-danger-soft px-3 py-2 text-sm font-medium text-danger">
            <Icon name="alert" :size="16" /> {{ error }}
          </p>

          <UiButton type="submit" variant="primary" size="lg" class="w-full" :disabled="loading">
            {{ loading ? 'Giriş yapılıyor…' : 'Giriş Yap' }}
          </UiButton>
        </form>

        <div class="mt-8">
          <p class="text-center text-xs font-semibold uppercase tracking-wider text-ink-faint">Hızlı demo girişi</p>
          <div class="mt-3 grid grid-cols-2 gap-3">
            <button @click="quick('customer')" class="flex items-center gap-2 rounded-lg border border-[color:var(--color-border-strong)] px-3 py-2.5 text-sm font-semibold text-ink-soft transition hover:border-brand-400 hover:text-brand-600">
              <Icon name="building" :size="18" /> Müşteri
            </button>
            <button @click="quick('supplier')" class="flex items-center gap-2 rounded-lg border border-[color:var(--color-border-strong)] px-3 py-2.5 text-sm font-semibold text-ink-soft transition hover:border-brand-400 hover:text-brand-600">
              <Icon name="truck" :size="18" /> Tedarikçi
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Sağ: marka paneli -->
    <div class="relative hidden overflow-hidden lg:block" style="background: linear-gradient(135deg, #1f6ff5 0%, #1455e0 55%, #122f9e 100%)">
      <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 20% 30%, #fff 1px, transparent 1px); background-size: 28px 28px" />
      <div class="relative flex h-full flex-col justify-center px-14 text-white">
        <h2 class="text-4xl font-bold leading-tight">Filonuzu tek<br />ekrandan yönetin.</h2>
        <p class="mt-4 max-w-md text-white/80">Araç, sözleşme, servis, yakıt, HGS ve tedarikçi süreçlerinizi uçtan uca takip edin. Müşteri ve tedarikçi tarafı tek platformda.</p>
        <ul class="mt-8 space-y-3">
          <li v-for="t in ['Canlı GPS & UTTS entegrasyonu', 'Otomatik maliyet ve tasarruf analizi', 'E-imzalı sözleşme ve teslim süreçleri']" :key="t" class="flex items-center gap-3 text-white/90">
            <span class="grid h-6 w-6 place-items-center rounded-full bg-white/20"><Icon name="check" :size="14" /></span>{{ t }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
