// components/skeletons/BookingSkeleton.tsx
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function BookingSkeleton() {
  return (
    <section className="bg-[#fafafa] lg:min-h-screen text-gray-800 py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12">
        {/* Form Skeleton */}
        <div className="bg-white border border-gray-200 rounded-2xl p-10 space-y-8 shadow-md">
          {/* Header */}
          <div className="space-y-2">
            <Skeleton height={40} width={400} />
            <Skeleton height={20} width={300} />
          </div>

          {/* Input fields (2 columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Skeleton height={45} />
            <Skeleton height={45} />
            <Skeleton height={45} />
            <Skeleton height={45} />
          </div>

          {/* Select */}
          <Skeleton height={45} />

          {/* Textarea */}
          <Skeleton height={120} />

          {/* Button */}
          <div className="border-t border-gray-100 pt-6 flex justify-between items-center">
            <Skeleton height={20} width={250} />
            <Skeleton height={45} width={150} borderRadius={8} />
          </div>
        </div>

        {/* Contact Info Skeleton */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8 space-y-8 shadow-md h-max">
          {/* Header */}
          <div className="border-b border-gray-100 pb-5">
            <Skeleton height={36} width={250} />
          </div>

          {/* Contact items */}
          <div className="space-y-6">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex items-start gap-4 border-b border-gray-100 pb-4"
              >
                <Skeleton circle height={40} width={40} />
                <div className="flex-1">
                  <Skeleton height={24} width={120} className="mb-2" />
                  <Skeleton height={16} width="90%" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
