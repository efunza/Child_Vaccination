// src/api/childService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api/children';

export const getChildren = () => axios.get(API_BASE_URL);
export const addChild = (child) => axios.post(API_BASE_URL, child);  // THIS LINE IS CRITICAL
export const updateChild = (child) => axios.put(`${API_BASE_URL}/${child.id}`, child);
export const deleteChild = (id) => axios.delete(`${API_BASE_URL}/${id}`);
