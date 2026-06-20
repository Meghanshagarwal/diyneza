// City landing pages for local-intent SEO ("restaurant POS in <city>").
export interface City {
  slug: string;
  name: string;
}

export const cities: City[] = [
  { slug: "delhi", name: "Delhi" },
  { slug: "mumbai", name: "Mumbai" },
  { slug: "bangalore", name: "Bangalore" },
  { slug: "hyderabad", name: "Hyderabad" },
  { slug: "pune", name: "Pune" },
  { slug: "chennai", name: "Chennai" },
  { slug: "kolkata", name: "Kolkata" },
  { slug: "ahmedabad", name: "Ahmedabad" },
  { slug: "jaipur", name: "Jaipur" },
  { slug: "gurgaon", name: "Gurgaon" },
];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}
