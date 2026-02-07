import TestimonialCarousel from "./ui/testimonial-carousel";

export default function TestimonialCarouselDemo() {
  return (
    <TestimonialCarousel
      borderType="solid"
      data={[
        {
          description:
            "The best working space so far in kelantan. You can finish your task peacefully. Go have your lunch at common area with free flow coffee.. 100 extra points..😁",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
          name: "Maji Rashid",
          handle: "@MajiRashid",
        },
        {
          description:
            "I visit Kota Bharu occasionally. When I'm there, I usually need to work every day. Port B is perfect--better than any coffee shop in the area. Very quiet, clean/modern facilities, solid IT infrastructure (fast/stable internet, stable/plentiful power), free coffee, space to eat lunch, and friendly/accommodating staff.",
          image:
            "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
          name: "Carl Gross",
          handle: "@CarlGross",
        },
        {
          description:
            "convenient, not noisy. there is a plug near the fixed desk. happy to work. big table.",
          image:
            "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop", // Wanita professional berhijab dari Unsplash
          name: "Amirah Syazwani",
          handle: "@AmirahSyazwani",
        },
        {
          description:
            "The best facilities for work, meetings or small functions. Comfortable, clean and affordable. Recommended for all.",
          image:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
          name: "Ariff Azami",
          handle: "@AriffAzami",
        },
        {
          description: "Best. Comfortable place. Fast line. Can repeat again.",
          image:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop", // Lelaki Melayu muda dari Unsplash
          name: "Mohammad Thaqif Tahir",
          handle: "@Thaqif",
        },
      ]}
    />
  );
}
