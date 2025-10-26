<template>
  <div class="auth-container">
    <h2>Create Account</h2>
    <p class="auth-sub">Join TicketFlow and manage your tasks with ease.</p>
    <form @submit.prevent="handleSubmit">
      <label>Email</label>
      <input v-model="email" type="email" />
      <label>Password</label>
      <input v-model="password" type="password" />
      <label>Confirm Password</label>
      <input v-model="confirmPassword" type="password" />
      <p v-if="error" class="error">{{ error }}</p>
      <button class="btn primary" type="submit">Sign Up</button>
      <p class="auth-switch">Already have an account? <router-link :to="{ name: 'Auth', query: { page: 'login' } }">Login</router-link></p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useNotificationStore } from '../stores/notifications'

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')
const auth = useAuthStore()
const notify = useNotificationStore()
const router = useRouter()

function handleSubmit(){
  error.value = ''
  if (!email.value || !password.value || !confirmPassword.value) { error.value = 'All fields are required.'; return }
  if (password.value !== confirmPassword.value) { error.value = 'Passwords do not match.'; return }
  auth.signup({ email: email.value, password: password.value })
  notify.show('Account created successfully', { type: 'success' })
  const from = router.currentRoute.value.query.from || '/dashboard'
  router.push(from)
}
</script>

<style scoped>
.auth-container{ background:#fff; padding:1.4rem; border-radius:12px; box-shadow:0 8px 30px rgba(2,6,23,0.06) }
.auth-sub{ color:#6b7280 }
.error{ color:#dc2626 }
.btn.primary{ background:#0ea5e9; color:#fff; padding:0.6rem 1rem; border-radius:8px }
</style>