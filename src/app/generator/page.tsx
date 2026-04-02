"use client";

import { useState, useCallback, useRef } from "react";
import { categories } from "@/lib/categories";
import { CategoryCard } from "@/components/CategoryCard";
import { FallingLeaves } from "@/components/FallingLeaves";

function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-6">
      <div className="relative w-24 h-24">
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
            stroke="rgba(16,185,129,0.15)"
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
          style={{
            animation: "pulse 2s ease-in-out infinite",
          }}
        >
          <svg
            width="32"
            height="32"
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
          Creating your peaceful coloring page...
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

export default function GeneratorPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [customPrompt, setCustomPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sceneTitle, setSceneTitle] = useState<string>("");
  const [usedPrompt, setUsedPrompt] = useState<string>("");
  const imageRef = useRef<HTMLImageElement>(null);

  const isCustom = selectedCategory === "custom";
  const selectedCategoryData = categories.find(
    (c) => c.id === selectedCategory
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

    const prompt = isCustom
      ? customPrompt.trim()
      : selectedCategoryData?.prompt || "";

    const style = selectedCategory === "tattoo-flash" ? "tattoo-flash" : "default";
    const title = isCustom
      ? "Custom Scene"
      : selectedCategoryData?.name || "Coloring Page";

    setSceneTitle(title);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, style }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to generate image");
      }

      setGeneratedImage(data.imageUrl);
      setUsedPrompt(data.prompt || prompt);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsGenerating(false);
    }
  }, [selectedCategory, customPrompt, isCustom, selectedCategoryData]);

  function handleGenerate() {
    generate();
  }

  function handleRegenerate() {
    generate();
  }

  function handleNewScene() {
    setGeneratedImage(null);
    setSceneTitle("");
    setUsedPrompt("");
    setError(null);
    setSelectedCategory(null);
    setCustomPrompt("");
  }

  function handleDownloadPNG() {
    if (!generatedImage) return;
    const a = document.createElement("a");
    a.href = generatedImage;
    a.download = `${sceneTitle.toLowerCase().replace(/\s+/g, "-")}-coloring-page.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  function handleDownloadPDF() {
    if (!generatedImage) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth || 1024;
      canvas.height = img.naturalHeight || 1024;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(img, 0, 0);

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

      const blob = new Blob([new Uint8Array(stream)], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${sceneTitle.toLowerCase().replace(/\s+/g, "-")}-coloring-page.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    };
    img.src = generatedImage;
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
            Create beautiful coloring pages to print and enjoy. Pick a scene or
            describe your own, then let AI craft a unique design for you.
          </p>
        </header>

        {!generatedImage && !isGenerating && (
          <>
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
                <h2 className="text-2xl font-semibold mb-4">
                  Your Description
                </h2>
                <textarea
                  value={customPrompt}
                  onChange={(e) => setCustomPrompt(e.target.value)}
                  placeholder="Describe your coloring page scene... (e.g., 'a majestic wolf howling at the moon on a mountain cliff with pine trees')"
                  className="w-full h-32 px-4 py-3 rounded-xl bg-stone-800 border-2 border-emerald-500/50 text-white placeholder-stone-500 focus:outline-none focus:border-emerald-400 resize-none text-base"
                />
                <p className="text-stone-500 text-sm mt-2">
                  Your description creates a unique design with elegant ivy
                  leaf borders.
                </p>
              </section>
            )}

            <div className="flex flex-col items-center gap-4">
              <button
                onClick={handleGenerate}
                disabled={
                  isGenerating ||
                  !selectedCategory ||
                  (isCustom && !customPrompt.trim())
                }
                className="px-8 py-4 bg-emerald-600 hover:bg-emerald-500 disabled:bg-stone-700 disabled:text-stone-500 text-white font-semibold rounded-xl transition-colors text-lg"
              >
                Generate Coloring Page
              </button>
              {error && <p className="text-red-400 text-sm">{error}</p>}
            </div>
          </>
        )}

        {isGenerating && <LoadingSpinner />}

        {generatedImage && !isGenerating && (
          <section className="flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-2 text-emerald-300">
              {sceneTitle}
            </h2>
            <p className="text-stone-400 text-sm mb-8 max-w-xl text-center">
              Your AI-generated coloring page is ready. Print it out and enjoy
              coloring!
            </p>
            <div className="rounded-2xl overflow-hidden border border-stone-700 shadow-2xl bg-white max-w-2xl w-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imageRef}
                src={generatedImage}
                alt={`Generated coloring page: ${sceneTitle}`}
                width={1024}
                height={1024}
                className="w-full h-auto"
              />
            </div>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <button
                onClick={handleDownloadPNG}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors text-base flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
              </button>
              <button
                onClick={handleDownloadPDF}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl transition-colors text-base flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                Download PDF (print-ready)
              </button>
              <button
                onClick={handleNewScene}
                className="px-6 py-3 bg-stone-700 hover:bg-stone-600 text-white font-semibold rounded-xl transition-colors text-base flex items-center gap-2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21.5 2v6h-6" />
                  <path d="M2.5 22v-6h6" />
                  <path d="M2 11.5a10 10 0 0 1 18.8-4.3" />
                  <path d="M22 12.5a10 10 0 0 1-18.8 4.2" />
                </svg>
                Generate Another
              </button>
            </div>
            {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
          </section>
        )}
      </div>
    </main>
  );
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

  const objects: string[] = [];
  const offsets: number[] = [];

  function addObj(content: string) {
    offsets.push(objects.length === 0 ? 0 : getLength());
    objects.push(content);
  }

  function getLength() {
    let len = 0;
    for (let i = 0; i < objects.length; i++) {
      if (i === 0) {
        len += objects[i].length;
      } else {
        len += objects[i].length;
      }
    }
    return len;
  }

  const header = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
  addObj(header);

  const obj1 = `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`;
  addObj(obj1);

  const obj2 = `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`;
  addObj(obj2);

  const obj3 = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Contents 4 0 R /Resources << /XObject << /Img 5 0 R >> >> >>\nendobj\n`;
  addObj(obj3);

  const streamContent = `q ${drawW.toFixed(2)} 0 0 ${drawH.toFixed(2)} ${offsetX.toFixed(2)} ${offsetY.toFixed(2)} cm /Img Do Q`;
  const obj4 = `4 0 obj\n<< /Length ${streamContent.length} >>\nstream\n${streamContent}\nendstream\nendobj\n`;
  addObj(obj4);

  const obj5 = `5 0 obj\n<< /Type /XObject /Subtype /Image /Width 1024 /Height 1024 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${bytes.length} >>\nstream\n`;

  const totalLen =
    header.length +
    obj1.length +
    obj2.length +
    obj3.length +
    obj4.length +
    obj5.length +
    bytes.length +
    "\nendstream\nendobj\n".length +
    300;

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

  const obj5Header = `5 0 obj\n<< /Type /XObject /Subtype /Image /Width 1024 /Height 1024 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${bytes.length} >>\nstream\n`;
  writeStr(obj5Header);
  xrefOffsets.push(runningOffset);
  runningOffset += obj5Header.length;

  writeBytes(bytes);

  const obj5Footer = "\nendstream\nendobj\n";
  writeStr(obj5Footer);
  runningOffset += obj5Footer.length;

  const xrefStart = runningOffset;
  writeStr("xref\n");
  writeStr(`0 6\n`);
  writeStr("0000000000 65535 f \n");
  for (let i = 0; i < xrefOffsets.length; i++) {
    const off = xrefOffsets[i].toString().padStart(10, "0");
    writeStr(`${off} 00000 n \n`);
  }

  writeStr("trailer\n");
  writeStr("<< /Size 6 /Root 1 0 R >>\n");
  writeStr("startxref\n");
  writeStr(`${xrefStart}\n`);
  writeStr("%%EOF\n");

  return result.slice(0, pos);
}
