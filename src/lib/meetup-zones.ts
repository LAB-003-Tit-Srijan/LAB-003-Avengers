export interface MeetupZone {
  id: string;
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  isSecure: boolean;
  type: "Library" | "Cafe" | "Canteen" | "Gate" | "Lounge";
}

export const CAMPUS_MEETUP_ZONES: MeetupZone[] = [
  {
    id: "mz-1",
    name: "Central Library Plaza",
    description: "CCTV monitored area with high student footfall. Recommended for electronics.",
    latitude: 12.9716,
    longitude: 77.5946,
    isSecure: true,
    type: "Library",
  },
  {
    id: "mz-2",
    name: "Main Canteen Entrance",
    description: "Busy area near the security post. Good for daytime exchanges.",
    latitude: 12.9721,
    longitude: 77.5951,
    isSecure: true,
    type: "Canteen",
  },
  {
    id: "mz-3",
    name: "Student Activity Center Lounge",
    description: "Indoor seating with charging points and Wi-Fi. Safe and comfortable.",
    latitude: 12.9712,
    longitude: 77.5939,
    isSecure: true,
    type: "Lounge",
  },
  {
    id: "mz-4",
    name: "North Campus Gate",
    description: "Open area near the bus stop. Moderate footfall.",
    latitude: 12.9735,
    longitude: 77.596,
    isSecure: false,
    type: "Gate",
  },
];
