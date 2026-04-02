"use client";

import { useState } from "react";

// Static coloring page data - simplified SVGs
const coloringPages = [
  {
    id: "pitbull",
    title: "Pitbull",
    description: "Strong and gentle pitbull companion",
    emoji: "🐶",
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#f8f8f8"/>
      <ellipse cx="400" cy="550" rx="120" ry="60" stroke="black" stroke-width="3" fill="none"/>
      <ellipse cx="400" cy="420" rx="80" ry="70" stroke="black" stroke-width="3" fill="none"/>
      <circle cx="400" cy="250" r="60" stroke="black" stroke-width="3" fill="none"/>
      <ellipse cx="400" cy="290" rx="40" ry="25" stroke="black" stroke-width="3" fill="none"/>
      <circle cx="385" cy="240" r="6" stroke="black" stroke-width="2" fill="none"/>
      <circle cx="415" cy="240" r="6" stroke="black" stroke-width="2" fill="none"/>
      <circle cx="385" cy="240" r="2" fill="black"/>
      <circle cx="415" cy="240" r="2" fill="black"/>
      <polygon points="400,290 397,300 403,300" stroke="black" stroke-width="2" fill="none"/>
      <path d="M 390 305 Q 400 315 410 305" stroke="black" stroke-width="2" fill="none"/>
      <text x="400" y="750" text-anchor="middle" font-family="serif" font-size="20" fill="black">Ivy's Peace</text>
    </svg>`,
  },
  {
    id: "biker-chick",
    title: "Biker Chick",
    description: "Confident biker girl on her motorcycle",
    emoji: "🏍️",
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#f8f8f8"/>
      <circle cx="400" cy="250" r="50" stroke="black" stroke-width="3" fill="none"/>
      <ellipse cx="400" cy="290" rx="35" ry="20" stroke="black" stroke-width="3" fill="none"/>
      <circle cx="385" cy="240" r="5" stroke="black" stroke-width="2" fill="none"/>
      <circle cx="415" cy="240" r="5" stroke="black" stroke-width="2" fill="none"/>
      <circle cx="385" cy="240" r="1.5" fill="black"/>
      <circle cx="415" cy="240" r="1.5" fill="black"/>
      <path d="M 380 270 Q 400 280 420 270" stroke="black" stroke-width="2" fill="none"/>
      <ellipse cx="400" cy="350" rx="60" ry="30" stroke="black" stroke-width="3" fill="none"/>
      <ellipse cx="400" cy="450" rx="80" ry="40" stroke="black" stroke-width="3" fill="none"/>
      <ellipse cx="400" cy="600" rx="150" ry="70" stroke="black" stroke-width="3" fill="none"/>
      <circle cx="250" cy="610" r="25" stroke="black" stroke-width="3" fill="none"/>
      <circle cx="550" cy="610" r="25" stroke="black" stroke-width="3" fill="none"/>
      <text x="400" y="750" text-anchor="middle" font-family="serif" font-size="20" fill="black">Ivy's Peace</text>
    </svg>`,
  },
  {
    id: "tattoo-flash",
    title: "Tattoo Flash",
    description: "Classic tattoo flash sheet designs",
    emoji: "💀",
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#f8f8f8"/>
      <!-- Skull -->
      <circle cx="250" cy="200" r="40" stroke="black" stroke-width="3" fill="none"/>
      <ellipse cx="250" cy="240" rx="30" ry="25" stroke="black" stroke-width="3" fill="none"/>
      <circle cx="238" cy="190" r="4" stroke="black" stroke-width="2" fill="none"/>
      <circle cx="262" cy="190" r="4" stroke="black" stroke-width="2" fill="none"/>
      <circle cx="238" cy="190" r="1.5" fill="black"/>
      <circle cx="262" cy="190" r="1.5" fill="black"/>
      <polygon points="250,220 247,230 253,230" stroke="black" stroke-width="2" fill="none"/>
      <!-- Rose -->
      <circle cx="550" cy="200" r="25" stroke="black" stroke-width="3" fill="none"/>
      <circle cx="540" cy="190" r="15" stroke="black" stroke-width="2" fill="none"/>
      <circle cx="560" cy="190" r="15" stroke="black" stroke-width="2" fill="none"/>
      <circle cx="550" cy="210" r="12" stroke="black" stroke-width="2" fill="none"/>
      <rect x="547" y="225" width="6" height="20" stroke="black" stroke-width="2" fill="none"/>
      <!-- Dagger -->
      <polygon points="250,450 260,520 255,530 250,525 245,530 240,520" stroke="black" stroke-width="3" fill="none"/>
      <rect x="240" y="530" width="20" height="25" stroke="black" stroke-width="3" fill="none"/>
      <!-- Anchor -->
      <circle cx="550" cy="440" r="10" stroke="black" stroke-width="3" fill="none"/>
      <rect x="545" y="440" width="10" height="60" stroke="black" stroke-width="3" fill="none"/>
      <ellipse cx="535" cy="500" rx="8" ry="12" stroke="black" stroke-width="3" fill="none"/>
      <ellipse cx="565" cy="500" rx="8" ry="12" stroke="black" stroke-width="3" fill="none"/>
      <text x="400" y="750" text-anchor="middle" font-family="serif" font-size="20" fill="black">Ivy's Peace</text>
    </svg>`,
  },
  {
    id: "military-skull",
    title: "Military Skull",
    description: "Military helmet with dog tags and weapons",
    emoji: "💀",
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#f8f8f8"/>
      <!-- Helmet -->
      <ellipse cx="400" cy="250" rx="80" ry="40" stroke="black" stroke-width="3" fill="none"/>
      <ellipse cx="400" cy="260" rx="70" ry="30" stroke="black" stroke-width="2" fill="none"/>
      <!-- Skull -->
      <circle cx="400" cy="350" r="70" stroke="black" stroke-width="3" fill="none"/>
      <ellipse cx="400" cy="410" rx="55" ry="40" stroke="black" stroke-width="3" fill="none"/>
      <circle cx="385" cy="340" r="8" stroke="black" stroke-width="2" fill="none"/>
      <circle cx="415" cy="340" r="8" stroke="black" stroke-width="2" fill="none"/>
      <circle cx="385" cy="340" r="3" fill="black"/>
      <circle cx="415" cy="340" r="3" fill="black"/>
      <polygon points="400,380 397,390 403,390" stroke="black" stroke-width="2" fill="none"/>
      <rect x="385" y="395" width="30" height="15" stroke="black" stroke-width="2" fill="none"/>
      <!-- Dog tags -->
      <ellipse cx="370" cy="500" rx="8" ry="15" stroke="black" stroke-width="2" fill="none"/>
      <ellipse cx="430" cy="500" rx="8" ry="15" stroke="black" stroke-width="2" fill="none"/>
      <rect x="365" y="485" width="10" height="30" stroke="black" stroke-width="1" fill="none"/>
      <rect x="425" y="485" width="10" height="30" stroke="black" stroke-width="1" fill="none"/>
      <!-- Crossed rifles -->
      <line x1="350" y1="600" x2="450" y2="650" stroke="black" stroke-width="4"/>
      <line x1="350" y1="650" x2="450" y2="600" stroke="black" stroke-width="4"/>
      <text x="400" y="750" text-anchor="middle" font-family="serif" font-size="20" fill="black">Ivy's Peace</text>
    </svg>`,
  },
];

