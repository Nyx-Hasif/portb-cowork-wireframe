import { assets } from "@/assets/asset";
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
            assets.profile_maji.src,
          name: "Maji Rashid",
          handle: "@MajiRashid",
        },
        {
          description:
            "I visit Kota Bharu occasionally. When I'm there, I usually need to work every day. Port B is perfect--better than any coffee shop in the area. Very quiet, clean/modern facilities, solid IT infrastructure (fast/stable internet, stable/plentiful power), free coffee, space to eat lunch, and friendly/accommodating staff.",
          image:
            assets.profile_carl.src,
          name: "Carl Gross",
          handle: "@CarlGross",
        },
        {
          description:
            "convenient, not noisy. there is a plug near the fixed desk. happy to work. big table.",
          image:
            assets.profile_amirah.src, 
          name: "Amirah Syazwani",
          handle: "@AmirahSyazwani",
        },
        {
          description:
            "The best facilities for work, meetings or small functions. Comfortable, clean and affordable. Recommended for all.",
          image:
            assets.profile_ariff.src,
          name: "Ariff Azami",
          handle: "@AriffAzami",
        },
        {
          description: "Best. Comfortable place. Fast line. Can repeat again.",
          image:
            assets.profile_thaqif.src, 
          name: "Mohammad Thaqif Tahir",
          handle: "@Thaqif",
        },
      ]}
    />
  );
}
