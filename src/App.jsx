import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetails from "./pages/ProductDetails";

import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoutes";

function App() {
  return (
    <Routes>
      {/* Login */}
      <Route path="/" element={<Login />} />

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
  );
}

export default App;
