import Link from "next/link";
import { CloudSun, Code2, MessageCircle, BriefcaseBusiness, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/20 glass">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 rounded-xl bg-linear-to-br from-sky-500 to-cyan-400 text-white">
              <CloudSun className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold bg-linear-to-r from-sky-600 to-cyan-500 bg-clip-text text-transparent">
              SkyCast
            </span>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-sm">
            Real-time weather, forecasts, and insights — powered by Open-Meteo. Beautiful, fast, and free.
          </p>
          <div className="flex gap-3 mt-4">
            {[Code2, MessageCircle, BriefcaseBusiness, Mail].map((Icon, i) => (
              <a key={i} href="#" className="p-2 rounded-full bg-white/40 dark:bg-white/10 hover:bg-sky-500 hover:text-white transition-colors">
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-100">Navigation</h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li><Link href="/" className="hover:text-sky-500">Home</Link></li>
            <li><Link href="/about" className="hover:text-sky-500">About</Link></li>
            <li><Link href="/services" className="hover:text-sky-500">Services</Link></li>
            <li><Link href="/contact" className="hover:text-sky-500">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-3 text-gray-800 dark:text-gray-100">Resources</h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li><a href="https://open-meteo.com/" target="_blank" rel="noopener" className="hover:text-sky-500">Open-Meteo API</a></li>
            <li><a href="https://nextjs.org/" target="_blank" rel="noopener" className="hover:text-sky-500">Next.js</a></li>
            <li><a href="https://tailwindcss.com/" target="_blank" rel="noopener" className="hover:text-sky-500">Tailwind CSS</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/20 py-4 text-center text-xs text-gray-500 dark:text-gray-400">
        © 2026 SkyCast. Crafted with ❤️ using Next.js and Tailwind CSS.
      </div>
    </footer>
  );
}