import {signIn,signUp,admin,OtpSendHandler,verifyOtpHandler,resetPasswordHandler,getUsers} from '../controllars/user.controllar.js';
import express from 'express';
import { userAdminAuth } from '../middleware/auth.js';

const userRouter = express.Router();

userRouter.post('/signin',signIn);
userRouter.post('/signup',signUp);
userRouter.post('/admin',admin);
userRouter.post('/sendemail',OtpSendHandler);
userRouter.post('/verifyOtp',verifyOtpHandler);
userRouter.post('/resetPassword',resetPasswordHandler);
userRouter.get("/",userAdminAuth,getUsers)

export default userRouter;