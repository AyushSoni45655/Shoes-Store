import express from 'express';
import { addCart, updateCart, getCart, removeCart } from '../controllars/cart.controller.js';
import userAuth from '../middleware/auth.js';

const CartRouter = express.Router();

// 🔐 Protect all cart routes // middleware
CartRouter.use(userAuth);

// all routes here

CartRouter.post('/', addCart);

CartRouter.get('/', getCart);


CartRouter.put('/', updateCart);

CartRouter.delete('/:cartId', removeCart);

export default CartRouter;
