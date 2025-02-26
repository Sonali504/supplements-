"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { FiCheckCircle, FiMail, FiPhone } from "react-icons/fi";

// Dummy Data
const testimonials = [
  { id: 1, name: "John Doe", comment: "Great service!", rating: 5, img: "/images/team1.jpg" },
  { id: 2, name: "Jane Smith", comment: "Highly recommend!", rating: 4, img: "/images/team2.jpg" },
  { id: 3, name: "Alice Johnson", comment: "Loved it!", rating: 5, img: "/images/team3.jpg" },
  { id: 4, name: "Mark Wilson", comment: "Best experience!", rating: 5, img: "/images/team4.jpg" },
  { id: 5, name: "Chris Evans", comment: "Very professional.", rating: 4, img: "/images/team1.jpg" },
  { id: 6, name: "Emma Watson", comment: "Amazing team!", rating: 5, img: "/images/team2.jpg" },
];

const teamMembers = [
  { id: 1, name: "Alex Johnson", role: "CEO", img: "/images/team1.jpg" },
  { id: 2, name: "Sophia Brown", role: "CTO", img: "/images/team2.jpg" },
  { id: 3, name: "Michael Lee", role: "Designer", img: "/images/team3.jpg" },
  { id: 4, name: "Emily Davis", role: "Marketing Head", img: "/images/team4.jpg" },
];

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">

        {/* Banner Section */}
        <section className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white text-center flex items-center justify-center min-h-[400px] px-6 rounded-2xl">
            <div>
                <h1 className="text-6xl font-bold mb-4">About Us</h1>
                <p className="text-m italic max-w-3xl mx-auto">
                We are committed to excellence, innovation, and customer satisfaction. 
                Our journey is fueled by passion, expertise, and a relentless pursuit 
                of quality. Discover who we are and what makes us unique!
                </p>
            </div>
        </section>


      {/* Who We Are */}
      <section className="flex flex-col md:flex-row items-center gap-8 py-16 px-6 mt-10">
            {/* Image Section */}
            <Image 
                src="/images/team1.jpg" 
                alt="Who We Are" 
                width={500} 
                height={400} 
                className="rounded-lg shadow-lg"
            />

            {/* Text Content */}
            <div className="max-w-lg">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">Who We Are</h2>
                <p className="text-gray-600 leading-relaxed">
                We are a passionate team dedicated to delivering high-quality products 
                and services. With years of experience and expertise, we aim to bring 
                innovation, reliability, and excellence to our customers. Our mission 
                is to create value-driven solutions that enhance lives and empower 
                businesses.
                </p>
                <p className="text-gray-600 mt-4 leading-relaxed">
                We believe in customer satisfaction, continuous improvement, and ethical 
                business practices. Our commitment to quality and innovation sets us apart, 
                making us a trusted choice in the industry.
                </p>
            </div>
        </section>
        <hr/>

      {/* Why We Are Better */}
      <section className="flex flex-col md:flex-row items-center gap-8 py-16 px-6">
            {/* Text Content */}
            <div className="max-w-lg">
                <h2 className="text-4xl font-extrabold text-gray-800 mb-6">Why We Are Better</h2>
                <ul className="space-y-4 text-gray-600">
                <li className="flex items-center">
                    <FiCheckCircle className="text-green-500 mr-3 text-xl" />
                    <span><strong>Uncompromised Quality:</strong> We ensure top-tier products and services, meeting the highest industry standards.</span>
                </li>
                <li className="flex items-center">
                    <FiCheckCircle className="text-green-500 mr-3 text-xl" />
                    <span><strong>Experienced Professionals:</strong> Our team consists of highly skilled experts with years of experience in the field.</span>
                </li>
                <li className="flex items-center">
                    <FiCheckCircle className="text-green-500 mr-3 text-xl" />
                    <span><strong>Customer-Centric Approach:</strong> We prioritize customer satisfaction and tailor solutions to meet unique needs.</span>
                </li>
                <li className="flex items-center">
                    <FiCheckCircle className="text-green-500 mr-3 text-xl" />
                    <span><strong>Innovative Solutions:</strong> We embrace new technologies and methodologies to stay ahead of the competition.</span>
                </li>
                <li className="flex items-center">
                    <FiCheckCircle className="text-green-500 mr-3 text-xl" />
                    <span><strong>Affordable Pricing:</strong> High-quality services at competitive prices, ensuring value for money.</span>
                </li>
                <li className="flex items-center">
                    <FiCheckCircle className="text-green-500 mr-3 text-xl" />
                    <span><strong>24/7 Support:</strong> Dedicated customer support team available to assist anytime, anywhere.</span>
                </li>
                </ul>
            </div>

            {/* Image Section */}
            <Image 
                src="/images/we.jpg" 
                alt="Why We Are Better" 
                width={500} 
                height={400} 
                className="rounded-lg shadow-lg"
            />
        </section>


      {/* Testimonials */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-6">What Our Clients Say</h2>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={3}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          breakpoints={{
            0: { slidesPerView: 1 },
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {testimonials.map((t) => (
            <SwiperSlide key={t.id} className="bg-white p-6 rounded-lg shadow-lg">
              <Image src={t.img} alt={t.name} width={80} height={80} className="rounded-full mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-center">{t.name}</h3>
              <p className="text-gray-600 text-center">{t.comment}</p>
              <div className="text-yellow-500 text-center">⭐ {t.rating} / 5</div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <hr/>

      {/* Our Team */}
      <section className="py-12 text-center">
        <h2 className="text-3xl font-bold mb-6">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div key={member.id} className="bg-white p-4 rounded-lg shadow-lg">
              <Image src={member.img} alt={member.name} width={120} height={120} className="rounded-full mx-auto mb-3" />
              <h3 className="text-lg font-semibold">{member.name}</h3>
              <p className="text-gray-500">{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Know More Form */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-6">Want to Know More?</h2>
        <form className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-lg">
          <input type="text" placeholder="Your Name" className="border p-3 rounded w-full mb-4" required />
          <input type="email" placeholder="Your Email" className="border p-3 rounded w-full mb-4" required />
          <textarea placeholder="Your Message" className="border p-3 rounded w-full h-24 mb-4" required></textarea>
          <button type="submit" className="bg-yellow-600 text-white py-3 px-6 rounded-lg w-full">Submit</button>
        </form>
      </section>

    </div>
  );
}
