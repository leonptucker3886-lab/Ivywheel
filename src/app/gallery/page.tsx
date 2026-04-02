"use client";

import { useState } from "react";
import coloringPagesData from "../../data/coloring-pages.json";

// Filter categories to only include those with 5+ items and add Pit Bulls as first category
const allCategories = [...new Set(coloringPagesData.map(page => page.category))];
const categoryCounts = allCategories.reduce((acc, cat) => {
  acc[cat] = coloringPagesData.filter(page => page.category === cat).length;
  return acc;
}, {} as Record<string, number>);

const validCategories = Object.entries(categoryCounts)
  .filter(([_, count]) => count >= 5)
  .map(([cat, _]) => cat);

// Add Pit Bulls as the first category if it doesn't exist
const categoryList = validCategories.includes('Pit Bulls') ? validCategories : ['Pit Bulls', ...validCategories];

// Filter coloring pages to only include valid categories
const coloringPages = [
  // Add some Pit Bull themed pages
  {
    id: "pitbull-1",
    title: "Friendly Pit Bull Portrait",
    description: "Beautiful pit bull portrait perfect for finding peace in coloring",
    category: "Pit Bulls",
    source: "Custom",
    sourceUrl: "#",
    imageUrl: "https://openclipart.org/image/800px/187790",
    fallbackSvg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#f8f8f8"/>
      <g stroke="black" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <ellipse cx="400" cy="500" rx="80" ry="100"/>
        <circle cx="400" cy="350" r="70"/>
        <circle cx="375" cy="330" r="15"/>
        <circle cx="425" cy="330" r="15"/>
        <circle cx="375" cy="330" r="8" fill="black"/>
        <circle cx="425" cy="330" r="8" fill="black"/>
        <polygon points="400,360 395,375 405,375"/>
        <ellipse cx="400" cy="450" rx="40" ry="70"/>
        <text x="400" y="650" text-anchor="middle" font-family="serif" font-size="24" fill="black">Pit Bull</text>
      </g>
      <text x="400" y="780" text-anchor="middle" font-family="serif" font-size="18" fill="black">Ivy's Peace</text>
    </svg>`,
  },
  {
    id: "pitbull-2",
    title: "Playful Pit Bull Puppy",
    description: "Adorable pit bull puppy design for peaceful coloring sessions",
    category: "Pit Bulls",
    source: "Custom",
    sourceUrl: "#",
    imageUrl: "https://openclipart.org/image/800px/187790",
    fallbackSvg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#f8f8f8"/>
      <g stroke="black" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <ellipse cx="400" cy="500" rx="60" ry="80"/>
        <circle cx="400" cy="350" r="50"/>
        <circle cx="385" cy="335" r="8"/>
        <circle cx="415" cy="335" r="8"/>
        <circle cx="385" cy="335" r="4" fill="black"/>
        <circle cx="415" cy="335" r="4" fill="black"/>
        <polygon points="400,355 397,365 403,365"/>
        <ellipse cx="400" cy="450" rx="30" ry="50"/>
        <text x="400" y="650" text-anchor="middle" font-family="serif" font-size="20" fill="black">Pit Bull Puppy</text>
      </g>
      <text x="400" y="780" text-anchor="middle" font-family="serif" font-size="18" fill="black">Ivy's Peace</text>
    </svg>`,
  },
  ...coloringPagesData.filter(page => validCategories.includes(page.category))
];

const categories = ["All", ...categoryList];

