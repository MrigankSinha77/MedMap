import SearchSection from "@/components/search-section";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="mx-auto max-w-3xl text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Find Your Medicine, <span className="text-primary">Fast</span>.
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground">
          MedMap helps you locate nearby pharmacies with real-time stock
          information for the medicines you need.
        </p>
      </div>

      <SearchSection />
    </div>
  );
}
