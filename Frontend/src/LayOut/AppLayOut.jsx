import React from 'react'
import Header from './UI/Header'
import Footer from './UI/Footer'
import { Outlet } from 'react-router-dom'
import { Suspense } from 'react'
const AppLayOut = () => {
  return <>
<Header/>
<Suspense fallback={<h2>Loading....</h2>}>
  <Outlet/>
</Suspense>
<Footer/>
  </>
}

export default AppLayOut
