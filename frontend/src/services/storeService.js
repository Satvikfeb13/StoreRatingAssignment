import api from '../api/axios';

export const storeService = {
  getStores: async () => {
    const response = await api.get('/stores');
    return response.data;
  },

  submitRating: async (ratingData) => {
    const response = await api.post('/ratings', ratingData);
    return response.data;
  },

  updateRating: async (ratingId, ratingData) => {
    const response = await api.put(`/ratings/${ratingId}`, ratingData);
    return response.data;
  }
};
