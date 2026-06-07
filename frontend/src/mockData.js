export const mockUsers = [
  { id: 1, name: 'Alice Admin', email: 'admin@test.com', address: '123 Admin Blvd, NY', role: 'ADMIN' },
  { id: 2, name: 'Bob User', email: 'user@test.com', address: '456 User St, CA', role: 'USER' },
  { id: 3, name: 'Charlie Owner', email: 'owner@test.com', address: '789 Owner Ave, TX', role: 'STORE_OWNER' },
  { id: 4, name: 'Diana Prince', email: 'diana@test.com', address: '101 Amazon Way, WA', role: 'USER' },
  { id: 5, name: 'Evan Wright', email: 'evan@test.com', address: '202 Birch Rd, FL', role: 'STORE_OWNER' },
  { id: 6, name: 'Fiona Gallagher', email: 'fiona@test.com', address: '303 South Side, IL', role: 'USER' },
  { id: 7, name: 'George Costanza', email: 'george@test.com', address: '404 Vandelay Ind, NY', role: 'USER' },
];

export const mockStores = [
  { id: 1, storeName: 'Tech Haven', email: 'contact@techhaven.com', address: '100 Silicon Ave, CA', overallRating: 4.5, userSubmittedRating: 4 },
  { id: 2, storeName: 'Book Worms', email: 'hello@bookworms.com', address: '200 Library St, NY', overallRating: 4.8, userSubmittedRating: 0 },
  { id: 3, storeName: 'Fitness Plus', email: 'info@fitnessplus.com', address: '300 Gym Blvd, TX', overallRating: 3.9, userSubmittedRating: 5 },
  { id: 4, storeName: 'Coffee Corner', email: 'brew@coffeecorner.com', address: '400 Bean Dr, WA', overallRating: 4.2, userSubmittedRating: 0 },
  { id: 5, storeName: 'Green Grocers', email: 'fresh@greengrocers.com', address: '500 Market St, FL', overallRating: 4.9, userSubmittedRating: 5 },
];

export const mockOwnerRatings = [
  { id: 1, userName: 'Bob User', email: 'user@test.com', rating: 4 },
  { id: 2, userName: 'Diana Prince', email: 'diana@test.com', rating: 5 },
  { id: 3, userName: 'Frank Castle', email: 'frank@test.com', rating: 3 },
  { id: 4, userName: 'Grace Lee', email: 'grace@test.com', rating: 4 },
  { id: 5, userName: 'Hank Pym', email: 'hank@test.com', rating: 5 },
];

export const mockAdminStats = { totalUsers: 25, totalStores: 12, totalRatings: 156 };
export const mockOwnerStats = { storeName: 'Tech Haven', averageRating: 4.5 };
