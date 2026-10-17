"use client";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Droplets, Wind, Gauge, Sun, Clock,
  MapPin, Calendar, Navigation,
} from "lucide-react";
import {
  getWeather, getWeatherInfo, WeatherResponse,
  getUVLabel, CityResult, POPULAR_CITIES, getWindDirection,
} from "@/lib/weather";
import SearchBar from "./SearchBar";
import WeatherSkeleton from "./Skeleton";

export default function WeatherDisplay() {
  const [city, setCity] = useState<CityResult>(POPULAR_CITIES[0]);
  const [data, setData] = useState<WeatherResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [locating, setLocating] = useState(false);

  const fetchWeather = useCallback(async (lat: number, lon: number) => {
    setLoading(true);
    setError(null);
    try {
      const res = await getWeather(lat, lon);
      setData(res);
    } catch {
      setError("Could not load weather data. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { fetchWeather(city.latitude, city.longitude); }, [city, fetchWeather]);

  function useMyLocation() {
    if (!navigator.geolocation) { alert("Geolocation not supported."); return; }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCity({
          id: Date.now(),
          name: "My Location",
          country: "",
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setLocating(false);
      },
      () => { setLocating(false); alert("Unable to get your location."); }
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-4 pt-10">
      {/* Search Bar */}
      <div className="mb-8">
        <SearchBar onSelect={setCity} />
      </div>

      {/* Current Location Button */}
      <div className="flex justify-center mb-8">
        <button
          onClick={useMyLocation}
          disabled={locating}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass hover:bg-sky-500 hover:text-red-400 transition-all duration-300 text-sm font-medium disabled:opacity-60"
        >
          <Navigation className={`w-4 h-4 ${locating ? "animate-spin" : ""}`} />
          {locating ? "Locating..." : "Use My Location"}
        </button>
      </div>

      <AnimatePresence mode="wait">
        {loading ? (
          <WeatherSkeleton key="loader" />
        ) : error ? (
          <motion.div
            key="error"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <p className="text-red-500 font-medium">{error}</p>
          </motion.div>
        ) : data ? (
          <motion.div
            key={city.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            {/* Hero card */}
            <HeroCard data={data} city={city} />

            {/* Stats grid */}
            <StatsGrid data={data} />

            {/* Hourly forecast */}
            <HourlyForecast data={data} />

            {/* 7-Day forecast */}
            <DailyForecast data={data} />
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

/* ---------- Sub-components ---------- */

function HeroCard({ data, city }: { data: WeatherResponse; city: CityResult }) {
  const info = getWeatherInfo(data.current.weather_code);
  const now = new Date(data.current.time);

  return (
    <motion.div
      initial={{ scale: 0.97, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className={`relative overflow-hidden rounded-3xl bg-linear-to-br ${info.gradient} text-white p-6 sm:p-10 shadow-2xl`}
    >
      {/* Floating blur orbs */}
      <div className="absolute -top-16 -right-16 w-64 h-64 rounded-full bg-white/20 blur-3xl" />
      <div className="absolute -bottom-20 -left-10 w-72 h-72 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
        <div>
          <div className="flex items-center gap-2 text-white/90 text-sm font-medium">
            <MapPin className="w-4 h-4" />
            <span>{city.name}{city.country ? `, ${city.country}` : ""}</span>
          </div>

          <div className="flex items-end gap-4 mt-4">
            <span className="text-7xl sm:text-8xl font-light leading-none">
              {Math.round(data.current.temperature_2m)}°
            </span>
            <span className="text-2xl mb-3 text-white/80">C</span>
          </div>

          <p className="text-lg font-medium mt-2">{info.label}</p>
          <p className="text-sm text-white/80 mt-1">
            Feels like {Math.round(data.current.apparent_temperature)}°C
          </p>

          <div className="flex items-center gap-4 mt-4 text-sm text-white/90">
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {now.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" })}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              {now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
          </div>
        </div>

        <div className="flex justify-center md:justify-end">
          <div className="text-[8rem] sm:text-[10rem] leading-none animate-float drop-shadow-2xl select-none">
            {info.emoji}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatsGrid({ data }: { data: WeatherResponse }) {
  const uv = getUVLabel(data.current.uv_index);
  const stats = [
    { icon: Droplets, label: "Humidity", value: `${data.current.relative_humidity_2m}%`, sub: "Relative" },
    { icon: Wind, label: "Wind Speed", value: `${data.current.wind_speed_10m} km/h`, sub: getWindDirection(data.current.wind_speed_10m) },
    { icon: Gauge, label: "Pressure", value: `${Math.round(data.current.pressure_msl)} hPa`, sub: "Sea level" },
    { icon: Sun, label: "UV Index", value: `${data.current.uv_index}`, sub: uv.label, accent: uv.color },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08, duration: 0.4 }}
          whileHover={{ y: -4 }}
          className="glass rounded-2xl p-5 shadow-lg hover:shadow-xl transition-shadow"
        >
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 text-xs font-medium">
            <s.icon className="w-4 h-4" />
            {s.label}
          </div>
          <p className="text-2xl font-bold mt-3 text-gray-800 dark:text-gray-100">{s.value}</p>
          <p className={`text-xs mt-1 ${s.accent || "text-gray-500 dark:text-gray-400"}`}>{s.sub}</p>
        </motion.div>
      ))}
    </div>
  );
}

function HourlyForecast({ data }: { data: WeatherResponse }) {
  const now = new Date(data.current.time);
  const upcoming = data.hourly
    .filter((h) => new Date(h.time) >= now)
    .slice(0, 12);

  return (
    <div className="glass rounded-3xl p-6 shadow-lg">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide mb-4">
        <Clock className="w-4 h-4" /> Hourly Forecast
      </h3>
      <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1">
        {upcoming.map((h, i) => {
          const info = getWeatherInfo(h.weather_code);
          return (
            <div
              key={i}
              className="shrink-0 w-20 text-center py-3 rounded-2xl hover:bg-white/50 dark:hover:bg-white/5 transition"
            >
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {new Date(h.time).toLocaleTimeString([], { hour: "2-digit" })}
              </p>
              <p className="text-2xl my-2">{info.emoji}</p>
              <p className="text-sm font-semibold text-gray-800 dark:text-gray-100">
                {Math.round(h.temperature_2m)}°
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function DailyForecast({ data }: { data: WeatherResponse }) {
  return (
    <div className="glass rounded-3xl p-6 shadow-lg">
      <h3 className="flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wide mb-4">
        <Calendar className="w-4 h-4" /> 7-Day Forecast
      </h3>
      <div className="space-y-1">
        {data.daily.map((d, i) => {
          const info = getWeatherInfo(d.weather_code);
          const day = i === 0 ? "Today" : new Date(d.date).toLocaleDateString(undefined, { weekday: "short" });
          return (
            <motion.div
              key={d.date}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="grid grid-cols-12 items-center gap-3 py-3 px-2 rounded-xl hover:bg-white/50 dark:hover:bg-white/5 transition"
            >
              <div className="col-span-3 sm:col-span-2 text-sm font-medium text-gray-700 dark:text-gray-200">{day}</div>
              <div className="col-span-2 flex items-center gap-2">
                <span className="text-2xl">{info.emoji}</span>
              </div>
              <div className="col-span-4 sm:col-span-5 text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                {info.label}
              </div>
              <div className="col-span-3 flex justify-end gap-3 text-sm">
                <span className="text-gray-400">{Math.round(d.temperature_2m_min)}°</span>
                <span className="font-semibold text-gray-800 dark:text-gray-100">{Math.round(d.temperature_2m_max)}°</span>
              </div>
            </motion.div>
          );
        })}
    
      </div>
    </div>
  );
}