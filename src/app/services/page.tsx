import { Thermometer, Droplets, Wind, Clock, CloudRain, Smartphone, Gauge, Sun, MapPin } from "lucide-react";

export default function ServicesPage() {
  const services = [
    { icon: Thermometer, title: "Real-Time Temperature", desc: "Accurate current temperature with feels-like adjustments." },
    { icon: Droplets, title: "Humidity Tracking", desc: "Relative humidity levels for planning comfort." },
    { icon: Wind, title: "Wind Analysis", desc: "Wind speed with qualitative descriptions." },
    { icon: Gauge, title: "Pressure Readings", desc: "Atmospheric pressure in hPa for weather insight." },
    { icon: Sun, title: "UV Index", desc: "Color-coded UV levels with safety recommendations." },
    { icon: CloudRain, title: "7-Day Forecast", desc: "Extended outlook with highs and lows." },
    { icon: Clock, title: "Hourly Forecast", desc: "Next 12 hours in smooth, scrollable view." },
    { icon: MapPin, title: "City Search", desc: "Search any city worldwide via geocoding." },
    { icon: Smartphone, title: "Fully Responsive", desc: "Optimized for mobile, tablet, and desktop." },
  ];

  return (
    <section className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-sky-600 to-cyan-500 dark:from-sky-300 dark:to-cyan-300 bg-clip-text text-transparent">
          Our Services
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Everything you need to stay informed about the weather — beautifully presented.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="glass rounded-3xl p-6 hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-300 group"
          >
            <div className="p-3 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 text-white w-fit group-hover:scale-110 transition-transform">
              <Icon className="w-6 h-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-800 dark:text-gray-100">{title}</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1.5">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}