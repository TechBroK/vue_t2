<template>
  <footer class="site-footer" role="contentinfo">
    <div class="container footer-inner">
      <div class="footer-left">
        <div class="brand">TicketFlow</div>
        <div class="copyright">© {{ year }} TicketFlow</div>
      </div>

      <nav class="footer-nav" aria-label="Footer">
        <a href="#top" @click.prevent="scrollTop">Back to top</a>
        <a href="#">Privacy</a>
        <a href="#">Terms</a>
      </nav>

      <div class="footer-social" aria-hidden="false">
        <a href="#" aria-label="Twitter" class="social-link">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <path d="M22 5.92c-.64.3-1.33.5-2.05.59.74-.44 1.3-1.13 1.56-1.96-.7.42-1.46.73-2.27.9A3.63 3.63 0 0 0 12.9 8.5c0 .28.03.55.09.82-3-.15-5.65-1.6-7.44-3.8-.31.55-.48 1.2-.48 1.88 0 1.3.66 2.45 1.67 3.13-.61-.02-1.18-.19-1.68-.46v.05c0 1.82 1.3 3.34 3.03 3.68-.32.09-.65.14-.99.14-.24 0-.48-.02-.71-.07.48 1.49 1.86 2.58 3.5 2.61A7.28 7.28 0 0 1 4 19.54 10.26 10.26 0 0 0 9.62 21c6.02 0 9.33-4.98 9.33-9.3v-.42c.64-.46 1.18-1.04 1.61-1.69-.59.26-1.22.44-1.87.52z" fill="#374151"/>
          </svg>
        </a>
      </div>
    </div>
  </footer>
</template>

<script setup>
const year = new Date().getFullYear()
function scrollTop(e){ e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }) }
</script>

<style scoped>
.site-footer { background:#071022; color:#9ca3af; padding:1.25rem 0; position:relative }
.footer-inner { display:flex; justify-content:space-between; align-items:center; gap:1rem }
.footer-left { display:flex; flex-direction:column }
.brand { font-weight:700; color:#fff }
.copyright { font-size:0.95rem; color:var(--muted) }
.footer-nav { display:flex; gap:1rem; align-items:center }
.footer-nav a { color:inherit; text-decoration:none }
.footer-social { display:flex; align-items:center }
.social-link { display:inline-flex; align-items:center; justify-content:center; width:36px; height:36px; border-radius:8px; background:transparent }
.social-link svg { display:block }

/* decorative circle in footer (second circle on site) */
.site-footer::after{ content:""; position:absolute; left:2rem; bottom: -40px; width:120px; height:120px; border-radius:50%; background:radial-gradient(circle at 30% 30%, rgba(14,165,233,0.08), rgba(14,165,233,0.02)); z-index:0 }

@media (max-width:800px){
  .footer-inner{ flex-direction:column; align-items:flex-start; gap:0.75rem }
  .footer-nav{ order:3 }
  .footer-social{ order:2 }
}
</style>
