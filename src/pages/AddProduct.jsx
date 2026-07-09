import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

function AddProduct() {
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL;

  const [form, setForm] = useState({
    productName: "",
    category: "",
    brand: "",
    price: "",
    discount: "",
    stock: "",
    description: "",
    status: "Active",
    image: "",
  });

  // Input change
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  // Image upload
  const handleImage = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(
        `${API_URL}/api/products/upload`,
        formData
      );

      setForm({
        ...form,
        image: res.data.image,
      });

      toast.success("Image uploaded successfully");

    } catch (error) {
      console.log(error);
      toast.error("Image upload failed");
    }
  };


  // Add Product
const handleSubmit = async (e) => {
  e.preventDefault();

  if (
    !form.productName ||
    !form.category ||
    !form.brand ||
    !form.price ||
    !form.stock ||
    !form.description ||
    !form.image
  ) {
    toast.error("Please fill all required fields");
    return;
  }

  try {
    const productData = {
      ...form,
      finalPrice:
        Number(form.price) -
        (Number(form.price) * Number(form.discount || 0)) / 100,
    };

    await axios.post(`${API_URL}/api/products`, productData);

    toast.success("Product added successfully");
    navigate("/products");
  } catch (error) {
    console.log(error);
    console.log(error.response?.data);
    toast.error(error.response?.data?.message || "Failed to add product");
  }
};


  return (
    <div className="p-5">

      <h2 className="text-xl font-bold mb-4">
        Add Product
      </h2>


      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-3"
      >

        <input
          type="text"
          name="productName"
          placeholder="Product Name"
          value={form.productName}
          onChange={handleChange}
          className="border p-2"
        />


        <input
          type="text"
          name="category"
          placeholder="Category"
          value={form.category}
          onChange={handleChange}
          className="border p-2"
        />


        <input
          type="text"
          name="brand"
          placeholder="Brand"
          value={form.brand}
          onChange={handleChange}
          className="border p-2"
        />


        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
          className="border p-2"
        />


        <input
          type="number"
          name="discount"
          placeholder="Discount"
          value={form.discount}
          onChange={handleChange}
          className="border p-2"
        />


        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="border p-2"
        />


        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          className="border p-2"
        />


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

export default AddProduct;