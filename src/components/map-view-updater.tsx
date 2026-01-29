'use client'

import { useMap } from 'react-leaflet'
import { LatLngBounds } from 'leaflet'
import { Pharmacy } from '@/lib/types'

interface MapViewUpdaterProps {
  pharmacies: (Pharmacy & { distance: number })[]
  userLocation: {
    lat: number
    lng: number
  }
}

export default function MapViewUpdater({ pharmacies, userLocation }: MapViewUpdaterProps) {
  const map = useMap()

  if (pharmacies.length > 0) {
    const bounds = new LatLngBounds(
      pharmacies.map((p) => [p.location.lat, p.location.lng])
    )
    if (userLocation) {
      bounds.extend([userLocation.lat, userLocation.lng])
    }
    map.fitBounds(bounds, { padding: [50, 50] })
  }

  return null
}
