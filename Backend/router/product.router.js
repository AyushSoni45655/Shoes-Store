import express from 'express';
const ProductRoutar = express.Router();
import {listProduct,addProduct,editProduct,deleteProduct} from '../controllars/product.controllar.js'
import userAuth from '../middleware/auth.js';
import upload from '../middleware/multur.js';

// routes here

ProductRoutar.post('/add',userAuth,upload.array('images',4),addProduct);
ProductRoutar.get('/list',listProduct);
ProductRoutar.post("/edit",userAuth,editProduct);
ProductRoutar.post("/delete",userAuth,deleteProduct)

export default ProductRoutar;