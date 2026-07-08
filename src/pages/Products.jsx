import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // NEW STATES (Day 4 features)
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);

  const perPage = 5;

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data.data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  // DELETE PRODUCT
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);

      toast.success("Product Deleted");

      setProducts(products.filter((p) => p._id !== id));
    } catch (error) {
      toast.error("Delete Failed");
    }
  };

  // FILTER LOGIC (Search + Category)
  const filteredProducts = products
    .filter((p) =>
      p.productName.toLowerCase().includes(search.toLowerCase())
    )
    .filter((p) => (category ? p.category === category : true));

  // PAGINATION LOGIC
  const start = (page - 1) * perPage;
  const paginatedProducts = filteredProducts.slice(
    start,
    start + perPage
  );

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>

      <h1 className="text-2xl font-bold mb-4">Products</h1>

      {/* SEARCH + FILTER */}
      <div className="mb-3">

        <input
          type="text"
          placeholder="Search product..."
          className="border p-2 mr-2"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border p-2"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Fashion">Fashion</option>
          <option value="Home">Home</option>
        </select>

      </div>

      {/* TABLE */}
      {paginatedProducts.length === 0 ? (
        <p>No Products Found</p>
      ) : (
        <table className="w-full border border-collapse">

          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Name</th>
              <th className="border p-2">Category</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {paginatedProducts.map((product) => (
              <tr key={product._id}>

                <td className="border p-2">
                  {product.productName}
                </td>

                <td className="border p-2">
                  {product.category}
                </td>

                <td className="border p-2">
                  ₹{product.price}
                </td>

                <td className="border p-2">
                  {product.stock}
                </td>

                <td className="border p-2">

                  {/* EDIT */}
                  <Link to={`/edit-product/${product._id}`}>
                    <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2">
                      Edit
                    </button>
                  </Link>

                  {/* DELETE */}
                  <button
                    onClick={() => deleteProduct(product._id)}
                    className="bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>

                </td>

              </tr>
            ))}
          </tbody>

        </table>
      )}

      {/* PAGINATION */}
      <div className="mt-4">

        <button
          className="border px-3 py-1 mr-2"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Prev
        </button>

        <button
          className="border px-3 py-1"
          disabled={start + perPage >= filteredProducts.length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>

      </div>

    </div>
  );
}

export default Products;