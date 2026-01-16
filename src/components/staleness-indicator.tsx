"use client";

import { AlertTriangle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { differenceInHours, differenceInDays, parseISO } from "date-fns";

type StalenessIndicatorProps = {
  lastUpdated: string;
  typicalUpdateInterval: string;
};

export default function StalenessIndicator({
  lastUpdated,
  typicalUpdateInterval,
}: StalenessIndicatorProps) {
  const lastUpdatedDate = parseISO(lastUpdated);
  const now = new Date();
  let isOutOfDate = false;
  let reason = "";

  if (typicalUpdateInterval === "daily") {
    if (differenceInHours(now, lastUpdatedDate) > 24) {
      isOutOfDate = true;
      reason = "Data may be out of date. It is usually updated daily.";
    }
  } else if (typicalUpdateInterval === "weekly") {
    if (differenceInDays(now, lastUpdatedDate) > 7) {
      isOutOfDate = true;
      reason = "Data may be out of date. It is usually updated weekly.";
    }
  }

  if (!isOutOfDate) {
    return null;
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger>
          <AlertTriangle className="h-4 w-4 text-yellow-500" />
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs">{reason}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
