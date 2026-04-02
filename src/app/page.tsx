"use client";

import { useState } from "react";

// Curated coloring pages - proper line art SVGs
const coloringPages = [
  {
    id: "mandala-1",
    title: "Peace Mandala",
    description: "Beautiful mandala design perfect for relaxation",
    category: "Mandala",
    source: "Ivy's Peace Collection",
    sourceUrl: "#",
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#f8f8f8"/>
      <g stroke="black" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Outer circle -->
        <circle cx="400" cy="400" r="350" stroke-width="3"/>
        <!-- Inner mandala rings -->
        <circle cx="400" cy="400" r="300"/>
        <circle cx="400" cy="400" r="250"/>
        <circle cx="400" cy="400" r="200"/>
        <circle cx="400" cy="400" r="150"/>
        <circle cx="400" cy="400" r="100"/>
        <circle cx="400" cy="400" r="50"/>
        <!-- Radial lines -->
        <line x1="400" y1="50" x2="400" y2="750"/>
        <line x1="400" y1="50" x2="650" y2="650"/>
        <line x1="400" y1="50" x2="150" y2="650"/>
        <line x1="400" y1="50" x2="700" y2="400"/>
        <line x1="400" y1="50" x2="100" y2="400"/>
        <line x1="400" y1="750" x2="650" y2="150"/>
        <line x1="400" y1="750" x2="150" y2="150"/>
        <!-- Petal shapes -->
        <path d="M 400 50 Q 450 150 400 250 Q 350 150 400 50"/>
        <path d="M 400 50 Q 500 100 600 50 Q 550 125 500 175 Q 450 125 400 50"/>
        <path d="M 400 50 Q 300 100 200 50 Q 250 125 300 175 Q 350 125 400 50"/>
        <!-- Intricate patterns -->
        <path d="M 400 150 Q 450 125 500 150 Q 450 175 400 150"/>
        <path d="M 400 250 Q 450 225 500 250 Q 450 275 400 250"/>
        <path d="M 400 650 Q 450 625 500 650 Q 450 675 400 650"/>
        <path d="M 400 550 Q 450 525 500 550 Q 450 575 400 550"/>
        <!-- Corner decorations -->
        <circle cx="100" cy="100" r="30"/>
        <circle cx="700" cy="100" r="30"/>
        <circle cx="100" cy="700" r="30"/>
        <circle cx="700" cy="700" r="30"/>
        <!-- Corner patterns -->
        <path d="M 100 70 Q 130 70 130 100 Q 130 130 100 130 Q 70 130 70 100 Q 70 70 100 70"/>
        <path d="M 700 70 Q 730 70 730 100 Q 730 130 700 130 Q 670 130 670 100 Q 670 70 700 70"/>
        <path d="M 100 670 Q 130 670 130 700 Q 130 730 100 730 Q 70 730 70 700 Q 70 670 100 670"/>
        <path d="M 700 670 Q 730 670 730 700 Q 730 730 700 730 Q 670 730 670 700 Q 670 670 700 670"/>
      </g>
      <text x="400" y="780" text-anchor="middle" font-family="serif" font-size="18" fill="black">Ivy's Peace</text>
    </svg>`,
  },
  {
    id: "butterfly-1",
    title: "Butterfly Garden",
    description: "Detailed butterfly with floral patterns",
    category: "Nature",
    source: "Ivy's Peace Collection",
    sourceUrl: "#",
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#f8f8f8"/>
      <g stroke="black" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Butterfly body -->
        <ellipse cx="400" cy="400" rx="8" ry="120"/>
        <!-- Left wing -->
        <path d="M 400 320 Q 200 200 150 300 Q 180 350 250 320 Q 300 340 350 320 Q 380 330 400 320"/>
        <path d="M 400 320 Q 250 250 200 320 Q 230 370 280 350 Q 330 365 380 350 Q 395 340 400 320"/>
        <!-- Right wing -->
        <path d="M 400 320 Q 600 200 650 300 Q 620 350 550 320 Q 500 340 450 320 Q 420 330 400 320"/>
        <path d="M 400 320 Q 550 250 600 320 Q 570 370 520 350 Q 470 365 420 350 Q 405 340 400 320"/>
        <!-- Wing details -->
        <path d="M 250 320 Q 220 340 200 360"/>
        <path d="M 280 350 Q 250 370 240 380"/>
        <path d="M 320 340 Q 290 360 280 370"/>
        <path d="M 550 320 Q 580 340 600 360"/>
        <path d="M 520 350 Q 550 370 560 380"/>
        <path d="M 480 340 Q 510 360 520 370"/>
        <!-- Wing veins -->
        <line x1="200" y1="300" x2="400" y2="320"/>
        <line x1="220" y1="320" x2="400" y2="320"/>
        <line x1="240" y1="340" x2="400" y2="320"/>
        <line x1="600" y1="300" x2="400" y2="320"/>
        <line x1="580" y1="320" x2="400" y2="320"/>
        <line x1="560" y1="340" x2="400" y2="320"/>
        <!-- Antennae -->
        <line x1="392" y1="280" x2="380" y2="260"/>
        <line x1="408" y1="280" x2="420" y2="260"/>
        <!-- Flowers -->
        <circle cx="200" cy="600" r="25"/>
        <circle cx="180" cy="580" r="15"/>
        <circle cx="220" cy="580" r="15"/>
        <circle cx="200" cy="620" r="15"/>
        <circle cx="200" cy="600" r="10"/>
        <circle cx="600" cy="600" r="25"/>
        <circle cx="580" cy="580" r="15"/>
        <circle cx="620" cy="580" r="15"/>
        <circle cx="600" cy="620" r="15"/>
        <circle cx="600" cy="600" r="10"/>
        <!-- Stems -->
        <line x1="200" y1="625" x2="200" y2="700"/>
        <line x1="600" y1="625" x2="600" y2="700"/>
        <!-- Leaves -->
        <ellipse cx="180" cy="650" rx="20" ry="12"/>
        <ellipse cx="220" cy="650" rx="20" ry="12"/>
        <ellipse cx="580" cy="650" rx="20" ry="12"/>
        <ellipse cx="620" cy="650" rx="20" ry="12"/>
      </g>
      <text x="400" y="780" text-anchor="middle" font-family="serif" font-size="18" fill="black">Ivy's Peace</text>
    </svg>`,
  },
  {
    id: "wolf-1",
    title: "Majestic Wolf",
    description: "Powerful wolf portrait with intricate details",
    category: "Animals",
    source: "Ivy's Peace Collection",
    sourceUrl: "#",
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#f8f8f8"/>
      <g stroke="black" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Wolf head outline -->
        <path d="M 250 300 Q 200 250 250 200 Q 350 150 450 200 Q 500 250 450 300 Q 400 350 350 340 Q 300 350 250 300"/>
        <!-- Ears -->
        <polygon points="280,220 300,180 320,220"/>
        <polygon points="480,220 460,180 440,220"/>
        <!-- Eyes -->
        <circle cx="330" cy="260" r="8"/>
        <circle cx="470" cy="260" r="8"/>
        <circle cx="330" cy="260" r="3" fill="black"/>
        <circle cx="470" cy="260" r="3" fill="black"/>
        <!-- Nose -->
        <polygon points="400,320 395,335 405,335"/>
        <!-- Mouth -->
        <path d="M 385 335 Q 400 350 415 335"/>
        <!-- Whiskers -->
        <line x1="250" y1="290" x2="200" y2="285"/>
        <line x1="250" y1="310" x2="200" y2="315"/>
        <line x1="550" y1="290" x2="600" y2="285"/>
        <line x1="550" y1="310" x2="600" y2="315"/>
        <!-- Fur details on head -->
        <path d="M 300 240 Q 320 220 340 240"/>
        <path d="M 460 240 Q 480 220 500 240"/>
        <path d="M 320 280 Q 340 260 360 280"/>
        <path d="M 440 280 Q 460 260 480 280"/>
        <!-- Neck -->
        <ellipse cx="400" cy="380" rx="60" ry="40"/>
        <!-- Body -->
        <ellipse cx="400" cy="480" rx="80" ry="60"/>
        <!-- Legs -->
        <rect x="340" y="520" width="20" height="80" rx="10"/>
        <rect x="440" y="520" width="20" height="80" rx="10"/>
        <rect x="320" y="580" width="20" height="60" rx="10"/>
        <rect x="460" y="580" width="20" height="60" rx="10"/>
        <!-- Paws -->
        <ellipse cx="350" cy="610" rx="15" ry="10"/>
        <ellipse cx="450" cy="610" rx="15" ry="10"/>
        <ellipse cx="330" cy="650" rx="15" ry="10"/>
        <ellipse cx="470" cy="650" rx="15" ry="10"/>
        <!-- Tail -->
        <path d="M 480 440 Q 520 420 540 460"/>
        <ellipse cx="535" cy="450" rx="8" ry="15"/>
        <!-- Moon background -->
        <circle cx="150" cy="150" r="80" opacity="0.3"/>
        <circle cx="150" cy="150" r="60" opacity="0.2"/>
      </g>
      <text x="400" y="780" text-anchor="middle" font-family="serif" font-size="18" fill="black">Ivy's Peace</text>
    </svg>`,
  },
  {
    id: "rose-1",
    title: "Classic Rose",
    description: "Elegant rose with detailed petals",
    category: "Flowers",
    source: "Ivy's Peace Collection",
    sourceUrl: "#",
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#f8f8f8"/>
      <g stroke="black" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Stem -->
        <line x1="400" y1="700" x2="400" y2="450"/>
        <!-- Thorns -->
        <polygon points="400,550 385,545 390,535 400,540 410,535 415,545"/>
        <polygon points="400,600 385,595 390,585 400,590 410,585 415,595"/>
        <!-- Leaves -->
        <ellipse cx="350" cy="550" rx="25" ry="15"/>
        <ellipse cx="450" cy="550" rx="25" ry="15"/>
        <!-- Leaf veins -->
        <line x1="350" y1="550" x2="325" y2="535"/>
        <line x1="350" y1="550" x2="325" y2="565"/>
        <line x1="350" y1="550" x2="375" y2="535"/>
        <line x1="350" y1="550" x2="375" y2="565"/>
        <line x1="450" y1="550" x2="425" y2="535"/>
        <line x1="450" y1="550" x2="425" y2="565"/>
        <line x1="450" y1="550" x2="475" y2="535"/>
        <line x1="450" y1="550" x2="475" y2="565"/>
        <!-- Outer petals -->
        <ellipse cx="400" cy="350" rx="40" ry="60"/>
        <ellipse cx="360" cy="370" rx="35" ry="50"/>
        <ellipse cx="440" cy="370" rx="35" ry="50"/>
        <ellipse cx="400" cy="410" rx="35" ry="45"/>
        <!-- Middle petals -->
        <ellipse cx="400" cy="360" rx="25" ry="40"/>
        <ellipse cx="375" cy="375" rx="20" ry="35"/>
        <ellipse cx="425" cy="375" rx="20" ry="35"/>
        <!-- Inner petals -->
        <ellipse cx="400" cy="370" rx="15" ry="25"/>
        <ellipse cx="385" cy="380" rx="12" ry="20"/>
        <ellipse cx="415" cy="380" rx="12" ry="20"/>
        <!-- Center -->
        <circle cx="400" cy="385" r="8"/>
        <!-- Bud -->
        <ellipse cx="400" cy="430" rx="15" ry="25"/>
        <!-- Sepals -->
        <ellipse cx="385" cy="445" rx="8" ry="12"/>
        <ellipse cx="415" cy="445" rx="8" ry="12"/>
        <ellipse cx="400" cy="455" rx="8" ry="10"/>
      </g>
      <text x="400" y="780" text-anchor="middle" font-family="serif" font-size="18" fill="black">Ivy's Peace</text>
    </svg>`,
  },
  {
    id: "owl-1",
    title: "Wise Owl",
    description: "Intricate owl design with feathers and details",
    category: "Birds",
    source: "Ivy's Peace Collection",
    sourceUrl: "#",
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#f8f8f8"/>
      <g stroke="black" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Owl body -->
        <ellipse cx="400" cy="500" rx="80" ry="100"/>
        <!-- Head -->
        <circle cx="400" cy="350" r="70"/>
        <!-- Eyes -->
        <circle cx="375" cy="330" r="15"/>
        <circle cx="425" cy="330" r="15"/>
        <circle cx="375" cy="330" r="8" fill="black"/>
        <circle cx="425" cy="330" r="8" fill="black"/>
        <!-- Beak -->
        <polygon points="400,360 395,375 405,375"/>
        <!-- Wings -->
        <ellipse cx="320" cy="450" rx="40" ry="70"/>
        <ellipse cx="480" cy="450" rx="40" ry="70"/>
        <!-- Wing details -->
        <path d="M 300 420 Q 320 400 340 420"/>
        <path d="M 460 420 Q 480 400 500 420"/>
        <path d="M 290 450 Q 310 430 330 450"/>
        <path d="M 470 450 Q 490 430 510 450"/>
        <!-- Feathers on wings -->
        <line x1="300" y1="400" x2="280" y2="380"/>
        <line x1="320" y1="410" x2="300" y2="390"/>
        <line x1="500" y1="400" x2="520" y2="380"/>
        <line x1="480" y1="410" x2="500" y2="390"/>
        <!-- Tree branch -->
        <ellipse cx="400" cy="620" rx="120" ry="15"/>
        <!-- Branch details -->
        <ellipse cx="320" cy="615" rx="30" ry="8"/>
        <ellipse cx="480" cy="615" rx="30" ry="8"/>
        <!-- Moon -->
        <circle cx="150" cy="150" r="60" opacity="0.3"/>
        <circle cx="150" cy="150" r="40" opacity="0.2"/>
      </g>
      <text x="400" y="780" text-anchor="middle" font-family="serif" font-size="18" fill="black">Ivy's Peace</text>
    </svg>`,
  },
  {
    id: "dragon-1",
    title: "Mythical Dragon",
    description: "Fantasy dragon with scales and wings",
    category: "Fantasy",
    source: "Ivy's Peace Collection",
    sourceUrl: "#",
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#f8f8f8"/>
      <g stroke="black" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Dragon body -->
        <ellipse cx="400" cy="500" rx="60" ry="120"/>
        <!-- Neck -->
        <ellipse cx="400" cy="350" rx="30" ry="80"/>
        <!-- Head -->
        <circle cx="400" cy="250" r="40"/>
        <!-- Horns -->
        <line x1="380" y1="230" x2="360" y2="210"/>
        <line x1="420" y1="230" x2="440" y2="210"/>
        <!-- Eyes -->
        <circle cx="390" cy="240" r="6"/>
        <circle cx="410" cy="240" r="6"/>
        <circle cx="390" cy="240" r="3" fill="black"/>
        <circle cx="410" cy="240" r="3" fill="black"/>
        <!-- Nose -->
        <circle cx="400" cy="250" r="3"/>
        <!-- Mouth -->
        <path d="M 395 260 Q 400 270 405 260"/>
        <!-- Wings -->
        <path d="M 350 400 Q 250 300 200 350 Q 230 380 280 370 Q 320 380 350 400"/>
        <path d="M 450 400 Q 550 300 600 350 Q 570 380 520 370 Q 480 380 450 400"/>
        <!-- Wing membranes -->
        <path d="M 300 380 Q 250 350 280 370"/>
        <path d="M 320 390 Q 270 360 300 380"/>
        <path d="M 500 380 Q 550 350 520 370"/>
        <path d="M 480 390 Q 530 360 500 380"/>
        <!-- Tail -->
        <path d="M 400 620 Q 380 650 360 670 Q 340 690 320 710"/>
        <!-- Spikes on back -->
        <polygon points="400,400 395,380 405,380"/>
        <polygon points="400,450 395,430 405,430"/>
        <polygon points="400,500 395,480 405,480"/>
        <!-- Scales pattern -->
        <circle cx="385" cy="420" r="3"/>
        <circle cx="395" cy="440" r="3"/>
        <circle cx="405" cy="460" r="3"/>
        <circle cx="415" cy="480" r="3"/>
        <!-- Legs -->
        <ellipse cx="370" cy="580" rx="12" ry="40"/>
        <ellipse cx="430" cy="580" rx="12" ry="40"/>
        <!-- Claws -->
        <polygon points="358,620 365,630 352,625"/>
        <polygon points="362,620 369,630 356,625"/>
        <polygon points="442,620 449,630 436,625"/>
        <polygon points="446,620 453,630 440,625"/>
      </g>
      <text x="400" y="780" text-anchor="middle" font-family="serif" font-size="18" fill="black">Ivy's Peace</text>
    </svg>`,
  },
];

