export type PackageDetailsType = {
    name: string;
    description: string;
    days: number;
    people: number;
    starRating: number;
    price: number;
    imageUrl: string;
    map?: string; // Optional map URL
    subDetails?: {
      title: string;
      description: string;
      imageUrl?: string;
    }[];
    season: string;
  };
  