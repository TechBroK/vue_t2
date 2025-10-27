<template>
  <main class="auth-page">
    <form class="auth-card" @submit.prevent="handleSubmit" novalidate>
      <h2>Login</h2>
      <div v-if="errors.form" class="auth-error">{{ errors.form }}</div>

      <label>
        Email
        <input v-model="email" type="email" autocomplete="email" />
        <div v-if="errors.email" class="field-error">{{ errors.email }}</div>
      </label>

      <label>
        Password
        <input v-model="password" type="password" autocomplete="current-password" />
        <div v-if="errors.password" class="field-error">{{ errors.password }}</div>
      </label>

      <div class="auth-actions">
        <button class="btn primary" type="submit">Login</button>
        <router-link class="btn ghost" :to="{ name: 'Auth', query: { page: 'signup' } }">Sign up</router-link>
      </div>
    </form>
  </main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useNotificationStore } from '../stores/notifications'

const email = ref('')
const password = ref('')
const errors = ref({})
const auth = useAuthStore()
const notify = useNotificationStore()
const router = useRouter()
const route = useRoute()

onMounted(() => {
  // If redirected here from a protected route, show a gentle prompt
  if (route.query && route.query.from) {
    notify.show('Please log in to continue', { type: 'info' })
  }
})

function validate() {
  const e = {}
  if (!email.value) e.email = 'Email is required'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) e.email = 'Invalid email'
  if (!password.value) e.password = 'Password is required'
  return e
}

async function handleSubmit() {
  errors.value = {}
  const eobj = validate()
  errors.value = eobj
  if (Object.keys(eobj).length) return

  try {
    // support both sync and async login implementations
    const res = await Promise.resolve(auth.login({ email: email.value, password: password.value }))
    if (!res) throw new Error('Invalid email or password')
    notify.show('Login successful', { type: 'success' })
    const dest = (route.query && route.query.from) ? route.query.from : '/dashboard'
    // replace so user can't go back to the auth page with the back button
    router.replace(dest)
  } catch (err) {
    const msg = (err && err.message) ? err.message : 'Login failed'
    errors.value = { form: msg }
    notify.show(msg, { type: 'error' })
  }
}
</script>

<style scoped>
.auth-page {
  min-height: calc(100vh - 80px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3.5rem 1.5rem;
  background: linear-gradient(180deg, rgba(14,165,233,0.06) 0%, rgba(248,250,252,1) 40%);
  position: relative;
  overflow: hidden;
}

/* decorative circle echoing landing theme */
.auth-page::before{
  content: '';
  position: absolute;
  right: -60px;
  top: -60px;
  width: 260px;
  height: 260px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, rgba(14,165,233,0.18), rgba(14,165,233,0.04));
  transform: translateZ(0);
  pointer-events: none;
}

.auth-card {
  width: 100%;
  max-width: 480px;
  background: linear-gradient(180deg, rgba(255,255,255,0.92), rgba(255,255,255,0.82));
  border: 1px solid rgba(14,165,233,0.08);
  padding: 2rem;
  border-radius: 14px;
  box-shadow: 0 14px 40px rgba(2,6,23,0.08);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
  backdrop-filter: blur(6px);
  animation: popIn .36s cubic-bezier(.2,.9,.22,1);
}

.auth-card h2 { margin: 0 0 0.35rem 0; font-weight: 800; color: var(--accent) }

.auth-card label { display: flex; flex-direction: column; font-size: 0.95rem; color: var(--text) }

.auth-card input {
  margin-top: 0.45rem;
  padding: 0.7rem 0.85rem;
  border-radius: 10px;
  border: 1px solid rgba(14,165,233,0.12);
  background: #fff;
  color: inherit;
}

.field-error { color: #dc2626; font-size: 0.9rem; margin-top: 0.35rem }

.auth-error {
  background: rgba(220,38,38,0.06);
  color: #7f1d1d;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  border: 1px solid rgba(220,38,38,0.06);
}

.auth-actions { display: flex; gap: 0.6rem; margin-top: 0.75rem; align-items: center }

.btn { padding: 0.6rem 1rem; border-radius: 10px; cursor: pointer; border: none; font-weight:700 }
.btn.primary { background:var(--accent); color:#fff }
.btn.ghost { background: transparent; border: 2px solid rgba(14,165,233,0.14); color: var(--accent) }

/* subtle bottom wave for composition */
.auth-page .hero-wave{
  position: absolute; left:0; right:0; bottom:0; height:120px; pointer-events:none; opacity:0.65
}

@keyframes popIn { from { opacity:0; transform: translateY(8px) scale(.995) } to { opacity:1; transform: none } }

@media (max-width:600px){
  .auth-page::before{ right:-100px; top:-100px; width:320px; height:320px }
  .auth-card{ padding:1.2rem; border-radius:12px }
}
</style>