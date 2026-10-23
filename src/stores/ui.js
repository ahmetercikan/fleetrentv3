import { defineStore } from 'pinia'

export const useUiStore = defineStore('ui', {
  state: () => ({
    theme: localStorage.getItem('fr-theme') || 'light',
    mobileNavOpen: false,
  }),
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', this.theme)
      localStorage.setItem('fr-theme', this.theme)
    },
    toggleMobileNav(v) {
      this.mobileNavOpen = v ?? !this.mobileNavOpen
    },
  },
})
