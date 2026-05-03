import API from './axiosInstance';

export const getAllUsers = () => API.get('/admin/users');
export const getAllPharmacies = () => API.get('/admin/pharmacies');
export const approvePharmacy = (id) => API.put(`/admin/pharmacies/${id}/approve`);
export const deleteUser = (id) => API.delete(`/admin/users/${id}`);
export const getAdminStats = () => API.get('/admin/stats');
