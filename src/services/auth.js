const SESSION_KEY = 'ticketapp_session'
const USER_KEY = 'ticketapp_user'

export function signup(user) {
  // user: { email, password }
  localStorage.setItem(USER_KEY, JSON.stringify(user))
  const token = btoa(`${user.email}:${Date.now()}`)
  localStorage.setItem(SESSION_KEY, JSON.stringify({ email: user.email, token }))
  return { email: user.email, token }
}

export function login({ email, password }) {
  const raw = localStorage.getItem(USER_KEY)
  if (!raw) return null
  try {
    const stored = JSON.parse(raw)
    if (stored.email === email && stored.password === password) {
      const token = btoa(`${email}:${Date.now()}`)
      localStorage.setItem(SESSION_KEY, JSON.stringify({ email, token }))
      return { email, token }
    }
  } catch (e) {
    return null
  }
  return null
}

export function logout() {
  localStorage.removeItem(SESSION_KEY)
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY))
  } catch (e) {
    return null
  }
}

export function currentUser() {
  try {
    return JSON.parse(localStorage.getItem(USER_KEY))
  } catch (e) {
    return null
  }
}

export { SESSION_KEY, USER_KEY }
