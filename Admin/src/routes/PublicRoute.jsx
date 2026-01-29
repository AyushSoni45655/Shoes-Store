import React, { useEffect } from 'react'
import {useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
const PublicRoute = ({children}) => {
  const navigator = useNavigate();
  const token = useSelector((state)=>state.user.token);
  useEffect(()=>{
    if(token)navigator("/admin",{replace:true})
  },[token,navigator]);
if(token){
  return null;
}
return children

  
}

export default PublicRoute
