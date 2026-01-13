"use client";
import React from "react";
import {
  Mail,
  Package,
  Bell,
  ShieldCheck,
  ArrowRight,
  Zap,
} from "lucide-react";

const addOns = [
  { id: 1, icon: <Mail size={18} />, title: "Mail Handling", price: "20" },
  { id: 2, icon: <Package size={18} />, title: "Parcel Storage", price: "30" },
  { id: 3, icon: <Bell size={18} />, title: "Digital Alerts", price: "10" },
];

const BillingAddress: React.FC = () => {
  return (
    <section className="py-20 bg-zinc-50 border-t border-zinc-200">
      <div className="max-w-7xl mx-auto px-6">
        {/* Main Grid Container - High Contrast Shadow */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-zinc-200 bg-white shadow-2xl overflow-hidden">
          {/* Section 1: The Value Statement (Left) - KEKAL DARK (Accent) */}
          <div className="lg:col-span-7 p-10 md:p-16 border-b lg:border-b-0 lg:border-r border-white/5 relative overflow-hidden bg-zinc-900">
            {/* Decorative Background Pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
                backgroundSize: "32px 32px",
              }}
            ></div>

            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.6em] text-zinc-400 mb-8 block font-bold">
                Efficiency Model
              </span>

              <div className="mb-12">
                <h2 className="text-5xl md:text-7xl lg:text-[8rem] font-serif text-white leading-none tracking-tighter mb-6">
                  RM<span className="italic text-zinc-500">1</span>
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl font-light text-zinc-300 tracking-tight uppercase leading-relaxed">
                  Per day. The ultimate business <br />
                  address at Kota Bharu.
                </p>
              </div>

              <div className="space-y-4 max-w-sm">
                <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-zinc-400">
                  <Zap size={14} className="text-white fill-white" /> Zero
                  Deposit
                </div>
                <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-zinc-400">
                  <Zap size={14} className="text-white fill-white" /> Cancel
                  Anytime
                </div>
                <div className="flex items-center gap-4 text-xs uppercase tracking-[0.3em] text-zinc-400">
                  <Zap size={14} className="text-white fill-white" /> Annual
                  Savings
                </div>
              </div>
            </div>

            {/* Abstract Shape */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-black via-transparent to-transparent opacity-50"></div>
          </div>

          {/* Section 2: The Ledger (Right) - TUKAR KE LIGHT THEME */}
          <div className="lg:col-span-5 flex flex-col bg-white">
            {/* Top Tier: Official Address */}
            <div className="p-10 md:p-14 border-b border-zinc-100 bg-white group flex-1">
              <div className="flex justify-between items-start mb-10">
                <div>
                  <h3 className="text-xl md:text-2xl font-serif text-zinc-900 mb-2">
                    Annual Access
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                    Business Address + Mail Pickup
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl md:text-4xl font-serif text-zinc-900">
                    365
                  </span>
                  <span className="text-xs text-zinc-400 ml-2 font-bold">
                    RM / YR
                  </span>
                </div>
              </div>

              <ul className="space-y-4 mb-10">
                {[
                  "Official business address",
                  "Mail collection (self-pickup)",
                  "Dashboard & notifications",
                ].map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-4 text-xs text-zinc-500 uppercase tracking-widest font-medium"
                  >
                    <ShieldCheck size={16} className="text-zinc-900" /> {feat}
                  </li>
                ))}
              </ul>

              {/* Button: Black bg on White card */}
              <button className="w-full group/btn py-5 bg-zinc-900 text-white text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-black transition-all duration-500 flex items-center justify-center gap-4 shadow-lg hover:shadow-xl hover:-translate-y-1">
                Initialize Plan{" "}
                <ArrowRight
                  size={14}
                  className="group-hover/btn:translate-x-2 transition-transform"
                />
              </button>
            </div>

            {/* Bottom Tier: Add-ons - Subtle Grey Background */}
            <div className="p-10 md:p-14 bg-zinc-50">
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-zinc-400 mb-6 font-bold">
                Optional Expansions
              </h4>
              <div className="space-y-6">
                {addOns.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center group/item cursor-default"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-zinc-400 group-hover/item:text-zinc-900 transition-colors">
                        {item.icon}
                      </div>
                      <span className="text-xs uppercase tracking-widest text-zinc-500 group-hover/item:text-zinc-900 transition-colors font-medium">
                        {item.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-px w-6 bg-zinc-200 group-hover/item:w-10 group-hover/item:bg-zinc-400 transition-all"></div>
                      <span className="text-xs font-serif font-bold text-zinc-900">
                        RM {item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

   
      </div>
    </section>
  );
};

export default BillingAddress;
