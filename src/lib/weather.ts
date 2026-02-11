import { CityWeather } from "./types";

export const CITIES: CityWeather[] = [
  {
    cityName: "San Francisco",
    region: "California",
    temperature: 16,
    conditionText: "Partly Cloudy",
    conditionCode: 1003,
    high: 19,
    low: 12,
    humidity: 72,
    windSpeed: 18,
    feelsLike: 14,
    uvIndex: 4,
    visibility: 16,
    hourlyForecast: generateHourly(16, 1003),
    dailyForecast: generateDaily(16, 1003),
  },
  {
    cityName: "New York",
    region: "New York",
    temperature: 8,
    conditionText: "Overcast",
    conditionCode: 1009,
    high: 11,
    low: 4,
    humidity: 65,
    windSpeed: 22,
    feelsLike: 5,
    uvIndex: 2,
    visibility: 14,
    hourlyForecast: generateHourly(8, 1009),
    dailyForecast: generateDaily(8, 1009),
  },
  {
    cityName: "London",
    region: "England",
    temperature: 10,
    conditionText: "Light Rain",
    conditionCode: 1183,
    high: 13,
    low: 7,
    humidity: 80,
    windSpeed: 15,
    feelsLike: 8,
    uvIndex: 1,
    visibility: 10,
    hourlyForecast: generateHourly(10, 1183),
    dailyForecast: generateDaily(10, 1183),
  },
  {
    cityName: "Tokyo",
    region: "Tokyo",
    temperature: 22,
    conditionText: "Sunny",
    conditionCode: 1000,
    high: 25,
    low: 18,
    humidity: 55,
    windSpeed: 10,
    feelsLike: 22,
    uvIndex: 6,
    visibility: 20,
    hourlyForecast: generateHourly(22, 1000),
    dailyForecast: generateDaily(22, 1000),
  },
  {
    cityName: "Seoul",
    region: "Seoul",
    temperature: 5,
    conditionText: "Clear",
    conditionCode: 1000,
    high: 9,
    low: -1,
    humidity: 40,
    windSpeed: 12,
    feelsLike: 2,
    uvIndex: 3,
    visibility: 18,
    hourlyForecast: generateHourly(5, 1000),
    dailyForecast: generateDaily(5, 1000),
  },
  {
    cityName: "Sydney",
    region: "New South Wales",
    temperature: 28,
    conditionText: "Sunny",
    conditionCode: 1000,
    high: 31,
    low: 22,
    humidity: 60,
    windSpeed: 20,
    feelsLike: 30,
    uvIndex: 9,
    visibility: 25,
    hourlyForecast: generateHourly(28, 1000),
    dailyForecast: generateDaily(28, 1000),
  },
  {
    cityName: "Dubai",
    region: "Dubai",
    temperature: 34,
    conditionText: "Sunny",
    conditionCode: 1000,
    high: 38,
    low: 26,
    humidity: 30,
    windSpeed: 14,
    feelsLike: 36,
    uvIndex: 11,
    visibility: 20,
    hourlyForecast: generateHourly(34, 1000),
    dailyForecast: generateDaily(34, 1000),
  },
  {
    cityName: "Paris",
    region: "Ile-de-France",
    temperature: 12,
    conditionText: "Cloudy",
    conditionCode: 1006,
    high: 15,
    low: 8,
    humidity: 70,
    windSpeed: 16,
    feelsLike: 10,
    uvIndex: 2,
    visibility: 12,
    hourlyForecast: generateHourly(12, 1006),
    dailyForecast: generateDaily(12, 1006),
  },
];

function generateHourly(baseTemp: number, baseCode: number) {
  const codes = [1000, 1003, 1006, 1009, 1183];
  return Array.from({ length: 24 }, (_, i) => ({
    time_epoch: 1739300000 + i * 3600,
    time: `2026-02-11 ${String(i).padStart(2, "0")}:00`,
    temp_c: baseTemp + Math.round(Math.sin((i - 6) / 24 * Math.PI * 2) * 4),
    temp_f: 0,
    condition: {
      text: "",
      icon: "",
      code: i % 5 === 0 ? codes[i % codes.length] : baseCode,
    },
    chance_of_rain: `${Math.max(0, 10 + (i % 7) * 3)}`,
  }));
}

function generateDaily(baseTemp: number, baseCode: number) {
  const codes = [1000, 1003, 1006, 1183, 1009, 1000, 1003];
  void baseCode;
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(2026, 1, 11 + i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const variation = Math.round((i % 3 - 1) * 2);
    return {
      date: `${y}-${m}-${day}`,
      day: {
        maxtemp_c: baseTemp + 3 + variation,
        maxtemp_f: 0,
        mintemp_c: baseTemp - 4 + variation,
        mintemp_f: 0,
        condition: { text: "", icon: "", code: codes[i] },
        daily_chance_of_rain: `${10 + i * 5}`,
        avghumidity: 60,
      },
      hour: [],
    };
  });
}

export function weatherEmoji(code: number): string {
  switch (code) {
    case 1000: return "\u2600\uFE0F";
    case 1003: return "\u26C5";
    case 1006: case 1009: return "\u2601\uFE0F";
    case 1030: case 1135: case 1147: return "\uD83C\uDF2B\uFE0F";
    case 1063: case 1150: case 1153: case 1180: case 1183: return "\uD83C\uDF26\uFE0F";
    case 1066: case 1210: case 1213: case 1216: case 1219: case 1222: case 1225: return "\u2744\uFE0F";
    case 1087: case 1273: case 1276: return "\u26C8\uFE0F";
    case 1186: case 1189: case 1192: case 1195: case 1240: case 1243: case 1246: return "\uD83C\uDF27\uFE0F";
    default: return "\u2601\uFE0F";
  }
}

export function cardGradient(code: number): string {
  switch (code) {
    case 1000: return "from-orange-400 to-yellow-300";
    case 1003: return "from-blue-400/70 to-cyan-400/60";
    case 1006: case 1009: return "from-gray-400/70 to-gray-400/50";
    case 1087: case 1273: case 1276: case 1279: case 1282: return "from-indigo-600 to-purple-500/70";
    default:
      if (code >= 1063 && code <= 1246) return "from-blue-500/80 to-indigo-500/60";
      return "from-blue-400/60 to-cyan-400/50";
  }
}
