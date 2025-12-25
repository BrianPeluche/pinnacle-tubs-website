export type HotTub = {
  id: number;
  name: string;
  description: string;
  capacity: string;
  price: string;
};

export const hotTubLineup: HotTub[] = [
  {
    id: 1,
    name: "Luxury Spa 6-Person",
    description:
      "Perfect for family gatherings with premium jet system and multi-color LED lighting.",
    capacity: "Seats 6 • 52 jets",
    price: "$8,999",
  },
  {
    id: 2,
    name: "Compact Relaxer 2-Person",
    description:
      "Intimate spa experience for couples with targeted hydrotherapy and low-profile cabinet.",
    capacity: "Seats 2 • 28 jets",
    price: "$4,499",
  },
  {
    id: 3,
    name: "Premium Series 8-Person",
    description:
      "Ultimate luxury with advanced features, dual lounge seating, and smartphone controls.",
    capacity: "Seats 8 • 72 jets",
    price: "$12,999",
  },
  {
    id: 4,
    name: "Essential 4-Person",
    description:
      "Great value with all the essentials, energy-efficient insulation, and easy maintenance.",
    capacity: "Seats 4 • 36 jets",
    price: "$5,999",
  },
];
