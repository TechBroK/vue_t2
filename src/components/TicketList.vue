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
          <td>{{ ticket.title }}</td>
          <td>{{ ticket.priority }}</td>
          <td><span :class="['badge', ticket.status]">{{ ticket.status.replace('_',' ') }}</span></td>
          <td><slot :ticket="ticket"/></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useTicketStore } from '../stores/tickets'
const q = ref('')
const statusFilter = ref('')
const tickets = useTicketStore()

const filtered = computed(() => {
  const list = tickets.tickets
  return list.filter(t => {
    const matchesQ = q.value ? (t.title+" "+t.description).toLowerCase().includes(q.value.toLowerCase()) : true
    const matchesStatus = statusFilter.value ? t.status === statusFilter.value : true
    return matchesQ && matchesStatus
  })
})
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
</style>
