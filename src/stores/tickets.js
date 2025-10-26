import { defineStore } from 'pinia'
const STORAGE_KEY = 'tf:tickets:v1'
const ALLOWED = ['open','in_progress','closed']

function seed() {
  return [
    { id: '1', title: 'Welcome ticket', description: 'This is a seeded ticket', priority: 'Medium', status: 'open', createdAt: Date.now() },
    { id: '2', title: 'Second ticket', description: 'Another example', priority: 'Low', status: 'in_progress', createdAt: Date.now() }
  ]
}

export const useTicketStore = defineStore('tickets', {
  state: () => ({
    tickets: []
  }),
  getters: {
    total: (state) => state.tickets.length,
    counts: (state) => ({
      open: state.tickets.filter(t => t.status === 'open').length,
      in_progress: state.tickets.filter(t => t.status === 'in_progress').length,
      closed: state.tickets.filter(t => t.status === 'closed').length
    })
  },
  actions: {
    load() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY)
        if (raw) {
          this.tickets = JSON.parse(raw)
          return
        }
      } catch (e) {}
      this.tickets = seed()
      this.save()
    },
    save() {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.tickets))
    },
    sanitizeStatus(s) {
      if (!s) return 'open'
      const v = String(s).toLowerCase()
      return ALLOWED.includes(v) ? v : 'open'
    },
    createTicket(payload) {
      const ticket = {
        id: String(Date.now()),
        title: (payload.title || '').trim(),
        description: payload.description || '',
        priority: payload.priority || 'Low',
        status: this.sanitizeStatus(payload.status),
        createdAt: Date.now()
      }
      this.tickets.unshift(ticket)
      this.save()
      return ticket
    },
    updateTicket(id, patch) {
      const idx = this.tickets.findIndex(t => t.id === id)
      if (idx === -1) return null
      const ticket = this.tickets[idx]
      if (patch.status) patch.status = this.sanitizeStatus(patch.status)
      this.tickets[idx] = { ...ticket, ...patch }
      this.save()
      return this.tickets[idx]
    },
    deleteTicket(id) {
      this.tickets = this.tickets.filter(t => t.id !== id)
      this.save()
    }
  }
})
