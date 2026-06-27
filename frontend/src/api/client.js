const API_BASE = '/api'

function getToken() {
  return localStorage.getItem('token')
}

export function setToken(token) {
  localStorage.setItem('token', token)
}

export function clearToken() {
  localStorage.removeItem('token')
}

export function isAuthenticated() {
  return !!getToken()
}

async function request(path, options = {}) {
  const token = getToken()
  const headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers,
  }

  const res = await fetch(`${API_BASE}${path}`, { ...options, headers })

  if (res.status === 401) {
    clearToken()
    window.location.href = '/login'
    return
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }))
    throw error
  }

  return res.status === 204 ? null : res.json()
}

export const api = {
  login: (email, password) =>
    request('/login', { method: 'POST', body: JSON.stringify({ email, password }) }),

  register: (data) =>
    request('/register', { method: 'POST', body: JSON.stringify(data) }),

  logout: () =>
    request('/logout', { method: 'POST' }),

  getTickets: () =>
    request('/tickets'),

  getTicket: (id) =>
    request(`/tickets/${id}`),

  createTicket: (data) =>
    request('/tickets', { method: 'POST', body: JSON.stringify(data) }),

  updateTicket: (id, data) =>
    request(`/tickets/${id}`, { method: 'PUT', body: JSON.stringify(data) }),

  addComment: (ticketId, data) =>
    request(`/tickets/${ticketId}/comments`, { method: 'POST', body: JSON.stringify(data) }),
}
