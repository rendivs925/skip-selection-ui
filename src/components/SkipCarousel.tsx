import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SkipCard from "./SkipCard";
import type { Skip } from "@/types/skip";
import { useState, useEffect } from "react";
import type { CarouselApi } from "@/components/ui/carousel";

interface SkipCarouselProps {
  skips: Skip[] | null;
  selectedId: number | null;
  onSelect: (skip: Skip) => void;
  loading?: boolean;
}

export default function SkipCarousel({
  skips,
  selectedId,
  onSelect,
  loading = false,
}: SkipCarouselProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const renderSkeletons = () =>
    [...Array(6)].map((_, i) => (
      <CarouselItem key={`skeleton-${i}`} className="md:basis-1/2 lg:basis-1/3">
        <div className="p-1">
          <SkipCard selected={false} onSelect={() => {}} loading />
        </div>
      </CarouselItem>
    ));

  if (loading || !skips) {
    return (
      <div className="w-full">
        <Carousel className="w-full" setApi={setApi}>
          <CarouselContent className="-ml-1">
            {renderSkeletons()}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          Loading available skips...
        </div>
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <Carousel
        className="w-full"
        setApi={setApi}
        opts={{
          align: "start",
          loop: false,
        }}
      >
        <CarouselContent className="-ml-1">
          {skips.map((skip, index) => (
            <CarouselItem
              key={skip.id}
              className="pl-1 md:basis-1/2 lg:basis-1/3"
            >
              <div className="p-1">
                <SkipCard
                  skip={skip}
                  selected={skip.id === selectedId}
                  onSelect={onSelect}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex -left-12" />
        <CarouselNext className="hidden md:flex -right-12" />
      </Carousel>

      <div className="flex items-center justify-center space-x-4">
        <div className="flex space-x-1">
          {Array.from({ length: count }, (_, i) => (
            <button
              key={i}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                i + 1 === current
                  ? "bg-primary w-6"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              onClick={() => api?.scrollTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <div className="text-sm text-muted-foreground">
          {current} of {count}
        </div>
      </div>
    </div>
  );
}
