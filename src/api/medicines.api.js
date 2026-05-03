import API from './axiosInstance';

export const getMedicines = (params) => API.get('/medicines', { params });
export const getMedicineById = (id) => API.get(`/medicines/${id}`);
export const addMedicine = (data) => API.post('/medicines', data);
export const updateMedicine = (id, data) => API.put(`/medicines/${id}`, data);
export const deleteMedicine = (id) => API.delete(`/medicines/${id}`);
