"use client";
import { useEffect, useRef, useState } from "react";
import { Search, Loader2, MapPin } from "lucide-react";
import { searchCity, CityResult, POPULAR_CITIES } from "@/lib/weather";

interface Props {
  onSelect: (city: CityResult) => void;
}

export default function SearchBar({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<CityResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length < 2) return;
    const t = setTimeout(async () => {
      setLoading(true);
      const res = await searchCity(query);
      setResults(res);
      setLoading(false);
      setOpen(true);
    }, 300);
    return () => clearTimeout(t);
  }, [query]);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function pick(city: CityResult) {
    onSelect(city);
    setQuery("");
    setResults([]);
    setOpen(false);
  }

  return (
    <div ref={boxRef} className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            if (value.length < 2) { setResults([]); setOpen(false); setLoading(false); }
          }}
          onFocus={() => results.length && setOpen(true)}
          placeholder="Search any city..."
          className="w-full pl-12 pr-12 py-3.5 rounded-2xl glass text-gray-800 dark:text-gray-100 placeholder-gray-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-sky-500 transition"
        />
        {loading && <Loader2 className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-sky-500 animate-spin" />}
      </div>

      {open && results.length > 0 && (
        <div className="absolute z-40 mt-2 w-full rounded-2xl glass shadow-2xl overflow-hidden animate-slide-up">
          {results.map((city) => (
            <button
              key={city.id}
              onClick={() => pick(city)}
              className="w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-sky-500/10 transition"
            >
              <MapPin className="w-4 h-4 text-sky-500" />
              <div>
                <p className="font-medium text-gray-800 dark:text-gray-100 hover:text-gray-700">{city.name}</p>
                <p className="text-xs text-gray-500">{city.admin1 ? `${city.admin1}, ` : ""}{city.country}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {query.length === 0 && (
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {POPULAR_CITIES.map((c) => (
            <button
              key={c.id}
              onClick={() => pick(c)}
              className="px-3.5 py-1.5 text-xs font-medium rounded-full glass hover:text-red-500 hover:bg-green-500 transition-all duration-300"
            >
              {c.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}