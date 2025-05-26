import { defineStore } from 'pinia';
import axios from 'axios';
import api from '@/connectors/api';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as any,
    token: localStorage.getItem('token') || '',
  }),

  getters: {
    isAuthenticated: (state) => Boolean(state.token),
  },

  actions: {
    async login(username: string, password: string) {
      const { data: { data }} = await api.post('/auth/login', { login: username, senha: password });
      const { token } = data;

      this.token = token;
      // this.user = user;
      localStorage.setItem('token', token);

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    },

    async fetchUser() {
      const response = await api.get('/me');
      this.user = response.data;
    },

    logout() {
      this.token = '';
      this.user = null;
      localStorage.removeItem('token');
      delete axios.defaults.headers.common['Authorization'];
    },
  },
});
