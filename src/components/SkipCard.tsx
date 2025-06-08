import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, Calendar, Truck, Star, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { calculateTotalWithVAT, formatGBP } from "@/utils/price";
import type { Skip } from "@/types/skip";

interface SkipCardProps {
  skip?: Skip;
  selected: boolean;
  onSelect: (skip: Skip) => void;
  loading?: boolean;
  isRecommended?: boolean;
  isPopular?: boolean;
}

export default function SkipCard({
  skip,
  selected,
  onSelect,
  loading,
  isRecommended = false,
  isPopular = false,
}: SkipCardProps) {
  if (loading || !skip) {
    return (
      <Card className="p-4 border-2 border-muted animate-pulse cursor-default h-[420px] flex flex-col">
        <Skeleton className="w-full h-48 rounded-md" />
        <CardHeader className="text-left p-0 pt-4 space-y-1">
          <Skeleton className="h-6 w-3/5 rounded" />
          <Skeleton className="h-4 w-2/3 rounded" />
        </CardHeader>
        <CardContent className="space-y-3 p-0 mt-4 flex-1">
          <Skeleton className="h-5 w-1/2 rounded" />
          <Skeleton className="h-5 w-3/4 rounded" />
          <Skeleton className="h-5 w-2/3 rounded" />
        </CardContent>
        <CardFooter className="p-0 mt-4">
          <Skeleton className="h-8 w-32 rounded" />
        </CardFooter>
      </Card>
    );
  }

  const totalPrice = calculateTotalWithVAT(skip.price_before_vat, skip.vat);
  const formattedPrice = formatGBP(totalPrice);

  return (
    <Card
      onClick={() => onSelect(skip)}
      className={`border-2 p-0 cursor-pointer transition-all duration-300 overflow-hidden h-full flex flex-col relative ${
        selected
          ? "border-primary ring-2 ring-primary/20 shadow-lg scale-[1.02]"
          : "border-muted hover:border-primary/40 hover:shadow-md hover:scale-[1.01]"
      } ${isRecommended ? "ring-2 ring-green-500/30 border-green-500" : ""}`}
      aria-selected={selected}
      role="option"
    >
      {isRecommended && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-green-600 hover:bg-green-700 text-white text-xs font-medium">
            <Star className="w-3 h-3 mr-1" />
            RECOMMENDED
          </Badge>
        </div>
      )}

      {isPopular && !isRecommended && (
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium">
            <Zap className="w-3 h-3 mr-1" />
            POPULAR
          </Badge>
        </div>
      )}

      <div className="relative">
        <img
          src="/images/16-yarder-skip.jpg"
          alt={`${skip.size} Yard Skip`}
          className="w-full h-48 object-cover transition-transform duration-300"
        />
        <Badge className="absolute top-3 right-3 text-xs font-medium bg-primary/90 hover:bg-primary">
          {skip.size} YARD
        </Badge>
        {selected && (
          <div className="absolute inset-0 bg-primary/10 border-b-2 border-primary" />
        )}
      </div>

      <CardHeader className="text-left px-4 transition-colors duration-300">
        <CardTitle className="text-lg font-bold leading-tight">
          {skip.size} Yard Skip
        </CardTitle>
        <CardDescription className="mt-1 leading-snug text-muted-foreground">
          Perfect for{" "}
          {skip.size <= 4
            ? "small home projects"
            : skip.size <= 8
              ? "medium renovations"
              : "large construction"}{" "}
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 px-4 flex-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300">
          <Calendar className="w-4 h-4 text-primary/70 shrink-0" />
          <span className="font-medium leading-snug">
            {skip.hire_period_days} Day Hire
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground transition-colors duration-300">
          <Truck className="w-4 h-4 text-primary/70 shrink-0" />
          <span className="leading-snug">Free delivery & collection</span>
        </div>
        <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2 transition-colors duration-300">
            {skip.allowed_on_road ? (
              <CheckCircle className="w-4 h-4 text-green-600/80 shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500/80 shrink-0" />
            )}
            <span className="leading-snug">Road placement</span>
          </div>
          <div className="flex items-center gap-2 transition-colors duration-300">
            {skip.allows_heavy_waste ? (
              <CheckCircle className="w-4 h-4 text-green-600/80 shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-red-500/80 shrink-0" />
            )}
            <span className="leading-snug">Heavy waste</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-4 !py-3 border-t bg-muted/30 transition-all duration-300">
        <div className="flex items-center h-full justify-between w-full">
          <span className="text-sm text-muted-foreground leading-snug">
            Total price
          </span>
          <span className="text-xl font-bold text-primary leading-tight">
            {formattedPrice}
            <span className="text-xs font-normal text-muted-foreground ml-1">
              incl. VAT
            </span>
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}
