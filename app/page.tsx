import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Hero, SpecialDish, FreshVeg, PopularMenu, Testimonials,
} from "@/components/landing";
import { fetchMenu } from "@/lib/fetch-menu";

// Render on the server per request so the popular-menu teaser reflects sheet edits live.
export const dynamic = "force-dynamic";

export default async function Home() {
  const menu = await fetchMenu();
  const popular = menu.slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <SpecialDish />
        <FreshVeg />
        <PopularMenu items={popular} />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
