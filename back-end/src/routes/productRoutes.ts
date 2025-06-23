import express from 'express';
import {getAll, getProductById,createProduct,updateProduct,destroyProductById} from '../controllers/productController'



const router = express.Router();

router.get('/product',getAll)
router.get('/product/:id',getProductById)
router.post('/product',createProduct)
router.put('/product/:id',updateProduct)
router.delete('/product/:id',destroyProductById)  


export default router;