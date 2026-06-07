import api from '../api/axios';

export const adminService = {
  getDashboardStats: async () => {
    const response = await api.get('/admin/dashboard');
    return response.data;
  },
  
  getUsers: async () => {
    const response = await api.get('/admin/users');
    return response.data;
  },

  getStores: async () => {
    const response = await api.get('/admin/stores');
    return response.data;
  },

  addUser: async (userData) => {
    const response = await api.post('/admin/users', userData);
    return response.data;
  },

  addStore: async (storeData) => {
    const response = await api.post('/admin/stores', storeData);
    return response.data;
  }
};
