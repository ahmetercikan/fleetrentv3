<script setup>
import { RouterView } from 'vue-router'
import SupplierSidebar from '@/components/layout/SupplierSidebar.vue'
import SupplierTopbar from '@/components/layout/SupplierTopbar.vue'
</script>

<template>
  <div class="min-h-full">
    <SupplierSidebar />
    <div class="lg:pl-64">
      <SupplierTopbar />
      <main class="mx-auto max-w-[1400px] px-4 py-6 lg:px-8 lg:py-8">
        <RouterView v-slot="{ Component }">
          <transition name="fade" mode="out-in"><component :is="Component" /></transition>
        </RouterView>
      </main>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.18s ease, transform 0.18s ease; }
.fade-enter-from { opacity: 0; transform: translateY(6px); }
.fade-leave-to { opacity: 0; }
</style>
