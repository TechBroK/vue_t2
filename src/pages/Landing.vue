<template>
  <main class="landing">
    <div class="container hero-inner" id="top">
      <div class="hero-content">
        <h1>TicketFlow — manage tasks with confidence</h1>
        <p class="lead">Create, track and close tickets. Fast, lightweight and local-first.</p>
        <div class="hero-ctas">
          <router-link class="btn primary" :to="{ name: 'Auth', query: { page: 'login' } }">Login</router-link>
          <button class="btn ghost" @click="scrollToFeatures">Get Started</button>
        </div>
      </div>
      <div class="hero-decor">
        <svg class="hero-wave" viewBox="0 0 1440 120" preserveAspectRatio="none"><path fill="#f8fafc" d="M0,40 C360,120 1080,0 1440,40 L1440,120 L0,120 Z"></path></svg>
      </div>
    </div>

    <section class="decor-cards" id="features">
      <div class="container feature-wrapper">
        <div class="feature-boxes">
          <div class="box">Fast—create tickets in seconds</div>
          <div class="box">Local-first—data stays on your device</div>
          <div class="box">Accessible and responsive</div>
        </div>
      </div>
    </section>

  </main>
</template>

<script setup>
function scrollToFeatures(){
  const el = document.getElementById('features')
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.landing{ min-height:100vh; display:flex; flex-direction:column }
.hero-inner { display:flex; align-items:center; justify-content:center; padding:4rem 0 }
.hero-content { max-width:900px; text-align:center }
.lead { color:#6b7280 }
.hero-ctas { margin-top:1rem; display:flex; gap:0.6rem; justify-content:center }
.btn.primary{ background:#0ea5e9; color:#fff; padding:0.6rem 1rem; border-radius:8px }
.btn.ghost{ background:transparent; border:1px solid #cbd5e1; padding:0.5rem 0.9rem; border-radius:8px }
.decor-cards{ background:linear-gradient(180deg,#f8fafc,#eef2ff); padding:2rem 0 }
.feature-boxes{ display:flex; gap:1rem; justify-content:center; flex-wrap:wrap }
.box{ background:#fff; padding:1.4rem; border-radius:12px; box-shadow:0 8px 30px rgba(2,6,23,0.06); min-width:220px; text-align:center }
.hero-wave{ width:100%; height:80px; margin-top:2rem }
</style>