import React, { lazy, useEffect, useRef } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
const AddProduct = lazy(()=>import(`./pages/AddProduct`))
const MenCategory = lazy(()=>import(`./pages/MenCategory`))
const WomanCategory = lazy(()=>import(`./pages/WomanCategory`))
const ListProduct = lazy(()=>import(`./pages/ListProduct`))
const KidCategory = lazy(()=>import(`./pages/KidCategory`))
const Order = lazy(()=>import(`./pages/Order`))
const Profile = lazy(()=>import(`./pages/Profile`))
const Users = lazy(()=>import(`./pages/Users`))
const Inventory = lazy(()=>import(`./pages/Inventory`))
const EditPage = lazy(()=>import(`./pages/EditPage`))
const SignIn = lazy(()=>import(`./pages/auth/SignIn`))
const DashBoard = lazy(()=>import(`./pages/DashBoard`))
import ErrorPage from './pages/ErrorPage'
import AppLayOut from './LayOut/AppLayOut'
import PrivateRoute from './routes/PrivateRoute'
import PublicRoute from './routes/PublicRoute'
import { useSelector,useDispatch } from 'react-redux'
import { getProduct } from './react_redux/slices/productSLice'
import { clearProductMessages } from './react_redux/slices/productSLice'
import { getAOrders } from './react_redux/slices/orderSlice'
import { clearOrderMsg } from './react_redux/slices/orderSlice'
import { getUsers } from './react_redux/slices/userSlice'
import AdminAuthLayOut from './LayOut/AdminAuthLayOut'
const App = () => {
  const dispatch = useDispatch();
  const {users,userLength} = useSelector((state)=>state.user);
   const {oError,oSuccessMsg,oLength} = useSelector((state)=>state.order);
   useEffect(()=>{
    dispatch(getUsers())
   },[])
   useEffect(()=>{
    
    dispatch(getAOrders())
   },[]);
     useEffect(()=>{
    if(oError){
      dispatch(clearOrderMsg())
    }
    if(oSuccessMsg){
      dispatch(clearOrderMsg())
    }
  },[oError,oSuccessMsg,dispatch])
  console.log('my order data is a ',oLength);
  console.log('My Users,length',userLength);
  console.log('All Users',users);
  
  
  
   
  const {data,error,successMsg} = useSelector((state)=>state.product);
const loadedRef = useRef(false);

  
  useEffect(()=>{
    if(!loadedRef.current){
       dispatch(getProduct());
       loadedRef.current = true;
    }
   
  },[])

  useEffect(()=>{
    if(error){
      dispatch(clearProductMessages())
    }
    if(successMsg){
      dispatch(clearProductMessages())
    }
  },[error,successMsg,dispatch])
  console.log('My All Data is a ',data);
  
  const router = createBrowserRouter([
    {
      path:"/",
      errorElement:<ErrorPage/>,
      element:(
        <PrivateRoute>
          <AppLayOut/>
        </PrivateRoute>
      ),
      children:[
        {
          path:"/admin",
          element:<DashBoard/>
        },
        {
          path:"/admin/products/add",
          element:<AddProduct/>
        },
        {
          path:"/admin/products/list",
          element:<ListProduct/>
        },
        {
          path:"/admin/category/men",
          element:<MenCategory/>
        },
        {
          path:"/admin/category/kids",
          element:<KidCategory/>
        },
        {
          path:"/admin/category/women",
          element:<WomanCategory/>
        },
         {
          path:"/admin/orders",
          element:<Order/>
        },
        {
          path:"admin/profile",
          element:<Profile/>
        },
         {
          path:"/admin/users",
          element:<Users/>
        },
        {
          path:"/admin/inventory",
          element:<Inventory/>
        },
         {
          path:`/admin/category/:category/edit/:id`,
          element:<EditPage/>
        }
      ]
    },
    {
      element:<AdminAuthLayOut/>,
      children:[
          {
      path:"/signin",
      element:(<PublicRoute>
        <SignIn/>
      </PublicRoute>)
       }
      ]
    }
  
  ])
  return <RouterProvider router={router}/>
}

export default App
