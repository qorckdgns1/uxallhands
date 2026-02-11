import { ForecastDay } from "@/lib/types";
import { weatherEmoji } from "@/lib/weather";

export default function DailyForecast({
  days,
  useCelsius,
}: {
  days: ForecastDay[];
  useCelsius: boolean;
}) {
  const temp = (t: number) => {
    const v = useCelsius ? t : t * 9 / 5 + 32;
    return `${Math.round(v)}°`;
  };

  const formatDay = (dateStr: string) => {
    const date = new Date(dateStr + "T00:00:00");
    return date.toLocaleDateString("en-US", { weekday: "short" });
  };

  const allLows = days.map((d) => d.day.mintemp_c);
  const allHighs = days.map((d) => d.day.maxtemp_c);
  const overallLow = Math.min(...allLows);
  const overallHigh = Math.max(...allHighs);
  const range = overallHigh - overallLow || 1;

  return (
    <div className="bg-white/30 backdrop-blur-sm rounded-2xl p-4">
      <p className="text-xs text-gray-600 font-medium mb-3">&#128197; 7-DAY FORECAST</p>
      <div className="flex flex-col gap-2">
        {days.map((day) => {
          const startPct = ((day.day.mintemp_c - overallLow) / range) * 100;
          const widthPct = ((day.day.maxtemp_c - day.day.mintemp_c) / range) * 100;

          return (
            <div key={day.date} className="flex items-center gap-3">
              <span className="text-sm w-10">{formatDay(day.date)}</span>
              <span className="text-lg w-8 text-center">
                {weatherEmoji(day.day.condition.code)}
              </span>
              <span className="text-sm text-gray-500 w-10 text-right">
                {temp(day.day.mintemp_c)}
              </span>
              <div className="flex-1 h-1.5 bg-gray-300/40 rounded-full relative">
                <div
                  className="absolute h-full rounded-full bg-gradient-to-r from-blue-400 via-green-400 via-yellow-400 to-orange-400"
                  style={{ left: `${startPct}%`, width: `${Math.max(widthPct, 4)}%` }}
                />
              </div>
              <span className="text-sm w-10">{temp(day.day.maxtemp_c)}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
