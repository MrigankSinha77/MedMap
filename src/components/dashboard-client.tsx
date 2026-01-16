"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { medicines } from "@/lib/data";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";

const FormSchema = z.object({
  medicineId: z.string({ required_error: "Please select a medicine." }),
  stock: z.enum(["available", "limited", "out-of-stock"], {
    required_error: "You need to select a stock status.",
  }),
});

export default function DashboardClient() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
        const medicineName = medicines.find(m => m.id === data.medicineId)?.name;
        toast({
            title: "Stock Updated",
            description: `Status for ${medicineName} set to "${data.stock}".`,
        });
        console.log("Form submitted:", data);
        setIsSubmitting(false);
        form.reset({ medicineId: "", stock: undefined });
    }, 1000);
  }

  return (
    <Card className="bg-card/60 dark:bg-card/40 backdrop-blur-xl border">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-8 pt-6">
            <FormField
              control={form.control}
              name="medicineId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medicine</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    disabled={isSubmitting}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a medicine to update" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {medicines.map((med) => (
                        <SelectItem key={med.id} value={med.id}>
                          {med.name} ({med.brand})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stock"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Availability Status</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                      disabled={isSubmitting}
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="available" />
                        </FormControl>
                        <FormLabel className="font-normal text-green-600 dark:text-green-400">
                          Available
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="limited" />
                        </FormControl>
                        <FormLabel className="font-normal text-yellow-600 dark:text-yellow-400">
                          Limited Stock
                        </FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="out-of-stock" />
                        </FormControl>
                        <FormLabel className="font-normal text-red-600 dark:text-red-400">
                          Out of Stock
                        </FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Check className="mr-2 h-4 w-4" />
              )}
              Update Stock
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
