import { Outlet } from "react-router-dom"
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Nav from "./component/Nav";
import { setCart } from "./feature/cartSlice";
import Footer from "./component/Footer";





function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    const cartItems = JSON.parse(localStorage.getItem('cart') || '[]');
    dispatch(setCart(cartItems))
},[dispatch])
 
  return (
    <>
   <div className="">
   <Nav></Nav>
    <div className="py-16">
    <Outlet></Outlet>
    </div>
    <div className="">
      <Footer></Footer>
    </div>
   </div>
    </>
  )
}

export default App