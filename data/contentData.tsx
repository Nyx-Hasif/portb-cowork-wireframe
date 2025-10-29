import {
  MeetingRoomContent,
  FixedDeskContent,
  CommonAreaContent,
  GreenAreaContent,
  SpaceEventContent,
  CoffeeBreaksContent,
} from "./content";

export const spaceStationsData = [
  {
    category: "Meeting Room",
    title: "Professional Spaces",
    src: "https://images.unsplash.com/photo-1579488081757-b212dbd6ee72?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=688",
    content: <MeetingRoomContent />,
  },
  {
    category: "Fixed Desk",
    title: "Your Dedicated Space",
    src: "https://images.unsplash.com/photo-1705417272217-490f4511abeb?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1171",
    content: <FixedDeskContent />,
  },
  {
    category: "Common Area",
    title: "Connect & Collaborate",
    src: "https://images.unsplash.com/photo-1613901693624-ecada26e7d11?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    content: <CommonAreaContent />,
  },
  {
    category: "Green Area",
    title: "Nature Meets Work",
    src: "https://images.unsplash.com/photo-1551733186-ef2fa2d99a1c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=735",
    content: <GreenAreaContent />,
  },
  {
    category: "Space Event",
    title: "Host with Impact",
    src: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    content: <SpaceEventContent />,
  },
  {
    category: "Coffee Breaks",
    title: "Fuel Your Day",
    src: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=687",
    content: <CoffeeBreaksContent />,
  },
];
