<template>
  <div class="tf-toasts" aria-live="polite">
    <div v-for="t in store.toasts" :key="t.id" class="toast" :class="t.type" role="status" aria-atomic="true">
        <div class="message">{{ t.message }}</div>
        <div v-if="t.action" class="action">
          <button @click="runAction(t)" :aria-label="`Action: ${t.action.label}`">{{ t.action.label }}</button>
        </div>
        <button class="close" @click="store.remove(t.id)" aria-label="Dismiss notification">×</button>
      </div>
  </div>
</template>

<script setup>
import { useNotificationStore } from '../stores/notifications'
const store = useNotificationStore()
function runAction(t){
  if (!t || !t.id) return
  store.runAction(t.id)
}
</script>

<style scoped>
.tf-toasts { position:fixed; right:1rem; bottom:1rem; display:flex; flex-direction:column-reverse; gap:0.6rem; z-index:1000 }
.toast { background:#111827; color:#fff; padding:0.75rem 1rem; border-radius:8px; box-shadow:0 6px 20px rgba(2,6,23,0.6); display:flex; align-items:center; gap:0.6rem }
.toast.success{ background:#16a34a }
.toast.error{ background:#dc2626 }
.toast .close{ background:transparent; border:0; color:rgba(255,255,255,0.8) }
.toast .action button{ background:transparent; border:1px solid rgba(255,255,255,0.2); color:#fff; padding:0.25rem 0.5rem; border-radius:6px }
</style>
