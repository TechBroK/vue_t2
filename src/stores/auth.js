import { defineStore } from 'pinia'
import { login as svcLogin, signup as svcSignup, logout as svcLogout, getSession, currentUser, USER_KEY, SESSION_KEY } from '../services/auth'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    session: getSession(),
    user: currentUser()
  }),
  getters: {
    isAuthenticated: (state) => !!state.session
  },
  actions: {
    signup(payload) {
      const res = svcSignup(payload)
      this.session = res
      this.user = { email: payload.email }
      return res
    },
    login(payload) {
      const res = svcLogin(payload)
      if (res) {
        this.session = res
        this.user = { email: payload.email }
      }
      return res
    },
    logout() {
      svcLogout()
      this.session = null
      this.user = null
    }
  }
})
