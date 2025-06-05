export type Cat = {
  id: string;
  url: string;
  width?: number;
  height?: number;
  breeds: Breed[];
};

export type Breed = {
  id: string;
  name: string;
  description: string;
  temperament: string;
  origin: string;
  life_span: string;
  alt_names?: string;
  weight: {
    imperial: string;
    metric: string;
  };
  image?: {
    id: string;
    url: string;
    width: number;
    height: number;
  };
  // Characteristics (0-5 scale)
  adaptability: number;
  affection_level: number;
  child_friendly: number;
  dog_friendly: number;
  energy_level: number;
  grooming: number;
  health_issues: number;
  intelligence: number;
  shedding_level: number;
  social_needs: number;
  stranger_friendly: number;
  vocalisation: number;

  // Boolean flags (0 or 1)
  indoor: number;
  lap: number;
  experimental: number;
  hairless: number;
  natural: number;
  rare: number;
  rex: number;
  suppressed_tail: number;
  short_legs: number;
  hypoallergenic: number;

  // URLs
  wikipedia_url?: string;
  cfa_url?: string;
  vetstreet_url?: string;
  vcahospitals_url?: string;

  // Country information
  country_code?: string;
  country_codes?: string;
  reference_image_id?: string;
};

export type FavouriteCat = {
  id: number;
  image_id: string;
  image: {
    id: string;
    url: string;
  };
  sub_id: string | null;
  created_at: string;
  user_id: string;
};
