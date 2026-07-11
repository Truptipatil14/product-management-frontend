import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetails from "./pages/ProductDetails";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />

        {/* Signup */}
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Products */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Products />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Add Product */}
        <Route
          path="/add-product"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <AddProduct />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Edit Product */}
        <Route
          path="/edit-product/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <EditProduct />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Product Details */}
        <Route
          path="/product/:id"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProductDetails />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
