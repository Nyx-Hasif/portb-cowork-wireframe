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
    <section className="py-16 md:py-20 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-white/10 bg-black overflow-hidden">
          {/* Section 1: The Value Statement (Left) */}
          <div className="lg:col-span-7 p-8 md:p-16 border-b lg:border-b-0 lg:border-r border-white/5 relative overflow-hidden bg-zinc-900">
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-[0.6em] text-gray-500 mb-8 block">
                Efficiency Model
              </span>

              <div className="mb-12">
                <h2 className="text-5xl md:text-7xl lg:text-[8rem] font-serif text-white leading-none tracking-tighter mb-4">
                  RM<span className="italic text-gray-500">1</span>
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl font-light text-gray-400 tracking-tight uppercase">
                  Per day. The ultimate business <br />
                  address at Kota Bharu.
                </p>
              </div>

              <div className="space-y-4 max-w-sm">
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gray-500">
                  <Zap size={14} className="text-white" /> Zero Deposit
                </div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gray-500">
                  <Zap size={14} className="text-white" /> Cancel Anytime
                </div>
                <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-gray-500">
                  <Zap size={14} className="text-white" /> Annual Savings
                </div>
              </div>
            </div>

            <div className="absolute top-0 right-0 w-1/2 h-full bg-white/[0.02] -skew-x-12 translate-x-1/2"></div>
          </div>

          {/* Section 2: The Ledger (Right) */}
          <div className="lg:col-span-5 flex flex-col">
            {/* Top Tier: Official Address */}
            <div className="p-8 md:p-12 border-b border-white/5 bg-black group">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-xl md:text-2xl font-serif text-white mb-2">
                    Annual Access
                  </h3>
                  <p className="text-[10px] uppercase tracking-widest text-gray-500">
                    Business Address + Mail Pickup
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-3xl md:text-4xl font-serif text-white">
                    365
                  </span>
                  <span className="text-xs text-gray-500 ml-2">RM / YR</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {[
                  "Official business address",
                  "Mail collection (self-pickup)",
                  "Dashboard & notifications",
                ].map((feat, i) => (
                  <li
                    key={i}
                    className="flex items-center gap-3 text-xs text-gray-400 uppercase tracking-widest"
                  >
                    <ShieldCheck size={14} className="text-white/20" /> {feat}
                  </li>
                ))}
              </ul>

              <button className="w-full group/btn py-4 bg-white text-black text-[10px] uppercase tracking-[0.5em] font-bold hover:bg-gray-200 transition-all duration-500 flex items-center justify-center gap-4 shadow-xl">
                Initialize Plan{" "}
                <ArrowRight
                  size={14}
                  className="group-hover/btn:translate-x-2 transition-transform"
                />
              </button>
            </div>

            {/* Bottom Tier: Add-ons */}
            <div className="p-8 md:p-12 bg-zinc-900 flex-1">
              <h4 className="text-[10px] uppercase tracking-[0.4em] text-gray-500 mb-8">
                Optional Expansions
              </h4>
              <div className="space-y-5">
                {addOns.map((item) => (
                  <div
                    key={item.id}
                    className="flex justify-between items-center group/item cursor-default"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-gray-600 group-hover/item:text-white transition-colors">
                        {item.icon}
                      </div>
                      <span className="text-xs uppercase tracking-widest text-gray-500 group-hover/item:text-white transition-colors">
                        {item.title}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="h-px w-6 bg-white/5 group-hover/item:w-10 transition-all"></div>
                      <span className="text-xs font-bold text-white">
                        RM {item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Support */}
        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 opacity-40">
          <p className="text-[10px] uppercase tracking-widest text-white">
            Pricing Subject to GST if applicable
          </p>
          <div className="flex gap-6 flex-wrap justify-center">
            <span className="text-[10px] uppercase tracking-widest text-white">
              Call: 011-12345678
            </span>
            <span className="text-[10px] uppercase tracking-widest text-white">
              Support: desk@portb.com
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BillingAddress;
