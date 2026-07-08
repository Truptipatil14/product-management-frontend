import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";

function Products() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await getProducts();
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-5">Products</h1>

      {products.length === 0 ? (
        <p>No Products Found</p>
      ) : (
        products.map((product) => (
          <div
            key={product._id}
            className="border p-4 rounded-lg mb-3 bg-white"
          >
            <h2>{product.productName}</h2>
            <p>Category: {product.category}</p>
            <p>Price: ₹{product.price}</p>
            <p>Stock: {product.stock}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Products;