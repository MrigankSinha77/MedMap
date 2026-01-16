import type { Medicine, Pharmacy } from "./types";
import { subHours, subDays } from "date-fns";

export const medicines: Medicine[] = [
  { id: "1", name: "Paracetamol 500mg", composition: "Paracetamol", brand: "Calpol" },
  { id: "2", name: "Ibuprofen 200mg", composition: "Ibuprofen", brand: "Advil" },
  { id: "3", name: "Amoxicillin 250mg", composition: "Amoxicillin", brand: "Amoxil" },
  { id: "4", name: "Loratadine 10mg", composition: "Loratadine", brand: "Claritin" },
  { id: "5", name: "Metformin 500mg", composition: "Metformin", brand: "Glucophage" },
];

export const pharmacies: Pharmacy[] = [
  {
    id: "p1",
    name: "Downtown Pharmacy",
    address: "123 Main St, Cityville",
    location: { lat: 34.0522, lng: -118.2437 },
    isVerified: true,
    typicalUpdateInterval: "daily",
    medicines: [
      { medicineId: "1", stock: "available", lastUpdated: subHours(new Date(), 2).toISOString() },
      { medicineId: "2", stock: "limited", lastUpdated: subHours(new Date(), 4).toISOString() },
      { medicineId: "4", stock: "available", lastUpdated: subHours(new Date(), 1).toISOString() },
    ],
  },
  {
    id: "p2",
    name: "Uptown Health",
    address: "456 Oak Ave, Cityville",
    location: { lat: 34.0622, lng: -118.2537 },
    isVerified: true,
    typicalUpdateInterval: "daily",
    medicines: [
      { medicineId: "1", stock: "out-of-stock", lastUpdated: subHours(new Date(), 8).toISOString() },
      { medicineId: "2", stock: "available", lastUpdated: subHours(new Date(), 1).toISOString() },
      { medicineId: "3", stock: "limited", lastUpdated: subDays(new Date(), 3).toISOString() }, // Intentionally stale
      { medicineId: "5", stock: "available", lastUpdated: subHours(new Date(), 5).toISOString() },
    ],
  },
  {
    id: "p3",
    name: "Suburb Wellness",
    address: "789 Pine Ln, Suburbia",
    location: { lat: 34.1522, lng: -118.4437 },
    isVerified: false,
    typicalUpdateInterval: "weekly",
    medicines: [
      { medicineId: "4", stock: "available", lastUpdated: subDays(new Date(), 2).toISOString() },
      { medicineId: "5", stock: "available", lastUpdated: subDays(new Date(), 1).toISOString() },
    ],
  },
  {
    id: "p4",
    name: "Metro Meds",
    address: "101 Metro Blvd, Metropolis",
    location: { lat: 34.055, lng: -118.24 },
    isVerified: true,
    typicalUpdateInterval: "daily",
    medicines: [
      { medicineId: "1", stock: "limited", lastUpdated: subHours(new Date(), 3).toISOString() },
      { medicineId: "3", stock: "available", lastUpdated: subHours(new Date(), 6).toISOString() },
      { medicineId: "5", stock: "out-of-stock", lastUpdated: subHours(new Date(), 12).toISOString() },
    ],
  },
];