export default function ColoringPages() {
  const [selectedPage, setSelectedPage] = useState<typeof coloringPages[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const filteredPages = coloringPages.filter(page => {
    const matchesCategory = selectedCategory === "All" || page.category === selectedCategory;
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          page.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleImageError = (pageId: string) => {
    setImageErrors(prev => new Set(prev).add(pageId));
  };

  const handleDownload = (page: typeof coloringPages[0], format: 'png' | 'pdf') => {
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Use fallback SVG if image failed to load
      const img = new Image();
      const isImageError = imageErrors.has(page.id);
      const imageSource = isImageError
        ? `data:image/svg+xml;base64,${btoa(page.fallbackSvg)}`
        : page.imageUrl;

      img.onload = () => {
        ctx.drawImage(img, 0, 0, 800, 800);

        if (format === 'png') {
          canvas.toBlob((blob) => {
            if (blob) {
              const url = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = url;
              a.download = `${page.title.toLowerCase().replace(/\s+/g, "-")}-coloring-page.png`;
              document.body.appendChild(a);
              a.click();
              a.remove();
              URL.revokeObjectURL(url);
            }
          });
        } else {
          // PDF download
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

          const stream = buildMinimalPDF(imgData, pdfWidth, pdfHeight, drawW, drawH, offsetX, offsetY);

          const blob = new Blob([new Uint8Array(stream)], { type: "application/pdf" });
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `${page.title.toLowerCase().replace(/\s+/g, "-")}-coloring-page.pdf`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
        }
      };
      img.src = imageSource;
    }
  };

  if (selectedPage) {
    const isImageError = imageErrors.has(selectedPage.id);
    const displayImage = isImageError
      ? `data:image/svg+xml;base64,${btoa(selectedPage.fallbackSvg)}`
      : selectedPage.imageUrl;

    return (
      <main className="min-h-screen bg-stone-950 text-white">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="mb-8">
            <button
              onClick={() => setSelectedPage(null)}
              className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors mb-4"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="19" y1="12" x2="5" y2="12"/>
                <polyline points="12 19 5 12 12 5"/>
              </svg>
              Back to Gallery
            </button>

            <div className="text-center">
              <h1 className="text-4xl font-bold mb-2 text-emerald-300">{selectedPage.title}</h1>
              <p className="text-stone-400 mb-4">{selectedPage.description}</p>
              <p className="text-sm text-stone-500 mb-8">
                Source: <a href={selectedPage.sourceUrl} target="_blank" rel="noopener noreferrer"
                           className="text-emerald-400 hover:text-emerald-300 underline">
                  {selectedPage.source}
                </a>
                {isImageError && (
                  <span className="ml-2 text-amber-400">(Using fallback design)</span>
                )}
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto mb-8">
            {isImageError ? (
              <div
                dangerouslySetInnerHTML={{ __html: selectedPage.fallbackSvg }}
                className="w-full h-auto max-w-lg mx-auto"
              />
            ) : (
              <img
                src={displayImage}
                alt={selectedPage.title}
                className="w-full h-auto rounded-lg shadow-lg"
                onError={() => handleImageError(selectedPage.id)}
              />
            )}
          </div>

          <div className="flex flex-wrap gap-4 justify-center">
            <button
              onClick={() => handleDownload(selectedPage, 'png')}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              Download PNG
            </button>
            <button
              onClick={() => handleDownload(selectedPage, 'pdf')}
              className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              Download PDF
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-stone-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Ivy&apos;s Peace
          </h1>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto mb-8">
            A curated collection of coloring pages inspired by Ivy&apos;s love for finding peace through creativity.
            These designs bring tranquility and mindfulness to your coloring sessions.
          </p>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <input
              type="text"
              placeholder="Search coloring pages..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 rounded-lg bg-stone-800 border border-stone-700 text-white placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
            />
            <div className="flex gap-2 overflow-x-auto">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === category
                      ? 'bg-emerald-600 text-white'
                      : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPages.map((page) => {
            const isImageError = imageErrors.has(page.id);
            return (
              <div
                key={page.id}
                onClick={() => setSelectedPage(page)}
                className="bg-stone-800 rounded-xl overflow-hidden cursor-pointer hover:bg-stone-750 transition-all duration-200 hover:scale-[1.02] border border-stone-700 hover:border-emerald-600 group"
              >
                <div className="aspect-square overflow-hidden bg-white p-4">
                  {isImageError ? (
                    <div
                      dangerouslySetInnerHTML={{ __html: page.fallbackSvg }}
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <img
                      src={page.imageUrl}
                      alt={page.title}
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-200"
                      onError={() => handleImageError(page.id)}
                      loading="lazy"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1 text-white group-hover:text-emerald-300 transition-colors">
                    {page.title}
                  </h3>
                  <p className="text-stone-400 text-sm mb-2 line-clamp-2">{page.description}</p>
                  <div className="flex items-center justify-between text-xs text-stone-500">
                    <span>{page.category}</span>
                    <span>{page.source}</span>
                  </div>
                  {isImageError && (
                    <div className="mt-2 text-xs text-amber-400">
                      Using fallback design
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {filteredPages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-stone-400 text-lg">No coloring pages found matching your search.</p>
            <button
              onClick={() => {
                setSearchTerm("");
                setSelectedCategory("All");
              }}
              className="mt-4 px-6 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}

        <footer className="text-center mt-16 pt-8 border-t border-stone-800">
          <p className="text-stone-500 text-sm">
            All coloring pages are sourced from free online resources. Click on any page to see source attribution.
          </p>
        </footer>
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
  runningOffset += obj1.length;

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