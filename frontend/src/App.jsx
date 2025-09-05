import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProductCatalog from "./Pages/ProductCatalog.jsx";
import LoginPage from "./Pages/LoginPage.jsx";
import RegisterPage from "./Pages/RegisterPage.jsx";
import CartPage from "./Pages/CartPage.jsx";
import AdminAddProduct from "./Pages/AdminAddProduct.jsx";
import AdminOrders from "./Pages/AdminOrders.jsx";
import LowStockPage from "./Pages/LowStockPage.jsx";

function App() {
  return (
      <BrowserRouter>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Navigate to="/catalog" />} />
          <Route path="/catalog" element={<ProductCatalog />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/cart" element={<CartPage />} />

          {/* Admin routes */}
          <Route path="/admin/products" element={<AdminAddProduct />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/low-stock" element={<LowStockPage />} />

          {/* Catch-all route */}
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
