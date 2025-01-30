import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const register = async (email, password) => {
  return axios.post(`${API_URL}/auth/register`, { email, password });
};

export const login = async (email, password) => {
  return axios.post(`${API_URL}/auth/login`, { email, password });
};

export const getEvents = async (filters = {}) => {
  return axios.get(`${API_URL}/events`, { params: filters });
};

export const getEventById = async (eventId) => {
  return axios.get(`${API_URL}/events/${eventId}`);
};

export const createEvent = async (eventData) => {
  return axios.post(`${API_URL}/events`, eventData);
};

export const updateEvent = async (id, eventData) => {
  return axios.put(`${API_URL}/events/${id}`, eventData);
};

export const deleteEvent = async (id) => {
  return axios.delete(`${API_URL}/events/${id}`);
};
