"use client";

import { useState } from "react";
import { CITIES } from "@/lib/weather";
import CityCard from "@/components/CityCard";

export default function Home() {
  const [useCelsius, setUseCelsius] = useState(true);

  return (
    <main className="max-w-lg mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Weather</h1>
        <button
          onClick={() => setUseCelsius(!useCelsius)}
          className="px-3 py-1.5 bg-white/50 backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-white/70 transition-colors"
        >
          {useCelsius ? "°C" : "°F"}
        </button>
      </div>

      <div className="flex flex-col gap-4">
        {CITIES.map((city) => (
          <CityCard key={city.cityName} city={city} useCelsius={useCelsius} />
        ))}
      </div>
    </main>
  );
}
