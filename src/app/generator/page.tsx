"use client";

import { useState } from "react";
import Image from "next/image";
import { categories } from "@/lib/categories";
import { CategoryCard } from "@/components/CategoryCard";

export default function GeneratorPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [addIvyLeaves, setAddIvyLeaves] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerate() {
    if (!selectedCategory && !customPrompt.trim()) {
      setError("Select a category or enter a custom prompt");
      return;
    }

    setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId: selectedCategory,
          customPrompt: customPrompt.trim() || undefined,
          addIvyLeaves,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Generation failed");
      }

      setGeneratedImage(data.imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-rose-400 to-amber-300 bg-clip-text text-transparent">
            Coloring Book Generator
          </h1>
          <p className="text-neutral-400 text-lg max-w-2xl mx-auto">
            Create beautiful coloring pages to print and enjoy. Pick a scene, add
            ivy leaves for an elegant touch, and let your creativity flow.
          </p>
        </header>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-6">Choose a Scene</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                name={category.name}
                description={category.description}
                emoji={category.emoji}
                isSelected={selectedCategory === category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  setCustomPrompt("");
                }}
              />
            ))}
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4">Custom Description</h2>
          <textarea
            value={customPrompt}
            onChange={(e) => {
              setCustomPrompt(e.target.value);
              if (e.target.value.trim()) setSelectedCategory(null);
            }}
            placeholder="Describe your own coloring page scene..."
            className="w-full h-28 px-4 py-3 rounded-xl bg-neutral-800 border border-neutral-700 text-white placeholder-neutral-500 focus:outline-none focus:border-rose-400 resize-none"
          />
        </section>

        <section className="mb-10 flex items-center gap-4">
          <label className="flex items-center gap-3 cursor-pointer select-none group">
            <div className="relative">
              <input
                type="checkbox"
                checked={addIvyLeaves}
                onChange={(e) => setAddIvyLeaves(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-neutral-700 peer-checked:bg-emerald-600 rounded-full transition-colors" />
              <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
            </div>
            <span className="text-neutral-300 group-hover:text-white transition-colors">
              🍃 Add ivy leaves border
            </span>
          </label>
        </section>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || (!selectedCategory && !customPrompt.trim())}
            className="px-8 py-4 bg-rose-500 hover:bg-rose-400 disabled:bg-neutral-700 disabled:text-neutral-500 text-white font-semibold rounded-xl transition-colors text-lg"
          >
            {isGenerating ? "Generating..." : "Generate Coloring Page"}
          </button>

          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        {generatedImage && (
          <section className="mt-12 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-6">Your Coloring Page</h2>
            <div className="rounded-2xl overflow-hidden border border-neutral-700 shadow-2xl bg-white">
              <Image
                src={generatedImage}
                alt="Generated coloring page"
                width={512}
                height={512}
                className="max-w-full h-auto"
              />
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
