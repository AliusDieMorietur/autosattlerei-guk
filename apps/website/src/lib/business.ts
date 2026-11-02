export const BUSINESS = {
  name: "Autosattlerei Guk",
  legalName: "Autosattlerei Guk – Stanislav Guk",
  description:
    "Autosattlerei für individuelle Fahrzeuginnenausstattung, Neubezüge und Restaurierungen. Wir beziehen Sitze, Lenkräder, Türverkleidungen, Dachhimmel und komplette Innenräume – vom Oldtimer bis zum Sportwagen.",
  phone: "+49 176 61499059",
  email: "autosattler.guk@gmail.com",
  address: {
    streetAddress: "Frankfurter Chaussee 73",
    postalCode: "15370",
    addressLocality: "Fredersdorf-Vogelsdorf",
    addressRegion: "Brandenburg",
    addressCountry: "DE",
  },
  openingHours: [
    { dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"], opens: "10:00", closes: "17:00" },
    { dayOfWeek: ["Friday"], opens: "10:00", closes: "16:00" },
  ],
  socialProfiles: ["https://www.tiktok.com/@autosattlerei.guk1"],
} as const;
