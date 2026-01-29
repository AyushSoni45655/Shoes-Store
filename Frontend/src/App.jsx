import React, { lazy, useEffect, useRef } from 'react'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import AppLayOut from './LayOut/AppLayOut';
import Home from './pages/Home';

import PublicRoute from './routes/PublicRoute';

import { useDispatch } from 'react-redux';
import { getProduct } from './redux-store/slices/productSlice';
import ProductDetails from './pages/ProductDetails';
import {toast} from 'react-hot-toast';
import { clearCartMsg } from './redux-store/slices/cartSlice';
import { getCart } from './redux-store/slices/cartSlice';
import { useSelector } from 'react-redux';

import { getWishlists } from './redux-store/slices/wishlistSlice';
import AuthLayOut from './LayOut/AuthLayOut';

const Orders = lazy(()=>import('./pages/Orders'))
const Men = lazy(()=>import('./pages/Men'))
const OtpScreen = lazy(()=>import('./pages/auth/OtpScreen'))
const SetPassword = lazy(()=>import('./pages/auth/SetPassword'))
const ErrorPage = lazy(()=>import('./pages/ErrorPage'))
const Profile = lazy(()=>import('./pages/Profile'))
const Login = lazy(()=>import('./pages/auth/Login'))
const Signup = lazy(()=>import('./pages/auth/Signup'))
const CheckOut = lazy(()=>import('./pages/CheckOut'))
const WishList = lazy(()=>import('./pages/WishList'))
const Arrivals = lazy(()=>import('./pages/Arrivals'))
const Kids = lazy(()=>import('./pages/Kids'))
const Women = lazy(()=>import('./pages/Women'))
const Cart = lazy(()=>import('./pages/Cart'))
const ForgotPassword = lazy(()=>import('./pages/auth/ForgotPassword'))
const App = () => {
  const dispatch = useDispatch();
  const isRef = useRef(false);
    
   const {  error, successMsg } = useSelector(
      (state) => state.cart
    );
  
  useEffect(()=>{
    if(!isRef.current){
dispatch(getProduct());
isRef.current = true;
    }
      
  },[dispatch]);

  

  useEffect(()=>{
    dispatch(getWishlists())
  },[])
   /* Fetch Cart */
        useEffect(() => {
          const token = localStorage.getItem("token");
          if(token){
            dispatch(getCart());
          }
          
        }, [dispatch]);
  
  
    // /* Toast Handling */
     useEffect(() => {
      if (error) {
        toast.error(error);
        dispatch(clearCartMsg());
      }
    
    }, [error, dispatch]);
   
    
  
  const router = createBrowserRouter([
    {
      path:"/",
      errorElement:<ErrorPage/>,
      element:<AppLayOut/>,
      children:[
        {
          path:"/",
          element:<Home/>
        },
        {
          path:"/men",
          element:<Men/>
        },
        {
          path:"/women",
          element:<Women/>
        },
        {
          path:"/kid",
          element:<Kids/>
        },
        {
          path:"/arrival",
          element:<Arrivals/>
        },
         {
          path:"/products/:id",
          element:<ProductDetails/>
        },
        {
          path:"/cart",
          element:<Cart/>
        },
         {
          path:"/checkout",
          element:<CheckOut/>
        },
         {
          path:"/wishlist",
          element:<WishList/>
        },
         {
          path:"/orders",
          element:<Orders/>
        },
         {
          path:"/profile",
          element:<Profile/>
        },
      ]
    },

    {
      element:<AuthLayOut/>,
      children:[
         {
      path:"/signin",
      element:(<PublicRoute>
        <Login/>
      </PublicRoute>)
    },
     {
      path:"/signup",
      element:(<PublicRoute>
         <Signup/>
      </PublicRoute>)
     
    },
     {
      path:"/fPassword",
      element:<ForgotPassword/>
      
    },
    {
      path:"/otpscreen",
      element:<OtpScreen/>
      
    },
    {
      path:"/setPassword",
      element: <SetPassword/>
      
    }
      ]
    }
   
  ])
  return <RouterProvider router={router}/>
}

export default App
