"use client";
import { useCart } from "@/context/CartContext";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaTrash, FaUser, FaEnvelope, FaPhone, FaHome, FaTicketAlt } from "react-icons/fa";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, goToProductList } = useCart();
  const [products, setProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [coupon, setCoupon] = useState("");
  const [discount, setDiscount] = useState(0);
  const [userData, setUserData] = useState({ fullName: "", address: "", phone: "", email: "" });

  const shipping = subtotal > 500 ? 0 : 100; // Free shipping above ₹500
  const platformFee = 3.0;
  const router = useRouter();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  useEffect(() => {
    const total = cart.reduce((acc, item) => {
      const product = products.find((p) => p.id === item.id);
      return acc + (product ? product.price * item.quantity : 0);
    }, 0);
    setSubtotal(total);
  }, [cart, products]);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const applyCoupon = () => {
    if (coupon === "DISCOUNT10") {
      setDiscount(subtotal * 0.1);
    } else {
      setDiscount(0);
      alert("Invalid coupon code");
    }
  };

  const handleCheckout = () => {
    if (!userData.fullName || !userData.address || !userData.phone || !userData.email) {
      alert("Please fill in all required fields.");
      return;
    }

    const orderID = Math.floor(100000 + Math.random() * 900000);
    const orderDetails = {
      orderID,
      items: cart,
      subtotal,
      discount,
      shipping,
      platformFee,
      total: (subtotal - discount + shipping + platformFee).toFixed(2),
      userData,
    };

    localStorage.setItem("orderDetails", JSON.stringify(orderDetails));
    router.push(`/order-confirmation?orderID=${orderID}`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Product List */}
          <div className="flex-1 space-y-4">
            {cart.map((item) => {
              const product = products.find((p) => p.id === item.id);
              return product ? (
                <div key={item.id} className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm">
                  <div className="flex items-center">
                    <img src={product.image} alt={product.name} className="w-24 h-24 object-contain rounded-lg" />
                    <div className="ml-4">
                      <h2 className="text-lg font-semibold">{product.name}</h2>
                      <button onClick={() => removeFromCart(item.id)} className="text-red-500 mt-1 flex items-center text-sm">
                        <FaTrash className="mr-1" /> REMOVE
                      </button>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-3 py-1 border rounded-md">
                      –
                    </button>
                    <span className="text-lg">{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 border rounded-md">
                      +
                    </button>
                    <p className="text-lg font-semibold">₹{(product.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ) : null;
            })}
          </div>

          {/* Order Summary */}
          <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <input type="text" name="fullName" placeholder="Full Name" value={userData.fullName} onChange={handleInputChange} className="w-full p-2 border rounded-md mb-3" />
            <input type="email" name="email" placeholder="Email" value={userData.email} onChange={handleInputChange} className="w-full p-2 border rounded-md mb-3" />
            <input type="text" name="address" placeholder="Address" value={userData.address} onChange={handleInputChange} className="w-full p-2 border rounded-md mb-3" />
            <input 
              type="text" 
              name="phone" 
              placeholder="Phone No." 
              value={userData.phone} 
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d{0,10}$/.test(value)) { // Allows only numbers and limits to 10 digits
                  handleInputChange(e);
                }
              }}
              className="w-full p-2 border rounded-md mb-3"
            />

            <div className="mt-6 border-t pt-4 space-y-2">
              <p>Subtotal: ₹{subtotal.toFixed(2)}</p>
              <p>Discount: -₹{discount.toFixed(2)}</p>
              <p>Shipping: ₹{shipping.toFixed(2)}</p>
              <p>Platform Fee: ₹{platformFee.toFixed(2)}</p>
              <p className="text-lg font-bold">Total: ₹{(subtotal - discount + shipping + platformFee).toFixed(2)}</p>
            </div>

            <button onClick={handleCheckout} className="mt-4 w-full bg-yellow-600 text-white py-2 rounded-md">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
