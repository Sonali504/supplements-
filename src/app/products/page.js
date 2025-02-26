"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaShoppingCart, FaHeart, FaRegHeart, FaBars } from "react-icons/fa";
import { useCart } from "@/context/CartContext";


export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [wishlist, setWishlist] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(["All"]);
  const [sortBy, setSortBy] = useState("relevance"); // Default sorting by relevance
  const [selectedRating, setSelectedRating] = useState([]);
  const [popupMessage, setPopupMessage] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const categories = ["All", "Proteins", "Gainers", "Pre Workout", "Creatine", "Vitamins", "BCAAs"];
  const ratings = [5, 4.5, 4, 3.5, 3];

  const handleCategoryChange = (category) => {
    if (category === "All") setSelectedCategories(["All"]);
    else {
      let updated = selectedCategories.includes("All") ? [] : [...selectedCategories];
      updated.includes(category) ? updated.splice(updated.indexOf(category), 1) : updated.push(category);
      setSelectedCategories(updated.length ? updated : ["All"]);
    }
  };

  const handleRatingChange = (rating) => {
    setSelectedRating((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
  };

  const toggleWishlist = (productId) => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      newWishlist.has(productId) ? newWishlist.delete(productId) : newWishlist.add(productId);
      return newWishlist;
    });
  };

  const showPopup = (message) => {
    setPopupMessage(message);
    setTimeout(() => setPopupMessage(""), 2000);
  };

  // Sorting Logic
  const sortProducts = (products) => {
    if (sortBy === "low-to-high") return [...products].sort((a, b) => a.price - b.price);
    if (sortBy === "high-to-low") return [...products].sort((a, b) => b.price - a.price);
    return products; // "relevance" (default)
  };

  const filteredProducts = sortProducts(
    products
      .filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()))
      .filter((p) => selectedCategories.includes("All") || selectedCategories.includes(p.category))
      .filter((p) => !selectedRating.length || selectedRating.includes(p.rating))
  );
  

  return (
    <div className="max-w-8xl mx-auto p-4">
      {popupMessage && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-black text-white py-2 px-4 rounded-md shadow-lg">
          {popupMessage}
        </div>
      )}

      <button className="md:hidden flex items-center bg-gray-100 px-4 py-2 rounded-md mb-4" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
        <FaBars className="mr-2" />
        Filters
      </button>

      <div className="flex flex-col md:flex-row px-6 mt-5">
        <aside className={`md:w-72 bg-white shadow-md p-4 rounded-md md:block ${isSidebarOpen ? "block" : "hidden"}`}>
          <h2 className="text-lg font-bold mb-2">Categories</h2>
          {categories.map((category) => (
            <label key={category} className="block  items-center space-x-2 mb-2 cursor-pointer">
              <input type="checkbox" checked={selectedCategories.includes(category)} onChange={() => handleCategoryChange(category)} />
              <span>{category}</span>
            </label>
          ))}

          {/* Sort by Price */}
          <div className="mt-6">
            <h2 className="text-lg font-bold mb-2">Sort by</h2>
            <label className="block flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="price" checked={sortBy === "relevance"} onChange={() => setSortBy("relevance")} />
              <span>Relevance</span>
            </label>
            <label className="block flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="price" checked={sortBy === "low-to-high"} onChange={() => setSortBy("low-to-high")} />
              <span>Low to High</span>
            </label>
            <label className="block flex items-center space-x-2 cursor-pointer">
              <input type="radio" name="price" checked={sortBy === "high-to-low"} onChange={() => setSortBy("high-to-low")} />
              <span>High to Low</span>
            </label>
          </div>
        </aside>

        <div className="flex-1">
          <input
            type="text"
            placeholder="Search for products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 w-full rounded-md mb-4"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => ( // <-- 'product' is defined here
                <div key={product.id} className="relative p-3 border rounded-lg shadow-lg bg-white hover:shadow-xl transition">
                  {product.discount && (
                    <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                      {product.discount} OFF
                    </span>
                  )}

                  <button
                    className="absolute top-2 right-2 p-2 rounded-full shadow-md bg-white hover:bg-gray-200 transition"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(product.id);
                    }}
                  >
                    {wishlist.has(product.id) ? (
                      <FaHeart className="text-red-500 text-lg" />
                    ) : (
                      <FaRegHeart className="text-gray-500 text-lg" />
                    )}
                  </button>

                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-contain cursor-pointer"
                    onClick={() => router.push(`/product/${product.id}`)}
                  />

                  <h2 className="text-md font-bold mt-2">{product.name}</h2>

                  {/* Star Ratings */}
                  <div className="text-yellow-500 text-md mt-1">
                    {"★".repeat(Math.floor(product.rating))}
                    {product.rating % 1 !== 0 ? "⭐" : ""}
                  </div>

                  <div className="mt-2 text-md font-semibold">
                    <span className="text-yellow-600">₹{product.price}</span>
                    {product.oldPrice && (
                      <span className="ml-2 text-gray-500 line-through">₹{product.oldPrice}</span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      addToCart(product); // <-- Ensure addToCart function exists
                      router.push("/cart");
                    }}
                    className="mt-2 w-full flex items-center justify-center bg-yellow-600 text-white px-3 py-2 rounded-md hover:bg-yellow-700 transition"
                  >
                    <FaShoppingCart className="mr-2" /> Add to Cart
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 col-span-4 text-center">No products found.</p>
            )}
          </div>
        </div>


        
      </div>
    </div>
  );
}