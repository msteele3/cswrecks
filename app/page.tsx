"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Site, allSites } from "./sites";
import { Sun, Moon } from "lucide-react";

export default function HomePage() {
  const [search, setSearch] = useState("");
  const [isDark, setIsDark] = useState(true);
  
  // Initialize theme from system preference
  useEffect(() => {
    const darkModePreference = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDark(darkModePreference);
  }, []);

  const filteredSites = allSites.filter((site: Site) => {
    const lowerSearch = search.toLowerCase();
    return (
      site.name.toLowerCase().includes(lowerSearch) ||
      site.year.toString().includes(lowerSearch) ||
      site.website.toLowerCase().includes(lowerSearch)
    );
  });

  // GT Colors
  const gtColors = {
    navy: "#003057",
    gold: "#B3A369",
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`min-h-screen p-8 flex flex-col items-center transition-colors duration-300 ${
        isDark 
          ? "bg-black text-white" 
          : "bg-white text-gray-900"
      }`}
    >
      {/* Theme Toggle */}
      <motion.button
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed top-4 right-4 p-2 rounded-full 
          ${isDark 
            ? "bg-gray-800 hover:bg-gray-700" 
            : "bg-gray-100 hover:bg-gray-200"
          }`}
        onClick={() => setIsDark(!isDark)}
      >
        {isDark ? <Sun size={20} /> : <Moon size={20} />}
      </motion.button>

      {/* Empty top section */}
      <div className="w-full h-64 flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">CSWrecks</h1>
        <p className="text-center mt-2 text-lg">
          An unofficial directory of GT students and Alum&apos;s personal websites. Feel free to add yours!
        </p>
      </div>
      
      {/* Search Box */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-2xl mb-16"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="search by name, site, or year"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full px-8 py-2 focus:outline-none text-sm border-b transition-colors duration-300
              ${isDark 
                ? "bg-black border-gray-700 text-gray-300 placeholder-gray-600" 
                : `bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-[${gtColors.gold}]`
              }`}
          />
          <div className="absolute left-0 top-2.5">
            <svg 
              className={`w-4 h-4 ${isDark ? "text-gray-600" : "text-gray-400"}`} 
              fill="none" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </motion.div>

      {/* Sites Grid */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-y-4 text-center"
      >
        {filteredSites.map((site) => (
         <motion.a
         whileHover={{ scale: 1.2, transition: { duration: 0.25, ease: "easeInOut" } }}
         key={site.website}
         variants={item}
         href={site.website.replace(/\/$/, "")}
         target="_blank"
         rel="noopener noreferrer"
         className={`inline-block text-sm
           ${isDark 
             ? "text-gray-500 hover:text-gray-300" 
             : `text-gray-600 hover:text-[${gtColors.navy}]`
           }`}
       >
         {site.website.replace('https://', '').replace('http://', '').replace(/\/$/, "")}
       </motion.a>
        ))}
      </motion.div>

      <footer className="flex justify-center mt-auto">
        {/* Add Site Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className={`text-sm px-6 py-2 rounded-full border transition-colors duration-200
            ${isDark 
              ? "text-gray-600 hover:text-gray-400 border-gray-800" 
              : `text-[${gtColors.navy}] hover:text-[${gtColors.gold}] border-gray-300`
            }`}
        >
          add your site →
        </motion.button>
      </footer>
    </motion.main>
  );
}