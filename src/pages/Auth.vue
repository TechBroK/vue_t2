<template>
  <div class="auth-wrapper container">
    <component :is="currentPage" @authed="onAuthed" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Login from './Login.vue'
import Signup from './Signup.vue'

const route = useRoute()
const router = useRouter()
const page = computed(() => route.query.page || 'login')
const currentPage = computed(() => page.value === 'signup' ? Signup : Login)

function onAuthed(){
  const from = route.query.from || '/dashboard'
  router.push(from)
}
</script>

<style scoped>
.auth-wrapper{ max-width:420px; margin:3rem auto }
</style>