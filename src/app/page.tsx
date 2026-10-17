import WeatherDisplay from "@/components/WeatherDisplay";
import Link from "next/link";
import { ArrowRight, Sparkles, Globe2, Zap } from "lucide-react";

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-4 pt-14 pb-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-xs font-medium text-sky-600 dark:text-sky-300 mb-5">
          <Sparkles className="w-3.5 h-3.5" />
          Powered by Open-Meteo · No API Key Required
        </div>
        <h1 className="text-4xl sm:text-6xl font-bold leading-tight bg-gradient-to-r from-sky-600 via-cyan-500 to-blue-500 dark:from-sky-300 dark:via-cyan-300 dark:to-blue-300 bg-clip-text text-transparent">
          Weather, Reimagined.
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Beautiful, real-time weather data with hourly and 7-day forecasts — for any city in the world.
        </p>
      </section>

      {/* Weather Display */}
      <WeatherDisplay />

      {/* Feature Highlights */}
      <section className="max-w-6xl mx-auto px-4 py-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Globe2, title: "Global Coverage", desc: "Search and view weather for any city worldwide instantly." },
            { icon: Zap, title: "Real-Time Data", desc: "Live updates on temperature, humidity, wind and more." },
            { icon: Sparkles, title: "Beautiful UI", desc: "Crafted with modern glassmorphism and smooth animations." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass rounded-3xl p-6 hover:shadow-xl transition-shadow">
              <div className="p-3 rounded-2xl bg-gradient-to-br from-sky-500 to-cyan-400 text-white w-fit">
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="mt-4 text-lg font-semibold">{title}</h3>
              <p className="mt-1.5 text-sm text-gray-600 dark:text-gray-400">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 pb-20">
        <div className="rounded-3xl bg-gradient-to-br from-sky-600 to-cyan-500 p-10 text-center text-white shadow-2xl">
          <h2 className="text-2xl sm:text-3xl font-bold">Learn more about SkyCast</h2>
          <p className="mt-3 text-white/90 max-w-lg mx-auto">
            Discover the features and services we offer to make weather tracking delightful.
          </p>
          <div className="flex gap-3 justify-center mt-6">
            <Link href="/services" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-sky-600 rounded-full font-semibold hover:bg-sky-50 transition">
              Explore Services <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 border border-white/40 rounded-full font-semibold hover:bg-white/10 transition">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}