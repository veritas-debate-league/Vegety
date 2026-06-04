export type MenuItem = {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  // false when the sheet's "out_of_menu" column is "yes" → shown as Unavailable.
  available: boolean;
};
