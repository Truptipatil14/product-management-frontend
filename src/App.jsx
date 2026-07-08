import { Routes, Route } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <Routes>

      {/* DASHBOARD */}
      <Route
        path="/"
        element={
          <DashboardLayout>
            <Dashboard />
          </DashboardLayout>
        }
      />

      {/* PRODUCTS LIST */}
      <Route
        path="/products"
        element={
          <DashboardLayout>
            <Products />
          </DashboardLayout>
        }
      />

      {/* ADD PRODUCT */}
      <Route
        path="/add-product"
        element={
          <DashboardLayout>
            <AddProduct />
          </DashboardLayout>
        }
      />

      {/* EDIT PRODUCT */}
      <Route
        path="/edit-product/:id"
        element={
          <DashboardLayout>
            <EditProduct />
          </DashboardLayout>
        }
      />

      {/* PRODUCT DETAILS */}
      <Route
        path="/product/:id"
        element={
          <DashboardLayout>
            <ProductDetails />
          </DashboardLayout>
        }
      />

    </Routes>
  );
}

export default App;