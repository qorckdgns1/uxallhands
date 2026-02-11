"use client";

import Link from "next/link";
import { CityWeather } from "@/lib/types";
import { weatherEmoji, cardGradient } from "@/lib/weather";

export default function CityCard({
  city,
  useCelsius,
}: {
  city: CityWeather;
  useCelsius: boolean;
}) {
  const temp = (t: number) => {
    const v = useCelsius ? t : t * 9 / 5 + 32;
    return `${Math.round(v)}°`;
  };

  return (
    <Link href={`/city/${encodeURIComponent(city.cityName)}`}>
      <div
        className={`flex items-center justify-between p-5 rounded-2xl bg-gradient-to-br ${cardGradient(city.conditionCode)} shadow-lg hover:shadow-xl hover:scale-[1.01] transition-all cursor-pointer`}
      >
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-semibold text-white">{city.cityName}</h2>
          <span className="text-xs text-white/80">{city.region}</span>
          <span className="text-sm text-white/90">{city.conditionText}</span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <span className="text-3xl">{weatherEmoji(city.conditionCode)}</span>
            <span className="text-5xl font-light text-white">
              {temp(city.temperature)}
            </span>
          </div>
          <div className="flex gap-3 text-xs text-white/80">
            <span>H: {temp(city.high)}</span>
            <span>L: {temp(city.low)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
