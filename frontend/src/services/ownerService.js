import api from '../api/axios';

export const ownerService = {
  getDashboardStats: async () => {
    const response = await api.get('/owner/dashboard');
    return response.data;
  },

  getRatings: async () => {
    const response = await api.get('/owner/ratings');
    return response.data;
  }
};
