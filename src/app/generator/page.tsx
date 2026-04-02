"use client";

import { useState, useCallback, useRef } from "react";
import { categories, pitbullVariationHints } from "@/lib/categories";
import { CategoryCard } from "@/components/CategoryCard";
import { FallingLeaves } from "@/components/FallingLeaves";

interface HistoryItem {
  id: string;
  imageUrl: string;
  title: string;
  prompt: string;
  timestamp: number;
}

interface Variation {
  id: string;
  imageUrl: string;
}

function LoadingSpinner({ message }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      <div className="relative w-28 h-28">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full animate-spin"
          style={{ animationDuration: "3s" }}
        >
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="rgba(16,185,129,0.12)"
            strokeWidth="4"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="url(#leafGrad)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="200 64"
          />
          <defs>
            <linearGradient id="leafGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10b981" />
              <stop offset="100%" stopColor="#5eead4" />
            </linearGradient>
          </defs>
        </svg>
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ animation: "pulse 2s ease-in-out infinite" }}
        >
          <svg
            width="36"
            height="36"
            viewBox="0 0 40 40"
            fill="none"
            className="text-emerald-400"
          >
            <path
              d="M20 4C16 4 8 8 6 16C4 24 10 32 16 34C14 28 14 22 18 18C22 14 26 16 28 20C30 16 28 8 20 4Z"
              fill="currentColor"
            />
            <path
              d="M20 4C20 4 20 20 16 34"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.5"
            />
          </svg>
        </div>
      </div>
      <div className="text-center">
        <p className="text-emerald-300 text-lg font-medium">
          {message || "Creating your peaceful coloring page..."}
        </p>
        <p className="text-stone-500 text-sm mt-2">
          This may take up to a minute
        </p>
      </div>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(0.92); }
        }
      `}</style>
    </div>
  );
}

function IvyDecor() {
  return (
    <svg
      className="absolute -top-2 -right-2 w-16 h-16 text-emerald-800/30 pointer-events-none"
      viewBox="0 0 60 60"
      fill="none"
    >
      <path
        d="M30 5C24 5 12 12 9 24C6 36 15 48 24 51C21 42 21 33 27 27C33 21 39 24 42 30C45 24 42 12 30 5Z"
        fill="currentColor"
      />
      <path
        d="M45 15C40 18 36 25 35 32"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
    </svg>
  );
}

function PitbullHintBar({
  onSelect,
}: {
  onSelect: (hint: string) => void;
}) {
  const hints = Object.entries(pitbullVariationHints).map(
    ([keyword]) => keyword
  );
  return (
    <div className="flex flex-wrap gap-2 mt-3">
      {hints.map((hint) => (
        <button
          key={hint}
          onClick={() => onSelect(hint)}
          className="px-3 py-1.5 text-xs font-medium bg-stone-700/60 hover:bg-emerald-700/40 text-stone-300 hover:text-emerald-200 rounded-full border border-stone-600/40 hover:border-emerald-600/50 transition-all duration-200 hover:scale-105"
        >
          {hint}
        </button>
      ))}
    </div>
  );
}

export default function GeneratorPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [pitbullModifiers, setPitbullModifiers] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sceneTitle, setSceneTitle] = useState<string>("");
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [viewingHistory, setViewingHistory] = useState<HistoryItem | null>(
    null
  );
  const [variations, setVariations] = useState<Variation[]>([]);
  const [isGeneratingVariations, setIsGeneratingVariations] = useState(false);
  const [variationCount, setVariationCount] = useState(0);
  const [isFallback, setIsFallback] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  const isCustom = selectedCategory === "custom";
  const isPitbull = selectedCategory === "pitbull";
  const selectedCategoryData = categories.find(
    (c) => c.id === selectedCategory
  );

  const generateImage = useCallback(
    async (
      prompt: string,
      style: string,
      customModifiers?: string
    ): Promise<string> => {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style, customModifiers }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate image");
      }

      return data.imageUrl;
    },
    []
  );

  const generate = useCallback(async () => {
    if (!selectedCategory) {
      setError("Select a category");
      return;
    }
    if (isCustom && !customPrompt.trim()) {
      setError("Enter a description for your scene");
      return;
    }

      setIsGenerating(true);
    setError(null);
    setGeneratedImage(null);
    setViewingHistory(null);
    setVariations([]);
    setIsFallback(false);

    const prompt = isCustom
      ? customPrompt.trim()
      : selectedCategoryData?.prompt || "";

    const style =
      selectedCategory === "tattoo-flash"
        ? "tattoo-flash"
        : isPitbull
          ? "pitbull"
          : "default";

    const title = isPitbull
      ? "Realistic Pitbull"
      : isCustom
        ? "Custom Scene"
        : selectedCategoryData?.name || "Coloring Page";

    setSceneTitle(title);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          style,
          customModifiers: isPitbull ? pitbullModifiers : undefined,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate image");
      }

      setGeneratedImage(data.imageUrl);
      setIsFallback(!!data.fallback);

      const item: HistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        imageUrl: data.imageUrl,
        title,
        prompt,
        timestamp: Date.now(),
      };
      setHistory((prev) => [item, ...prev].slice(0, 4));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  }, [
    selectedCategory,
    customPrompt,
    isCustom,
    isPitbull,
    selectedCategoryData,
    generateImage,
    pitbullModifiers,
  ]);

  const generateWithVariations = useCallback(async () => {
    if (!selectedCategory) return;

    const prompt = isCustom
      ? customPrompt.trim()
      : selectedCategoryData?.prompt || "";

    const style =
      selectedCategory === "tattoo-flash"
        ? "tattoo-flash"
        : isPitbull
          ? "pitbull"
          : "default";

    setIsGeneratingVariations(true);
    setVariations([]);
    setVariationCount(0);

    try {
      const newVariations: Variation[] = [];
      for (let i = 0; i < 3; i++) {
        const imageUrl = await generateImage(
          prompt,
          style,
          isPitbull ? pitbullModifiers : undefined
        );
        const variation: Variation = {
          id: `var-${Date.now()}-${i}`,
          imageUrl,
        };
        newVariations.push(variation);
        setVariations([...newVariations]);
        setVariationCount(i + 1);

        const item: HistoryItem = {
          id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
          imageUrl,
          title: sceneTitle || "Variation",
          prompt,
          timestamp: Date.now(),
        };
        setHistory((prev) => [item, ...prev].slice(0, 4));
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to generate variations"
      );
    } finally {
      setIsGeneratingVariations(false);
    }
  }, [
    selectedCategory,
    customPrompt,
    isCustom,
    isPitbull,
    selectedCategoryData,
    generateImage,
    sceneTitle,
    pitbullModifiers,
  ]);

  function handleViewHistory(item: HistoryItem) {
    setViewingHistory(item);
    setGeneratedImage(item.imageUrl);
    setSceneTitle(item.title);
    setVariations([]);
  }

  function handleBackToMain() {
    setViewingHistory(null);
    setGeneratedImage(null);
    setSceneTitle("");
    setVariations([]);
    setError(null);
    setIsFallback(false);
  }

  function handlePitbullHintSelect(hint: string) {
    setPitbullModifiers((prev) => {
      if (prev.toLowerCase().includes(hint)) return prev;
      return prev ? `${prev}, ${hint}` : hint;
    });
  }

  function handleDownloadPNG() {
    const img = viewingHistory ? viewingHistory.imageUrl : generatedImage;
    const title = viewingHistory ? viewingHistory.title : sceneTitle;
    if (!img) return;

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const targetSize = 2048;
      const canvas = document.createElement("canvas");
      canvas.width = targetSize;
      canvas.height = targetSize;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(image, 0, 0, targetSize, targetSize);

      canvas.toBlob(
        (blob) => {
          if (!blob) return;
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${title.toLowerCase().replace(/\s+/g, "-")}-coloring-page-2048px.png`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
        },
        "image/png",
        1.0
      );
    };
    image.src = img;
  }

  function handleDownloadPDF() {
    const img = viewingHistory ? viewingHistory.imageUrl : generatedImage;
    const title = viewingHistory ? viewingHistory.title : sceneTitle;
    if (!img) return;

    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth || 1024;
      canvas.height = image.naturalHeight || 1024;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(image, 0, 0);

      const imgData = canvas.toDataURL("image/png");

      const pdfWidth = 595.28;
      const pdfHeight = 841.89;
      const margin = 20;
      const printableW = pdfWidth - margin * 2;
      const printableH = pdfHeight - margin * 2;
      const aspect = canvas.width / canvas.height;

      let drawW, drawH;
      if (printableW / printableH > aspect) {
        drawH = printableH;
        drawW = drawH * aspect;
      } else {
        drawW = printableW;
        drawH = drawW / aspect;
      }

      const offsetX = margin + (printableW - drawW) / 2;
      const offsetY = margin + (printableH - drawH) / 2;

      const stream = buildMinimalPDF(
        imgData,
        pdfWidth,
        pdfHeight,
        drawW,
        drawH,
        offsetX,
        offsetY
      );

      const blob = new Blob([new Uint8Array(stream)], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${title.toLowerCase().replace(/\s+/g, "-")}-coloring-page.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    };
    image.src = img;
  }

  function handlePrint() {
    const img = viewingHistory ? viewingHistory.imageUrl : generatedImage;
    if (!img) return;

    const printWindow = window.open("", "_blank");
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${sceneTitle} - Ivy's Peace</title>
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 100vh;
              background: white;
              font-family: Georgia, serif;
            }
            img {
              max-width: 90vw;
              max-height: 85vh;
              object-fit: contain;
            }
            .watermark {
              margin-top: 8px;
              font-size: 11px;
              color: #ccc;
              letter-spacing: 2px;
              text-transform: uppercase;
            }
            @media print {
              body { padding: 0; }
              img { max-width: 100%; max-height: 100vh; }
              .watermark { color: #e0e0e0; }
            }
          </style>
        </head>
        <body>
          <img src="${img}" alt="${sceneTitle}" />
          <div class="watermark">Ivy's Peace</div>
          <script>
            window.onload = function() {
              setTimeout(function() { window.print(); }, 300);
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }

  function handleSelectVariation(variation: Variation) {
    setGeneratedImage(variation.imageUrl);
    setViewingHistory(null);

    const item: HistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      imageUrl: variation.imageUrl,
      title: sceneTitle,
      prompt: "",
      timestamp: Date.now(),
    };
    setHistory((prev) => [item, ...prev].slice(0, 4));
  }

  const activeImage = viewingHistory ? viewingHistory.imageUrl : generatedImage;
  const activeTitle = viewingHistory ? viewingHistory.title : sceneTitle;

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-950 via-stone-950 to-emerald-950/20 text-white relative overflow-hidden">
      <FallingLeaves />

      <div className="flex min-h-screen relative z-10">
        <div className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <header className="text-center mb-10 sm:mb-14">
            <div className="inline-flex items-center gap-2 mb-4">
              <svg
                width="28"
                height="28"
                viewBox="0 0 40 40"
                fill="none"
                className="text-emerald-400"
              >
                <path
                  d="M20 4C16 4 8 8 6 16C4 24 10 32 16 34C14 28 14 22 18 18C22 14 26 16 28 20C30 16 28 8 20 4Z"
                  fill="currentColor"
                />
              </svg>
              <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                Ivy&apos;s Peace
              </h1>
              <svg
                width="28"
                height="28"
                viewBox="0 0 40 40"
                fill="none"
                className="text-emerald-400 scale-x-[-1]"
              >
                <path
                  d="M20 4C16 4 8 8 6 16C4 24 10 32 16 34C14 28 14 22 18 18C22 14 26 16 28 20C30 16 28 8 20 4Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <p className="text-stone-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
              Create beautiful coloring pages to print and enjoy. Pick a scene or
              describe your own, then let AI craft a unique design for you.
            </p>
          </header>

          {!activeImage && !isGenerating && (
            <>
              <section className="mb-8">
                <h2 className="text-xl sm:text-2xl font-semibold mb-6 flex items-center gap-2">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-emerald-400"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                    <line x1="9" y1="9" x2="9.01" y2="9" />
                    <line x1="15" y1="9" x2="15.01" y2="9" />
                  </svg>
                  Choose a Scene
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {categories.map((category) => (
                    <div key={category.id} className="relative">
                      <CategoryCard
                        name={category.name}
                        description={category.description}
                        emoji={category.emoji}
                        isSelected={selectedCategory === category.id}
                        onClick={() => setSelectedCategory(category.id)}
                      />
                      <IvyDecor />
                    </div>
                  ))}
                  <div className="relative">
                    <CategoryCard
                      name="Custom"
                      description="Describe your own unique scene"
                      emoji="✏️"
                      isSelected={isCustom}
                      onClick={() => setSelectedCategory("custom")}
                    />
                    <IvyDecor />
                  </div>
                </div>
              </section>

              {isPitbull && (
                <section className="mb-8 animate-in slide-in-from-top-4 duration-300">
                  <label className="block text-sm font-medium text-emerald-300 mb-2">
                    Pitbull scene modifiers{" "}
                    <span className="text-stone-500 font-normal">
                      (optional — click to add)
                    </span>
                  </label>
                  <input
                    type="text"
                    value={pitbullModifiers}
                    onChange={(e) => setPitbullModifiers(e.target.value)}
                    placeholder='e.g., "puppy", "with bandana", "portrait close-up", "playing"'
                    className="w-full px-5 py-3.5 rounded-xl bg-stone-800/80 border-2 border-emerald-600/40 text-white placeholder-stone-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 text-base transition-colors duration-200"
                  />
                  <PitbullHintBar onSelect={handlePitbullHintSelect} />
                  <p className="text-stone-500 text-xs mt-2 flex items-center gap-1.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-emerald-600"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                    Click hints or type your own. Realistic pitbull anatomy is
                    always maintained.
                  </p>
                </section>
              )}

              {isCustom && (
                <section className="mb-8 animate-in slide-in-from-top-4 duration-300">
                  <label className="block text-sm font-medium text-emerald-300 mb-2">
                    Describe your scene
                  </label>
                  <textarea
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    placeholder="e.g., a majestic wolf howling at the moon on a mountain cliff with pine trees and stars"
                    className="w-full h-28 px-5 py-4 rounded-xl bg-stone-800/80 border-2 border-emerald-600/40 text-white placeholder-stone-500 focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400/30 resize-none text-base transition-colors duration-200"
                  />
                  <p className="text-stone-500 text-xs mt-2 flex items-center gap-1.5">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="text-emerald-600"
                    >
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                      <path d="M12 16v-4M12 8h.01" />
                    </svg>
                    Ivy leaf borders will be added automatically
                  </p>
                </section>
              )}

              <div className="flex flex-col items-center gap-3">
                <button
                  onClick={generate}
                  disabled={
                    isGenerating ||
                    !selectedCategory ||
                    (isCustom && !customPrompt.trim())
                  }
                  className="group px-10 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:from-stone-700 disabled:to-stone-700 disabled:text-stone-500 text-white font-semibold rounded-xl transition-all duration-300 text-lg shadow-lg shadow-emerald-900/30 hover:shadow-emerald-800/40 hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="flex items-center gap-2">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M12 3v18M5.5 7.5l13 9M5.5 16.5l13-9" />
                    </svg>
                    Generate Coloring Page
                  </span>
                </button>
                {error && (
                  <p className="text-red-400 text-sm bg-red-950/30 px-4 py-2 rounded-lg">
                    {error}
                  </p>
                )}
              </div>
            </>
          )}

          {isGenerating && (
            <LoadingSpinner
              message={
                isGeneratingVariations
                  ? `Generating variation ${variationCount + 1} of 3...`
                  : undefined
              }
            />
          )}

          {activeImage && !isGenerating && (
            <section className="flex flex-col items-center">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl sm:text-3xl font-bold text-emerald-300">
                  {activeTitle}
                </h2>
                {viewingHistory && (
                  <span className="text-xs bg-stone-700 text-stone-300 px-2.5 py-1 rounded-full">
                    From history
                  </span>
                )}
              </div>
              <p className="text-stone-400 text-sm mb-6 max-w-lg text-center">
                {isPitbull
                  ? "Your professional realistic pitbull coloring page is ready. High-resolution 2048px for crisp printing."
                  : "Your AI-generated coloring page is ready. Print it out and enjoy coloring!"}
              </p>

              <div className="rounded-2xl overflow-hidden border-2 border-emerald-800/40 shadow-2xl shadow-emerald-900/20 bg-white max-w-xl w-full">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  ref={imageRef}
                  src={activeImage}
                  alt={`Generated coloring page: ${activeTitle}`}
                  width={1024}
                  height={1024}
                  className="w-full h-auto"
                />
              </div>
              {isFallback && !viewingHistory && (
                <div className="mt-4 p-3 bg-amber-900/20 border border-amber-600/40 rounded-lg">
                  <p className="text-amber-300 text-sm flex items-center gap-2">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="12" />
                      <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    Using fallback SVG design while AI image service is unavailable. The design maintains the coloring page style and can still be printed and colored.
                  </p>
                </div>
              )}

              <div className="mt-8 flex flex-wrap gap-3 justify-center">
                <button
                  onClick={handleDownloadPNG}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm flex items-center gap-2 hover:scale-[1.03] active:scale-[0.97]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                  Download PNG
                  {isPitbull && (
                    <span className="text-emerald-200/70 text-xs">(2048px)</span>
                  )}
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="px-5 py-2.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm flex items-center gap-2 hover:scale-[1.03] active:scale-[0.97]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="16" y1="13" x2="8" y2="13" />
                    <line x1="16" y1="17" x2="8" y2="17" />
                  </svg>
                  Download PDF
                </button>
                <button
                  onClick={handlePrint}
                  className="px-5 py-2.5 bg-stone-700 hover:bg-stone-600 text-white font-semibold rounded-xl transition-all duration-200 text-sm flex items-center gap-2 hover:scale-[1.03] active:scale-[0.97]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="6 9 6 2 18 2 18 9" />
                    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
                    <rect x="6" y="14" width="12" height="8" />
                  </svg>
                  Print
                </button>
                <button
                  onClick={generateWithVariations}
                  disabled={isGeneratingVariations}
                  className="px-5 py-2.5 bg-stone-700 hover:bg-stone-600 disabled:bg-stone-800 disabled:text-stone-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm flex items-center gap-2 hover:scale-[1.03] active:scale-[0.97]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="8" height="8" rx="1" />
                    <rect x="14" y="2" width="8" height="8" rx="1" />
                    <rect x="2" y="14" width="8" height="8" rx="1" />
                    <rect x="14" y="14" width="8" height="8" rx="1" />
                  </svg>
                  {isGeneratingVariations
                    ? `Generating... (${variationCount}/3)`
                    : "Generate Variations"}
                </button>
                <button
                  onClick={handleBackToMain}
                  className="px-5 py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white font-medium rounded-xl transition-all duration-200 text-sm flex items-center gap-2 hover:scale-[1.03] active:scale-[0.97]"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="19" y1="12" x2="5" y2="12" />
                    <polyline points="12 19 5 12 12 5" />
                  </svg>
                  New Scene
                </button>
              </div>

              {isGeneratingVariations && (
                <div className="mt-6 w-full max-w-xl">
                  <div className="bg-stone-800/60 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500 ease-out"
                      style={{ width: `${(variationCount / 3) * 100}%` }}
                    />
                  </div>
                </div>
              )}

              {variations.length > 0 && !isGeneratingVariations && (
                <div className="mt-8 w-full max-w-xl">
                  <h3 className="text-lg font-semibold text-emerald-300 mb-4 flex items-center gap-2">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="2" y="2" width="8" height="8" rx="1" />
                      <rect x="14" y="2" width="8" height="8" rx="1" />
                      <rect x="2" y="14" width="8" height="8" rx="1" />
                      <rect x="14" y="14" width="8" height="8" rx="1" />
                    </svg>
                    Variations
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {variations.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => handleSelectVariation(v)}
                        className="rounded-xl overflow-hidden border-2 border-stone-700 hover:border-emerald-500 transition-all duration-200 hover:scale-[1.03] hover:shadow-lg hover:shadow-emerald-900/30 bg-white"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={v.imageUrl}
                          alt="Variation"
                          width={300}
                          height={300}
                          className="w-full h-auto"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {error && (
                <p className="text-red-400 text-sm mt-4 bg-red-950/30 px-4 py-2 rounded-lg">
                  {error}
                </p>
              )}
            </section>
          )}
        </div>

        {history.length > 0 && (
          <aside className="hidden lg:flex flex-col w-56 xl:w-64 border-l border-stone-800/60 bg-stone-900/40 backdrop-blur-sm p-4 flex-shrink-0">
            <h3 className="text-sm font-semibold text-emerald-400/80 mb-4 flex items-center gap-2 uppercase tracking-wider">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
              Recent
            </h3>
            <div className="flex flex-col gap-3">
              {history.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleViewHistory(item)}
                  className={`group rounded-xl overflow-hidden border-2 transition-all duration-200 bg-white hover:scale-[1.03] hover:shadow-lg hover:shadow-emerald-900/20 ${
                    viewingHistory?.id === item.id
                      ? "border-emerald-400 shadow-md shadow-emerald-900/30"
                      : "border-stone-700/60 hover:border-emerald-600/50"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    width={200}
                    height={200}
                    className="w-full h-auto"
                  />
                  <div className="px-2.5 py-2 bg-stone-800/90">
                    <p className="text-xs font-medium text-stone-200 truncate">
                      {item.title}
                    </p>
                    <p className="text-[10px] text-stone-500">
                      {formatTimeAgo(item.timestamp)}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </aside>
        )}
      </div>
    </main>
  );
}

function formatTimeAgo(timestamp: number): string {
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return "Just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours}h ago`;
}

function buildMinimalPDF(
  imgDataUrl: string,
  pageW: number,
  pageH: number,
  drawW: number,
  drawH: number,
  offsetX: number,
  offsetY: number
): Uint8Array {
  const base64 = imgDataUrl.split(",")[1];
  const binaryStr = atob(base64);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }

  const watermarkText = "Ivy's Peace";
  const watermarkStream = `BT /F1 8 Tf 250 12 Td (${watermarkText}) Tj ET`;

  const imageStream = `q ${drawW.toFixed(2)} 0 0 ${drawH.toFixed(2)} ${offsetX.toFixed(2)} ${offsetY.toFixed(2)} cm /Img Do Q`;
  const fullStreamContent = `${watermarkStream}\n${imageStream}`;

  const objects: string[] = [];
  const offsets: number[] = [];

  function addObj(content: string) {
    offsets.push(objects.length === 0 ? 0 : getLength());
    objects.push(content);
  }

  function getLength() {
    let len = 0;
    for (let i = 0; i < objects.length; i++) {
      len += objects[i].length;
    }
    return len;
  }

  const header = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
  addObj(header);

  const obj1 = `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`;
  addObj(obj1);

  const obj2 = `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`;
  addObj(obj2);

  const obj3 = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Contents 4 0 R /Resources << /XObject << /Img 5 0 R >> /Font << /F1 6 0 R >> >> >>\nendobj\n`;
  addObj(obj3);

  const obj4 = `4 0 obj\n<< /Length ${fullStreamContent.length} >>\nstream\n${fullStreamContent}\nendstream\nendobj\n`;
  addObj(obj4);

  const obj5Header = `5 0 obj\n<< /Type /XObject /Subtype /Image /Width 1024 /Height 1024 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${bytes.length} >>\nstream\n`;
  const obj5Footer = "\nendstream\nendobj\n";

  const obj6 = `6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`;

  const totalLen =
    header.length +
    obj1.length +
    obj2.length +
    obj3.length +
    obj4.length +
    obj5Header.length +
    bytes.length +
    obj5Footer.length +
    obj6.length +
    512;

  const result = new Uint8Array(totalLen);
  let pos = 0;

  function writeStr(s: string) {
    for (let i = 0; i < s.length; i++) {
      result[pos++] = s.charCodeAt(i);
    }
  }

  function writeBytes(b: Uint8Array) {
    result.set(b, pos);
    pos += b.length;
  }

  let runningOffset = 0;
  const xrefOffsets: number[] = [];

  writeStr(header);
  xrefOffsets.push(runningOffset);
  runningOffset += header.length;

  writeStr(obj1);
  xrefOffsets.push(runningOffset);
  runningOffset += obj1.length;

  writeStr(obj2);
  xrefOffsets.push(runningOffset);
  runningOffset += obj2.length;

  writeStr(obj3);
  xrefOffsets.push(runningOffset);
  runningOffset += obj3.length;

  writeStr(obj4);
  xrefOffsets.push(runningOffset);
  runningOffset += obj4.length;

  writeStr(obj5Header);
  xrefOffsets.push(runningOffset);
  runningOffset += obj5Header.length;

  writeBytes(bytes);

  writeStr(obj5Footer);
  runningOffset += obj5Footer.length;

  writeStr(obj6);
  xrefOffsets.push(runningOffset);
  runningOffset += obj6.length;

  const xrefStart = runningOffset;
  writeStr("xref\n");
  writeStr("0 7\n");
  writeStr("0000000000 65535 f \n");
  for (let i = 0; i < xrefOffsets.length; i++) {
    const off = xrefOffsets[i].toString().padStart(10, "0");
    writeStr(`${off} 00000 n \n`);
  }

  writeStr("trailer\n");
  writeStr("<< /Size 7 /Root 1 0 R >>\n");
  writeStr("startxref\n");
  writeStr(`${xrefStart}\n`);
  writeStr("%%EOF\n");

  return result.slice(0, pos);
}
