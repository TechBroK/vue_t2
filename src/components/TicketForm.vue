<template>
  <form @submit.prevent="onSubmit" class="ticket-form">
    <div class="field">
      <label for="title">Title *</label>
      <input id="title" v-model="form.title" />
      <p v-if="errors.title" class="error">{{ errors.title }}</p>
    </div>

    <div class="field">
      <label for="description">Description</label>
      <textarea id="description" rows="4" v-model="form.description"></textarea>
      <p v-if="errors.description" class="error">{{ errors.description }}</p>
    </div>

    <div class="row">
      <div class="field small">
        <label for="priority">Priority</label>
        <select id="priority" v-model="form.priority">
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>
      </div>
      <div class="field small">
        <label for="status">Status *</label>
        <select id="status" v-model="form.status">
          <option value="open">Open</option>
          <option value="in_progress">In Progress</option>
          <option value="closed">Closed</option>
        </select>
        <p v-if="errors.status" class="error">{{ errors.status }}</p>
      </div>
    </div>

    <div class="actions">
      <button class="btn primary" type="submit">{{ submitLabel }}</button>
      <button type="button" class="btn ghost" @click="$emit('cancel')">Cancel</button>
    </div>
  </form>
</template>

<script setup>
import { reactive, toRefs, watch } from 'vue'
import { useNotificationStore } from '../stores/notifications'
import { useTicketStore } from '../stores/tickets'

const props = defineProps({ initial: Object, submitLabel: { type: String, default: 'Save' } })
const emit = defineEmits(['saved','cancel'])
const notify = useNotificationStore()
const tickets = useTicketStore()

const form = reactive({ title: '', description: '', priority: 'Medium', status: 'open' })
const errors = reactive({})

if (props.initial) Object.assign(form, props.initial)

function validate() {
  errors.title = ''
  errors.status = ''
  errors.description = ''
  if (!form.title || !form.title.trim()) errors.title = 'Title is required.'
  if (!['open','in_progress','closed'].includes(String(form.status))) errors.status = 'Status must be open, in_progress or closed.'
  if (form.description && form.description.length > 1000) errors.description = 'Description must be 1000 characters or less.'
  return !errors.title && !errors.status && !errors.description
}

function onSubmit() {
  if (!validate()) return
  if (props.initial && props.initial.id) {
    tickets.updateTicket(props.initial.id, { title: form.title, description: form.description, priority: form.priority, status: form.status })
    notify.show('Ticket updated', { type: 'success' })
    emit('saved')
    return
  }
  const t = tickets.createTicket({ title: form.title, description: form.description, priority: form.priority, status: form.status })
  notify.show('Ticket created', { type: 'success' })
  emit('saved', t)
  // reset
  form.title = ''
  form.description = ''
  form.priority = 'Medium'
  form.status = 'open'
}
</script>

<style scoped>
.ticket-form { display:flex; flex-direction:column; gap:0.75rem }
.row { display:flex; gap:1rem }
.field { display:flex; flex-direction:column }
.field.small { flex:1 }
.field label { font-weight:600 }
.field input, .field textarea, .field select { padding:0.6rem; border-radius:8px; border:1px solid #d1d5db }
.error { color:#dc2626; font-size:0.9rem }
.actions { display:flex; gap:0.5rem }
.btn { padding:0.5rem 0.8rem; border-radius:8px }
.btn.primary { background:#0ea5e9; color:#fff; border:0 }
.btn.ghost { background:transparent; border:1px solid #cbd5e1 }
</style>
