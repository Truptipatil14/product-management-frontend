import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/products";

// Get all products
export const getProducts = async () => {
  return await axios.get(API_URL);
};

// Get single product
export const getProductById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

// Add product
export const addProduct = async (productData) => {
  return await axios.post(API_URL, productData);
};

// Update product
export const updateProduct = async (id, productData) => {
  return await axios.put(`${API_URL}/${id}`, productData);
};

// Delete product
export const deleteProduct = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};