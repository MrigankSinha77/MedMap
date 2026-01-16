'use server';

/**
 * @fileOverview AI tool to flag medicine availability data that hasn't been updated in a reasonable timeframe.
 *
 * - flagOutOfDateData - A function that handles the process of flagging out-of-date medicine availability data.
 * - FlagOutOfDateDataInput - The input type for the flagOutOfDateData function.
 * - FlagOutOfDateDataOutput - The return type for the flagOutOfDateData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FlagOutOfDateDataInputSchema = z.object({
  medicineName: z.string().describe('The name of the medicine.'),
  pharmacyName: z.string().describe('The name of the pharmacy.'),
  lastUpdated: z.string().describe('The timestamp of the last update of the medicine availability data (ISO format).'),
  typicalUpdateInterval: z.string().describe('The typical update interval for this pharmacy (e.g., daily, weekly).'),
  availability: z.string().describe('Current availability status (available, limited, out of stock).'),
});
export type FlagOutOfDateDataInput = z.infer<typeof FlagOutOfDateDataInputSchema>;

const FlagOutOfDateDataOutputSchema = z.object({
  isOutOfDate: z.boolean().describe('Whether the medicine availability data is considered out of date.'),
  reason: z.string().describe('The reason why the data is flagged as out of date.'),
});
export type FlagOutOfDateDataOutput = z.infer<typeof FlagOutOfDateDataOutputSchema>;

export async function flagOutOfDateData(input: FlagOutOfDateDataInput): Promise<FlagOutOfDateDataOutput> {
  return flagOutOfDateDataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'flagOutOfDateDataPrompt',
  input: {schema: FlagOutOfDateDataInputSchema},
  output: {schema: FlagOutOfDateDataOutputSchema},
  prompt: `You are a system administrator assistant. You are responsible for determining if medicine availability data from a specific pharmacy is out of date based on the last updated timestamp, the pharmacy's typical update interval, and the current availability.

  Medicine Name: {{{medicineName}}}
  Pharmacy Name: {{{pharmacyName}}}
  Last Updated: {{{lastUpdated}}}
  Typical Update Interval: {{{typicalUpdateInterval}}}
  Availability: {{{availability}}}

  Determine if the data is out of date. Consider factors such as whether the last updated timestamp exceeds the typical update interval and whether the current availability seems inconsistent with the update frequency. If the data seems unreliable or stale, set isOutOfDate to true and provide a detailed reason. Otherwise, set isOutOfDate to false.
`,
});

const flagOutOfDateDataFlow = ai.defineFlow(
  {
    name: 'flagOutOfDateDataFlow',
    inputSchema: FlagOutOfDateDataInputSchema,
    outputSchema: FlagOutOfDateDataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
