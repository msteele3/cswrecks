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
    const chunkPattern = [3, 4];
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
      className="w-full h-full min-h-screen bg-gradient-to-tr from-yellow-200 to-blue-900 text-white transition-colors duration-300 flex items-center justify-center"
      style={{ fontFamily: "'Nova Square', sans-serif" }}
    >
      <div
        className="max-w-[950px] w-4/5 h-4/5 flex flex-col items-center p-6 bg-black/10 rounded-xl"
      >
        <section className="w-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-[1.5rem] sm:text-5xl font-extrabold sm:mb-2">CS Wrecks 🐝</h1>
          <p className="text-md max-w-2xl mx-auto pt-2">
            An unofficial directory of GT students and Alum&apos;s personal
            websites. Check them out, and feel free to add yours!
          </p>
        </section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-2xl my-2 sm:my-8 px-4"
        >
          <div className="relative">
            <input
              type="text"
              placeholder="search by name, site, or year"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-9 py-2 focus:outline-none rounded-full text-sm transition-colors duration-300 bg-black/25 focus:bg-black/15 border border-solid border-gray-300 text-gray-50 placeholder-gray-300"
            />
            <div className="absolute left-0 top-2.5">
              <svg
                className="ml-3 w-5 h-5 text-white"
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
          className="w-full pt-2 overflow-scroll max-w-4xl flex flex-col items-center h-[365px]"
        >
          {chunkedSites.map((rowSites, rowIndex) => (
            <div
              key={rowIndex}
              className="flex flex-wrap xs:flex-nowrap gap-3 mb-6 justify-center s:mb-10 text-center"
            >
              {rowSites.map((site) => (
                <motion.a
                  whileHover={{
                    scale: 1.1,
                    transition: { duration: 0.25, ease: "easeInOut" },
                  }}
                  key={site.website}
                  variants={item}
                  href={site.website.replace(/\/$/, "")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 inline-block w-fit text-md rounded-xl border sm:text-sm text-gray-300 hover:text-gray-100"
                >
                  <span className="text-lg font-bold">{site.name}</span>
                  <span className="hidden sm:inline ml-1 text-xs border p-0.5 rounded-full text-gray-300">
                    {site.year}
                  </span>
                  <br />
                  <span className="text-sm">
                    {site.website
                      .replace("https://", "")
                      .replace("http://", "")
                      .replace(/^www\./, "")
                      .replace(/\/$/, "")}
                  </span>
                </motion.a>
              ))}
            </div>
          ))}
        </motion.div>

        <footer className="h-24 relative sm:absolute bottom-0 w-full flex items-center justify-center">
          <div className="relative bottom-4 mt-10 flex gap-8">
            <motion.button
              whileHover={{
                scale: 1.15,
                transition: { duration: 0.15 },
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() =>
                window.open(
                  "https://github.com/msteele3/cswrecks/pulls",
                  "_blank",
                )
              }
              className="text-lg sm:text-sm px-6 py-2 rounded-full border transition-colors duration-200 text-white border-gray-300"
            >
              add your site →
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.15,
                transition: { duration: 0.15 },
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              onClick={() =>
                window.open("https://github.com/msteele3/cswrecks", "_blank")
              }
              className="hidden sm:block text-lg sm:text-sm px-6 py-2 rounded-full border transition-colors duration-200 text-white border-gray-300"
            >
              view source code →
            </motion.button>
          </div>
        </footer>
      </div>
    </motion.main>
  );
}