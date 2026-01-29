import express from 'express';
const OrderRouter = express.Router();
import userAuth, {  userAdminAuth } from '../middleware/auth.js'
import {createOrder, verifyRazorpayPayment,getOrders,getAdminOrders,cancelOrder,deleteOrder,statusChager} from '../controllars/order.controllers.js'

OrderRouter.post("/create",userAuth,createOrder);
OrderRouter.get("/",userAuth,getOrders);
OrderRouter.get("/admin",userAdminAuth,getAdminOrders);
OrderRouter.post("/verify",userAuth,verifyRazorpayPayment);
OrderRouter.post("/cancel",userAuth,cancelOrder);
OrderRouter.delete("/:id",userAdminAuth,deleteOrder);
OrderRouter.post("/status",userAdminAuth,statusChager);
export default OrderRouter;