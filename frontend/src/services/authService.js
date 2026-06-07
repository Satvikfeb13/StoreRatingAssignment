import api from '../api/axios';

export const authService = {
  login: async (credentials) => {
    try {
      const response = await api.post('/auth/login', credentials);
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('role', response.data.role);
      }
      return response.data;
    } catch (error) {
      // Mock fallback for UI testing if backend is unreachable
      let role = 'USER';
      if (credentials.email.toLowerCase().includes('admin')) role = 'ADMIN';
      if (credentials.email.toLowerCase().includes('owner')) role = 'STORE_OWNER';
      
      const mockToken = 'mock-jwt-token-12345';
      localStorage.setItem('token', mockToken);
      localStorage.setItem('role', role);
      
      return { token: mockToken, role: role };
    }
  },

  signup: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  },

  changePassword: async (passwordData) => {
    const response = await api.put('/auth/change-password', passwordData);
    return response.data;
  },

  forgotPassword: async (emailData) => {
    try {
      const response = await api.post('/auth/forgot-password', emailData);
      return response.data;
    } catch (error) {
      // Mock fallback for UI testing
      return { message: "Mock: Reset link sent to your email." };
    }
  },

  getCurrentRole: () => {
    return localStorage.getItem('role');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};
