"use client";

import { useState, useCallback } from "react";
import { categories } from "@/lib/categories";
import { generateColoringPage } from "@/lib/generator";
import { CategoryCard } from "@/components/CategoryCard";
import { FallingLeaves } from "@/components/FallingLeaves";

export default function GeneratorPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastGenerated, setLastGenerated] = useState<string | null>(null);

  const generate = useCallback(() => {
    if (!selectedCategory) {
      setError("Select a category");
      return;
    }

    setIsGenerating(true);
    setError(null);

    const categoryId = selectedCategory;
    setLastGenerated(categoryId);

    requestAnimationFrame(() => {
      try {
        const seed = Date.now() + Math.floor(Math.random() * 100000);
        const imageUrl = generateColoringPage(categoryId, false, seed);
        setGeneratedImage(imageUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsGenerating(false);
      }
    });
  }, [selectedCategory]);

  function handleGenerate() {
    generate();
  }

  function handleRegenerate() {
    if (lastGenerated) {
      setIsGenerating(true);
      setError(null);
      requestAnimationFrame(() => {
        try {
          const seed = Date.now() + Math.floor(Math.random() * 100000);
          const imageUrl = generateColoringPage(lastGenerated, false, seed);
          setGeneratedImage(imageUrl);
        } catch (err) {
          setError(err instanceof Error ? err.message : "Something went wrong");
        } finally {
          setIsGenerating(false);
        }
      });
    }
  }

  function handleDownload() {
    if (!generatedImage) return;
    const a = document.createElement("a");
    a.href = generatedImage;
    a.download = "coloring-page.svg";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  return (
    <main className="min-h-screen bg-stone-950 text-white relative overflow-hidden">
      <FallingLeaves />
      <div className="max-w-6xl mx-auto px-6 py-12 relative z-10">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Ivy&apos;s Peace
          </h1>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto">
            Create beautiful coloring pages to print and enjoy. Pick a scene
            and let your creativity flow.
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
                onClick={() => setSelectedCategory(category.id)}
              />
            ))}
          </div>
        </section>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !selectedCategory}
            className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-stone-700 disabled:text-stone-500 text-white font-semibold rounded-xl transition-colors text-lg"
          >
            {isGenerating ? "Generating..." : "Generate Coloring Page"}
          </button>

          {error && <p className="text-red-400 text-sm">{error}</p>}
        </div>

        {generatedImage && (
          <section className="mt-12 flex flex-col items-center">
            <h2 className="text-2xl font-semibold mb-6">Your Coloring Page</h2>
            <div className="rounded-2xl overflow-hidden border border-stone-700 shadow-2xl bg-white">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={generatedImage}
                alt="Generated coloring page"
                width={1024}
                height={1024}
                className="max-w-full h-auto"
              />
            </div>
            <div className="mt-6 flex gap-4">
              <button
                onClick={handleRegenerate}
                disabled={isGenerating}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-500 disabled:bg-stone-700 text-white font-semibold rounded-xl transition-colors text-base flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                </svg>
                Regenerate
              </button>
              <button
                onClick={handleDownload}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors text-base flex items-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Download
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
