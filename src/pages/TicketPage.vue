<template>
  <main class="container page-ticket">
    <button class="btn ghost" @click="$router.back()">Back</button>
    <div class="ticket-card" :class="ticket.status">
      <header class="ticket-header">
        <h1>{{ ticket.title }}</h1>
        <div class="meta">
          <span class="badge" :class="ticket.status">{{ ticket.status.replace('_',' ') }}</span>
          <span class="badge priority">{{ ticket.priority }}</span>
        </div>
      </header>

      <article class="ticket-body">
        <p>{{ ticket.description }}</p>
      </article>
    </div>
  </main>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { onMounted, ref } from 'vue'
import { useTicketStore } from '../stores/tickets'

const route = useRoute()
const tickets = useTicketStore()
const ticket = ref({ title:'', description:'', status:'open', priority:'Low' })

onMounted(()=>{
  tickets.load()
  const id = route.params.id
  const t = tickets.tickets.find(x=>x.id === id)
  if (t) ticket.value = t
})
</script>

<style scoped>
.page-ticket { padding:2rem }
.ticket-card{ border-left:6px solid #0ea5e9; background:#fff; padding:1rem; border-radius:8px }
.ticket-card.open{ border-left-color:#0ea5e9 }
.ticket-card.in_progress{ border-left-color:#f59e0b }
.ticket-card.closed{ border-left-color:#6b7280 }
.ticket-header{ display:flex; justify-content:space-between; align-items:center }
.meta{ display:flex; gap:0.5rem; align-items:center }
.badge{ padding:0.25rem 0.5rem; border-radius:6px; color:#fff }
.badge.priority{ background:#374151 }
</style>