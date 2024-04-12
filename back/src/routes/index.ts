const { Router } = require('express');
const myProducts = require('@/controllers/products');

const router = Router();

router.get('/products/:id?', myProducts.getProducts);
router.post('/products', myProducts.createProduct);
router.put('/products/:id', myProducts.updateProduct);
router.delete('/products/:id', myProducts.deleteProduct);

module.exports = router;
