export default function WeatherSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 space-y-6 animate-fade-in">
      <div className="h-56 rounded-3xl skeleton" />
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => <div key={i} className="h-32 rounded-2xl skeleton" />)}
      </div>
      <div className="h-48 rounded-3xl skeleton" />
    </div>
  );
}