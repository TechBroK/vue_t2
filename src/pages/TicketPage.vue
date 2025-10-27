<template>
  <main class="container page-ticket">
    <div style="display:flex;gap:0.5rem;align-items:center;margin-bottom:1rem">
      <button class="btn ghost" @click="$router.back()">Back</button>
      <div style="margin-left:auto;display:flex;gap:0.5rem">
        <button v-if="!isEditing" class="btn" @click="startEdit">Edit</button>
        <button v-if="isEditing" class="btn primary" @click="submitEdit">Update</button>
        <button v-if="isEditing" class="btn ghost" @click="cancelEdit">Cancel</button>
        <button class="btn ghost" @click="confirmDelete">Delete</button>
      </div>
    </div>

  <div class="ticket-card" :class="[ticket.status, { editing: isEditing }]">
      <header class="ticket-header">
        <div style="flex:1">
          <template v-if="!isEditing">
            <h1>{{ ticket.title }}</h1>
          </template>
          <template v-else>
            <label class="sr-only">Title</label>
            <input v-model="form.title" placeholder="Title" />
          </template>
        </div>
  <div class="meta">
          <template v-if="!isEditing">
            <span class="badge" :class="ticket.status">{{ ticket.status.replace('_',' ') }}</span>
            <span class="badge priority">{{ ticket.priority }}</span>
          </template>
          <template v-else>
            <select v-model="form.priority">
              <option>Low</option>
              <option>Medium</option>
              <option>High</option>
            </select>
            <select v-model="form.status">
              <option value="open">Open</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed</option>
            </select>
          </template>
        </div>
      </header>

      <article class="ticket-body">
        <template v-if="!isEditing">
          <p>{{ ticket.description }}</p>
        </template>
        <template v-else>
          <label class="sr-only">Description</label>
          <textarea v-model="form.description" rows="6"></textarea>
          <div v-if="formError" class="field-error">{{ formError }}</div>
        </template>
      </article>
    </div>
  </main>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import { onMounted, ref, nextTick } from 'vue'
import { useTicketStore } from '../stores/tickets'
import { useNotificationStore } from '../stores/notifications'

const route = useRoute()
const tickets = useTicketStore()
const notify = useNotificationStore()
const router = useRouter()
const ticket = ref({ title:'', description:'', status:'open', priority:'Low' })
const isEditing = ref(false)
const form = ref({ title:'', description:'', priority:'Low', status:'open' })
const formError = ref('')

onMounted(()=>{
  tickets.load()
  const id = route.params.id
  const t = tickets.tickets.find(x=>x.id === id)
  if (t) ticket.value = t
})

function startEdit(){
  if (!ticket.value || !ticket.value.id) return
  form.value = { title: ticket.value.title, description: ticket.value.description, priority: ticket.value.priority || 'Low', status: ticket.value.status || 'open' }
  formError.value = ''
  isEditing.value = true
  // focus the title input for immediate feedback
  nextTick(() => {
    const el = document.querySelector('.ticket-card input')
    if (el && typeof el.focus === 'function') el.focus()
  })
}

function cancelEdit(){
  isEditing.value = false
  formError.value = ''
}

function submitEdit(){
  formError.value = ''
  if (!form.value.title || !form.value.title.trim()) { formError.value = 'Title is required'; return }
  const patch = { title: form.value.title.trim(), description: form.value.description, priority: form.value.priority, status: form.value.status }
  const updated = tickets.updateTicket(ticket.value.id, patch)
  if (updated) {
    ticket.value = { ...updated }
    notify.show('Ticket updated', { type: 'success' })
    isEditing.value = false
  } else {
    notify.show('Failed to update ticket', { type: 'error' })
  }
}

function confirmDelete(){
  if (!ticket.value || !ticket.value.id) return
  if (!window.confirm('Delete this ticket? This cannot be undone.')) return
  tickets.deleteTicket(ticket.value.id)
  notify.show('Ticket deleted', { type: 'success' })
  router.push('/dashboard')
}
</script>

<style scoped>
.page-ticket { padding:2rem }
.ticket-card{ border-left:6px solid #16a34a; background:#fff; padding:1rem; border-radius:8px }
.ticket-card.open{ border-left-color:#16a34a }
.ticket-card.in_progress{ border-left-color:#f59e0b }
.ticket-card.closed{ border-left-color:#6b7280 }
.ticket-header{ display:flex; justify-content:space-between; align-items:center }
.meta{ display:flex; gap:0.5rem; align-items:center }
.badge{ padding:0.25rem 0.5rem; border-radius:6px; color:#fff }
.badge.priority{ background:#374151 }

/* editing state visuals and input sizing */
.ticket-card.editing{ box-shadow: 0 8px 28px rgba(2,6,23,0.06); border-left-width:4px }
.ticket-card input, .ticket-card select, .ticket-card textarea{ width:100%; padding:0.6rem; border-radius:8px; border:1px solid #e6e9ef; margin-top:0.5rem }
.ticket-card select{ max-width:160px }
.field-error{ color:#b91c1c; margin-top:0.4rem }
</style>