import { Routes, Route, BrowserRouter } from "react-router-dom";
import HomePage from "./component/HomePage";
import Footer from "./component/Footer";
import NavBar from "./component/NavBar";
import ShopPage from "./component/ShopPage";
import Detail from "./component/Detail";
import SignInPage from "./component/SignInPage";
import CartPage from "./component/CartPage";
import { useSelector } from "react-redux";
import CheckoutPage from "./component/CheckoutPage";
import LiveChat from "./component/LiveChat";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/shop/:type" element={<ShopPage />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/card" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="*" element={<HomePage />} />
      </Routes>
      <Footer />
      <LiveChat />
    </BrowserRouter>
  );
}

export default App;
