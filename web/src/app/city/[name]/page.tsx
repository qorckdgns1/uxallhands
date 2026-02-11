"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { CityWeather } from "@/lib/types";
import { weatherEmoji } from "@/lib/weather";
import HourlyForecast from "@/components/HourlyForecast";
import DailyForecast from "@/components/DailyForecast";
import WeatherDetail from "@/components/WeatherDetail";

export default function CityPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const [city, setCity] = useState<CityWeather | null>(null);
  const [useCelsius, setUseCelsius] = useState(true);
  const [error, setError] = useState("");

  const temp = (t: number) => {
    const v = useCelsius ? t : t * 9 / 5 + 32;
    return `${Math.round(v)}°`;
  };

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/weather?city=${encodeURIComponent(name)}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setCity(data);
      } catch {
        setError("Failed to load weather data");
      }
    }
    load();
  }, [name]);

  if (error) {
    return (
      <main className="max-w-lg mx-auto px-4 py-8">
        <Link href="/" className="text-blue-600 hover:underline text-sm">&larr; Back</Link>
        <p className="mt-8 text-center text-red-500">{error}</p>
      </main>
    );
  }

  if (!city) {
    return (
      <main className="max-w-lg mx-auto px-4 py-8">
        <p className="text-center text-white/80 py-20">Loading...</p>
      </main>
    );
  }

  return (
    <main className="max-w-lg mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="text-blue-700 hover:underline text-sm font-medium">
          &larr; Back
        </Link>
        <button
          onClick={() => setUseCelsius(!useCelsius)}
          className="px-3 py-1.5 bg-white/50 backdrop-blur-sm rounded-lg text-sm font-medium hover:bg-white/70 transition-colors"
        >
          {useCelsius ? "°C" : "°F"}
        </button>
      </div>

      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-7xl">{weatherEmoji(city.conditionCode)}</span>
        <p className="text-7xl font-thin mt-2">{temp(city.temperature)}</p>
        <p className="text-lg text-gray-600 mt-1">{city.conditionText}</p>
        <p className="text-sm text-gray-500 mt-1">
          H: {temp(city.high)} &nbsp; L: {temp(city.low)}
        </p>
        <h1 className="text-2xl font-semibold mt-2">{city.cityName}</h1>
      </div>

      <div className="flex flex-col gap-4">
        {/* Hourly */}
        <HourlyForecast hours={city.hourlyForecast} useCelsius={useCelsius} />

        {/* Daily */}
        <DailyForecast days={city.dailyForecast} useCelsius={useCelsius} />

        {/* Details grid */}
        <div className="grid grid-cols-2 gap-3">
          <WeatherDetail icon="&#128167;" title="HUMIDITY" value={`${city.humidity}%`} />
          <WeatherDetail icon="&#128168;" title="WIND" value={`${Math.round(city.windSpeed)} km/h`} />
          <WeatherDetail icon="&#127777;&#65039;" title="FEELS LIKE" value={temp(city.feelsLike)} />
          <WeatherDetail icon="&#9728;&#65039;" title="UV INDEX" value={`${Math.round(city.uvIndex)}`} />
          <WeatherDetail icon="&#128065;" title="VISIBILITY" value={`${Math.round(city.visibility)} km`} />
          <WeatherDetail
            icon="&#128167;"
            title="RAIN CHANCE"
            value={`${city.dailyForecast[0]?.day.daily_chance_of_rain ?? 0}%`}
          />
        </div>
      </div>
    </main>
  );
}
