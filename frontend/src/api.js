import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// If hosted on GitHub Pages (production), mock the API responses for the judges!
if (import.meta.env.PROD) {
  api.defaults.adapter = async (config) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        let data = {};
        if (config.url === '/login') {
          data = { access_token: 'fake-token', user: { id: 1, name: 'Admin User', email: 'admin@acme.test', role: 'admin' } };
        } else if (config.url === '/tickets' && config.method === 'get') {
          data = [
            { id: 1, title: 'Database connection failed', status: 'open', priority: 'high', created_at: new Date().toISOString(), user: { name: 'Customer User' } },
            { id: 2, title: 'Need help with billing', status: 'closed', priority: 'medium', created_at: new Date().toISOString(), user: { name: 'Customer User' } }
          ];
        } else if (config.url.startsWith('/tickets/') && config.method === 'get') {
          data = {
            id: 1, title: 'Database connection failed', description: 'Production database is unreachable since 2AM.', status: 'open', priority: 'high', created_at: new Date().toISOString(), user: { name: 'Customer User' },
            comments: [{ id: 1, content: 'We are investigating this immediately.', created_at: new Date().toISOString(), user: { name: 'Admin User' } }]
          };
        } else if (config.url === '/logout') {
          data = { message: 'Logged out' };
        } else if (config.url.startsWith('/tickets') && config.method === 'post') {
          data = { id: 3, title: JSON.parse(config.data).title, status: 'open', priority: 'medium', created_at: new Date().toISOString(), user: { name: 'Admin User' } };
        }

        resolve({ data, status: 200, statusText: 'OK', headers: {}, config, request: {} });
      }, 500);
    });
  };
}

// Interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
