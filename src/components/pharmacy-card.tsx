import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, CheckCircle, Clock } from "lucide-react";
import { medicines } from "@/lib/data";
import type { Pharmacy } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";
import StatusBadge from "./status-badge";
import StalenessIndicator from "./staleness-indicator";

type PharmacyCardProps = {
  pharmacy: Pharmacy & { distance: number };
};

export default function PharmacyCard({ pharmacy }: PharmacyCardProps) {
  return (
    <Card className={`flex h-full flex-col transition-all hover:shadow-lg bg-card/60 dark:bg-card/40 backdrop-blur-xl border ${!pharmacy.open ? 'grayscale' : ''}`}>
      <CardHeader>
        <CardTitle className="flex items-start justify-between">
          <span className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${pharmacy.open ? 'bg-green-500' : 'bg-red-500'}`}></span>
            {pharmacy.name}
          </span>
          {pharmacy.isVerified && (
            <Badge variant="secondary" className="flex items-center gap-1 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800">
              <CheckCircle className="h-3 w-3" />
              Verified
            </Badge>
          )}
        </CardTitle>
        <CardDescription className="flex flex-col gap-2">
            <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                {pharmacy.address}
            </span>
            {pharmacy.distance >= 0 && (
                 <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {pharmacy.distance.toFixed(1)} km away
                </span>
            )}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <h4 className="mb-2 font-semibold">Available Medicines:</h4>
        <div className="space-y-3">
          {pharmacy.medicines.map((item) => {
            const medicineDetails = medicines.find(m => m.id === item.medicineId);
            if (!medicineDetails) return null;

            return (
              <div key={item.medicineId} className="text-sm">
                <div className="flex items-center justify-between">
                    <span className="font-medium">{medicineDetails.name}</span>
                    <StatusBadge status={item.stock} />
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <span>Updated {formatDistanceToNow(new Date(item.lastUpdated), { addSuffix: true })}</span>
                    <StalenessIndicator
                        lastUpdated={item.lastUpdated}
                        typicalUpdateInterval={pharmacy.typicalUpdateInterval}
                    />
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
