import { useEffect, useState } from "react";
import type { Skip } from "@/types/skip";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { calculateTotalWithVAT } from "@/utils/price";
import SkipCarousel from "@/components/SkipCarousel";

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
          <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text">
            Choose Your Skip Size
          </h1>
          <p className="text-muted-foreground mb-8 text-lg">
            Select the skip size that best suits your needs
          </p>
        </div>
        <SkipCarousel
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
                    {selectedSkip.hire_period_days} Days • £{total} incl. VAT
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" onClick={() => setSelectedId(null)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
                <Button>
                  Continue
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
