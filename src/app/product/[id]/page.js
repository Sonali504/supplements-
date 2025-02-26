"use client";
import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import Reviews from "@/components/Reviews";
import { FaStar, FaRegStar, FaStarHalfAlt, FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";

export default function ProductDetail({ params }) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id);

  const { addToCart } = useCart();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState(new Set());
  const [copied, setCopied] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    fetch(`/api/products`)
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.find((p) => p.id === productId);
        if (foundProduct) {
          setProduct(foundProduct);
        }
        // Select 4 random products excluding the current product
        const filteredProducts = data.filter((p) => p.id !== productId);
        const randomProducts = filteredProducts.sort(() => 0.5 - Math.random()).slice(0, 4);
        setRelatedProducts(randomProducts);

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [productId]);

  if (loading) return <p>Loading product...</p>;
  if (!product) return <p>Product not found</p>;

  const toggleWishlist = () => {
    setWishlist((prev) => {
      const newWishlist = new Set(prev);
      if (newWishlist.has(productId)) {
        newWishlist.delete(productId);
      } else {
        newWishlist.add(productId);
      }
      return newWishlist;
    });
  };

  const shareProduct = () => {
    const productURL = `${window.location.origin}/product/${productId}`;
    navigator.clipboard.writeText(productURL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="mt-5">
      <div className="p-6 max-w-5xl mx-auto flex flex-col md:flex-row gap-8">
        {/* Left Side - Product Image */}
        <div className="md:w-1/2 flex justify-center">
          <img src={product.image} alt={product.name} className="w-full h-100 object-contain" />
        </div>

        {/* Right Side - Product Details */}
        <div className="md:w-1/2 relative">
          <div className="absolute top-0 right-0 flex gap-4">
            <button onClick={toggleWishlist} className="text-2xl">
              {wishlist.has(productId) ? <FaHeart className="text-red-500" /> : <FaRegHeart className="text-gray-400 hover:text-red-500 transition" />}
            </button>
            <button onClick={shareProduct} className="text-2xl relative">
              <FaShareAlt className="text-gray-600 hover:text-blue-500 transition" />
              {copied && <span className="absolute -top-6 left-0 bg-black text-white text-xs px-2 py-1 rounded-md">Copied!</span>}
            </button>
          </div>
          {product.discount && <span className="bg-red-500 text-white px-3 py-1 text-sm font-semibold rounded">{product.discount} OFF</span>}
          <h2 className="text-3xl uppercase font-bold mt-10">{product.name}</h2>
          

          <div className="mt-3 text-lg font-semibold">
            <span className="text-3xl text-yellow-600">₹{product.price}</span>
            {product.oldPrice && <span className="ml-3 text-gray-500 line-through text-lg">₹{product.oldPrice}</span>}
          </div>

          <div className="flex items-center mt-2">
            {Array.from({ length: 5 }).map((_, index) => {
              const ratingValue = index + 1;
              return ratingValue <= product.rating ? <FaStar key={index} className="text-yellow-500 text-xl" /> : ratingValue - 0.5 === product.rating ? <FaStarHalfAlt key={index} className="text-yellow-500 text-xl" /> : <FaRegStar key={index} className="text-gray-400 text-xl" />;
            })}
          </div>

          <p className="text-md text-gray-700 mt-4">{product.description}</p>

          <div className="mt-4">
            <p className="text-green-600 font-semibold">🚚 {product.shipping}</p>
            <p className="text-red-600 font-semibold">🔄 {product.returns}</p>
          </div>

          <div className="flex gap-2 mt-4">
            {product.thumbnails.map((thumb, index) => <img key={index} src={thumb} alt="Thumbnail" className="w-20 h-20 object-cover rounded border cursor-pointer" />)}
          </div>

          <button onClick={() => { addToCart(product); router.push("/cart"); }} className="mt-6 px-6 py-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition">
            Add to Cart
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <Reviews productId={productId} />

      {/* Customers Also Bought Section */}
      {relatedProducts.length > 0 && (
        <div className="max-w-7xl mx-auto p-6 mt-10">
          <h3 className="text-2xl font-bold mb-5">Customers Also Bought</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((related) => (
              <div
                key={related.id}
                className="relative p-4 border rounded-lg shadow-md bg-white hover:shadow-lg transition cursor-pointer"
              >
                {/* Discount Badge */}
                {related.discount && (
                  <span className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-semibold rounded">
                    {related.discount} OFF
                  </span>
                )}

                <img
                  src={related.image}
                  alt={related.name}
                  className="w-full h-45 object-cover rounded-md"
                  onClick={() => router.push(`/product/${related.id}`)}
                />

                <h4 className="text-lg font-semibold mt-2">{related.name}</h4>

                {/* Price Section */}
                <div className="mt-2 text-lg font-semibold">
                  <span className="text-yellow-600 text-xl">₹{related.price}</span>
                  {related.oldPrice && (
                    <span className="ml-2 text-gray-500 line-through text-sm">₹{related.oldPrice}</span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button onClick={() => { addToCart(related); router.push("/cart"); }} className="mt-4 px-4 py-2 bg-yellow-600 text-white rounded-lg w-full hover:bg-yellow-700 transition">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        </div>
      )}


    </div>
  );
}
