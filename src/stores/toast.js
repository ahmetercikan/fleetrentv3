import { defineStore } from 'pinia'

let seq = 0
export const useToastStore = defineStore('toast', {
  state: () => ({ items: [] }),
  actions: {
    push(message, tone = 'success') {
      const id = ++seq
      this.items.push({ id, message, tone })
      setTimeout(() => this.dismiss(id), 3200)
    },
    success(m) { this.push(m, 'success') },
    info(m) { this.push(m, 'info') },
    error(m) { this.push(m, 'danger') },
    dismiss(id) { this.items = this.items.filter((t) => t.id !== id) },
  },
})
