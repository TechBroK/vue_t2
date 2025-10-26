<template>
  <header class="site-header">
    <div class="container header-inner">
      <div class="brand">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden>
          <rect width="24" height="24" rx="6" fill="#0ea5e9" />
          <path d="M6 12h12" stroke="#fff" stroke-width="1.5" stroke-linecap="round" />
        </svg>
        <span class="brand-text">TicketFlow</span>
      </div>

      <button class="hamburger" :aria-expanded="menuOpen.toString()" @click="toggleMenu" aria-label="Toggle navigation">
        <span class="bar" :class="{open: menuOpen}"></span>
      </button>

      <nav class="main-nav" :class="{open: menuOpen}" aria-label="Main navigation" @click="navClick">
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/dashboard">Dashboard</router-link></li>
          <li v-if="!isAuth"><router-link :to="{ name: 'Auth', query: { page: 'login' } }">Login</router-link></li>
          <li v-if="!isAuth"><router-link :to="{ name: 'Auth', query: { page: 'signup' } }">Sign up</router-link></li>
          <li v-if="isAuth"><button class="btn ghost" @click="doLogout">Logout</button></li>
        </ul>
      </nav>

      <div v-if="menuOpen" class="nav-backdrop" @click="menuOpen = false"></div>
    </div>
  </header>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useNotificationStore } from '../stores/notifications'
import { useRouter } from 'vue-router'

const menuOpen = ref(false)
const auth = useAuthStore()
const notify = useNotificationStore()
const router = useRouter()

const isAuth = computed(() => !!auth.session)
function toggleMenu() {
  menuOpen.value = !menuOpen.value
}
function navClick(e) {
  const tag = e.target.closest('a,button')
  if (tag) menuOpen.value = false
}
function doLogout() {
  auth.logout()
  notify.show('Logged out', { type: 'success' })
  router.push('/')
}
</script>

<style scoped>
.site-header { background: linear-gradient(90deg,#0f172a, #0b1220); color: #fff; position:sticky; top:0; z-index:60 }
.header-inner { display:flex; align-items:center; gap:1rem; padding:0.75rem 0 }
.brand { display:flex; gap:0.5rem; align-items:center }
.brand-text { font-weight:700 }
.hamburger { background:none; border:0; color:inherit; display:none }
.hamburger .bar { width:22px; height:2px; background:#fff; display:block; position:relative }
.hamburger .bar.open { transform: rotate(90deg) }
.main-nav { margin-left:auto }
.main-nav ul { display:flex; gap:1rem; list-style:none; margin:0; padding:0 }
.main-nav a { color:inherit; text-decoration:none }
.btn.ghost { background:transparent; border:1px solid rgba(255,255,255,0.15); color:inherit; padding:0.35rem 0.6rem; border-radius:6px }
.nav-backdrop { position:fixed; inset:0; background:rgba(0,0,0,0.4); z-index:50 }

@media (max-width:900px){
  .hamburger { display:block }
  .main-nav { position:fixed; right:1rem; top:64px; width:220px; transform:translateY(-8px); opacity:0; visibility:hidden; transition:all .2s ease; background:linear-gradient(180deg,#071022,#0f172a); padding:1rem; border-radius:8px; box-shadow:0 8px 30px rgba(2,6,23,0.6); z-index:55 }
  .main-nav.open { transform:translateY(0); opacity:1; visibility:visible }
  .main-nav ul { flex-direction:column }
}
</style>
