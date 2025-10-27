<template>
  <div class="actions">
  <button v-if="ticket.status !== 'closed'" class="complete" @click="markClosed" :aria-label="`Mark ${ticket.title} closed`">✓</button>
    <button @click="editing = !editing" class="btn ghost">{{ editing ? 'Cancel' : 'Edit' }}</button>
    <button @click="doDelete" class="btn danger">Delete</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTicketStore } from '../stores/tickets'
import { useNotificationStore } from '../stores/notifications'

const props = defineProps({ ticket: Object })
const emit = defineEmits(['deleted','updated'])
const editing = ref(false)
const tickets = useTicketStore()
const notify = useNotificationStore()

function markClosed(){
  if (!confirm('Mark ticket as completed?')) return
  const prev = props.ticket.status
  tickets.updateTicket(props.ticket.id, { status: 'closed' })
  // show toast with undo action
  notify.show('Ticket marked closed', { type: 'success', duration: 6000, action: { label: 'Undo', callback: () => { tickets.updateTicket(props.ticket.id, { status: prev }) } } })
  emit('updated')
}
function doDelete(){
  if (!confirm('Delete this ticket?')) return
  tickets.deleteTicket(props.ticket.id)
  notify.show('Ticket deleted', { type: 'success' })
  emit('deleted')
}
</script>

<style scoped>
.actions { display:flex; gap:0.5rem }
.complete { background:#16a34a; color:#fff; border-radius:999px; width:36px; height:36px; border:0 }
.btn.ghost { background:transparent; border:1px solid #cbd5e1; padding:0.4rem 0.6rem; border-radius:8px }
.btn.danger { background:#ef4444; color:#fff; border:0; padding:0.4rem 0.6rem; border-radius:8px }
</style>
