import axios from "axios";

const BASE_URL = "http://localhost:8080/api";

export const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  console.log(response);
  
  return response.data;
};

export const addUser = async (userData) => {
  const response = await axios.post(`${BASE_URL}/users`, userData);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await axios.put(`${BASE_URL}/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await axios.delete(`${BASE_URL}/users/${id}`);
  return response.data;
};
