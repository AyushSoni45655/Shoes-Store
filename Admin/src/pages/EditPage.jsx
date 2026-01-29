import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { editProduct, clearProductMessages } from "../react_redux/slices/productSLice";
import { toast } from "react-hot-toast";

const EditPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();

  const { data, error, successMsg, loading } = useSelector(
    (state) => state.product
  );

  const product = data?.find((item) => item._id === id);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    oprice: "",
    discount: "",
    brand: "",
    subCategory: "",
    sizes: [],
    colors: [],
    stock: "",
    isFeature: false,
    bestSellar: false,
    isNewArrival: false,
    isTrending: false,
    isActive: true,
    images: [],
  });

  /* ================= PREFILL DATA ================= */
  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        oprice: product.oprice || "",
        discount: product.discount || "",
        brand: product.brand || "",
        subCategory: product.subCategory || "",
        sizes: product.sizes?.map(Number) || [],
        colors: product.colors || [],
        stock: product.stock || "",
        isFeature: product.isFeature || false,
        bestSellar: product.bestSellar || false,
        isNewArrival: product.isNewArrival || false,
        isTrending: product.isTrending || false,
        isActive: product.isActive ?? true,
        images: product.images || [],
      });
    }
  }, [product]);



  /* ================= HANDLERS ================= */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleArrayChange = (value, field) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter((v) => v !== value)
        : [...prev[field], value],
    }));
  };



  const handleSubmit = (e) => {
  e.preventDefault();

  const {
    title,
    description,
    price,
    oprice,
    discount,
    brand,
    subCategory,
    sizes,
    colors,
    stock,
  } = formData;

  const fields = {
    title: { value: title, type: "string" },
    description: { value: description, type: "string" },
    brand: { value: brand, type: "string" },
    subCategory: { value: subCategory, type: "string" },
    price: { value: price, type: "number" },
    oPrice: { value: oprice, type: "number" },
    discount: { value: discount, type: "number" },
    stock: { value: stock, type: "number" },
    sizes: { value: sizes, type: "array" },
    colors: { value: colors, type: "array" },
  };

  for (let key in fields) {
    const { value, type } = fields[key];

    if (type === "string" && (!value || value.trim() === "")) {
      toast.error(`Enter ${key}`);
      return;
    }
    if (type === "number" && (value === "" || isNaN(value))) {
      toast.error(`Enter valid ${key}`);
      return;
    }
    if (type === "array" && value.length === 0) {
      toast.error(`Select ${key}`);
      return;
    }
  }

  let data = {...formData,id}
  delete data.images
  dispatch(editProduct(data));
};

  /* ================= TOAST ================= */
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearProductMessages());
    }
    if (successMsg) {
      toast.success(successMsg);
      dispatch(clearProductMessages());
      navigate(-1);
    }
  }, [error, successMsg, dispatch, navigate]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (!product) return <p className="p-6">Product not found</p>;

  const flagLabels = {
    isFeature: "Featured",
    bestSellar: "Best Seller",
    isNewArrival: "New Arrival",
    isTrending: "Trending",
    isActive: "Active",
  };

  /* ================= UI ================= */
  return (
    <div className="p-6 bg-slate-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">
        Edit Product – {product.title}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-xl shadow space-y-6"
      >
        {/* Images */}
        <div>
          <h3 className="font-semibold mb-2">Images</h3>
          <div className="flex gap-3">
            {formData.images.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="product"
                className="w-20 h-20 rounded object-cover"
              />
            ))}
          </div>
        </div>

        {/* Title */}
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Product Title"
          className="w-full border rounded-lg px-3 py-2"
        />

        {/* Description */}
        <textarea
          name="description"
          rows="4"
          value={formData.description}
          onChange={handleChange}
          placeholder="Product Description"
          className="w-full border rounded-lg px-3 py-2"
        />

        {/* Price */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            name="price"
            placeholder="Selling Price"
            value={formData.price}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="number"
            name="oprice"
            placeholder="Original Price"
            value={formData.oprice}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          />
          <input
            type="number"
            name="discount"
            placeholder="Discount %"
            value={formData.discount}
            readOnly
            className="border rounded-lg px-3 py-2 bg-gray-100"
          />
        </div>

        {/* Brand & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Brand"
            className="border rounded-lg px-3 py-2"
          />

          <select
            name="subCategory"
            value={formData.subCategory}
            onChange={handleChange}
            className="border rounded-lg px-3 py-2"
          >
            <option value="">Select Category</option>
            <option value="Running">Running</option>
            <option value="Sports">Sports</option>
            <option value="Sneakers">Sneakers</option>
          </select>
        </div>

        {/* Sizes */}
        <div>
          <label className="font-medium">Sizes</label>
          <div className="flex gap-3 mt-2">
            {[6, 7, 8, 9, 10].map((size) => (
              <label key={size} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={formData.sizes.includes(size)}
                  onChange={() => handleArrayChange(size, "sizes")}
                />
                {size}
              </label>
            ))}
          </div>
        </div>

        {/* Colors */}
        <div>
          <label className="font-medium">Colors</label>
          <div className="flex gap-3 mt-2">
            {["White", "Red", "Grey"].map((color) => (
              <label key={color} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={formData.colors.includes(color)}
                  onChange={() => handleArrayChange(color, "colors")}
                />
                {color}
              </label>
            ))}
          </div>
        </div>

        {/* Flags */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Object.keys(flagLabels).map((key) => (
            <label key={key} className="flex items-center gap-2">
              <input
                type="checkbox"
                name={key}
                checked={formData[key]}
                onChange={handleChange}
              />
              {flagLabels[key]}
            </label>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg"
          >
            {loading ? 'Process':"Update Product"}
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-slate-300 px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPage;
