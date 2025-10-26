<template>
  <footer class="site-footer">
    <div class="container footer-inner">
      <div class="left">© {{ year }} TicketFlow</div>
      <nav aria-label="Footer navigation">
        <a href="#top" @click.prevent="scrollTop">Back to top</a>
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
      </nav>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
function scrollTop(){ window.scrollTo({top:0,behavior:'smooth'}) }
</script>

<style scoped>
.site-footer { background:#071022; color:#9ca3af; padding:1rem 0 }
.footer-inner { display:flex; justify-content:space-between; align-items:center }
.footer-inner a { color:inherit; margin-left:1rem; text-decoration:none }
</style>
