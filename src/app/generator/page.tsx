"use client";

import { useState, useCallback } from "react";
import { categories } from "@/lib/categories";
import { generateColoringPage } from "@/lib/generator";
import { CategoryCard } from "@/components/CategoryCard";

export default function GeneratorPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [addIvyLeaves, setAddIvyLeaves] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastGenerated, setLastGenerated] = useState<{ categoryId: string; customPrompt: string } | null>(null);

  const isCustom = selectedCategory === "custom";

  const generate = useCallback(() => {
    if (!selectedCategory) {
      setError("Select a category");
      return;
    }
    if (isCustom && !customPrompt.trim()) {
      setError("Enter a description for your custom scene");
      return;
    }

    setIsGenerating(true);
    setError(null);

    const categoryId = selectedCategory;
    const prompt = isCustom ? customPrompt.trim() : "";

    setLastGenerated({ categoryId, customPrompt: prompt });

    requestAnimationFrame(() => {
      try {
        const seed = Date.now() + Math.floor(Math.random() * 100000);
        const imageUrl = generateColoringPage(categoryId, addIvyLeaves, seed, prompt || undefined);
        setGeneratedImage(imageUrl);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong");
      } finally {
        setIsGenerating(false);
      }
    });
  }, [selectedCategory, customPrompt, addIvyLeaves, isCustom]);

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
          const imageUrl = generateColoringPage(
            lastGenerated.categoryId,
            addIvyLeaves,
            seed,
            lastGenerated.customPrompt || undefined
          );
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
    a.download = "ivys-peace-coloring-page.svg";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  return (
    <main className="min-h-screen bg-stone-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Ivy&apos;s Peace
          </h1>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto">
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
                onClick={() => setSelectedCategory(category.id)}
              />
            ))}
            <CategoryCard
              name="Custom"
              description="Describe your own unique scene"
              emoji="✏️"
              isSelected={isCustom}
              onClick={() => setSelectedCategory("custom")}
            />
          </div>
        </section>

        {isCustom && (
          <section className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">Your Description</h2>
            <textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Describe your coloring page scene... (e.g., 'a wolf howling at the moon on a mountain cliff with pine trees')"
              className="w-full h-32 px-4 py-3 rounded-xl bg-stone-800 border-2 border-emerald-500/50 text-white placeholder-stone-500 focus:outline-none focus:border-emerald-400 resize-none text-base"
            />
            <p className="text-stone-500 text-sm mt-2">
              Your description creates a unique design. Different descriptions produce different results.
            </p>
          </section>
        )}

        <section className="mb-10 flex items-center gap-4">
          <label className="flex items-center gap-3 cursor-pointer select-none group">
            <div className="relative">
              <input
                type="checkbox"
                checked={addIvyLeaves}
                onChange={(e) => setAddIvyLeaves(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-stone-700 peer-checked:bg-emerald-600 rounded-full transition-colors" />
              <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
            </div>
            <span className="text-stone-300 group-hover:text-white transition-colors">
              🍃 Add ivy leaves border
            </span>
          </label>
        </section>

        <div className="flex flex-col items-center gap-4">
          <button
            onClick={handleGenerate}
            disabled={isGenerating || !selectedCategory || (isCustom && !customPrompt.trim())}
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