const categories = ["All", "Mandala", "Nature", "Animals", "Flowers", "Birds", "Fantasy"];

export default function ColoringPages() {
  const [selectedPage, setSelectedPage] = useState<typeof coloringPages[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPages = coloringPages.filter(page => {
    const matchesCategory = selectedCategory === "All" || page.category === selectedCategory;
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDownload = (page: typeof coloringPages[0], format: 'png' | 'pdf') => {
    // Create a data URL from the SVG
    const svgDataUrl = `data:image/svg+xml;base64,${btoa(page.svg)}`;

    if (format === 'png') {
      // Convert SVG to PNG
      const canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 800;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0, 800, 800);
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
        };
        img.src = svgDataUrl;
      }
    } else {
      // Create PDF
      const canvas = document.createElement("canvas");
      canvas.width = 800;
      canvas.height = 800;
      const ctx = canvas.getContext("2d");

      if (ctx) {
        const img = new Image();
        img.onload = () => {
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
        };
        img.src = svgDataUrl;
      }
    }
  };

  if (selectedPage) {
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
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto mb-8">
            <div
              dangerouslySetInnerHTML={{ __html: selectedPage.svg }}
              className="w-full h-auto max-w-lg mx-auto"
            />
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
            Curated collection of beautiful coloring pages. Download and print for peaceful coloring sessions.
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
          {filteredPages.map((page) => (
            <div
              key={page.id}
              onClick={() => setSelectedPage(page)}
              className="bg-stone-800 rounded-xl overflow-hidden cursor-pointer hover:bg-stone-750 transition-all duration-200 hover:scale-[1.02] border border-stone-700 hover:border-emerald-600 group"
            >
              <div className="aspect-square overflow-hidden bg-white p-4">
                <div
                  dangerouslySetInnerHTML={{ __html: page.svg }}
                  className="w-full h-full object-contain"
                />
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
              </div>
            </div>
          ))}
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
            All coloring pages created for Ivy's Peace. Enjoy your coloring sessions!
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