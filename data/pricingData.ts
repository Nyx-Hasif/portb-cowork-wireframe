import { assets } from "@/assets/asset";

export type Plan = "1 Hour" | "4 Hour" | "8 Hour" | "Weekly" | "Monthly" | "Yearly"; // ✅ Definisi jenis plan

export type PricingCard = { //typescript type annotation wajib gunakan untuk declare type of bocz of typescript stricion  
    id: number;
    image: string;
    category: string;
    description: string;
    pricing: Record<Plan, string>;
    list: string[];
};

export const cards = [
    {
        id: 1,
        image: assets.meeting_room,
        category: "Meeting Room",
        description: "Ideal for 6-10 people",
        pricing: {
            "1 Hour": "RM100",
            "4 Hour": "RM300",
            "8 Hour": "RM500",
            Weekly: "RM1000",
            Monthly: "RM2000",
            Yearly: "RM3000",
        },
        list: [
            "✅ 60 inches Smart Tv Display",
            "✅Whiteboard",
            "✅Projector Screen",
            "✅Ergonomic seating",
            "✅Air Conditioning",
            "✅High-Speed WiFi",
            "✅Natural Lightning",
            "✅Private entrance",
            "✅Power Supply",
        ],
    },
    {
        id: 2,
        image: assets.fixed_desk,
        category: "Fixed Desk",
        description: "Ideal for 1 person",
        pricing: {
            "1 Hour": "RM30/Day",
            "4 Hour": "RM30/Day",
            "8 Hour": "RM30/Day",
            Weekly: "RM500",
            Monthly: "RM800",
            Yearly: "RM1000",
        },
        list: [
      
            "✅Ergonomic seating",
            "✅Air Conditioning",
            "✅High-Speed WiFi",
            "✅Natural Lightning",
            "✅Power Supply",

          
        ],
    },
    {
        id: 3,
        image: assets.common_area,
        category: "Common Area",
        description: "Ideal for 6-10 people",
        pricing: {
            "1 Hour": "RM20/Day",
            "4 Hour": "RM20/Day",
            "8 Hour": "RM20/Day",
            Weekly: "RM300",
            Monthly: "RM500",
            Yearly: "RM800",
        },
        list: [
           
            "✅Common seating",
            "✅Air Conditioning",
            "✅High-Speed WiFi",
            "✅Natural Lightning",
            "✅Power Supply",
           
        ],
    },
    {
        id: 4,
        image: assets.green_area,
        category: "Green Area",
        description: "Ideal for 6-10 people",
        pricing: {
            "1 Hour": "RM200",
            "4 Hour": "RM300",
            "8 Hour": "RM500",
            Weekly: "RM1200",
            Monthly: "RM1800",
            Yearly: "RM10000",
        },
        list: [
            "✅ 60 inches Smart Tv Display",
            "✅Whiteboard",
            "✅Projector Screen",
            "✅Air Conditioning",
            "✅High-Speed WiFi",
            "✅Natural Lightning",
            "✅Power Supply",
        ],
    },
    {
        id: 5,
        image: assets.event_space_area,
        category: "Space Event",
        description: "Ideal for 6-10 people",
        pricing: {
            "1 Hour": "RM300",
            "4 Hour": "RM500",
            "8 Hour": "RM800",
            Weekly: "RM1500",
            Monthly: "RM2800",
            Yearly: "RM15000",
        },
        list: [
            "✅ 60 inches Smart Tv Display",
            "✅Whiteboard",
            "✅Projector Screen",
            "✅Air Conditioning",
            "✅High-Speed WiFi",
            "✅Natural Lightning",
            "✅Power Supply",
         
        ],
    },
];