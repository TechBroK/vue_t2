import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notifications', () => {
  const toasts = ref([])

  // action: { label: string, callback: function }
  function show(message, { type = 'info', duration = 5000, action = null } = {}) {
    const id = Date.now() + Math.random()
    const toast = { id, message, type, action }
    toasts.value.push(toast)

    // always auto-dismiss after duration unless duration === 0
    if (duration && duration > 0) {
      setTimeout(() => remove(id), duration)
    }
    return id
  }

  function remove(id) {
    const idx = toasts.value.findIndex(t => t.id === id)
    if (idx !== -1) toasts.value.splice(idx, 1)
  }

  function runAction(id) {
    const t = toasts.value.find(x => x.id === id)
    if (!t || !t.action || typeof t.action.callback !== 'function') return
    try {
      t.action.callback()
    } catch (e) {
      // swallow action errors
      console.error(e)
    }
    remove(id)
  }

  return { toasts, show, remove, runAction }
})
