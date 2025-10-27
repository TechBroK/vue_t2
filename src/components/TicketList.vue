<template>
  <div>
    <div class="dashboard-controls">
      <input v-model="q" class="search-input" placeholder="Search tickets..." />
      <select v-model="statusFilter" class="status-select">
        <option value="">All statuses</option>
        <option value="open">Open</option>
        <option value="in_progress">In Progress</option>
        <option value="closed">Closed</option>
      </select>
    </div>

    <table class="ticket-table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Priority</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(ticket, index) in filtered" :key="ticket.id" :class="[{closed: ticket.status === 'closed'}, index%2===0? 'even':'odd']">
          <td>
            <template v-if="editingId !== ticket.id">
              {{ ticket.title }}
            </template>
            <template v-else>
              <input v-model="form.title" placeholder="Title" />
            </template>
          </td>
          <td>
            <template v-if="editingId !== ticket.id">
              {{ ticket.priority }}
            </template>
            <template v-else>
              <select v-model="form.priority">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </template>
          </td>
          <td>
            <template v-if="editingId !== ticket.id">
              <span :class="['badge', ticket.status]">{{ ticket.status.replace('_',' ') }}</span>
            </template>
            <template v-else>
              <select v-model="form.status">
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="closed">Closed</option>
              </select>
            </template>
          </td>
          <td>
            <template v-if="editingId !== ticket.id">
              <button v-if="ticket.status !== 'closed'" class="complete" @click.prevent="markClosed(ticket)" :aria-label="`Mark ${ticket.title} closed`">✓</button>
              <button class="btn" @click.prevent="beginEdit(ticket)">Edit</button>
              <button class="btn danger" @click.prevent="doDelete(ticket)">Delete</button>
            </template>
            <template v-else>
              <button class="btn primary" @click.prevent="submitEdit(ticket)">Update</button>
              <button class="btn ghost" @click.prevent="cancelEdit">Cancel</button>
              <div v-if="formError" class="field-error">{{ formError }}</div>
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTicketStore } from '../stores/tickets'
import { useNotificationStore } from '../stores/notifications'

const q = ref('')
const statusFilter = ref('')
const tickets = useTicketStore()
const notify = useNotificationStore()

const editingId = ref(null)
const form = ref({ title:'', priority:'Low', status:'open' })
const formError = ref('')

const filtered = computed(() => {
  const list = tickets.tickets
  return list.filter(t => {
    const matchesQ = q.value ? (t.title+" "+t.description).toLowerCase().includes(q.value.toLowerCase()) : true
    const matchesStatus = statusFilter.value ? t.status === statusFilter.value : true
    return matchesQ && matchesStatus
  })
})

function beginEdit(ticket){
  editingId.value = ticket.id
  form.value = { title: ticket.title, priority: ticket.priority || 'Low', status: ticket.status || 'open' }
  formError.value = ''
}

function cancelEdit(){ editingId.value = null; formError.value = '' }

function submitEdit(ticket){
  formError.value = ''
  if (!form.value.title || !form.value.title.trim()) { formError.value = 'Title required'; return }
  const patch = { title: form.value.title.trim(), priority: form.value.priority, status: form.value.status }
  const updated = tickets.updateTicket(ticket.id, patch)
  if (updated) {
    notify.show('Ticket updated', { type: 'success' })
    editingId.value = null
  } else {
    notify.show('Failed to update ticket', { type: 'error' })
  }
}

function doDelete(ticket){
  if (!confirm('Delete this ticket?')) return
  tickets.deleteTicket(ticket.id)
  notify.show('Ticket deleted', { type: 'success' })
}

function markClosed(ticket){
  if (!confirm('Mark ticket as completed?')) return
  const prev = ticket.status
  tickets.updateTicket(ticket.id, { status: 'closed' })
  // show toast with undo action
  notify.show('Ticket marked closed', { type: 'success', duration: 6000, action: { label: 'Undo', callback: () => { tickets.updateTicket(ticket.id, { status: prev }) } } })
}
</script>

<style scoped>
.dashboard-controls { display:flex; gap:1rem; margin-bottom:1rem }
.search-input { padding:0.6rem; border-radius:8px; flex:1; border:1px solid #d1d5db }
.status-select { padding:0.5rem; border-radius:8px }
.ticket-table { width:100%; border-collapse:collapse }
.ticket-table th { background:#e6f2ff; color:#0369a1; padding:0.6rem; text-align:left }
.ticket-table td { padding:0.6rem; border-bottom:1px solid rgba(0,0,0,0.05) }
.ticket-table tr.odd { background:#fff }
.ticket-table tr.even { background:#eaf6ff }
.badge.open{ background:#059669; color:#fff; padding:0.15rem 0.4rem; border-radius:6px }
.badge.in_progress{ background:#f59e0b; color:#fff; padding:0.15rem 0.4rem; border-radius:6px }
.badge.closed{ background:#6b7280; color:#fff; padding:0.15rem 0.4rem; border-radius:6px }

.ticket-table input, .ticket-table select{ padding:0.5rem; border-radius:8px; border:1px solid #e6e9ef }
.ticket-table .btn{ margin-right:0.4rem }
.field-error{ color:#b91c1c; margin-top:0.4rem }
.complete { background:#16a34a; color:#fff; border-radius:999px; width:36px; height:36px; border:0; display:inline-flex; align-items:center; justify-content:center; font-weight:700 }
</style>
