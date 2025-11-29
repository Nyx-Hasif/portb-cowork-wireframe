"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  EnvelopeIcon,
  ArchiveBoxIcon,
  BellAlertIcon,
} from "@heroicons/react/24/outline";

const addOns = [
  { id: 1, icon: EnvelopeIcon, title: "Mail Handling", price: "RM 20 / month" },
  {
    id: 2,
    icon: ArchiveBoxIcon,
    title: "Parcel Storage",
    price: "RM 30 / month",
  },
  {
    id: 3,
    icon: BellAlertIcon,
    title: "Mail Notifications",
    price: "RM 10 / month",
  },
];

const BillingAddress = () => {
  return (
    <section className="w-full overflow-x-hidden bg-[#f9fafb] py-10 md:py-20">
      <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* === HEADER === */}
        <div className="w-full max-w-full px-4 sm:px-6 md:px-8">
          <div className="text-center space-y-4 mb-10 md:mb-16">
            <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-snug">
              Billing Your Address
            </h1>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              Get your business address from as low as RM 1 per day at
              Kota&nbsp;Bharu.
            </p>

            <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
              No deposit. Cancel anytime. Annual plan saves you more.
            </p>
          </div>
        </div>

        {/* === MAIN GRID === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10 w-full max-w-full">
          {/* ---------- ADD‑ONS ---------- */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="w-full rounded-3xl bg-[#e9eef3] border border-gray-300 shadow-sm hover:shadow-lg transition-all duration-500 p-6 flex flex-col"
          >
            <div className="flex justify-between items-center flex-wrap gap-3 mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">Add‑Ons</h2>
              <p className="text-sm font-bold bg-gray-900 text-white px-3 py-1 rounded-full">
                Popular
              </p>
            </div>

            <div className="space-y-4">
              {addOns.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="flex justify-between items-center bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-400 hover:shadow-md transition-all duration-300 min-w-0"
                  >
                    <div className="flex items-center gap-4 text-gray-900 min-w-0">
                      <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200 flex-shrink-0">
                        <Icon className="w-5 h-5" />
                      </div>
                      <p className="font-medium truncate">{item.title}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-700 whitespace-nowrap ml-2">
                      {item.price}
                    </p>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* ---------- OFFICIAL BUSINESS ADDRESS ---------- */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="w-full rounded-3xl bg-[#e9eef3] border border-gray-300 shadow-sm hover:shadow-lg transition-all duration-500 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div
              className="flex flex-wrap justify-between items-center 
                         border-b border-gray-200 px-4 sm:px-6 md:px-8 py-6 gap-2 w-full min-w-0"
            >
              <h2
                className="text-2xl md:text-3xl font-semibold text-gray-900 
                           whitespace-normal break-words flex-shrink"
              >
                Official Business Address
              </h2>
              <span className="text-sm font-bold bg-gray-900 text-white px-3 py-1 rounded-full flex-shrink-0">
                Best Value
              </span>
            </div>

            {/* Small description */}
            <div className="px-4 sm:px-6 md:px-8 py-4 text-gray-700 text-lg">
              Registered Address + Mail Pickup
            </div>

            {/* Price */}
            <div className="text-center py-8 px-2">
              <h3 className="text-5xl md:text-6xl font-bold text-gray-900">
                RM 365
              </h3>
              <p className="text-gray-600 text-lg md:text-xl">
                / year — ≈ RM 1 / day
              </p>
            </div>

            {/* Features */}
            <div className="px-4 sm:px-6 md:px-8 py-4 text-gray-800 space-y-3 text-lg border-t border-gray-200">
              <div className="flex items-start gap-3 leading-snug">
                <span>✅</span>
                <p>Official business address</p>
              </div>
              <div className="flex items-start gap-3 leading-snug">
                <span>✅</span>
                <p>Mail collection (self‑pickup)</p>
              </div>
              <div className="flex items-start gap-3 leading-snug">
                <span>✅</span>
                <p>Dashboard & notifications</p>
              </div>
            </div>

            {/* Buttons */}
            <div
              className="flex flex-col sm:flex-row justify-between items-center gap-3 
                         px-4 sm:px-6 md:px-8 py-6 border-t border-gray-200 w-full"
            >
              <button className="w-full sm:w-auto px-5 py-2 rounded-md border border-gray-900 text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition">
                Get This Plan
              </button>
              <button className="w-full sm:w-auto px-5 py-2 rounded-md border border-gray-900 text-gray-900 font-medium hover:bg-gray-900 hover:text-white transition">
                Call 011‑12345678
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default BillingAddress;