export default function ColoringPages() {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const handleDownloadPNG = (page: typeof coloringPages[0]) => {
    // Create a canvas and draw the SVG
    const canvas = document.createElement("canvas");
    canvas.width = 800;
    canvas.height = 800;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Create an image from the SVG
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        // Convert to PNG and download
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
      img.src = `data:image/svg+xml;base64,${btoa(page.svg)}`;
    }
  };

  const handleDownloadPDF = (page: typeof coloringPages[0]) => {
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
      img.src = `data:image/svg+xml;base64,${btoa(page.svg)}`;
    }
  };

  const selectedPageData = coloringPages.find(p => p.id === selectedPage);

  return (
    <main className="min-h-screen bg-stone-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Ivy&apos;s Peace
          </h1>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto">
            Download beautiful adult-themed coloring pages. Print them out and enjoy coloring with your favorite mediums.
          </p>
        </header>

        {!selectedPageData ? (
          <section>
            <h2 className="text-2xl font-semibold mb-6">Choose a Coloring Page</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {coloringPages.map((page) => (
                <div
                  key={page.id}
                  onClick={() => setSelectedPage(page.id)}
                  className="bg-stone-800 rounded-xl p-6 cursor-pointer hover:bg-stone-750 transition-colors border border-stone-700 hover:border-emerald-600"
                >
                  <div className="text-6xl mb-4 text-center">{page.emoji}</div>
                  <h3 className="text-lg font-semibold mb-2">{page.title}</h3>
                  <p className="text-stone-400 text-sm">{page.description}</p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h2 className="text-3xl font-bold text-emerald-300">
                {selectedPageData.title}
              </h2>
              <span className="text-4xl">{selectedPageData.emoji}</span>
            </div>
            <p className="text-stone-400 mb-8 max-w-lg mx-auto">
              {selectedPageData.description}
            </p>

            <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto mb-8">
              <div
                dangerouslySetInnerHTML={{ __html: selectedPageData.svg }}
                className="w-full h-auto max-w-lg mx-auto"
              />
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <button
                onClick={() => handleDownloadPNG(selectedPageData)}
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
                onClick={() => handleDownloadPDF(selectedPageData)}
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
              <button
                onClick={() => setSelectedPage(null)}
                className="px-6 py-3 bg-stone-600 hover:bg-stone-500 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="12" x2="5" y2="12"/>
                  <polyline points="12 19 5 12 12 5"/>
                </svg>
                Browse More
              </button>
            </div>
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