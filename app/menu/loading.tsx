import Navbar from "@/components/Navbar";

export default function Loading() {
  return (
    <>
      <Navbar />
      <main className="bg-gradient-to-b from-brand-50 to-white">
        <section className="container-x pt-40 pb-10 text-center lg:pt-44">
          <div className="mx-auto h-3 w-24 rounded bg-brand-100" />
          <div className="mx-auto mt-5 h-11 w-80 max-w-full rounded-lg bg-brand-100" />
          <div className="mx-auto mt-5 h-4 w-72 max-w-full rounded bg-brand-100/70" />
          <div className="mx-auto mt-10 h-14 w-full max-w-lg rounded-full bg-brand-100/80" />
        </section>
        <section className="container-x pb-24 pt-10">
          <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="rounded-xl2 bg-white p-3 shadow-soft">
                <div className="aspect-[5/4] animate-pulse rounded-2xl bg-brand-100" />
                <div className="px-2 py-4">
                  <div className="h-4 w-2/3 animate-pulse rounded bg-brand-100" />
                  <div className="mt-3 h-3 w-full animate-pulse rounded bg-brand-100/70" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
