"use client";
import React, { useState } from "react";
import { motion, Variants, Easing } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: [0.25, 0.46, 0.45, 0.94] as Easing,
    },
  }),
};

const Booking = () => {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <section className="bg-[#fafafa] text-gray-800 py-20 px-6">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12"
      >
        {/* ---------- FORM ---------- */}
        <motion.form
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          className="bg-white border border-gray-200 rounded-2xl p-10 space-y-8 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <motion.header variants={fadeUp} custom={0} className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Book a Tour or Get Information
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Fill out the form below. We’ll respond within 24 hours.
            </p>
          </motion.header>

          {/* Inputs */}
          <motion.div
            variants={fadeUp}
            custom={1}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {[
              {
                label: "Name",
                type: "text",
                id: "name",
                placeholder: "Your name",
              },
              {
                label: "Email",
                type: "email",
                id: "email",
                placeholder: "you@email.com",
              },
              {
                label: "Phone Number",
                type: "tel",
                id: "phone",
                placeholder: "+6014 329 8981",
              },
              {
                label: "Company / Organization",
                type: "text",
                id: "company",
                placeholder: "PortB Cowork",
              },
            ].map((f, i) => (
              <motion.div key={f.id} variants={fadeUp} custom={i + 2}>
                <label
                  htmlFor={f.id}
                  className="block font-medium text-sm mb-2"
                >
                  {f.label}
                </label>
                <input
                  type={f.type}
                  id={f.id}
                  placeholder={f.placeholder}
                  className="w-full rounded-md border border-gray-300 py-2.5 px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700 bg-white"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Select */}
          <motion.div variants={fadeUp} custom={3}>
            <label htmlFor="type" className="block font-medium text-sm mb-2">
              Choose a Space
            </label>
            <select
              id="type"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              className="w-full rounded-md border border-gray-300 py-2.5 px-3 text-sm bg-white text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-700"
            >
              <option value="">Select an option</option>
              <option value="meeting-room">Meeting Room</option>
              <option value="fixed-desk">Fixed Desk</option>
              <option value="common-room">Common Room</option>
              <option value="event-space">Event Space</option>
            </select>
          </motion.div>

          {/* Message */}
          <motion.div variants={fadeUp} custom={4}>
            <label htmlFor="message" className="block font-medium text-sm mb-2">
              Message
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Write your message here..."
              className="w-full rounded-md border border-gray-300 py-3 px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-700 bg-white"
            ></textarea>
          </motion.div>

          {/* CTA */}
          <motion.div
            variants={fadeUp}
            custom={5}
            className="border-t border-gray-100 pt-6 flex flex-col md:flex-row items-center justify-between gap-4"
          >
            <p className="text-gray-500 text-sm text-center md:text-left">
              Subscribe to our newsletter for updates and news.
            </p>
            <button
              type="submit"
              className="bg-gray-900 text-white px-8 py-2.5 rounded-md font-medium hover:bg-gray-700 transition-colors w-full md:w-auto shadow-sm hover:shadow-md"
            >
              Send Message
            </button>
          </motion.div>
        </motion.form>

        {/* ---------- CONTACT INFO ---------- */}
        <motion.aside
          initial="hidden"
          whileInView="visible"
          variants={fadeUp}
          custom={2}
          className="bg-white border border-gray-200 rounded-2xl h-max p-8 space-y-8 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <header className="border-b border-gray-100 pb-5">
            <h2 className="text-3xl font-semibold text-gray-900">
              Contact Information
            </h2>
          </header>

          <div className="space-y-6">
            {[
              {
                icon: "📍",
                label: "Address",
                value: "Siti Square, Kota Bharu",
              },
              { icon: "📞", label: "Phone", value: "+6014 329 8981" },
              { icon: "✉️", label: "Email", value: "helloportb@gmail.com" },
              {
                icon: "⏰",
                label: "Operating Hours",
                value: "Sun – Thu (9 AM – 5 PM) • Sat (by request)",
              },
            ].map((c, i) => (
              <motion.div
                key={c.label}
                variants={fadeUp}
                custom={i + 3}
                className="flex items-start gap-4 border-b last:border-none border-gray-100 pb-4"
              >
                <div className="text-2xl text-gray-500">{c.icon}</div>
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {c.label}
                  </h3>
                  <p className="text-gray-500 text-sm">{c.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.aside>
      </motion.div>
    </section>
  );
};

export default Booking;
