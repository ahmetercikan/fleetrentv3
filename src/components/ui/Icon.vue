<script setup>
defineProps({ name: String, size: { type: [Number, String], default: 20 } })
// Stroke tabanlı, tutarlı çizgi ikon seti (Lucide benzeri). Emoji yok.
const paths = {
  home: 'M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5',
  car: 'M5 11l1.5-4.5A2 2 0 0 1 8.4 5h7.2a2 2 0 0 1 1.9 1.5L19 11m-14 0h14m-14 0v6h2m12-6v6h-2M7 17h10M6.5 14h.01M17.5 14h.01',
  offer: 'M4 4h11l5 5v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1Zm10 0v5h5M8 13h8M8 17h5',
  wrench: 'M14.7 6.3a4 4 0 0 1-5 5L4 17v3h3l5.7-5.7a4 4 0 0 1 5-5l-2.5-2.5Z',
  tire: 'M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0-5v5m0 8v5m9-9h-5M8 12H3',
  fuel: 'M3 21V5a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v16M3 11h11m3-3 3 3v7a2 2 0 0 1-4 0v-5h-2',
  report: 'M4 3h16v18H4zM8 17v-5m4 5V8m4 9v-3',
  savings: 'M12 2 2 7l10 5 10-5-10-5ZM2 17l10 5 10-5M2 12l10 5 10-5',
  truck: 'M3 6h11v10H3zM14 9h4l3 3v4h-7M6.5 19a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm11 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
  users: 'M16 19v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm13 10v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8',
  user: 'M18 19v-1a4 4 0 0 0-4-4h-4a4 4 0 0 0-4 4v1M12 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z',
  settings: 'M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm7.4-3a7.4 7.4 0 0 0-.1-1.3l2-1.6-2-3.4-2.4 1a7.3 7.3 0 0 0-2.2-1.3L13.5 2h-3l-.2 2.1A7.3 7.3 0 0 0 8 5.4l-2.4-1-2 3.4 2 1.6a7.4 7.4 0 0 0 0 2.6l-2 1.6 2 3.4 2.4-1a7.3 7.3 0 0 0 2.3 1.3l.2 2.1h3l.2-2.1a7.3 7.3 0 0 0 2.2-1.3l2.4 1 2-3.4-2-1.6c.1-.4.1-.8.1-1.3Z',
  doc: 'M6 2h8l4 4v16H6zM14 2v4h4M9 13h6M9 17h6M9 9h2',
  bell: 'M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0',
  search: 'M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm10 2-4.3-4.3',
  sun: 'M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm0-14v2m0 16v2M5 5l1.5 1.5M17.5 17.5 19 19M3 12h2m14 0h2M5 19l1.5-1.5M17.5 6.5 19 5',
  moon: 'M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z',
  plus: 'M12 5v14M5 12h14',
  logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9',
  chevron: 'm9 18 6-6-6-6',
  download: 'M12 3v12m0 0 4-4m-4 4-4-4M4 19h16',
  filter: 'M3 5h18l-7 8v6l-4-2v-4L3 5Z',
  shield: 'M12 2 4 5v6c0 5 3.5 8 8 11 4.5-3 8-6 8-11V5l-8-3Zm-2 9 1.8 1.8L15 9',
  map: 'M9 3 3 5v16l6-2 6 2 6-2V3l-6 2-6-2Zm0 0v16m6-14v16',
  // --- yeni eklenenler ---
  check: 'M4 12l5 5L20 6',
  'check-circle': 'M22 12a10 10 0 1 1-5.3-8.8M22 5 12 15l-3-3',
  alert: 'M12 3 2 20h20L12 3Zm0 6v5m0 3h.01',
  refresh: 'M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16m0 5v-5h5',
  repeat: 'm17 2 4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4m14 3v2a4 4 0 0 1-4 4H3',
  gauge: 'M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm1.4-1.4L17 9M4 18a9 9 0 1 1 16 0',
  calendar: 'M7 3v3m10-3v3M4 8h16M5 5h14a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm0-14v5l3 2',
  receipt: 'M5 3h14v18l-2.5-1.5L14 21l-2-1.5L10 21l-2.5-1.5L5 21V3Zm3 5h8M8 12h8M8 16h5',
  tag: 'M3 12V4a1 1 0 0 1 1-1h8l9 9-9 9-9-9Zm4-4h.01',
  droplet: 'M12 3s6 5.7 6 10a6 6 0 1 1-12 0c0-4.3 6-10 6-10Z',
  wallet: 'M3 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1h2v8h-2v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Zm14 3h4m-4 3h.01',
  building: 'M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M4 21h16M8 7h.01M12 7h.01M8 11h.01M12 11h.01M8 15h4M18 21V10h2a1 1 0 0 1 1 1v10',
  pen: 'M14.5 4.5 19.5 9.5M3 21l1-4L16 5a2.1 2.1 0 0 1 3 3L7 20l-4 1Z',
  road: 'M8 3H5l-2 18h6M16 3h3l2 18h-6M12 3v3m0 5v2m0 5v3',
  battery: 'M3 8a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8Zm18 3v2M6 10v4',
  siren: 'M7 18v-5a5 5 0 0 1 10 0v5M5 21h14M12 2v2M4 6l1.5 1.5M20 6l-1.5 1.5',
  scale: 'M12 3v18M6 21h12M4 7h16M4 7l-2 6a4 4 0 0 0 8 0L8 7m8 0-2 6a4 4 0 0 0 8 0l-2-6M12 3a2 2 0 1 0 0 .01',
  folder: 'M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7Z',
  key: 'M14 7a4 4 0 1 1 3 6.9L10 21H7v-3l6.1-6.1A4 4 0 0 1 14 7Zm2 1h.01',
  parking: 'M4 4h16v16H4zM9 17V8h4a3 3 0 0 1 0 6H9',
  pause: 'M8 5v14M16 5v14',
  trending: 'M3 17l6-6 4 4 7-7M21 8v5m0-5h-5',
  box: 'M21 8 12 3 3 8m18 0-9 5m9-5v8l-9 5m0-13L3 8m9 5v8m0-8L3 8v8l9 5',
  clipboard: 'M9 4h6a1 1 0 0 1 1 1v1h2a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h2V5a1 1 0 0 1 1-1Zm0 2v2h6V6M9 13h6M9 17h4',
  undo: 'M3 7h10a6 6 0 0 1 0 12H8M3 7l4-4M3 7l4 4',
  plug: 'M9 2v6m6-6v6M6 8h12v3a6 6 0 0 1-12 0V8Zm6 9v5',
  spark: 'M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2 2m8 8 2 2m0-14-2 2M6 18l2-2',
}
</script>

<template>
  <svg :width="size" :height="size" viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path :d="paths[name] || ''" />
  </svg>
</template>
