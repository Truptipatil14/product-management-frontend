import { NavLink } from "react-router-dom";
import { FaTachometerAlt, FaBox, FaPlus } from "react-icons/fa";

function Sidebar() {
  return (
    <div className="w-64 min-h-screen bg-gray-900 text-white p-5">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <nav className="flex flex-col gap-4">

        {/* Dashboard */}
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 text-yellow-400"
              : "flex items-center gap-2 hover:text-yellow-400"
          }
        >
          <FaTachometerAlt />
          Dashboard
        </NavLink>

        {/* Products */}
        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 text-yellow-400"
              : "flex items-center gap-2 hover:text-yellow-400"
          }
        >
          <FaBox />
          Products
        </NavLink>

        {/* Add Product */}
        <NavLink
          to="/add-product"
          className={({ isActive }) =>
            isActive
              ? "flex items-center gap-2 text-yellow-400"
              : "flex items-center gap-2 hover:text-yellow-400"
          }
        >
          <FaPlus />
          Add Product
        </NavLink>

      </nav>
    </div>
  );
}

export default Sidebar;