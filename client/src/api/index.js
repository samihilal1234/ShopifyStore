import axios from 'axios';

//const API = axios.create({ baseURL: 'https://shopify-store-project.herokuapp.com' });
const API = axios.create({ baseURL: 'http://localhost:5000' });


export const fetchProducts = () => API.get('/products')
export const createProducts = (newProduct) => API.post('/products', newProduct);
export const updateProducts = (id, updatedProduct) => API.patch(`/products/${id}`, updatedProduct);
export const deleteProducts = (id) => API.delete(`/products/${id}`);
export const fetchProductsBySearch = (searchQuery) => API.get(`/products/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`);