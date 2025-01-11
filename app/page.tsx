"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Site, allSites } from "./sites";

export default function HomePage() {
  const [search, setSearch] = useState("");

  const filteredSites = allSites.filter((site: Site) => {
    const lowerSearch = search.toLowerCase();
    return (
      site.name.toLowerCase().includes(lowerSearch) ||
      site.year.toString().includes(lowerSearch) ||
      site.website.toLowerCase().includes(lowerSearch)
    );
  });

  function chunkSites(sites: Site[]) {
    const chunkPattern = [4, 5];
    const result: Site[][] = [];
    let index = 0;
    let i = 0;

    while (index < sites.length) {
      const chunkSize = chunkPattern[i % chunkPattern.length];
      result.push(sites.slice(index, index + chunkSize));
      index += chunkSize;
      i++;
    }
    return result;
  }

  const chunkedSites = chunkSites(filteredSites);

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
      style={{ fontFamily: "'Nova Square', sans-serif" }}
      className="min-h-screen p-8 flex flex-col items-center bg-black text-white transition-colors duration-300"
    >
      <section
        style={{ height: "25vh" }}
        className="w-full flex flex-col items-center justify-center text-center px-4"
      >
        <h1 className="text-5xl font-extrabold mb-4">CS Wrecks 🐝</h1>
        <p className="text-lg max-w-2xl mx-auto pt-4">
          An unofficial directory of GT students and Alum&apos;s personal websites. Check them out, and feel free to add yours!
        </p>
      </section>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="w-full max-w-2xl my-8 px-4"
      >
        <div className="relative">
          <input
            type="text"
            placeholder="search by name, site, or year"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-8 py-2 focus:outline-none text-sm border-b transition-colors duration-300 bg-black border-gray-700 text-gray-300 placeholder-gray-600"
          />
          <div className="absolute left-0 top-2.5 pl-1">
            <svg
              className="w-4 h-4 text-gray-600"
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

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="w-full max-w-4xl flex flex-col items-center px-4"
      >
        {chunkedSites.map((rowSites, rowIndex) => (
          <div
            key={rowIndex}
            className="flex flex-wrap sm:flex-nowrap gap-8 justify-center 
                       mb-6 sm:mb-12 text-center"
          >
            {rowSites.map((site) => (
              <motion.a
                whileHover={{
                  scale: 1.2,
                  transition: { duration: 0.25, ease: "easeInOut" },
                }}
                key={site.website}
                variants={item}
                href={site.website.replace(/\/$/, "")}
                target="_blank"
                rel="noopener noreferrer"
                className="px-1 inline-block w-1/2 sm:w-auto text-md sm:text-sm text-gray-300 hover:text-gray-100"
              >
                {site.website
                  .replace("https://", "")
                  .replace("http://", "")
                  .replace(/^www\./, "")
                  .replace(/\/$/, "")}
              </motion.a>
            ))}
          </div>
        ))}
      </motion.div>

      <footer className="absolute bottom-8 mt-12">
        <motion.button
          whileHover={{
            scale: 1.15,
            transition: { duration: 0.15 },
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onClick={() =>
            window.open("https://github.com/msteele3/cswrecks/pulls", "_blank")
          }
          className="text-lg sm:text-sm px-6 py-2 rounded-full border transition-colors duration-200 text-white border-gray-800"
        >
          add your site →
        </motion.button>
      </footer>
    </motion.main>
  );
}