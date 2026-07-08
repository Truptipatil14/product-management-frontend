import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    category: "",
    brand: "",
    price: "",
    discount: "",
    stock: "",
    description: ""
  });

  // GET SINGLE PRODUCT
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/products/${id}`
        );

        setForm(res.data);
      } catch (error) {
        toast.error("Failed to fetch product");
      }
    };

    fetchProduct();
  }, [id]);

  // HANDLE INPUT CHANGE
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // UPDATE PRODUCT
  const handleUpdate = async (e) => {
    e.preventDefault();

    // VALIDATION
    if (!form.name || !form.category || !form.price) {
      toast.error("Required fields missing");
      return;
    }

    if (form.price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/products/${id}`,
        form
      );

      toast.success("Product Updated Successfully");
      navigate("/products");
    } catch (error) {
      toast.error("Update Failed");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit Product</h2>

      <form onSubmit={handleUpdate}>

        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Product Name"
        />
        <br />

        <input
          name="category"
          value={form.category}
          onChange={handleChange}
          placeholder="Category"
        />
        <br />

        <input
          name="brand"
          value={form.brand}
          onChange={handleChange}
          placeholder="Brand"
        />
        <br />

        <input
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price"
        />
        <br />

        <input
          name="discount"
          value={form.discount}
          onChange={handleChange}
          placeholder="Discount"
        />
        <br />

        <input
          name="stock"
          value={form.stock}
          onChange={handleChange}
          placeholder="Stock"
        />
        <br />

        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <br />

        <button type="submit">
          Update Product
        </button>

      </form>
    </div>
  );
}

export default EditProduct;