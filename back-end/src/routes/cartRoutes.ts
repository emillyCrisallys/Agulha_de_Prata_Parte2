import express from "express";
import {
  getAll,
  getCartById,
  addToCart,
  removeFromCart,
  updateCartItem,
  removeAllFromCart,
} from "../controllers/cartController";
import { authMiddleware } from "../middleware/authMiddleware";
import { authFull } from "../middleware/authFull";

const router = express.Router();

router.get("/cart", getAll);
//router.get('/cart/:id',getCartByUserId)
router.get("/cart/:userId", getCartById);
router.post("/cart", authMiddleware, addToCart);
router.put("/cart/:id", updateCartItem);
router.delete("/cart/:id", removeFromCart);
router.delete("/cart/user/:userId", authFull, removeAllFromCart);

export default router;
