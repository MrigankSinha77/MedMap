import { flagOutOfDateData, type FlagOutOfDateDataInput } from "@/ai/flows/flag-out-of-date-data";
import { AlertTriangle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export default async function StalenessIndicator(props: FlagOutOfDateDataInput) {
    const stalenessInfo = await flagOutOfDateData(props);

    if (!stalenessInfo.isOutOfDate) {
        return null;
    }

    return (
        <TooltipProvider>
            <Tooltip delayDuration={100}>
                <TooltipTrigger>
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                </TooltipTrigger>
                <TooltipContent>
                    <p className="max-w-xs">{stalenessInfo.reason}</p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
