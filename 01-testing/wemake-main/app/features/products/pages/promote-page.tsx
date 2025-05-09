import type { Route } from "./+types/promote-page";
import { Hero } from "~/common/components/hero";
import { Form } from "react-router";
import SelectPair from "~/common/components/select-pair";
import { Calendar } from "~/common/components/ui/calendar";
import { Label } from "~/common/components/ui/label";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { DateTime } from "luxon";
import { Button } from "~/common/components/ui/button";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Promote Product | Product Hunt Clone" },
    { name: "description", content: "Promote your product" },
  ];
};

export default function PromotePage() {
  const [promotionDates, setPromotionDates] = useState<DateRange | undefined>();
  const totalDays =
    promotionDates?.from && promotionDates?.to
      ? DateTime.fromJSDate(promotionDates.to).diff(
          DateTime.fromJSDate(promotionDates.from),
          "days"
        ).days
      : 0;
  return (
    <div>
      <Hero
        title="Promote Your Product"
        subtitle="Boost your product's visibility."
      />
      <Form className="max-w-sm mx-auto flex flex-col gap-10 items-center">
        <SelectPair
          label="Select a product"
          description="Select the product you want to promote"
          name="product"
          options={[
            { label: "AI dark mode maker", value: "1" },
            { label: "AI dark mode maker", value: "2" },
            { label: "AI dark mode maker", value: "3" },
          ]}
          placeholder="Select a product"
        />
        <div className="flex flex-col gap-2 items-center w-full">
          <Label className="flex flex-col gap-1">
            Select a range of dates for promotion{" "}
            <small className="text-muted-foreground text-center">
              Minimum duration is 3 days.
            </small>
          </Label>
          <Calendar
            mode="range"
            selected={promotionDates}
            onSelect={setPromotionDates}
            min={3}
            disabled={{ before: new Date() }}
          />
        </div>
        <Button disabled={totalDays === 0}>
          Go to Checkout (${totalDays * 20})
        </Button>
      </Form>
    </div>
  );
}
