import express from 'express';
import {getAll, getInventoryByProductId,updateInventory,createInventory,deleteInventory } from '../controllers/inventoryController'



const router = express.Router();


router.get('/inventory',getAll)
router.get('/inventory/:id',getInventoryByProductId)
router.put('/inventory/:id',updateInventory) 
router.post('/inventory',createInventory)   
router.delete('/inventory/:id',deleteInventory)
router.get("/inventory/product/:id", getInventoryByProductId);


export default router;