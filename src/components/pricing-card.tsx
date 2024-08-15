"use client";

import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "./ui/separator";
import { CheckCircle, Clock, RefreshCcw } from "lucide-react";
import { Button } from "./ui/button";

interface PricingCardProps {
  data: any;
  selectedPlan: string;
  handleSelectPlan: (name: string) => void;
}

const perkIcons = {
  delivery: <Clock className="w-4 h-4 mr-2" />,
  revision: <RefreshCcw className="w-4 h-4 mr-2" />,
};

const PricingCard: React.FC<PricingCardProps> = ({
  data,
  selectedPlan,
  handleSelectPlan,
}) => {
  return (
    <label
      className={`${
        selectedPlan === data.name ? "cursor-pointer" : "cursor-default"
      } w-full`}
    >
      <input
        type="radio"
        className="peer sr-only"
        name="plan"
        onChange={() => handleSelectPlan(data.name)}
        checked={selectedPlan === data.name}
      />
      <Card
        className={`rounded-xl ${
          selectedPlan === data.name ? "border-blue-600" : "border"
        } relative shadow-lg`}
      >
        <CardHeader>
          <CardTitle>{data.name}</CardTitle>
          <CardDescription>{data.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">
            {data.priceInPeso}{" "}
            <span className="text-sm text-muted-foreground font-semibold">
              / {data.priceInDollar}
            </span>
          </p>
          <div className="flex items-center space-x-3 mt-5">
            {Object.entries(data.perks[0]).map(([key, value], i) => (
              <div key={i} className="flex items-center">
                {perkIcons[key as keyof typeof perkIcons]}{" "}
                <p className="text-sm">{String(value)}</p>
              </div>
            ))}
          </div>
          <Button
            disabled={selectedPlan !== data.name}
            type="submit"
            className="w-full mt-5 rounded-full"
          >
            Subscribe
          </Button>
          <Separator className="mt-7" />
        </CardContent>
        <CardFooter>
          <div className="flex flex-col space-y-3">
            {Object.entries(data.features).map(([key, value], i) => (
              <div key={i} className="flex items-center">
                <CheckCircle className="w-4 h-4 text-emerald-600 mr-2" />
                <p className="text-sm">{String(value)}</p>
              </div>
            ))}
          </div>
        </CardFooter>
      </Card>
    </label>
  );
};

export default PricingCard;
