"use client";

import { useEffect, useState } from "react";
import type { Skip } from "@/types/skip";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Clock, Users } from "lucide-react";
import { calculateTotalWithVAT } from "@/utils/price";
import SkipList from "@/components/SkipList";

export default function ChooseSkip() {
  const [skips, setSkips] = useState<Skip[] | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(
      "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft",
    )
      .then((res) => res.json())
      .then((data: Skip[]) => {
        setSkips(data);
        const recommendedSkip = data.find((skip) => skip.size === 6) || data[0];
        if (recommendedSkip) {
          setSelectedId(recommendedSkip.id);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const selectedSkip = skips?.find((skip) => skip.id === selectedId) || null;
  const total = selectedSkip
    ? calculateTotalWithVAT(
        selectedSkip.price_before_vat,
        selectedSkip.vat,
      ).toFixed(2)
    : "0";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 pt-2 container mx-auto">
      <div className="p-6 max-w-6xl mx-auto pb-32">
        <div className="animate-in fade-in slide-in-from-top-4 duration-700">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
                Choose Your Skip Size
              </h1>
              <p className="text-muted-foreground mb-2 text-lg">
                Select the skip size that best suits your needs
              </p>
            </div>

            <div className="hidden md:flex flex-col items-end gap-2 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>23 people viewing skips in your area</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>Book today for next-day delivery</span>
              </div>
            </div>
          </div>

          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const skip = skips?.find((s) => s.size <= 4);
                if (skip) setSelectedId(skip.id);
              }}
              className="whitespace-nowrap"
            >
              Small Projects
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const skip = skips?.find((s) => s.size === 6);
                if (skip) setSelectedId(skip.id);
              }}
              className="whitespace-nowrap bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
            >
              ⭐ Most Popular
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                const skip = skips?.find((s) => s.size >= 8);
                if (skip) setSelectedId(skip.id);
              }}
              className="whitespace-nowrap"
            >
              Large Projects
            </Button>
          </div>
        </div>

        <SkipList
          skips={skips}
          selectedId={selectedId}
          onSelect={(s) => setSelectedId(s.id)}
          loading={loading}
        />
      </div>

      {selectedSkip && (
        <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-border/50 shadow-2xl z-50 animate-in slide-in-from-bottom duration-500">
          <div className="container max-w-6xl mx-auto py-4 px-6">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <div className="font-semibold text-foreground">
                    {selectedSkip.size} Yard Skip
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {selectedSkip.hire_period_days} Days • £{total} incl. VAT •
                    Free delivery
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => setSelectedId(null)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Change
                </Button>
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Book Now - £{total}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
