import {Routes,Route} from "react-router-dom"
import { CartProvider } from "./context/CartContext"

import Cart from "./pages/Cart"
import Home from  "./pages/Home"
import NotFound from "./pages/NotFound"
import ProductDetail from "./pages/ProductDetail"
import Shop from "./pages/Shop"
import NavBar from "./components/layout/NavBar"
import './App.css'

export default function   App() {

  return (
    <>
    <CartProvider>
    <NavBar/>
          <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/shop/" element={<Shop/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/shop/:id" element={<ProductDetail/>}/>
                    <Route path="*" element={<NotFound/>}/>
          </Routes>
    </CartProvider>
  
    </>


  )


}
  