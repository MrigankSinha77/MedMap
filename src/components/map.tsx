'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css'
import "leaflet-defaulticon-compatibility";
import { Pharmacy } from '@/lib/types'
import MapViewUpdater from './map-view-updater';

interface MapProps {
  userLocation: {
    lat: number
    lng: number
  }
  pharmacies: (Pharmacy & { distance: number })[]
}

export default function Map({ userLocation, pharmacies }: MapProps) {
  return (
    <MapContainer center={[userLocation.lat, userLocation.lng]} zoom={13} scrollWheelZoom={false} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[userLocation.lat, userLocation.lng]}>
        <Popup>You are here</Popup>
      </Marker>
      {pharmacies.map((pharmacy) => (
        <Marker key={pharmacy.id} position={[pharmacy.location.lat, pharmacy.location.lng]}>
          <Popup>
            {pharmacy.name} <br /> {pharmacy.address}
          </Popup>
        </Marker>
      ))}
      <MapViewUpdater pharmacies={pharmacies} userLocation={userLocation} />
    </MapContainer>
  )
}
