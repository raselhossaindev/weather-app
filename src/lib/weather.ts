export const BASE_URL = "https://api.open-meteo.com/v1/forecast";
export const GEO_URL = "https://geocoding-api.open-meteo.com/v1/search";

export interface CurrentWeather {
  time: string;
  temperature_2m: number;
  apparent_temperature: number;
  relative_humidity_2m: number;
  wind_speed_10m: number;
  weather_code: number;
  pressure_msl: number;
  uv_index: number;
  interval: number;
}

export interface HourlyPoint {
  time: string;
  temperature_2m: number;
  weather_code: number;
}

export interface DailyPoint {
  date: string;
  weather_code: number;
  temperature_2m_max: number;
  temperature_2m_min: number;
}

export interface WeatherResponse {
  current: CurrentWeather;
  hourly: HourlyPoint[];
  daily: DailyPoint[];
  timezone: string;
}

export interface CityResult {
  id: number;
  name: string;
  country: string;
  admin1?: string;
  latitude: number;
  longitude: number;
}

export async function getWeather(lat: number, lon: number): Promise<WeatherResponse> {
  const params = new URLSearchParams({
    latitude: lat.toString(),
    longitude: lon.toString(),
    current: "temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,weather_code,pressure_msl,uv_index",
    hourly: "temperature_2m,weather_code",
    daily: "weather_code,temperature_2m_max,temperature_2m_min",
    timezone: "auto",
    forecast_days: "7",
  });

  const res = await fetch(`${BASE_URL}?${params.toString()}`, { next: { revalidate: 600 } });
  if (!res.ok) throw new Error("Weather data fetch failed");

  const data = await res.json();

  return {
    current: data.current,
    hourly: data.hourly.time.map((t: string, i: number) => ({
      time: t,
      temperature_2m: data.hourly.temperature_2m[i],
      weather_code: data.hourly.weather_code[i],
    })),
    daily: data.daily.time.map((t: string, i: number) => ({
      date: t,
      weather_code: data.daily.weather_code[i],
      temperature_2m_max: data.daily.temperature_2m_max[i],
      temperature_2m_min: data.daily.temperature_2m_min[i],
    })),
    timezone: data.timezone,
  };
}

export async function searchCity(query: string): Promise<CityResult[]> {
  if (!query || query.length < 2) return [];
  const res = await fetch(`${GEO_URL}?name=${encodeURIComponent(query)}&count=6&language=en&format=json`);
  if (!res.ok) return [];
  const data = await res.json();
  return data.results || [];
}

export function getWeatherInfo(code: number): {
  label: string;
  emoji: string;
  gradient: string;
} {
  const map: Record<number, { label: string; emoji: string; gradient: string }> = {
    0:  { label: "Clear Sky",       emoji: "☀️", gradient: "from-amber-300 to-orange-500" },
    1:  { label: "Mainly Clear",    emoji: "🌤️", gradient: "from-yellow-300 to-amber-500" },
    2:  { label: "Partly Cloudy",   emoji: "⛅", gradient: "from-sky-300 to-blue-500" },
    3:  { label: "Overcast",        emoji: "☁️", gradient: "from-slate-400 to-slate-600" },
    45: { label: "Foggy",           emoji: "🌫️", gradient: "from-slate-400 to-gray-600" },
    48: { label: "Rime Fog",        emoji: "🌫️", gradient: "from-slate-400 to-gray-600" },
    51: { label: "Light Drizzle",   emoji: "🌦️", gradient: "from-sky-400 to-blue-600" },
    53: { label: "Drizzle",         emoji: "🌦️", gradient: "from-sky-400 to-blue-600" },
    55: { label: "Dense Drizzle",   emoji: "🌧️", gradient: "from-blue-500 to-indigo-700" },
    61: { label: "Light Rain",      emoji: "🌧️", gradient: "from-blue-500 to-indigo-700" },
    63: { label: "Rain",            emoji: "🌧️", gradient: "from-blue-600 to-indigo-800" },
    65: { label: "Heavy Rain",      emoji: "🌧️", gradient: "from-indigo-700 to-slate-900" },
    71: { label: "Light Snow",      emoji: "🌨️", gradient: "from-cyan-200 to-blue-400" },
    73: { label: "Snow",            emoji: "❄️", gradient: "from-cyan-200 to-blue-500" },
    75: { label: "Heavy Snow",      emoji: "❄️", gradient: "from-blue-200 to-indigo-500" },
    80: { label: "Rain Showers",    emoji: "🌦️", gradient: "from-sky-400 to-blue-600" },
    95: { label: "Thunderstorm",    emoji: "⛈️", gradient: "from-purple-600 to-slate-900" },
    96: { label: "Thunder + Hail",  emoji: "⛈️", gradient: "from-purple-700 to-slate-900" },
  };
  return map[code] || { label: "Unknown", emoji: "❓", gradient: "from-slate-400 to-slate-600" };
}

export function getWindDirection(speed: number): string {
  if (speed < 5) return "Calm";
  if (speed < 20) return "Light breeze";
  if (speed < 40) return "Moderate wind";
  if (speed < 60) return "Strong wind";
  return "Storm";
}

export function getUVLabel(uv: number): { label: string; color: string } {
  if (uv <= 2) return { label: "Low", color: "text-green-500" };
  if (uv <= 5) return { label: "Moderate", color: "text-yellow-500" };
  if (uv <= 7) return { label: "High", color: "text-orange-500" };
  if (uv <= 10) return { label: "Very High", color: "text-red-500" };
  return { label: "Extreme", color: "text-purple-600" };
}

export const POPULAR_CITIES: CityResult[] = [
  { id: 1, name: "Dhaka", country: "Bangladesh", latitude: 23.8103, longitude: 90.4125 },
  { id: 2, name: "London", country: "United Kingdom", latitude: 51.5074, longitude: -0.1278 },
  { id: 3, name: "New York", country: "United States", latitude: 40.7128, longitude: -74.0060 },
  { id: 4, name: "Tokyo", country: "Japan", latitude: 35.6762, longitude: 139.6503 },
  { id: 5, name: "Dubai", country: "UAE", latitude: 25.2048, longitude: 55.2708 },
  { id: 6, name: "Sydney", country: "Australia", latitude: -33.8688, longitude: 151.2093 },
];