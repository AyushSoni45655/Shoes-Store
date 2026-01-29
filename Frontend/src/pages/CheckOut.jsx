import React, { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getCart } from "../redux-store/slices/cartSlice";
import { FaCircleCheck } from "react-icons/fa6";
import { SiRazorpay } from "react-icons/si";
import { MdPayment } from "react-icons/md";
import {toast} from 'react-hot-toast';
import { createOrder } from "../redux-store/slices/orderSlice";
import { clearOrderMsg } from "../redux-store/slices/orderSlice";
const CheckOut = () => {
  const naviagte = useNavigate();

  const {error,successMsg,loading} = useSelector((state)=>state.order);

  const paymentMethods = [
    { id: "cod", name: "COD", icon: MdPayment },
    { id: "razorpay", name: "RAZORPAY", icon: SiRazorpay },
  ];

  const [cPMethod, setcPMethod] = useState('COD');
  console.log('cjdj',cPMethod);
  
  const [checkOutProduct, setCheckoutProducts] = useState([]);

  const dispatch = useDispatch();
  const { state } = useLocation();
  const source = state?.source;

  const { cartData } = useSelector((state) => state.cart);

  useEffect(() => {
    if (source === "Cart") dispatch(getCart());
  }, [dispatch, source]);

  useEffect(() => {
    if (source === "Buy Now" && state?.product) {
      setCheckoutProducts([state.product]);
    }
  }, [state, source]);

  useEffect(() => {
    if (source === "Cart" && cartData?.length) {
      setCheckoutProducts(cartData);
    }
  }, [cartData, source]);

  /* normalize data */
  const data = useMemo(() => {
    return checkOutProduct.map((item) => ({
      productId:source === "Cart"?item?.productId?._id:item._id,
      image: source === "Cart" ? item?.productId?.images?.[0] : item?.images?.[0],
      title: source === "Cart" ? item?.productId?.title : item?.title,
      size: source === "Cart" ? item?.size : item?.selectedSize,
      color: source === "Cart" ? item?.color : item?.selectedColor,
      quantity: item?.quantity || 1,
      price: item?.price || 0,
      discount:
        source === "Cart" ? item?.productId?.discount || 0 : item?.discount || 0,
    }));
  }, [checkOutProduct, source]);

  const totalPrice = useMemo(() => {
    return data.reduce((acc, item) => {
      const finalPrice =
        item.price - (item.price * item.discount) / 100;
      return acc + finalPrice * item.quantity;
    }, 0);
  }, [data]);

  const [shippingAddress, setshippingAddress] = useState({
    email:"",
    firstName:"",
    lastName:"",
    phone:"",
    address:"",
    state:"",
    country:"",
    pincode:""
  });
  const shippingOnChanger = (e)=>{
    const {name,value} = e.target;
    setshippingAddress((prev)=>({...prev,[name]:value}))
  }
  
  const onSubmitter = (e)=>{

    e.preventDefault();
    if(typeof shippingAddress !== 'object' || !shippingAddress){
      return toast.error('enter all input fields');
    }
    if(!cPMethod){
      return toast.error('Enter payment method')
    }
     const obj = {
      orderId:`ORD-${Date.now()}`,
      orderFrom:source,
      paymentMethod:cPMethod,
      totalAmount:totalPrice + 10,
      shippingAddress,
      products:data
    };

    dispatch(createOrder(obj))
    .unwrap()
    .then(() => {
      naviagte("/orders"); // ✅ only after order success
    })
    .catch((err) => toast.error(err?.msg || "Order failed"));
    console.log('my shipping address',shippingAddress);
  }
  
useEffect(()=>{
  if(error){
    toast.error(error);
    dispatch(clearOrderMsg());
  }
  if(successMsg){
    toast.success(successMsg);
    dispatch(clearOrderMsg());
  }
},[error,successMsg,dispatch])
  

  return (
    <form onSubmit={onSubmitter} className="w-full min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-6">

        {/* PRODUCTS */}
        <div className="flex-1 bg-white rounded-lg shadow p-4">
          <h2 className="font-bold text-lg mb-4">
            1. Review Your Order ({data.length} Items)
          </h2>

          {data.map((item, id) => (
            <div
              key={id}
              className="flex gap-4 py-4 border-b last:border-none"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-20 h-16 rounded-md object-cover"
              />
              <div className="flex flex-col gap-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-gray-500">Color: {item.color}</p>
                <p className="text-sm text-gray-500">Size: {item.size}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm text-gray-500">
                    Qty: {item.quantity}
                  </span>
                  <span className="font-semibold">${item.price}</span>
                </div>
              </div>
            </div>
          ))}

          <div className="mt-4 flex justify-between font-semibold">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {/* ADDRESS */}
        <div className="flex-1 bg-white rounded-lg shadow p-4">
          <h2 className="font-bold mb-2">2. Delivery Address</h2>
          <p className="text-sm text-gray-500 mb-4">All fields required</p>

          {[
            "email",
            "firstName",
            "lastName",
            "phone",
            "address",
            "state",
            "country",
            "pincode",
          ].map((label) => (
            <div key={label} className="mb-3">
              <label className="text-sm font-semibold">{label} *</label>
              <input
                type="text"
                value={shippingAddress[label]}
                onChange={shippingOnChanger}
                placeholder={label}
                id={`${label}`}
                name={`${label}`}
                className="w-full h-10 border rounded-md px-3 mt-1 focus:ring-2 focus:ring-orange-400 outline-none"
              />
            </div>
          ))}
        </div>

        {/* PAYMENT + SUMMARY */}
        <div className="w-full lg:w-[380px] flex flex-col gap-4">

          {/* PAYMENT */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-bold mb-3">3. Payment Method</h2>
            {paymentMethods.map((item) => {
              const Icon = item.icon;
              const active = cPMethod === item.name;

              return (
                <div
                  key={item.id}
                  onClick={() => setcPMethod(item?.name)}
                  className={`flex items-center gap-3 p-3 mb-2 border rounded-md cursor-pointer
                    ${active ? "border-orange-500 bg-orange-50" : "border-gray-300"}`}
                >
                  <Icon size={20} />
                  <span className="font-medium text-sm">{item.name}</span>
                  {active && (
                    <FaCircleCheck className="ml-auto text-orange-500" />
                  )}
                </div>
              );
            })}
          </div>

          {/* SUMMARY */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="font-bold mb-3">Order Summary</h2>
            {data.map((item, i) => (
              <div key={i} className="flex justify-between text-sm mb-1">
                <span>{item.quantity} × {item.title}</span>
                <span>${item.price}</span>
              </div>
            ))}
            <div className="flex justify-between ">
              <span className="font-sm text-sm text-gray-400">Sales Tax</span>
              <span>${(10).toFixed(2)}</span>
            </div>
            <hr className="my-3" />

            <div className="flex justify-between font-semibold">
              <span>Total</span>
              <span>${(totalPrice + 10).toFixed(2)}</span>
            </div>
          </div>

          <button className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-md font-semibold">
           {loading ? 'Processing':"Complete Order"}
          </button>

          <p className="text-xs text-gray-400">
            By placing an order you agree to our{" "}
            <span className="text-orange-500 underline">Privacy Policy</span>
          </p>
        </div>
      </div>
    </form>
  );
};

export default CheckOut;
