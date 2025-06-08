import SkipCard from "./SkipCard";
import type { Skip } from "@/types/skip";

interface SkipListProps {
  skips: Skip[] | null;
  selectedId: number | null;
  onSelect: (skip: Skip) => void;
  loading?: boolean;
}

export default function SkipList({
  skips,
  selectedId,
  onSelect,
  loading = false,
}: SkipListProps) {
  const renderSkeletons = () =>
    [...Array(6)].map((_, i) => (
      <div
        key={`skeleton-${i}`}
        className="animate-in fade-in duration-500"
        style={{ animationDelay: `${i * 100}ms` }}
      >
        <SkipCard selected={false} onSelect={() => {}} loading />
      </div>
    ));

  const sortedSkips = skips
    ? [...skips].sort((a, b) => {
        if (a.size === 6) return -1;
        if (b.size === 6) return 1;
        if (a.size === 4) return -1;
        if (b.size === 4) return 1;
        return a.size - b.size;
      })
    : [];

  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      role="listbox"
      aria-label="Available skips"
    >
      {loading || !skips
        ? renderSkeletons()
        : sortedSkips.map((skip, index) => (
            <div
              key={skip.id}
              className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <SkipCard
                skip={skip}
                selected={skip.id === selectedId}
                onSelect={onSelect}
                isRecommended={skip.size === 6}
                isPopular={skip.size === 4}
              />
            </div>
          ))}
    </div>
  );
}
