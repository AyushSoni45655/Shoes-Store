import CartModel from "../modal/cart.modal.js";
import ProductModel from "../modal/product.modal.js";

const addCart = async (req, res) => {
  try {
    const userId = req.user.id; // JWT middleware se
    const { productId, size, color, quantity } = req.body;

    // Validate fields
    if (!productId || !size || !color || !quantity ) {
      return res.status(400).json({ success: false, msg: "All fields are required" });
    }

    if (typeof size !== "number" || size <= 0) {
      return res.status(400).json({ success: false, msg: "Invalid size" });
    }
  
    if (typeof quantity !== "number" || quantity <= 0) {
      return res.status(400).json({ success: false, msg: "Invalid quantity" });
    }

    if (typeof color !== "string" || color.trim() === "") {
      return res.status(400).json({ success: false, msg: "Invalid color" });
    }
    
    // 2️⃣ Check product exists
    const product = await ProductModel.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ success: false, msg: "Product not available" });
    }

  
    if (quantity > product.stock) {
      return res.status(400).json({ success: false, msg: "Stock not available" });
    }

    // 4️⃣ Check duplicate cart item
    const existingCart = await CartModel.findOne({ userId, productId, size, color });

      if (existingCart) {
      // Update quantity
      if (existingCart.quantity + quantity > product.stock) {
        return res.status(400).json({ success: false, msg: "Stock limit exceeded" });
      }
      existingCart.quantity += quantity;
      await existingCart.save();
      return res.status(200).json({ success: true, msg: "Cart updated", data: existingCart });
    }

     // 5️⃣ Calculate final price snapshot
    const finalPrice = product.oprice - (product.oprice * (product.discount || 0)) / 100;
    const newCart = await CartModel.create({
      userId,
      productId,
      size,
      color,
      quantity,
      price:finalPrice
    });
    
  
    return res.status(201).json({ success: true, msg: "Product added to cart", data: newCart });

  } catch (e) {
    return res.status(500).json({ success: false, msg: e.message });
  }
};
const getCart = async(req,res)=>{
try{
  const userId = req.user.id;
const cart = await CartModel.find({userId}).populate({
  path:"productId",
  select:"images title brand category subCategory _id"
})
 return res.status(200).json({ success: true, msg: cart.length ? 'Item fetched successfully':"No item found" ,carts:cart,cartLength:cart.length});
}catch(e){
 return res.status(500).json({ success: false, msg: e.message });
}
}
const removeCart = async(req,res)=>{
try{
  const {cartId} = req.params;
  if(!cartId){
    return res.status(400).json({ success: false, msg: 'cartId is empty' });
  }
  const cart = await CartModel.findByIdAndDelete(cartId);
  return res.status(cart ? 200 : 404).json({
      success: !!cart,
      msg: cart ? "Cart item deleted successfully" : "Cart item not found",
    });
 
}catch(e){
 return res.status(500).json({ success: false, msg: e.message });
}
}
const updateCart = async(req,res)=>{
try{

}catch(e){

}
}
export {addCart,updateCart,getCart,removeCart}