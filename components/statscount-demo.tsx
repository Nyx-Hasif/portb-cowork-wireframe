import StatsCount from "@/components/ui/statscount";

const stats = [
  {
    value: 5,
    suffix: "",
    label: "Google Review Rating",
    showDecimal: true,
   
  },
  {
    value: 50,
    suffix: "+",
    label: "Events Hosted",
  
  },
  {
    value: 5,
    suffix: "+",
    label: "Years of Service",
  
  },
  {
    value: 20,
    suffix: "+",
    label: "Community Partners",
  
  },
];

export default function StatsCountDemo() {
  return (
    <StatsCount
      stats={stats}
      title="Trusted By Creators And Innovators"
      subtitle="Building the future of coworking, one workspace at a time" // ✅ Optional
      showDividers={false} // ✅ Clean look, no dividers
    />
  );
}
