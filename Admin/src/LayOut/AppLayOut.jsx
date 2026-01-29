// import React from 'react'
// import SideBar from './UI/SideBar'
// import {Outlet} from 'react-router-dom'
// import Header from './UI/Header'
// import { useSelector } from 'react-redux'
// const AppLayOut = () => {
//     const isOpen = useSelector((state)=>state.user.isSidebar);
//     console.log('my open',isOpen);
//   return (
//     <div className={`min-h-screen w-full flex ${isOpen ? "flex-row":"flex-col"}`}>
//      {/* sidebar here */}
//      <div className={`${isOpen ? 'block':"hidden"}`}>
//       <SideBar/>
//      </div>
//      {/* navbar and outlet here */}
//      {
//       isOpen ? (<div className='flex flex-col flex-1'>
//           <Header/>
//      <Outlet/>
//       </div>):(<>
//       <Header/>
//      <Outlet/>
//      </>)
//      }
    
    
    
//     </div>
//   )
// }

// export default AppLayOut



import React, { Suspense } from "react";
import SideBar from "./UI/SideBar";
import Header from "./UI/Header";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const AppLayOut = () => {
  const isOpen = useSelector((state) => state.user.isSidebar);

  return (
    <div className={`min-h-screen relative w-full flex ${isOpen ? "flex-row" : "flex-col"}`}>
      
      {/* Sidebar */}
      <div className={` absolute left-0 ${isOpen ? "block" : "hidden"}`}>
        <SideBar />
      </div>

      {/* Header + Content */}
      <div className={isOpen ? "flex flex-col flex-1" : ""}>
        <Header />
       <Suspense fallback={`Loading....`}>
         <Outlet />
       </Suspense>
      </div>

    </div>
  );
};

export default AppLayOut;
