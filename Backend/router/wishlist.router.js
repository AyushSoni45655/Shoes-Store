import {removeWishList,toggleWishList,getWishList} from '../controllars/wishlist.controllar.js'
import express from 'express';
import userAuth from '../middleware/auth.js';
const WishListRouter = express.Router();

WishListRouter.use(userAuth);
WishListRouter.post("/",toggleWishList);
WishListRouter.get("/",getWishList)
WishListRouter.delete("/:id",removeWishList);
export default WishListRouter;