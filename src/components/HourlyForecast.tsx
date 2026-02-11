import { HourWeather } from "@/lib/types";
import { weatherEmoji } from "@/lib/weather";

export default function HourlyForecast({
  hours,
  useCelsius,
}: {
  hours: HourWeather[];
  useCelsius: boolean;
}) {
  const temp = (t: number) => {
    const v = useCelsius ? t : t * 9 / 5 + 32;
    return `${Math.round(v)}°`;
  };

  const formatHour = (time: string) => {
    const parts = time.split(" ");
    return parts[1]?.substring(0, 5) ?? time;
  };

  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4">
      <p className="text-xs text-gray-600 font-medium mb-3">&#128339; HOURLY FORECAST</p>
      <div className="flex gap-4 overflow-x-auto pb-2">
        {hours.slice(0, 24).map((h) => (
          <div key={h.time_epoch} className="flex flex-col items-center gap-1 min-w-[3.5rem]">
            <span className="text-xs text-gray-500">{formatHour(h.time)}</span>
            <span className="text-xl">{weatherEmoji(h.condition.code)}</span>
            <span className="text-sm font-medium">{temp(h.temp_c)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
