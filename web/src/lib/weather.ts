import { WeatherResponse, CityWeather } from "./types";

const API_KEY = process.env.WEATHER_API_KEY || "YOUR_API_KEY";
const BASE_URL = "https://api.weatherapi.com/v1";

export async function fetchWeather(city: string): Promise<WeatherResponse> {
  const query = encodeURIComponent(city);
  const res = await fetch(
    `${BASE_URL}/forecast.json?key=${API_KEY}&q=${query}&days=7&aqi=no`,
    { next: { revalidate: 600 } }
  );

  if (!res.ok) {
    throw new Error(`Weather API error: ${res.status}`);
  }

  return res.json();
}

export function toCity(res: WeatherResponse): CityWeather {
  return {
    cityName: res.location.name,
    region: res.location.region,
    temperature: res.current.temp_c,
    conditionText: res.current.condition.text,
    conditionCode: res.current.condition.code,
    high: res.forecast.forecastday[0]?.day.maxtemp_c ?? 0,
    low: res.forecast.forecastday[0]?.day.mintemp_c ?? 0,
    hourlyForecast: res.forecast.forecastday[0]?.hour ?? [],
    dailyForecast: res.forecast.forecastday,
    humidity: res.current.humidity,
    windSpeed: res.current.wind_kph,
    feelsLike: res.current.feelslike_c,
    uvIndex: res.current.uv,
    visibility: res.current.vis_km,
  };
}

export function weatherIcon(code: number): string {
  switch (code) {
    case 1000: return "sun";
    case 1003: return "cloud-sun";
    case 1006: case 1009: return "cloud";
    case 1030: case 1135: case 1147: return "cloud-fog";
    case 1063: case 1150: case 1153: case 1180: case 1183: return "cloud-drizzle";
    case 1066: case 1210: case 1213: return "snowflake";
    case 1087: return "cloud-lightning";
    case 1186: case 1189: case 1192: case 1195: case 1240: case 1243: case 1246: return "cloud-rain";
    case 1273: case 1276: return "cloud-lightning";
    default: return "cloud";
  }
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
