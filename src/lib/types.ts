export type Medicine = {
  id: string;
  name: string;
  composition: string;
  brand: string;
};

export type StockStatus = "available" | "limited" | "out-of-stock";

export type PharmacyMedicine = {
  medicineId: string;
  stock: StockStatus;
  lastUpdated: string; // ISO 8601 string
};

export type Pharmacy = {
  id: string;
  name: string;
  address: string;
  location: {
    lat: number;
    lng: number;
  };
  isVerified: boolean;
  open: boolean;
  medicines: PharmacyMedicine[];
  typicalUpdateInterval: string;
};
