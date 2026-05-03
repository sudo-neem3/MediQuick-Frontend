import API from './axiosInstance';

export const placeOrder = (data) => API.post('/orders', data);
export const getMyOrders = () => API.get('/orders/my');
export const getPharmacyOrders = () => API.get('/orders/pharmacy');
export const getAllOrders = () => API.get('/orders/admin');
export const updateOrderStatus = (id, status) => API.put(`/orders/${id}/status`, { status });
