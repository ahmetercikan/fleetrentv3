<script setup>
// FleetRent marka logosu — siteden birebir, keskin SVG olarak.
// variant: 'full' (ikon + wordmark) | 'mark' (sadece ikon)
defineProps({
  variant: { type: String, default: 'full' },
  size: { type: Number, default: 34 }, // ikon kenar uzunluğu (px)
  dark: { type: Boolean, default: false }, // koyu zemin (füme sidebar) için açık wordmark
})
</script>

<template>
  <span class="inline-flex items-center gap-2.5 select-none">
    <svg :width="size" :height="size" viewBox="0 0 48 48" fill="none" aria-hidden="true" class="shrink-0">
      <defs>
        <linearGradient id="fr-logo-grad" x1="46" y1="2" x2="2" y2="46" gradientUnits="userSpaceOnUse">
          <stop stop-color="#3b8bf7" />
          <stop offset="1" stop-color="#1455e0" />
        </linearGradient>
      </defs>
      <rect x="3" y="3" width="42" height="42" rx="12" fill="url(#fr-logo-grad)" />
      <g stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" fill="none">
        <path d="M15 19 H30" />
        <path d="M26 15 L31 19 L26 23" />
        <path d="M33 29 H18" />
        <path d="M22 25 L17 29 L22 33" />
      </g>
    </svg>
    <span v-if="variant === 'full'" class="brand-wordmark" :class="{ 'brand-wordmark--dark': dark }">fleetrent</span>
  </span>
</template>

<style scoped>
.brand-wordmark {
  font-family: 'Fredoka', 'Outfit', sans-serif;
  font-weight: 600;
  font-size: 1.4rem;
  letter-spacing: -0.01em;
  line-height: 1;
  color: #1f6ff5;
}
:root[data-theme='dark'] .brand-wordmark {
  color: #5a9bff;
}
.brand-wordmark--dark {
  color: #f1f5fc;
}
</style>
