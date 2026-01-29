

import fs from 'fs';
import imagekitt from '../config/imagekits.js';
import ProductModel from '../modal/product.modal.js';

const addProduct = async (req, res) => {
  try {
    const images = req.files;
    
    
    const {
      stock,
      title,
      description,
      sizes,
      colors,
      category,
      brand,
      subCategory,
      price,
      oprice,          // ✅ FIXED
      discount,
      isActive,
      isFeature,
      bestSellar,
      isNewArrival,
      isTrending
    } = req.body;

    // 1️⃣ Images
    if (!images || images.length === 0) {
      return res.status(400).json({ success: false, msg: "Images missing" });
    }

    // 2️⃣ Required text
    if (!title || !description || !brand || !category || !subCategory) {
      return res.status(400).json({ success: false, msg: "Required fields missing" });
    }

    // 3️⃣ Numbers
    const parsedStock = Number(stock);
    const parsedPrice = Number(price);
    const parsedOPrice = Number(oprice);
    const parsedDiscount = Number(discount);

    if ([parsedStock, parsedPrice, parsedOPrice, parsedDiscount].some(isNaN)) {
      return res.status(400).json({
        success: false,
        msg: "Stock, price, oPrice, discount must be numbers"
      });
    }

    // 4️⃣ Arrays
    let parsedSizes = [];
    let parsedColors = [];

    try {
      parsedSizes = sizes ? JSON.parse(sizes) : [];
      parsedColors = colors ? JSON.parse(colors) : [];
    } catch {
      return res.status(400).json({
        success: false,
        msg: "Sizes or colors format invalid"
      });
    }

    // 5️⃣ Booleans
    const parsedIsActive = isActive === "true";
    const parsedIsFeature = isFeature === "true";
    const parsedBestSellar = bestSellar === "true";
    const parsedIsNewArrival = isNewArrival === "true";
    const parsedIsTrending = isTrending === "true";

    // 6️⃣ Upload images (already correct)
    const uploadedImages = [];

    for (const item of images) {
      const buffer = fs.readFileSync(item.path);

      const upload = await imagekitt.upload({
        file: buffer,
        fileName: item.originalname,
        folder: "/shoes",
      });

      const optimizedUrl = imagekitt.url({
        path: upload.filePath,
        transformation: [{ quality: "auto" }, { width: "1280" }, { format: "webp" }],
      });

      uploadedImages.push(optimizedUrl);
      fs.unlinkSync(item.path);
    }

    // 7️⃣ Save DB
    const product = await ProductModel.create({
      images: uploadedImages,
      title,
      description,
      price: parsedPrice,
      oprice: parsedOPrice,   // ✅ FIXED
      discount: parsedDiscount,
      brand,
      category,
      subCategory,
      sizes: parsedSizes,
      colors: parsedColors,
      stock: parsedStock,
      isActive: parsedIsActive,
      isFeature: parsedIsFeature,
      bestSellar: parsedBestSellar,
      isNewArrival: parsedIsNewArrival,
      isTrending: parsedIsTrending,
    });

    return res.status(201).json({
      success: true,
      msg: "Product added successfully",
      product
    });

  } catch (error) {
    
    res.status(500).json({ success: false, msg: "Server error" });
  }
};
const listProduct = async (req, res) => {
  try {
    const products = await ProductModel.find({});

    return res.status(200).json({
      success: true,
      message: products.length ? "Products fetched successfully" : "No products available",
      products,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


const editProduct = async (req, res) => {
  try {
    const {
      id,
      title,
      description,
      isActive,
      isFeature,
      isNewArrival,
      isTrending,
      bestSellar,
      stock,
      colors,
      sizes,
      brand,
      subCategory,
      discount,
      oprice,
      price
    } = req.body;

    // 1️⃣ ID check
    if (!id) {
      return res.status(400).json({ success: false, msg: "Product ID is missing" });
    }

    // 2️⃣ Required fields
    if (!title || !description || !brand || !subCategory) {
      return res.status(400).json({
        success: false,
        msg: "Title, description, brand, subCategory are required"
      });
    }

    // 3️⃣ Number validation
    if (
      isNaN(stock) ||
      isNaN(price) ||
      isNaN(oprice) ||
      isNaN(discount)
    ) {
      return res.status(400).json({
        success: false,
        msg: "Stock, price, oprice, discount must be numbers"
      });
    }

    // 4️⃣ Array validation
    if (!Array.isArray(sizes) || !Array.isArray(colors)) {
      return res.status(400).json({
        success: false,
        msg: "Sizes and colors must be arrays"
      });
    }

    // 5️⃣ Update product
    const updatedProduct = await ProductModel.findByIdAndUpdate(
      id,
      {
        title,
        description,
        brand,
        subCategory,

        isActive,
        isFeature,
        bestSellar,
        isNewArrival,
        isTrending,

        sizes,
        colors,
        stock,
        price,
        oprice,
        discount,
      },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        msg: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      msg: "Product updated successfully",
      product: updatedProduct
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      msg: "Internal server error"
    });
  }
};

const deleteProduct = async(req,res)=>{
try{
const id = req.body.id;
if(!id){
  return res.status(400).json({success:false,msg:"Id is empty"});
}
const deletedProduct = await ProductModel.findByIdAndDelete(id);
if(!deletedProduct){
  return res.status(404).json({success:false,msg:"No product found"});
}
  return res.status(200).json({
      success: true,
      msg: "Product deleted successfully",
      product: deletedProduct
    });

}catch(e){
  console.log(e);
  
 return res.status(500).json({
      success: false,
      msg: "Internal server error"
    });
}
}
export {listProduct,addProduct,editProduct,deleteProduct} 