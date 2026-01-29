import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
import connectDB from './config/db.js';
import userRouter from './router/user.router.js';
import ProductRoutar from './router/product.router.js';
import CartRouter from './router/cart.router.js';
import WishListRouter from './router/wishlist.router.js';
import OrderRouter from './router/order.router.js';
dotenv.config();
const app = express();


// middlewares
app.use(express.urlencoded({extended:true}));
app.use(express.json());


// cors commection
const allowUser = [
process.env.FRONTEND_URL,
process.env.ADMIN_URL
]

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowUser.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET','POST','PUT','DELETE','PATCH','OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));




// firstRoute

app.use("/api/user",userRouter);
app.use("/api/product",ProductRoutar)
app.use("/api/product/cart",CartRouter);
app.use("/api/wishlist",WishListRouter)
app.use("/api/order",OrderRouter)
app.use("/",(req,res)=>{
  res.send("Server is connecting👋👋👋👋👋👋👋✅✅")
});

const port = process.env.PORT || 8500;
const startServer = async()=>{
  await connectDB();
  app.listen(port, (err)=>{
    if(err){
      console.log('something ging wrong',err);
    }
    console.log(`server is Running on http://localhost${port}✅✅✅`);
    
  })
}
startServer();