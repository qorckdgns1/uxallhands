"use client";

import { useState, useEffect, useCallback } from "react";
import { CityWeather } from "@/lib/types";
import CityCard from "@/components/CityCard";
import SearchCity from "@/components/SearchCity";

const DEFAULT_CITIES = ["San Francisco", "New York", "London", "Tokyo", "Seoul"];

export default function Home() {
  const [cities, setCities] = useState<CityWeather[]>([]);
  const [loading, setLoading] = useState(true);
  const [useCelsius, setUseCelsius] = useState(true);
  const [showSearch, setShowSearch] = useState(false);

  const fetchCity = useCallback(async (name: string): Promise<CityWeather | null> => {
    try {
      const res = await fetch(`/api/weather?city=${encodeURIComponent(name)}`);
      if (!res.ok) return null;
      return res.json();
    } catch {
      return null;
    }
  }, []);

  useEffect(() => {
    async function loadDefaults() {
      setLoading(true);
      const results = await Promise.all(DEFAULT_CITIES.map(fetchCity));
      setCities(results.filter((c): c is CityWeather => c !== null));
      setLoading(false);
    }
    loadDefaults();
  }, [fetchCity]);

  const handleAddCity = async (name: string) => {
    const city = await fetchCity(name);
    if (city) {
      setCities((prev) => [...prev, city]);
    }
  };

  const handleRefresh = async () => {
    setLoading(true);
    const names = cities.map((c) => c.cityName);
    const results = await Promise.all(names.map(fetchCity));
    setCities(results.filter((c): c is CityWeather => c !== null));
    setLoading(false);
  };

  return (
    <main className="max-w-lg mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Weather</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setUseCelsius(!useCelsius)}
            className="px-3 py-1.5 bg-white/50 backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-white/70 transition-colors"
          >
            {useCelsius ? "°C" : "°F"}
          </button>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="px-3 py-1.5 bg-white/50 backdrop-blur-sm rounded-lg text-sm hover:bg-white/70 transition-colors"
          >
            &#8635;
          </button>
          <button
            onClick={() => setShowSearch(true)}
            className="px-3 py-1.5 bg-white/50 backdrop-blur-sm rounded-lg text-sm hover:bg-white/70 transition-colors"
          >
            &#128269;
          </button>
        </div>
      </div>

      {loading && cities.length === 0 ? (
        <div className="flex items-center justify-center py-20">
          <p className="text-white/80 text-lg">Loading weather...</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {cities.map((city) => (
            <CityCard key={city.cityName} city={city} useCelsius={useCelsius} />
          ))}
        </div>
      )}

      {showSearch && (
        <SearchCity onAdd={handleAddCity} onClose={() => setShowSearch(false)} />
      )}
    </main>
  );
}
