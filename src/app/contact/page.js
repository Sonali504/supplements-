"use client";

import { useState } from "react";
import { FiHome, FiMapPin, FiPhone } from "react-icons/fi";

const indianStatesAndCities = {
  "Punjab": ["Amritsar", "Ludhiana", "Chandigarh", "Patiala"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Tiruchirapalli"],
  "Karnataka": ["Bangalore", "Mysore", "Hubli", "Mangalore"],
  "Delhi": ["New Delhi", "Dwarka", "Karol Bagh", "Saket"]
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    state: "Punjab",
    city: "Amritsar",
    language: "Hindi",
    message: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (name === "state") {
      setFormData((prev) => ({
        ...prev,
        city: indianStatesAndCities[value][0], // Default first city when state changes
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Message Sent Successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      {/* Company, Address & Contact Information with Icons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-6">
        <div>
          <FiHome className="text-3xl mx-auto text-gray-600 mb-2" />
          <div className="text-xl font-semibold">Company information:</div>
          <p className="text-gray-600">BodySupplement LLC</p>
          <p className="text-gray-500">Tax id: USXXXXXX</p>
        </div>
        <div>
          <FiMapPin className="text-3xl mx-auto text-gray-600 mb-2" />
          <div className="text-xl font-semibold">Address:</div>
          <p className="text-gray-600">SILVER LAKE, Delhi</p>
          <p className="text-gray-500">1941 Late Avenue, 03875</p>
        </div>
        <div>
          <FiPhone className="text-3xl mx-auto text-gray-600 mb-2" />
          <div className="text-xl font-semibold">Contact us:</div>
          <p className="text-gray-600">Email us for general queries</p>
          <p className="text-blue-500">hello@bodysupplements.com</p>
        </div>
      </div>

      {/* Contact Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="border p-3 rounded w-full"
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="border p-3 rounded w-full"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="border p-3 rounded w-full"
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          />
        </div>

        {/* State & City Dropdowns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <select
            name="state"
            value={formData.state}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          >
            {Object.keys(indianStatesAndCities).map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>

          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            className="border p-3 rounded w-full"
          >
            {indianStatesAndCities[formData.state].map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>

        {/* Language Dropdown */}
        <select
          name="language"
          value={formData.language}
          onChange={handleChange}
          className="border p-3 rounded w-full"
        >
          <option>Hindi</option>
          <option>English</option>
          <option>Tamil</option>
          <option>Punjabi</option>
        </select>

        <textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          className="border p-3 rounded w-full h-24"
          required
        ></textarea>

        <div className="flex items-center">
          <input
            type="checkbox"
            name="agree"
            checked={formData.agree}
            onChange={handleChange}
            className="mr-2"
            required
          />
          <label>
            I confirm that I have read and agreed to{" "}
            <a href="#" className="text-blue-500">
              BodySupplement's Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500">
              Privacy Statement
            </a>.
          </label>
        </div>

        <button
          type="submit"
          className="bg-yellow-600 text-white py-3 px-6 rounded-lg w-full hover:bg-yellow-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
