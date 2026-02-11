"use client";

import { useState, use } from "react";
import Link from "next/link";
import { CITIES, weatherEmoji } from "@/lib/weather";
import HourlyForecast from "@/components/HourlyForecast";
import DailyForecast from "@/components/DailyForecast";
import WeatherDetail from "@/components/WeatherDetail";

export default function CityPage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = use(params);
  const decodedName = decodeURIComponent(name);
  const city = CITIES.find((c) => c.cityName === decodedName);
  const [useCelsius, setUseCelsius] = useState(true);

  const temp = (t: number) => {
    const v = useCelsius ? t : t * 9 / 5 + 32;
    return `${Math.round(v)}°`;
  };

  if (!city) {
    return (
      <main className="max-w-lg mx-auto px-4 py-8">
        <Link href="/" className="text-blue-600 hover:underline text-sm">&larr; Back</Link>
        <p className="mt-8 text-center text-gray-500">City not found</p>
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
        <HourlyForecast hours={city.hourlyForecast} useCelsius={useCelsius} />
        <DailyForecast days={city.dailyForecast} useCelsius={useCelsius} />

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
