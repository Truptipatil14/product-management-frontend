import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/api/products";

// Helper to build auth headers with the saved token
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// Get all products (public, no token needed)
export const getProducts = async () => {
  return await axios.get(API_URL);
};

// Get single product (public, no token needed)
export const getProductById = async (id) => {
  return await axios.get(`${API_URL}/${id}`);
};

// Add product (protected)
export const addProduct = async (productData) => {
  return await axios.post(API_URL, productData, getAuthHeaders());
};

// Update product (protected)
export const updateProduct = async (id, productData) => {
  return await axios.put(`${API_URL}/${id}`, productData, getAuthHeaders());
};

// Delete product (protected)
export const deleteProduct = async (id) => {
  return await axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};
