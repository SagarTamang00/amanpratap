import React, { useState, useEffect } from 'react';
import { FaInstagram, FaFacebookF, FaYoutube, FaEnvelope } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8 px-6 md:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">

        {/* ─── ABOUT ─── */}
        <div>
          <h2 className="text-2xl font-bold tracking-wide">
            Aman Pratap
          </h2>
        </div>

        {/* ─── CONTACT ─── */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Contact</h3>

          <div className="flex items-center gap-2 text-gray-400 mb-3">
            <FaEnvelope size={18} />
            <span>director@email.com</span>
          </div>

          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-pink-500 transition">
              <FaInstagram size={20} />
            </a>

            <a href="#" className="hover:text-blue-500 transition">
              <FaFacebookF size={20} />
            </a>

            <a href="#" className="hover:text-red-500 transition">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* ─── BOTTOM BAR ─── */}
      <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Aman Pratap. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;