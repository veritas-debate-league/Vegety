import Navbar from "@/components/Navbar";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-b from-brand-50 to-white">
        <section className="container-x grid items-center gap-12 pt-40 pb-12 lg:grid-cols-2 lg:pt-44 lg:pb-20">
          <div className="order-2 lg:order-1">
            <div className="h-12 w-11/12 animate-pulse rounded-lg bg-brand-100" />
            <div className="mt-4 h-12 w-3/4 animate-pulse rounded-lg bg-brand-100" />
            <div className="mt-7 h-4 w-full max-w-md animate-pulse rounded bg-brand-100/70" />
            <div className="mt-3 h-4 w-4/5 max-w-md animate-pulse rounded bg-brand-100/70" />
            <div className="mt-9 h-12 w-40 animate-pulse rounded-full bg-brand-100" />
          </div>
          <div className="order-1 mx-auto aspect-square w-full max-w-md animate-pulse rounded-full bg-brand-100 lg:order-2" />
        </section>
      </main>
    </>
  );
}
