import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notifications', () => {
  const toasts = ref([])
  function show(message, { type = 'info', duration = 3000, action } = {}) {
    const id = Date.now() + Math.random()
    toasts.value.push({ id, message, type, action })
    if (!action) {
      setTimeout(() => remove(id), duration)
    }
    return id
  }
  function remove(id) {
    const idx = toasts.value.findIndex(t => t.id === id)
    if (idx !== -1) toasts.value.splice(idx, 1)
  }
  return { toasts, show, remove }
})
