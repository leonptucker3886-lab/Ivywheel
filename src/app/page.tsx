import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-stone-950 flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
          Ivy&apos;s Peace
        </h1>
        <p className="text-xl text-stone-400 mb-4 max-w-xl mx-auto">
          Create beautiful printable coloring pages featuring pitbulls, gardens,
          butterflies, mandalas, and more.
        </p>
        <p className="text-stone-500 mb-10 max-w-lg mx-auto">
          Relax, unwind, and let your creativity bloom — one page at a time.
        </p>
        <Link
          href="/generator"
          className="inline-block px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors text-lg"
        >
          Start Creating
        </Link>
      </div>
    </main>
  );
}
