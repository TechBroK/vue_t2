<template>
  <main class="container">
    <h1>Dashboard</h1>
    <div class="stats">
      <div class="card">
        <h3>Total</h3>
        <p class="big">{{ tickets.total }}</p>
      </div>
      <div class="card">
        <h3>Open</h3>
        <p class="big">{{ tickets.counts.open }}</p>
      </div>
      <div class="card">
        <h3>In Progress</h3>
        <p class="big">{{ tickets.counts.in_progress }}</p>
      </div>
      <div class="card">
        <h3>Closed</h3>
        <p class="big">{{ tickets.counts.closed }}</p>
      </div>
    </div>

    <section class="tickets-section">
      <h2>Tickets</h2>
      <TicketForm @saved="refresh" />
      <TicketList>
        <template #default="{ ticket }">
          <TicketItem :ticket="ticket" @deleted="refresh" @updated="refresh" />
        </template>
      </TicketList>
    </section>
  </main>
</template>

<script setup>
import { onMounted } from 'vue'
import TicketForm from '../components/TicketForm.vue'
import TicketList from '../components/TicketList.vue'
import TicketItem from '../components/TicketItem.vue'
import { useTicketStore } from '../stores/tickets'

const tickets = useTicketStore()
function refresh(){ tickets.load() }
onMounted(()=>{ tickets.load() })
</script>

<style scoped>
.container{ padding:2rem }
.stats{ display:flex; gap:1rem; margin-bottom:1.2rem; flex-wrap:wrap }
.card{ background:#f9f9f9; padding:1rem; border-radius:12px; box-shadow:0 2px 6px rgba(0,0,0,0.08); min-width:160px }
.big{ font-size:1.6rem; font-weight:700 }
.tickets-section{ margin-top:1.2rem }
</style>