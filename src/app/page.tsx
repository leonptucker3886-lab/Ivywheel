import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-950 flex items-center justify-center">
      <div className="text-center px-6">
        <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-rose-400 to-amber-300 bg-clip-text text-transparent">
          Coloring Book Generator
        </h1>
        <p className="text-xl text-neutral-400 mb-4 max-w-xl mx-auto">
          Create beautiful printable coloring pages featuring pitbulls, gardens,
          butterflies, mandalas, and more.
        </p>
        <p className="text-neutral-500 mb-10 max-w-lg mx-auto">
          Relax, unwind, and let your creativity bloom — one page at a time.
        </p>
        <Link
          href="/generator"
          className="inline-block px-8 py-4 bg-rose-500 hover:bg-rose-400 text-white font-semibold rounded-xl transition-colors text-lg"
        >
          Start Creating
        </Link>
      </div>
    </main>
  );
}
