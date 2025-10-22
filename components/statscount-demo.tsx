import StatsCount from "@/components/ui/statscount";

const stats = [
  {
    value: 5,
    suffix: "",
    label: "Google Review Rating",
    showDecimal: true, // ✅ Show 5.0
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
      title="TRUSTED BY CREATORS AND INNOVATORS"
      showDividers={true}
    />
  );
}
