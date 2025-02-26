"use client";
import Link from "next/link";
import Image from "next/image";
import { FaInstagram, FaYoutube, FaDribbble } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative bg-yellow-200 text-black mt-16">
      <div className="relative max-w-7xl mx-auto px-6 pt-24 pb-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Left Side: Company Name */}
        <div className="text-center md:text-left">
            <div className="text-center md:text-left flex flex-col items-center">
                <Link href="/" className="flex items-center justify-center">
                    <Image 
                    src="/images/logo.png"
                    alt="Irsupplements Logo"
                    width={100}
                    height={50}
                    className="object-contain"
                    />
                </Link>
                <h2 className="text-2xl font-bold">BodySupplements</h2>
            </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="flex justify-center space-x-12 text-center">
          <div>
            <h3 className="font-semibold">Links</h3>
            <ul className="mt-2 space-y-1">
              <li><a href="/" className="hover:text-blue-600">Home</a></li>
              <li><a href="/about" className="hover:text-blue-600">About</a></li>
              <li><a href="/blog" className="hover:text-blue-600">Blog</a></li>
              <li><a href="/products" className="hover:text-blue-600">Product</a></li>
              <li><a href="/docs" className="hover:text-blue-600">Documentation</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Blog</h3>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:text-blue-600">UI / UX</a></li>
              <li><a href="#" className="hover:text-blue-600">CodePens</a></li>
              <li><a href="#" className="hover:text-blue-600">Codedamn</a></li>
              <li><a href="#" className="hover:text-blue-600">Figma</a></li>
              <li><a href="#" className="hover:text-blue-600">Oracle EBS</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Legal</h3>
            <ul className="mt-2 space-y-1">
              <li><a href="#" className="hover:text-blue-600">Privacy Policies</a></li>
              <li><a href="#" className="hover:text-blue-600">Terms and Condition</a></li>
              <li><a href="#" className="hover:text-blue-600">Licensing</a></li>
              <li><a href="#" className="hover:text-blue-600">Brand Guideline</a></li>
            </ul>
          </div>
        </div>
        

        {/* Right Side: Privacy Policy & Social Media */}
        <div className="text-center md:text-right">
          <h3 className="font-semibold">Privacy</h3>
          <ul className="mt-2 space-y-1">
            <li><a href="#" className="hover:text-blue-600">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600">Contact Us</a></li>
          </ul>
          <h3 className="mt-4 font-semibold">Follow me on</h3>
          <div className="flex justify-center md:justify-end mt-2 space-x-4">
            <FaInstagram size={24} className="cursor-pointer hover:text-pink-500" />
            <FaYoutube size={24} className="cursor-pointer hover:text-red-600" />
            <FaDribbble size={24} className="cursor-pointer hover:text-pink-400" />
          </div>
        </div>

      </div>

      {/* Bottom Section */}
      <div className="text-center text-sm text-gray-600 py-4 border-t border-gray-300">
        <p>Icons by Icons8</p>
        <p>Designed & Created by BodySupplements</p>
        <p>© {new Date().getFullYear()} BodySupplements</p>
      </div>
      
    </footer>
  );
}
