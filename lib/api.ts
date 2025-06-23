import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests if available
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (credentials: { email: string; password: string }) =>
    api.post('/auth/login', credentials),
  
  getCurrentUser: () =>
    api.get('/auth/me'),
};

export const registrationAPI = {
  create: (data: any) =>
    api.post('/registrations', data),
  
  getAll: () =>
    api.get('/registrations'),
  
  getById: (id: string) =>
    api.get(`/registrations/${id}`),
  
  update: (id: string, data: any) =>
    api.put(`/registrations/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/registrations/${id}`),
};

export const settingsAPI = {
  get: () =>
    api.get('/settings'),
  
  update: (data: any) =>
    api.put('/settings', data),
};

export const referralAPI = {
  getAll: () =>
    api.get('/referrals'),
  
  create: (data: { code: string; discountPercentage?: number }) =>
    api.post('/referrals', data),
  
  validate: (code: string) =>
    api.get(`/referrals/validate/${code}`),
  
  update: (id: string, data: { discountPercentage: number }) =>
    api.put(`/referrals/${id}`, data),
  
  delete: (id: string) =>
    api.delete(`/referrals/${id}`),
};

export default api;