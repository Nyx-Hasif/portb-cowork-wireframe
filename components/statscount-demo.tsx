import StatsCount from "@/components/ui/statscount";
import { Star, Calendar, Award, Users } from "lucide-react";

const stats = [
  {
    value: 4.9,
    suffix: "",
    label: "Google Review Rating",
    showDecimal: true,
    icon: <Star className="w-5 h-5" />,
  },
  {
    value: 50,
    suffix: "+",
    label: "Events Hosted",
    icon: <Calendar className="w-5 h-5" />,
  },
  {
    value: 5,
    suffix: "+",
    label: "Years of Service",
    icon: <Award className="w-5 h-5" />,
  },
  {
    value: 20,
    suffix: "+",
    label: "Community Partners",
    icon: <Users className="w-5 h-5" />,
  },
];

export default function StatsCountDemo() {
  return (
    <StatsCount
      stats={stats}
      title="Trusted By Creators"
      subtitle="Building the future of coworking, one workspace at a time"
    />
  );
}
