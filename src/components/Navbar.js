"use client";
import { useCart } from "@/context/CartContext";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSearch, FaShoppingCart, FaUserCircle, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { cart } = useCart();
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // Track search input
  const router = useRouter();

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

  // Handle search function
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <nav className="bg-white p-2 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
        
        {/* Left - Hamburger & Logo */}
        <div className="flex items-center">
          <button onClick={() => setIsOpen(!isOpen)} className="text-2xl md:hidden mr-3">
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
          <Link href="/" className="flex items-center">
            <Image src="/images/logo.png" alt="Logo" width={100} height={50} className="object-contain" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex gap-6 text-lg font-semibold">
          <li><Link href="/" className="hover:text-[#FF9F1C] transition duration-300">Home</Link></li>
          <li><Link href="/products" className="hover:text-[#FF9F1C] transition duration-300">Products</Link></li>
          <li><Link href="/about" className="hover:text-[#FF9F1C] transition duration-300">About</Link></li>
          <li><Link href="/contact" className="hover:text-[#FF9F1C] transition duration-300">Contact</Link></li>
        </ul>

        {/* Right - Search, Cart, User */}
        <div className="flex items-center gap-4">
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF9F1C]"
            />
            <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600">
              <FaSearch />
            </button>
          </form>

          {/* Cart Icon */}
          <Link href="/cart" className="relative text-gray-700 hover:text-yellow-800 transition">
            <FaShoppingCart size={20} />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-2 rounded-full">
                {cart.length}
              </span>
            )}
          </Link>

          {/* User Profile - Dropdown */}
          <div className="relative">
            {user ? (
              <div>
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 focus:outline-none">
                  <FaUserCircle className="text-2xl text-yellow-400 cursor-pointer" />
                  <span className="text-lg font-medium">{user.name}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                    <button onClick={() => { localStorage.removeItem("loggedInUser"); setUser(null); }} 
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200">
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href="/auth/login" className="bg-yellow-600 px-6 py-2 rounded-md text-white">
                Login
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden flex flex-col gap-4 p-4 bg-white shadow-lg absolute top-full left-0 w-full">
          <li><Link href="/" className="block px-4 py-2 hover:bg-gray-200">Home</Link></li>
          <li><Link href="/products" className="block px-4 py-2 hover:bg-gray-200">Products</Link></li>
          <li><Link href="/about" className="block px-4 py-2 hover:bg-gray-200">About</Link></li>
          <li><Link href="/contact" className="block px-4 py-2 hover:bg-gray-200">Contact</Link></li>
          {user && (
            <li className="relative">
              <button onClick={() => setDropdownOpen(!dropdownOpen)} className="w-full text-left px-4 py-2 flex items-center gap-2">
                <FaUserCircle className="text-xl text-yellow-400" />
                <span>{user.name}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                  <button onClick={() => { localStorage.removeItem("loggedInUser"); setUser(null); }} 
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-200">
                    Logout
                  </button>
                </div>
              )}
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
