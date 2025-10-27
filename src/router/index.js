import { createRouter, createWebHistory } from 'vue-router'
import Landing from '../pages/Landing.vue'
import Auth from '../pages/Auth.vue'
import Dashboard from '../pages/Dashboard.vue'
import TicketPage from '../pages/TicketPage.vue'
import NotFound from '../pages/NotFound.vue'
import { getSession } from '../services/auth'

const routes = [
  { path: '/', name: 'Landing', component: Landing },
  { path: '/auth/:page?', name: 'Auth', component: Auth },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true } },
  { path: '/tickets/:id', name: 'TicketPage', component: TicketPage, meta: { requiresAuth: true } },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound }
]

const router = createRouter({
  history: createWebHistory('/vue_t2/'),
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.meta && to.meta.requiresAuth
  const session = getSession()
  if (requiresAuth && !session) {
    // preserve original path in query
    next({ name: 'Auth', query: { from: to.fullPath, page: 'login' } })
  } else {
    next()
  }
})

export default router
