<script setup>
import Icon from '@/components/ui/Icon.vue'
import { useToastStore } from '@/stores/toast'
const toast = useToastStore()
const cfg = {
  success: { icon: 'check-circle', cls: 'text-success' },
  info: { icon: 'bell', cls: 'text-info' },
  danger: { icon: 'alert', cls: 'text-danger' },
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed bottom-5 right-5 z-[60] flex flex-col gap-2">
      <TransitionGroup name="toast">
        <div v-for="t in toast.items" :key="t.id"
          class="flex items-center gap-3 rounded-xl border border-[color:var(--color-border)] bg-surface px-4 py-3 shadow-[var(--shadow-pop)]">
          <Icon :name="cfg[t.tone].icon" :size="18" :class="cfg[t.tone].cls" />
          <span class="text-sm font-medium">{{ t.message }}</span>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<style scoped>
.toast-enter-active, .toast-leave-active { transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1); }
.toast-enter-from { opacity: 0; transform: translateX(30px); }
.toast-leave-to { opacity: 0; transform: translateX(30px); }
</style>
