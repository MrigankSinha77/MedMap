import { Badge } from "@/components/ui/badge";
import type { StockStatus } from "@/lib/types";

type StatusBadgeProps = {
  status: StockStatus;
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const statusStyles = {
    available: "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-400 border-green-200 dark:border-green-800",
    limited: "bg-yellow-100 dark:bg-yellow-900/50 text-yellow-700 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800",
    "out-of-stock": "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-400 border-red-200 dark:border-red-800",
  };
  
  const statusText = {
    available: "Available",
    limited: "Limited",
    "out-of-stock": "Out of Stock",
  }

  return <Badge className={statusStyles[status]}>{statusText[status]}</Badge>;
}
