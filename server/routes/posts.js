import express from 'express';

import { getProducts, createProduct, updateProduct, deleteProduct, getProductsBySearch} from '../controllers/posts.js';
const router = express.Router();

router.get('/', getProducts);
router.post('/', createProduct);
router.patch('/:id', updateProduct); // update based on post id
router.delete('/:id', deleteProduct); // delete based on post id
router.get('/search', getProductsBySearch);

export default router;