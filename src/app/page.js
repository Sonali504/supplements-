"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();
  const { addToCart } = useCart();

  // Fetch products
  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    }
    fetchProducts();
  }, []);

  // Extract unique categories and add "All"
  const categories = ["All", ...new Set(products.map((p) => p.category))];

  // Filter products by category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  // Limited Time Deals Countdown Timer
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const countdownTime = new Date().getTime() + 2 * 60 * 60 * 1000; // 2-hour countdown

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = countdownTime - now;

      if (distance <= 0) {
        clearInterval(timer);
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      setTimeLeft({
        hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((distance / (1000 * 60)) % 60),
        seconds: Math.floor((distance / 1000) % 60),
      });
    };

    const timer = setInterval(updateCountdown, 1000);
    updateCountdown();
    return () => clearInterval(timer);
  }, []);

  return (
    <main className="container mx-auto px-4 ">
      {/* Hero Section */}
      <section className="relative h-[500px] flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-10 py-10">
        <div className="w-full md:w-1/2 text-center md:text-left px-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">
            Discover the Best Supplements
          </h1>
          <p className="text-sm md:text-md italic text-gray-700 mt-2">
            Boost your health with our premium products.
          </p>
          <Link href="/products">
            <button className="mt-4 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700">
              Shop Now
            </button>
          </Link>
        </div>
        <div className="w-full md:w-1/2 flex justify-center">
          <Image src="/images/protein2.jpg" alt="Protein Supplements" width={600} height={450} className="object-cover rounded-lg w-[250px] md:w-[400px]" priority />
        </div>
      </section>
      <section className="py-12">
      {/* Section Heading */}
      <div className="px-4 mb-6">
        <h2 className="text-2xl font-bold text-left">Best Selling Products</h2>
      </div>

      {/* Horizontal Scrollable Product Row */}
      <div className="flex space-x-6 overflow-x-auto scrollbar-hide px-4">
        {products.slice(0, 10).length > 0 ? (
          products.slice(0, 10).map((product) => (
            <div
              key={product.id}
              className="relative min-w-[250px] border p-4 rounded-lg shadow-md flex-shrink-0"
            >
              {/* Discount Badge */}
              {product.discount && (
                <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {product.discount}% OFF
                </span>
              )}

              {/* Product Image (clickable to open detail page) */}
              {product.image && (
                <div
                  className="cursor-pointer"
                  onClick={() => router.push(`/product/${product.id}`)}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={250}
                    height={200}
                    className="w-full h-40 object-contain rounded-md"
                  />
                </div>
              )}

              {/* Product Details */}
              <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
              <div className="flex items-center space-x-2">
                <span className="text-xl font-bold text-green-600">
                  ₹{product.price}
                </span>
                {product.oldPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    ₹{product.oldPrice}
                  </span>
                )}
              </div>
              <div className="flex items-center mt-1">
                <span className="text-yellow-500">⭐ {product.rating}</span>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={() => {
                  addToCart(product);
                  router.push("/cart");
                }}
                className="mt-3 w-full px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
              >
                Add to Cart
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 w-full">No products available.</p>
        )}
      </div>
    </section>

      {/* Banner Section */}
      <section className="py-12">
        <div className="flex justify-center items-center space-x-4">
          {["banner1.jpg", "banner2.jpg", "banner3.jpg"].map((banner, index) => (
            <Image key={index} src={`/images/${banner}`} alt={`Banner ${index + 1}`} width={400} height={200} className="rounded-lg object-cover" />
          ))}
        </div>
      </section>

      {/* Category Selection Row */}
      <section className="py-6 text-center">
        <div className="max-w-screen-md mx-auto">
          {/* Horizontally Scrollable Wrapper */}
          <div className="flex justify-center overflow-x-auto space-x-4 px-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-md whitespace-nowrap ${
                  selectedCategory === cat
                    ? "bg-yellow-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>
      <hr/>
      {/* Product List for Selected Category (Limited to 8 items) */}
      <section className="py-12">
        <h2 className="text-4xl font-bold text-center mb-6">
          {selectedCategory === "All"
            ? "Featured Products"
            : `${selectedCategory} Products`}
        </h2>
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 justify-items-center">
          {filteredProducts.slice(0, 8).length > 0 ? (
            filteredProducts.slice(0, 8).map((product) => (
              <div
                key={product.id}
                className="relative border p-4 rounded-lg shadow-md w-full max-w-xs"
              >
                {/* Discount Badge */}
                {product.discount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {product.discount}% OFF
                  </span>
                )}
                {/* Product Image (clickable to open detail page) */}
                {product.image && (
                  <div
                    className="cursor-pointer"
                    onClick={() => router.push(`/product/${product.id}`)}
                  >
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={300}
                      height={200}
                      className="w-full h-40 object-contain rounded-md"
                    />
                  </div>
                )}
                {/* Product Details */}
                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-xl font-bold text-green-600">
                    ₹{product.price}
                  </span>
                  {product.oldPrice && (
                    <span className="text-sm text-gray-500 line-through">
                      ₹{product.oldPrice}
                    </span>
                  )}
                </div>
                <div className="flex items-center mt-1">
                  <span className="text-yellow-500">⭐ {product.rating}</span>
                </div>
                {/* Add to Cart Button */}
                <button
                  onClick={() => {
                    addToCart(product);
                    router.push("/cart");
                  }}
                  className="mt-3 w-full px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                >
                  Add to Cart
                </button>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No products available.</p>
          )}
        </div>
      </section>

      {/* Limited Time Deals - Responsive Grid */}
      <section className="py-12 text-center bg-yellow-100">
        <h2 className="text-2xl font-bold mb-4">Limited Time Deals</h2>

        {/* Enhanced Countdown Timer */}
        <div className="flex justify-center items-center space-x-2 bg-red-400 text-white text-lg font-semibold py-2 px-4 rounded-md w-fit mx-auto">
          <span className="px-2">{timeLeft.hours}h</span>:
          <span className="px-2">{timeLeft.minutes}m</span>:
          <span className="px-2">{timeLeft.seconds}s</span>
        </div>

        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-6 px-4 ">
          {products.slice(0, 5).map((product) => {
            return (
              <div key={product.id} className="border p-4 rounded-lg shadow-md relative bg-white">
                {/* Discount Badge */}
                {product.discount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    {product.discount}% OFF
                  </span>
                )}
                
                {/* Product Image */}
                <Image
                  src={product.image}
                  alt={product.name}
                  width={250}
                  height={200}
                  className="w-full h-40 object-contain rounded-md cursor-pointer"
                  onClick={() => router.push(`/product/${product.id}`)}
                />
                
                {/* Product Name */}
                <h3 className="text-lg font-semibold mt-2">{product.name}</h3>

                {/* Price Section */}
                <div className="flex items-center space-x-2 justify-center">
                  {/* New Price */}
                  <span className="text-xl font-bold text-green-600">₹{product.price}</span>
                  {/* Old Price (if exists) */}
                  {product.oldPrice && (
                    <span className="text-sm text-gray-500 line-through">₹{product.oldPrice}</span>
                  )}
                </div>

                {/* Rating Section */}
                <div className="flex items-center justify-center mt-1">
                  <span className="text-yellow-500">⭐ {product.rating}</span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => {
                    addToCart(product);
                    router.push("/cart");
                  }}
                  className="mt-3 w-full px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
}

// Reusable Product Card Component
function ProductCard({ product, addToCart, router }) {
  return (
    <div className="border p-4 rounded-lg shadow-md w-[250px]">
      <Image src={product.image} alt={product.name} width={250} height={200} className="w-full h-40 object-contain rounded-md cursor-pointer" onClick={() => router.push(`/product/${product.id}`)} />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <span className="text-xl font-bold text-green-600">₹{product.price}</span>
      <button onClick={() => { addToCart(product); router.push("/cart"); }} className="mt-3 w-full px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700">
        Add to Cart
      </button>
    </div>
  );
}
