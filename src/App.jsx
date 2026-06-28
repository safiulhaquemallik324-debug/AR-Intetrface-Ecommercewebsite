import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Cart from "./Pages/Cart";
import ProductDetails from "./Pages/ProductDetails";
import Wishlist from "./Pages/Wishlist";
import ARViewer from "./Pages/ARViewer";
import About from "./Pages/About";
import Category from "./Pages/Category";
import Offers from "./Pages/Offers";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/ar-viewer" element={<ARViewer />} />
      <Route path="/about" element={<About />} />
      <Route path="/category" element={<Category/>}/>

<Route path="/offers" element={<Offers />} />
    </Routes>
  );
}

export default App;