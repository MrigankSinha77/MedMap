"use client";

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import SearchSection from "@/components/search-section";
import { Pharmacy } from '@/lib/types';

const Map = dynamic(() => import('@/components/map'), { 
  ssr: false, 
  loading: () => <p>Loading map...</p> 
});

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [isLocating, setIsLocating] = useState(true);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [filteredPharmacies, setFilteredPharmacies] = useState<(Pharmacy & { distance: number })[]>([]);

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

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <SearchSection 
            searchTerm={searchTerm}
            onSearchTermChange={setSearchTerm}
            userLocation={userLocation}
            isLocating={isLocating}
            locationError={locationError}
            handleGetLocation={handleGetLocation}
            onPharmaciesChange={setFilteredPharmacies}
          />
        </div>
        <div>
          {userLocation && <Map userLocation={userLocation} pharmacies={filteredPharmacies} />}
        </div>
      </div>
    </div>
  );
}
