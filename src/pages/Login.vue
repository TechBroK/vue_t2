<template>
  <div class="auth-container">
    <h2>Welcome Back</h2>
    <p class="auth-sub">Login to continue managing your tickets.</p>
    <form @submit.prevent="handleSubmit">
      <label>Email</label>
      <input v-model="email" type="email" />
      <label>Password</label>
      <input v-model="password" type="password" />
      <p v-if="error" class="error">{{ error }}</p>
      <button class="btn primary" type="submit">Login</button>
      <p class="auth-switch">Don’t have an account? <router-link :to="{ name: 'Auth', query: { page: 'signup' } }">Sign up</router-link></p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useNotificationStore } from '../stores/notifications'

const email = ref('')
const password = ref('')
const error = ref('')
const auth = useAuthStore()
const notify = useNotificationStore()
const router = useRouter()
const route = useRoute()

function handleSubmit(){
  error.value = ''
  if (!email.value || !password.value) { error.value = 'All fields are required.'; return }
  const res = auth.login({ email: email.value, password: password.value })
  if (!res) { notify.show('Invalid email or password', { type: 'error' }); return }
  notify.show('Login successful', { type: 'success' })
  const from = route.query.from || '/dashboard'
  router.push(from)
}
</script>

<style scoped>
.auth-container{ background:#fff; padding:1.4rem; border-radius:12px; box-shadow:0 8px 30px rgba(2,6,23,0.06) }
.auth-sub{ color:#6b7280 }
.error{ color:#dc2626 }
.btn.primary{ background:#0ea5e9; color:#fff; padding:0.6rem 1rem; border-radius:8px }
</style>