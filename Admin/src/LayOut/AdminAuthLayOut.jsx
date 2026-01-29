import React from 'react'
import { Outlet } from "react-router-dom";
import { Suspense } from "react";
const AdminAuthLayOut = () => {
 return (
    <Suspense fallback={<h2>Loading...</h2>}>
      <Outlet />
    </Suspense>
  );
}

export default AdminAuthLayOut
