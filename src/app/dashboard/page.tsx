import DashboardClient from "@/components/dashboard-client";

export default function DashboardPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8 md:py-12">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
          Pharmacy Dashboard
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Update medicine availability in real-time.
        </p>
      </div>
      <DashboardClient />
    </div>
  );
}
