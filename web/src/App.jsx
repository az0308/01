import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Home from "./Pages/Home";
import Home2 from "./Pages/Home2";
import Menu from "./Pages/Menu";
import Cart from "./Pages/Cart";
import OrderHistory from "./Pages/OrderHistory";
import User from "./Pages/User";
import Flv from "./Pages/Flv";
import Flv2 from "./Pages/Flv2";
import Flv3 from "./Pages/Flv3";
import BreakfastDetail from "./Pages/BreakfastDetail";
import Checkout from "./Pages/Checkout";
import AdminLogin from "./Pages/AdminLogin";
import ShopLogin from "./Pages/ShopLogin";
import OrderConfirm from "./Pages/OrderConfirm";
import AdminBackstage from "./Pages/AdminBackstage";

function App() {
    return (
        <div>
            <Router>
                <Routes>
                    <Route path="/" element={<Navigate to="/home" />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/home2" element={<Home2 />} />
                    <Route path="/flv" element={<Flv />} />
                    <Route path="/flv2" element={<Flv2 />} />
                    <Route path="/flv3" element={<Flv3 />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/history" element={<OrderHistory />} />
                    <Route path="/user" element={<User />} />
                    <Route path="/order/detail" element={<BreakfastDetail />} />
                    <Route path="/checkout" element={<Checkout />} />
                    <Route path="/auth/admin" element={<AdminLogin />} />
                    <Route path="/auth/admin/backstage" element={<AdminBackstage />} />
                    <Route path="/auth/shop" element={<ShopLogin />} />
                    <Route path="/auth/shop/order" element={<OrderConfirm />} />
                    <Route path="*" element={<Navigate to="/home" />} />
                </Routes>
            </Router>
        </div>
    );
}



export default App;