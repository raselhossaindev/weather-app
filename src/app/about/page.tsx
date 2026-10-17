import { Code2, Palette, Zap, Globe, CloudSun, Cpu } from "lucide-react";

export default function AboutPage() {
  const stack = [
    { icon: Code2, name: "Next.js 14", desc: "App Router with React Server Components" },
    { icon: Palette, name: "Tailwind CSS", desc: "Utility-first, responsive styling" },
    { icon: Cpu, name: "TypeScript", desc: "End-to-end type safety" },
    { icon: Globe, name: "Open-Meteo API", desc: "Free, open-source weather data" },
    { icon: Zap, name: "Framer Motion", desc: "Smooth, delightful animations" },
    { icon: CloudSun, name: "Lucide Icons", desc: "Beautiful, consistent icon set" },
  ];

  return (
    <section className="max-w-4xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-sky-600 to-cyan-500 dark:from-sky-300 dark:to-cyan-300 bg-clip-text text-transparent">
          About SkyCast
        </h1>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          A modern weather application crafted with a focus on design, performance, and simplicity.
        </p>
      </div>

      <div className="glass rounded-3xl p-8 mb-10">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          SkyCast is a production-ready weather application built as part of a Next.js and Tailwind CSS assignment —
          evolved into a professional-grade project. It combines live data from the Open-Meteo API with a polished,
          animated interface. Users can search any city, view current conditions, hourly forecasts, and 7-day outlooks.
        </p>
        <p className="mt-4 text-gray-700 dark:text-gray-300 leading-relaxed">
          The app emphasizes accessibility, dark mode support, responsive layout, and clean architecture. 
          No API keys are required, making it perfect for demos and learning.
        </p>
      </div>

      <h2 className="text-2xl font-bold mb-6 text-center">Tech Stack</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {stack.map(({ icon: Icon, name, desc }) => (
          <div key={name} className="glass rounded-2xl p-5 hover:-translate-y-1 transition-transform">
            <div className="p-2.5 rounded-xl bg-linear-to-br from-sky-500 to-cyan-400 text-white w-fit">
              <Icon className="w-5 h-5" />
            </div>
            <h3 className="mt-3 font-semibold text-gray-800 dark:text-gray-100">{name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}