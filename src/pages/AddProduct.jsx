import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function AddProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    productName: "",
    category: "",
    brand: "",
    price: "",
    discount: "",
    stock: "",
    description: "",
    status: "Active",
    image: ""
  });

  // input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // image upload
  const handleImage = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/products/upload",
        formData
      );

      setForm({ ...form, image: res.data.image });

      toast.success("Image uploaded");
    } catch (err) {
      toast.error("Image upload failed");
    }
  };

  // submit product
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.productName || !form.category || !form.price) {
      toast.error("Required fields missing");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/products",
        form
      );

      toast.success("Product added successfully");

      navigate("/products");
    } catch (err) {
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">

        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="text"
          name="brand"
          placeholder="Brand"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="number"
          name="discount"
          placeholder="Discount"
          onChange={handleChange}
          className="border p-2"
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          onChange={handleChange}
          className="border p-2"
        />

        <textarea
          name="description"
          placeholder="Description"
          onChange={handleChange}
          className="border p-2"
        />

        {/* IMAGE */}
        <input
          type="file"
          onChange={handleImage}
          className="border p-2"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 rounded"
        >
          Add Product
        </button>

      </form>
    </div>
  );
}

const handleSubmit = async (e) => {
  e.preventDefault();

  console.log("🔥 FORM SUBMIT WORKING");

  try {
    const res = await axios.post(
      "http://localhost:5000/api/products",
      form
    );

    console.log(res.data);

    alert("Product Added");
  } catch (err) {
    console.log(err);
    alert("Error");
  }
};
export default AddProduct;