export interface WeatherResponse {
  location: Location;
  current: CurrentWeather;
  forecast: Forecast;
}

export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  localtime: string;
}

export interface CurrentWeather {
  temp_c: number;
  temp_f: number;
  condition: WeatherCondition;
  wind_mph: number;
  wind_kph: number;
  humidity: number;
  feelslike_c: number;
  feelslike_f: number;
  uv: number;
  vis_km: number;
}

export interface WeatherCondition {
  text: string;
  icon: string;
  code: number;
}

export interface Forecast {
  forecastday: ForecastDay[];
}

export interface ForecastDay {
  date: string;
  day: DayWeather;
  hour: HourWeather[];
}

export interface DayWeather {
  maxtemp_c: number;
  maxtemp_f: number;
  mintemp_c: number;
  mintemp_f: number;
  condition: WeatherCondition;
  daily_chance_of_rain: string;
  avghumidity: number;
}

export interface HourWeather {
  time_epoch: number;
  time: string;
  temp_c: number;
  temp_f: number;
  condition: WeatherCondition;
  chance_of_rain: string;
}

export interface CityWeather {
  cityName: string;
  region: string;
  temperature: number;
  conditionText: string;
  conditionCode: number;
  high: number;
  low: number;
  hourlyForecast: HourWeather[];
  dailyForecast: ForecastDay[];
  humidity: number;
  windSpeed: number;
  feelsLike: number;
  uvIndex: number;
  visibility: number;
}
