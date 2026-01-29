import React from 'react'
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
const AuthLayOut = () => {
 return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Outlet />
    </Suspense>
  );
}

export default AuthLayOut
