"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

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
  const testimonials = [
    {
      id: 1,
      name: "Jon Doe",
      role: "Designer",
      image: "/images/team1.jpg",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In scelerisque semper elit non pellentesque.",
    },
    {
      id: 2,
      name: "Jane Doe",
      role: "Designer",
      image: "/images/team2.jpg",
      text: "Fusce dictum ex mauris, porta semper mi malesuada dictum. Donec eu tellus laoreet, iaculis mi sit amet.",
    },
    {
      id: 3,
      name: "Alice Smith",
      role: "Developer",
      image: "/images/team3.jpg",
      text: "Phasellus tempus bibendum massa ut tincidunt. Nam hendrerit ut tortor eget rutrum.",
    },
    {
      id: 4,
      name: "Michael Lee",
      role: "Manager",
      image: "/images/team4.jpg",
      text: "Suspendisse eget lorem blandit, sodales est eget, efficitur erat. Pellentesque feugiat velit.",
    },
    {
      id: 5,
      name: "Emma Wilson",
      role: "Marketer",
      image: "/images/team2.jpg",
      text: "Interdum et malesuada fames ac ante ipsum primis in faucibus. Nam sit amet ipsum viverra.",
    },
  ];

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
      
      {/* {Best Selling product} */}
      <section className="py-12 bg-yellow-50 mt-5">
        {/* Section Heading */}
        <div className="px-4 mb-6">
          <h2 className="text-2xl font-bold text-left">Best Selling Products</h2>
        </div>

        {/* Scrollable Product Row */}
        <div className="px-4 overflow-x-auto w-full bg-white">
          <div className="flex space-x-6 scrollbar-hide overflow-x-scroll w-max">
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

                  {/* Product Image */}
                  {product.image && (
                    <div
                      className="cursor-pointer "
                      onClick={() => router.push(`/product/${product.id}`) } 
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
              <p className="text-center text-gray-500 w-full">
                No products available.
              </p>
            )}
          </div>
        </div>
      </section>


      {/* Banner Section */}
      <section className="py-12 px-4 mt-8">
        <div className="flex flex-wrap justify-center items-center gap-4">
          {["banner1.jpg", "banner2.jpg", "banner3.jpg"].map((banner, index) => (
            <Image
              key={index}
              src={`/images/${banner}`}
              alt={`Banner ${index + 1}`}
              width={400}
              height={200}
              className="rounded-lg object-cover w-full sm:w-[300px] md:w-[350px] lg:w-[400px] h-auto"
            />
          ))}
        </div>
      </section>


      {/* Category Selection Row */}
      <section className="py-6 text-center">
        <div className="max-w-screen-md mx-auto">
          {/* Scrollable Wrapper */}
          <div className="overflow-x-auto w-full">
            <div className="flex space-x-4 px-4 w-max scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-md whitespace-nowrap flex-shrink-0 ${
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
      
      {/* {Advertisment} */}
      <section className="py-8">
        <div className="mx-auto px-4">
          <img
            src="/images/advertisment.jpg"
            alt="Advertisement"
            className="w-full rounded-lg shadow-lg"
          />
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

      {/* {What client says} */}
      <section className="py-12 mt-10">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Testimonials</h2>
        </div>

        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2 },
          }}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          modules={[Pagination, Autoplay]}
          className="max-w-6xl mx-auto px-4"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-start">
                <span className="text-4xl text-gray-400">❝</span>
                <p className="text-gray-700 mb-4">{testimonial.text}</p>
                <div className="flex items-center mt-auto">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full border"
                  />
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
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
