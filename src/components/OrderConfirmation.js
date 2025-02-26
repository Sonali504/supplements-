"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

export default function OrderConfirmation() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const orderID = searchParams.get("orderID");

  const [orderDetails, setOrderDetails] = useState(null);
  const [phoneError, setPhoneError] = useState(false);

  useEffect(() => {
    const storedOrder = localStorage.getItem("orderDetails");
    if (storedOrder) {
      const parsedOrder = JSON.parse(storedOrder);
      setOrderDetails(parsedOrder);

      if (!/^\d{10}$/.test(parsedOrder.userData.phone)) {
        setPhoneError(true);
      }
    }
  }, []);

  if (!orderDetails) return <p className="text-center">Loading order details...</p>;

  const handlePayment = () => {
    alert("Redirecting to Payment Gateway...");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 text-center">
      <h1 className="text-3xl font-bold text-green-600">🎉 Order Confirmed!</h1>
      <p className="text-lg">Thank you for your order. Your order has been placed successfully.</p>

      {/* Order ID */}
      <div className="mt-6 bg-gray-100 p-4 rounded-md">
        <p className="text-xl font-bold">Order ID: <span className="text-blue-600">{orderID}</span></p>
      </div>

      {/* User Information */}
      <div className="mt-6 bg-white p-4 shadow-md rounded-md text-left">
        <h2 className="text-xl font-semibold mb-2">Customer Details</h2>
        <p><strong>Name:</strong> {orderDetails.userData.fullName}</p>
        <p><strong>Email:</strong> {orderDetails.userData.email}</p>
        
        <p><strong>Phone:</strong> {orderDetails.userData.phone}</p>
        {phoneError && <p className="text-red-600 font-semibold">Invalid phone number! Must be 10 digits.</p>}

        <p><strong>Address:</strong> {orderDetails.userData.address}</p>
      </div>

      {/* Ordered Items */}
      <div className="mt-6 bg-white p-4 shadow-md rounded-md text-left">
        <h2 className="text-xl font-semibold mb-2">Ordered Items</h2>
        {orderDetails.items.map((item, index) => (
          <div key={index} className="flex justify-between border-b py-2">
            <p>{item.name} (x{item.quantity})</p>
            <p className="font-semibold">₹{(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div className="mt-6 bg-white p-4 shadow-md rounded-md text-left">
        <h2 className="text-xl font-semibold mb-2">Order Summary</h2>
        <p><strong>Subtotal:</strong> ₹{orderDetails.subtotal.toFixed(2)}</p>
        <p><strong>Discount:</strong> -₹{orderDetails.discount.toFixed(2)}</p>
        <p><strong>Shipping Fee:</strong> ₹{orderDetails.shipping.toFixed(2)}</p>
        <p><strong>Platform Fee:</strong> ₹{orderDetails.platformFee.toFixed(2)}</p>
        <p className="text-xl font-bold mt-2">Total: ₹{orderDetails.total}</p>
      </div>

      {/* Buttons */}
      <div className="mt-6 flex justify-center space-x-4">
        <button 
          onClick={() => router.push("/products")} 
          className="bg-yellow-600 text-white py-2 px-6 rounded-md"
        >
          Continue Shopping
        </button>
        
        <button 
          onClick={handlePayment} 
          className="bg-green-600 text-white py-2 px-6 rounded-md"
          disabled={phoneError}
        >
          Pay Now
        </button>
      </div>
    </div>
  );
}
