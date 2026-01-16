"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Search, MapPin, Loader2, ServerCrash } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import PharmacyCard from "@/components/pharmacy-card";
import { haversineDistance } from "@/lib/utils";
import { medicines, pharmacies } from "@/lib/data";
import type { Pharmacy } from "@/lib/types";

type UserLocation = {
  lat: number;
  lng: number;
};

export default function SearchSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [isLocating, setIsLocating] = useState(true);

  const handleGetLocation = () => {
    setIsLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocating(false);
      },
      (error) => {
        setLocationError(error.message);
        setIsLocating(false);
      }
    );
  };

  useEffect(() => {
    handleGetLocation();
  }, []);

  const filteredPharmacies = useMemo(() => {
    if (!pharmacies) return [];
    
    let results = pharmacies;

    if (searchTerm) {
        const lowercasedTerm = searchTerm.toLowerCase();
        const matchingMedicineIds = medicines
            .filter(med => 
                med.name.toLowerCase().includes(lowercasedTerm) ||
                med.composition.toLowerCase().includes(lowercasedTerm) ||
                med.brand.toLowerCase().includes(lowercasedTerm)
            )
            .map(med => med.id);

        results = results.filter(pharmacy => 
            pharmacy.medicines.some(med => matchingMedicineIds.includes(med.medicineId))
        );
    }
    
    if (userLocation) {
        return results
            .map(pharmacy => ({
                ...pharmacy,
                distance: haversineDistance(
                    [userLocation.lat, userLocation.lng],
                    [pharmacy.location.lat, pharmacy.location.lng]
                ),
            }))
            .sort((a, b) => a.distance - b.distance);
    }

    return results.map(p => ({ ...p, distance: -1 }));
  }, [searchTerm, userLocation]);

  return (
    <div className="mt-10">
      <div className="mx-auto mb-8 max-w-2xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by medicine name, composition, or brand..."
            className="w-full rounded-full pl-10 pr-4 py-6 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>
                {isLocating ? "Getting your location..." : userLocation ? "Showing results near you" : "Location access denied"}
            </span>
            {!userLocation && !isLocating && (
                <Button variant="link" size="sm" onClick={handleGetLocation}>
                    Retry
                </Button>
            )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLocating && (
            <>
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
                <Skeleton className="h-64 w-full" />
            </>
        )}

        {!isLocating && locationError && (
            <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                <ServerCrash className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">Could not get your location</h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">{locationError}</p>
                <Button onClick={handleGetLocation}>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Try Again
                </Button>
            </div>
        )}

        {!isLocating && filteredPharmacies.length === 0 && (
             <div className="col-span-full flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
                <Search className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold">No Results Found</h3>
                <p className="mb-4 mt-2 text-sm text-muted-foreground">
                    Try a different search term or check back later.
                </p>
            </div>
        )}
        
        {!isLocating && filteredPharmacies.map((pharmacy) => (
          <PharmacyCard key={pharmacy.id} pharmacy={pharmacy as Pharmacy & { distance: number }} />
        ))}
      </div>
    </div>
  );
}
