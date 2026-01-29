import React, { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdAdd } from "react-icons/md";
import { TiMinus } from "react-icons/ti";
import {toast} from 'react-hot-toast';
import { addCart, clearCartMsg } from "../redux-store/slices/cartSlice";

const ProductDetails = () => {
   const dispatch = useDispatch();
  const {loading,error,successMsg} = useSelector((state)=>state.cart);
  
  
    const { id } = useParams();
  const { data } = useSelector((state) => state.product);
const [quantity, setquantity] = useState(1);

  const product = data.find((item) => item._id === id);

  const [thumbnail, setThumbnail] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

 


  // cart data sender handler
  const cartDataSender = ()=>{
    if(!selectedSize || !selectedColor){
      toast.error('select size or color');
      return;
    };
    dispatch(addCart({
      productId:product._id,
    quantity,
    size:selectedSize,
    color:selectedColor
    }));
  }

  // error handling cart here
  useEffect(()=>{
    if(successMsg){
      toast.success(successMsg);
      dispatch(clearCartMsg())
    }
     if(error){
      toast.error(error);
      dispatch(clearCartMsg())
    }
  },[dispatch,error,successMsg])
  

  // quantity increase or decrease handler

  function increase(){
    setquantity((prev)=>prev + 1)
  }
    function decrease(){
      if(quantity > 1){
        setquantity((prev)=>prev - 1)
      }
  }




  useEffect(() => {
    if (product) {
      setThumbnail(product.images[0]);
      // setSelectedColor(product.colors?.[0]);
    }
  }, [product]);

  if (!product) return <p className="text-center mt-10">Loading...</p>;

  const finalPrice = Math.ceil(
    product.oprice - (product.oprice * product.discount) / 100
  );
  const navigate = useNavigate();

const buyNowHandler = () => {
  const token = localStorage.getItem("token");

  // 1️⃣ Login check
  if (!token) {
    toast.error("Checkout ke liye login required hai");
    navigate("/signin", {
      state: { from: "buy-now" } // redirect purpose
    });
    return;
  }

  // 2️⃣ Validation check
  if (!selectedSize || !selectedColor) {
    toast.error("Please select size and color");
    return;
  }

  // 3️⃣ Checkout navigation
  navigate("/checkout", {
    state: {
      source: "Buy Now",
      product: {
        ...product,
        selectedSize,
        selectedColor,
        quantity
      }
    }
  });
};


  return (
    <div className="max-w-7xl mx-auto p-6 grid md:grid-cols-2 gap-14">

      {/* LEFT IMAGE SECTION */}
      <div className="relative">

        {/* Discount Tag */}
        {product.discount > 0 && (
          <span className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 text-sm rounded">
            {product.discount}% OFF
          </span>
        )}

        {/* Main Image */}
        <div className="border rounded-lg p-6 flex justify-center">
          <img
            src={thumbnail}
            alt={product.title}
            className="w-full max-w-md object-contain"
          />
        </div>

        {/* Image Thumbnails BELOW */}
        <div className="flex gap-3 mt-4 justify-center">
          {product.images.map((img, index) => (
            <img
              key={index}
              src={img}
              onClick={() => setThumbnail(img)}
              className={`w-16 h-16 object-cover border rounded cursor-pointer
                ${thumbnail === img ? "border-black" : "border-gray-300"}
              `}
            />
          ))}
        </div>
      </div>

      {/* RIGHT DETAILS SECTION */}
      <div className="space-y-3">

        <h1 className="text-3xl font-semibold">{product.title}</h1>
        <p className="text-gray-600 font-small text-justify">{product.description}</p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {Array(5)
            .fill("")
            .map((_, i) => (
              <FaStar
                key={i}
                className={`${
                  product.rating > i ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          <span className="ml-2 text-sm">({product.rating})</span>
        </div>

        {/* Price */}
        <div>
          <p className="line-through text-gray-400">
            ₹{product.oprice}
          </p>
          <p className="text-3xl font-bold">₹{finalPrice}</p>
        </div>

        {/* COLORS */}
        <div>
          <p className="font-medium mb-2">Select Color</p>
          <div className="flex gap-3">
            {product.colors.map((color, index) => (
              <div
                key={index}
                onClick={() => {
                  setSelectedColor(color);
                 
                }}
                className={`w-9 h-9 rounded-full cursor-pointer border-2 ${selectedColor === color ?'border-blue-700':"border-yellow-400"}  ${color === 'White'?'bg-white':color === 'Red'?"bg-red-600":color === 'Black'?'bg-black':color === 'Brown'?'bg-amber-800':color === 'Grey'?'bg-gray-300':null}`}
                style={{ backgroundColor: color.code }}
                title={color.name}
              />
            ))}
          </div>
        </div>

        {/* SIZES */}
        <div>
          <p className="font-medium mb-2">Select Size</p>
          <div className="flex flex-wrap gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded
                  ${selectedSize === size
                    ? "bg-black text-white"
                    : "hover:border-black"}
                `}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* qunatity here */}
        <h3 className="font-medium text-md text-black tracking-wide">Quantity</h3>
        <div className="w-fit h-9 mb-8 flex items-center justify-center gap-6">
          {/* add button here */}
          <div onClick={increase} className="h-full w-fit p-2 rounded-md flex items-center justify-center border-1 border-black">
            <MdAdd className="h-6 text-blue-500 w-6"/>
          </div>
          {/* count here */}
            <div className="h-full w-fit p-2 rounded-md flex items-center justify-center border-1 border-black">
            <h3 className="h-6 text-center font-bold text-green-500 w-6">{quantity}</h3>
          </div>
          {/* minus button here */}
           <div onClick={decrease} className="h-full w-fit p-2 rounded-md flex items-center justify-center border-1 border-black">
           
            <TiMinus className="h-5 text-blue-500 w-6"/>
          </div>
        </div>

        {/* BUTTON */}
        <button onClick={buyNowHandler} className="w-full bg-red-500 hover:bg-red-600 text-white py-4 rounded text-lg">
          Buy Now
        </button>
        <button onClick={cartDataSender}  className={`w-full border-2 flex font-bold flex-row items-center justify-center gap-4 ${selectedColor && selectedSize ? 'bg-blue-400 border-transparent':"border-black"}   py-4  rounded-lg text-lg`}>
          {loading ? (<h2>processing</h2>):(<h2 className="flex gap-4">Add to <MdOutlineShoppingCart  className="h-7 w-7"/></h2>)}
        </button>
         
      </div>
    </div>
  );
};

export default ProductDetails;
