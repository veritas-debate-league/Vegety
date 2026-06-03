import type { MenuItem } from "./types";

// Mock menu — same shape the webhook returns.
// Sheet columns (row 1 headers): name | category | price | image | description
// (id is generated server-side for React keys; the sheet has no id/rating columns.)
const IMG = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=600&q=70`;

export const MOCK_MENU: MenuItem[] = [
  { id: "1", name: "Chicken Salad with Avocado Toast", category: "Salad", price: 10.5, image: IMG("photo-1512621776951-a57141f2eefd"), description: "Grilled chicken, ripe avocado and crisp greens on toasted sourdough." },
  { id: "2", name: "Tuna Salad with Spicy Cucumber", category: "Salad", price: 13.0, image: IMG("photo-1467003909585-2f8a72700288"), description: "Seared tuna, chilli cucumber and a sesame-soy dressing." },
  { id: "3", name: "Salted Egg Salad with Curry Sauce", category: "Salad", price: 12.8, image: IMG("photo-1490645935967-10de6ba17061"), description: "Soft salted egg, mixed leaves and a mild curry drizzle." },
  { id: "4", name: "Green Goddess Bowl", category: "Bowl", price: 11.9, image: IMG("photo-1512621776951-a57141f2eefd"), description: "Quinoa, broccoli, edamame and a herby green dressing." },
  { id: "5", name: "Salmon Poke Bowl", category: "Bowl", price: 14.5, image: IMG("photo-1546069901-ba9599a7e63c"), description: "Fresh salmon, avocado, rice and pickled vegetables." },
  { id: "6", name: "Roasted Veg Buddha Bowl", category: "Bowl", price: 10.9, image: IMG("photo-1543339308-43e59d6b73a6"), description: "Roasted seasonal vegetables over wholegrain rice." },
  { id: "7", name: "Berry Spinach Smoothie", category: "Drinks", price: 5.5, image: IMG("photo-1502741224143-90386d7f8c82"), description: "Mixed berries, spinach and banana blended with oat milk." },
  { id: "8", name: "Green Detox Juice", category: "Drinks", price: 5.0, image: IMG("photo-1610970881699-44a5587cabec"), description: "Cucumber, apple, celery and lime cold-pressed juice." },
  { id: "9", name: "Avocado Toast Plate", category: "Breakfast", price: 8.5, image: IMG("photo-1525351484163-7529414344d8"), description: "Smashed avocado, chilli flakes and poached egg on rye." },
  { id: "10", name: "Overnight Oats & Berries", category: "Breakfast", price: 6.9, image: IMG("photo-1517673400267-0251440c45dc"), description: "Creamy oats soaked in almond milk with fresh berries." },
  { id: "11", name: "Beef Salad", category: "Salad", price: 13.5, image: IMG("photo-1490474418585-ba9bad8fd0ea"), description: "Lean beef strips with tangy sesame oil and fresh leaves." },
  { id: "12", name: "Nut & Egg Salad", category: "Salad", price: 11.2, image: IMG("photo-1505253716362-afaea1d3d1af"), description: "Savoury nuts, soft egg and crunchy greens." },
];
