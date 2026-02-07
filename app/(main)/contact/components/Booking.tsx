"use client";
import React, { useState } from "react";
import { motion, Variants, Easing } from "framer-motion";
import toast from "react-hot-toast";
import { Loader2, CheckCircle, Send } from "lucide-react";

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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });

  // ✅ Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  // ✅ Reset form
  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    });
    setSelectedValue("");
  };

  // ✅ Handle form submission via API
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate all required fields
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.company.trim() ||
      !selectedValue ||
      !formData.message.trim()
    ) {
      toast.error("Sila isi semua ruangan yang diperlukan");
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Sila masukkan email yang sah");
      return;
    }

    setIsSubmitting(true);

    try {
      // ✅ Submit via API route
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          company: formData.company.trim(),
          space_type: selectedValue,
          message: formData.message.trim(),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message");
      }

      // Success!
      setIsSuccess(true);
      toast.success(
        "Mesej berjaya dihantar! Kami akan hubungi anda dalam masa 24 jam.",
        {
          duration: 5000,
          icon: "🎉",
        }
      );

      // Reset form
      resetForm();

      // Reset success state after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Gagal menghantar mesej. Sila cuba lagi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#fafafa] lg:min-h-screen text-gray-800 py-10 px-6">
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
          onSubmit={handleSubmit}
          className="bg-white border border-gray-200 rounded-2xl p-10 space-y-8 shadow-md hover:shadow-lg transition-shadow duration-300"
        >
          <motion.header variants={fadeUp} custom={0} className="space-y-2">
            <h2 className="text-3xl md:text-4xl font-semibold text-gray-900">
              Book a Tour or Get Information
            </h2>
            <p className="text-gray-500 text-base leading-relaxed">
              Fill out the form below. We will respond within 24 hours.
            </p>
          </motion.header>

          {/* ✅ Success Message */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl text-green-700"
            >
              <CheckCircle size={20} />
              <span className="font-medium">Mesej berjaya dihantar!</span>
            </motion.div>
          )}

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
                label: "Phone Number",
                type: "tel",
                id: "phone",
                placeholder: "+6014 329 8981",
              },
              {
                label: "Company / Organization",
                type: "text",
                id: "company",
                placeholder: "PortB Cowork",
              },
            ].map((f, i) => (
              <motion.div key={f.id} variants={fadeUp} custom={i + 2}>
                <label
                  htmlFor={f.id}
                  className="block font-medium text-sm mb-2"
                >
                  {f.label} <span className="text-red-500">*</span>
                </label>
                <input
                  type={f.type}
                  id={f.id}
                  placeholder={f.placeholder}
                  value={formData[f.id as keyof typeof formData]}
                  onChange={handleInputChange}
                  disabled={isSubmitting}
                  required
                  className="w-full rounded-md border border-gray-300 py-2.5 px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent bg-white disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Select */}
          <motion.div variants={fadeUp} custom={3}>
            <label htmlFor="type" className="block font-medium text-sm mb-2">
              Choose a Space <span className="text-red-500">*</span>
            </label>
            <select
              id="type"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              disabled={isSubmitting}
              required
              className="w-full rounded-md border border-gray-300 py-2.5 px-3 text-sm bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
            >
              <option value="">Select an option</option>
              <option value="meeting-room">Meeting Room</option>
              <option value="fixed-desk">Fixed Desk</option>
              <option value="common-room">Common Room</option>
              <option value="green-area">Green Area</option>
              <option value="event-space">Event Space</option>
              <option value="other">Other</option>
            </select>
          </motion.div>

          {/* Message */}
          <motion.div variants={fadeUp} custom={4}>
            <label htmlFor="message" className="block font-medium text-sm mb-2">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows={4}
              placeholder="Write your message here..."
              value={formData.message}
              onChange={handleInputChange}
              disabled={isSubmitting}
              required
              className="w-full rounded-md border border-gray-300 py-3 px-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:border-transparent bg-white resize-none disabled:bg-gray-100 disabled:cursor-not-allowed transition-colors"
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
              disabled={isSubmitting}
              className="bg-gray-900 text-white px-8 py-2.5 rounded-md font-medium hover:bg-gray-700 w-full md:w-auto shadow-sm hover:shadow-md cursor-pointer active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Menghantar...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Send Message
                </>
              )}
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
                value: "MEZZANINE FLOOR,PT 178-179,Jalan Hamzah,SEKSYEN 19,15050 Kota Bharu,Kelantan",
              },
              { icon: "📞", label: "Phone", value: "+6014 329 8981" },
              { icon: "✉️", label: "Email", value: "helloportb@gmail.com" },
              {
                icon: "⏰",
                label: "Operating Hours",
                value: "Sun – Thu (9 AM – 6 PM) • Fri & Sat  (by request)",
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
