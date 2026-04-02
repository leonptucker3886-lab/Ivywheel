import { NextRequest, NextResponse } from "next/server";
import { categories } from "@/lib/categories";

const categoryDesigns: Record<string, string> = {
  pitbulls: `
    <ellipse cx="256" cy="300" rx="100" ry="90" fill="none" stroke="#333" stroke-width="2.5"/>
    <ellipse cx="256" cy="220" rx="80" ry="70" fill="none" stroke="#333" stroke-width="2.5"/>
    <ellipse cx="200" cy="170" rx="30" ry="40" fill="none" stroke="#333" stroke-width="2.5" transform="rotate(-15 200 170)"/>
    <ellipse cx="312" cy="170" rx="30" ry="40" fill="none" stroke="#333" stroke-width="2.5" transform="rotate(15 312 170)"/>
    <circle cx="230" cy="210" r="10" fill="none" stroke="#333" stroke-width="2"/>
    <circle cx="282" cy="210" r="10" fill="none" stroke="#333" stroke-width="2"/>
    <circle cx="230" cy="210" r="4" fill="#333"/>
    <circle cx="282" cy="210" r="4" fill="#333"/>
    <ellipse cx="256" cy="245" rx="18" ry="12" fill="none" stroke="#333" stroke-width="2"/>
    <path d="M256 257 Q256 275 248 270" fill="none" stroke="#333" stroke-width="2"/>
    <path d="M256 257 Q256 275 264 270" fill="none" stroke="#333" stroke-width="2"/>
    <ellipse cx="190" cy="380" rx="25" ry="50" fill="none" stroke="#333" stroke-width="2.5"/>
    <ellipse cx="322" cy="380" rx="25" ry="50" fill="none" stroke="#333" stroke-width="2.5"/>
    <path d="M350 310 Q400 280 380 340" fill="none" stroke="#333" stroke-width="2.5"/>
    <path d="M162 310 Q112 280 132 340" fill="none" stroke="#333" stroke-width="2.5"/>
  `,
  gardens: `
    <path d="M256 420 L256 250" stroke="#333" stroke-width="2.5" fill="none"/>
    <path d="M256 300 Q220 260 200 280" stroke="#333" stroke-width="2" fill="none"/>
    <path d="M256 300 Q292 260 312 280" stroke="#333" stroke-width="2" fill="none"/>
    <circle cx="256" cy="230" r="35" fill="none" stroke="#333" stroke-width="2.5"/>
    <circle cx="256" cy="230" r="18" fill="none" stroke="#333" stroke-width="1.5"/>
    <path d="M256 195 L256 210" stroke="#333" stroke-width="2"/>
    <path d="M221 230 L236 230" stroke="#333" stroke-width="2"/>
    <path d="M276 230 L291 230" stroke="#333" stroke-width="2"/>
    <path d="M256 250 L256 265" stroke="#333" stroke-width="2"/>
    <ellipse cx="150" cy="350" rx="30" ry="25" fill="none" stroke="#333" stroke-width="2"/>
    <circle cx="150" cy="350" r="10" fill="none" stroke="#333" stroke-width="1.5"/>
    <path d="M150 325 L150 290" stroke="#333" stroke-width="2"/>
    <ellipse cx="360" cy="360" rx="25" ry="20" fill="none" stroke="#333" stroke-width="2"/>
    <circle cx="360" cy="360" r="8" fill="none" stroke="#333" stroke-width="1.5"/>
    <path d="M360 340 L360 310" stroke="#333" stroke-width="2"/>
    <path d="M80 420 Q120 400 160 420 Q200 440 240 420 Q280 400 320 420 Q360 440 400 420 Q440 400 480 420" stroke="#333" stroke-width="2" fill="none"/>
  `,
  birds: `
    <ellipse cx="256" cy="280" rx="55" ry="45" fill="none" stroke="#333" stroke-width="2.5"/>
    <circle cx="256" cy="230" r="30" fill="none" stroke="#333" stroke-width="2.5"/>
    <circle cx="245" cy="225" r="5" fill="#333"/>
    <circle cx="267" cy="225" r="5" fill="#333"/>
    <path d="M250 240 L256 250 L262 240" fill="none" stroke="#333" stroke-width="2"/>
    <path d="M200 280 Q160 250 140 280" fill="none" stroke="#333" stroke-width="2.5"/>
    <path d="M312 280 Q352 250 372 280" fill="none" stroke="#333" stroke-width="2.5"/>
    <path d="M240 325 L230 380" stroke="#333" stroke-width="2"/>
    <path d="M272 325 L282 380" stroke="#333" stroke-width="2"/>
    <path d="M256 195 Q240 180 256 170 Q272 180 256 195" fill="none" stroke="#333" stroke-width="2"/>
    <path d="M100 400 L400 400" stroke="#333" stroke-width="2.5"/>
    <path d="M400 400 Q420 350 450 380 Q480 350 500 400" fill="none" stroke="#333" stroke-width="2"/>
    <path d="M100 400 Q80 350 50 380 Q20 350 0 400" fill="none" stroke="#333" stroke-width="2"/>
  `,
  butterflies: `
    <line x1="256" y1="200" x2="256" y2="380" stroke="#333" stroke-width="2.5"/>
    <ellipse cx="200" cy="260" rx="70" ry="55" fill="none" stroke="#333" stroke-width="2.5"/>
    <ellipse cx="312" cy="260" rx="70" ry="55" fill="none" stroke="#333" stroke-width="2.5"/>
    <ellipse cx="200" cy="260" rx="40" ry="30" fill="none" stroke="#333" stroke-width="1.5"/>
    <ellipse cx="312" cy="260" rx="40" ry="30" fill="none" stroke="#333" stroke-width="1.5"/>
    <ellipse cx="210" cy="340" rx="45" ry="35" fill="none" stroke="#333" stroke-width="2.5"/>
    <ellipse cx="302" cy="340" rx="45" ry="35" fill="none" stroke="#333" stroke-width="2.5"/>
    <ellipse cx="210" cy="340" rx="25" ry="18" fill="none" stroke="#333" stroke-width="1.5"/>
    <ellipse cx="302" cy="340" rx="25" ry="18" fill="none" stroke="#333" stroke-width="1.5"/>
    <circle cx="250" cy="200" r="12" fill="none" stroke="#333" stroke-width="2"/>
    <circle cx="262" cy="200" r="12" fill="none" stroke="#333" stroke-width="2"/>
    <path d="M248 190 Q230 160 220 150" fill="none" stroke="#333" stroke-width="2"/>
    <path d="M264 190 Q282 160 292 150" fill="none" stroke="#333" stroke-width="2"/>
    <circle cx="218" cy="148" r="4" fill="none" stroke="#333" stroke-width="1.5"/>
    <circle cx="294" cy="148" r="4" fill="none" stroke="#333" stroke-width="1.5"/>
  `,
  mandalas: `
    <circle cx="256" cy="256" r="20" fill="none" stroke="#333" stroke-width="2"/>
    <circle cx="256" cy="256" r="45" fill="none" stroke="#333" stroke-width="2"/>
    <circle cx="256" cy="256" r="75" fill="none" stroke="#333" stroke-width="2"/>
    <circle cx="256" cy="256" r="110" fill="none" stroke="#333" stroke-width="2"/>
    <circle cx="256" cy="256" r="150" fill="none" stroke="#333" stroke-width="2"/>
    ${Array.from({ length: 12 }, (_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      const x1 = 256 + 20 * Math.cos(angle);
      const y1 = 256 + 20 * Math.sin(angle);
      const x2 = 256 + 150 * Math.cos(angle);
      const y2 = 256 + 150 * Math.sin(angle);
      return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#333" stroke-width="1.5"/>`;
    }).join("")}
    ${Array.from({ length: 8 }, (_, i) => {
      const angle = (i * 45 * Math.PI) / 180;
      const cx = 256 + 90 * Math.cos(angle);
      const cy = 256 + 90 * Math.sin(angle);
      return `<ellipse cx="${cx}" cy="${cy}" rx="18" ry="10" fill="none" stroke="#333" stroke-width="1.5" transform="rotate(${i * 45} ${cx} ${cy})"/>`;
    }).join("")}
    ${Array.from({ length: 12 }, (_, i) => {
      const angle = (i * 30 * Math.PI) / 180;
      const cx = 256 + 130 * Math.cos(angle);
      const cy = 256 + 130 * Math.sin(angle);
      return `<circle cx="${cx}" cy="${cy}" r="6" fill="none" stroke="#333" stroke-width="1.5"/>`;
    }).join("")}
  `,
  cats: `
    <ellipse cx="256" cy="320" rx="80" ry="55" fill="none" stroke="#333" stroke-width="2.5"/>
    <circle cx="256" cy="240" r="50" fill="none" stroke="#333" stroke-width="2.5"/>
    <path d="M215 210 L200 165 L230 200" fill="none" stroke="#333" stroke-width="2.5"/>
    <path d="M297 210 L312 165 L282 200" fill="none" stroke="#333" stroke-width="2.5"/>
    <ellipse cx="238" cy="235" rx="8" ry="10" fill="none" stroke="#333" stroke-width="2"/>
    <ellipse cx="274" cy="235" rx="8" ry="10" fill="none" stroke="#333" stroke-width="2"/>
    <circle cx="238" cy="237" r="4" fill="#333"/>
    <circle cx="274" cy="237" r="4" fill="#333"/>
    <path d="M256 250 L256 262" stroke="#333" stroke-width="1.5"/>
    <path d="M256 262 Q248 270 240 265" fill="none" stroke="#333" stroke-width="1.5"/>
    <path d="M256 262 Q264 270 272 265" fill="none" stroke="#333" stroke-width="1.5"/>
    <path d="M210 255 L160 250" stroke="#333" stroke-width="1.5"/>
    <path d="M210 262 L160 265" stroke="#333" stroke-width="1.5"/>
    <path d="M302 255 L352 250" stroke="#333" stroke-width="1.5"/>
    <path d="M302 262 L352 265" stroke="#333" stroke-width="1.5"/>
    <path d="M330 340 Q380 310 390 370" fill="none" stroke="#333" stroke-width="2.5"/>
    <ellipse cx="195" cy="380" rx="25" ry="15" fill="none" stroke="#333" stroke-width="2"/>
    <ellipse cx="317" cy="380" rx="25" ry="15" fill="none" stroke="#333" stroke-width="2"/>
  `,
  coastal: `
    <path d="M0 300 Q60 280 120 300 Q180 320 240 300 Q300 280 360 300 Q420 320 480 300 Q512 290 512 300 L512 512 L0 512 Z" fill="none" stroke="#333" stroke-width="2"/>
    <path d="M0 330 Q60 310 120 330 Q180 350 240 330 Q300 310 360 330 Q420 350 480 330 Q512 320 512 330 L512 512 L0 512 Z" fill="none" stroke="#333" stroke-width="1.5"/>
    <rect x="350" y="180" width="30" height="150" fill="none" stroke="#333" stroke-width="2.5"/>
    <path d="M340 180 L390 180 L365 150 Z" fill="none" stroke="#333" stroke-width="2.5"/>
    <circle cx="365" cy="170" r="8" fill="none" stroke="#333" stroke-width="1.5"/>
    <path d="M335 250 Q320 240 310 255" fill="none" stroke="#333" stroke-width="2"/>
    <circle cx="120" cy="100" r="35" fill="none" stroke="#333" stroke-width="2"/>
    <path d="M90 80 Q120 100 150 80" fill="none" stroke="#333" stroke-width="1.5"/>
    <path d="M85 110 Q120 100 155 110" fill="none" stroke="#333" stroke-width="1.5"/>
    <ellipse cx="180" cy="400" rx="25" ry="15" fill="none" stroke="#333" stroke-width="2" transform="rotate(-10 180 400)"/>
    <ellipse cx="440" cy="420" rx="20" ry="12" fill="none" stroke="#333" stroke-width="2" transform="rotate(15 440 420)"/>
    <path d="M80 450 Q90 430 100 450 Q110 430 120 450" fill="none" stroke="#333" stroke-width="1.5"/>
  `,
  florals: `
    <path d="M256 450 L256 280" stroke="#333" stroke-width="3"/>
    <path d="M256 380 Q210 350 190 370" fill="none" stroke="#333" stroke-width="2"/>
    <path d="M256 380 Q302 350 322 370" fill="none" stroke="#333" stroke-width="2"/>
    <circle cx="256" cy="250" r="35" fill="none" stroke="#333" stroke-width="2.5"/>
    <circle cx="256" cy="250" r="22" fill="none" stroke="#333" stroke-width="1.5"/>
    <circle cx="256" cy="250" r="10" fill="none" stroke="#333" stroke-width="1.5"/>
    ${Array.from({ length: 8 }, (_, i) => {
      const angle = (i * 45 * Math.PI) / 180;
      const px = 256 + 30 * Math.cos(angle);
      const py = 250 + 30 * Math.sin(angle);
      return `<ellipse cx="${px}" cy="${py}" rx="12" ry="7" fill="none" stroke="#333" stroke-width="1.5" transform="rotate(${i * 45} ${px} ${py})"/>`;
    }).join("")}
    <circle cx="160" cy="220" r="25" fill="none" stroke="#333" stroke-width="2"/>
    <circle cx="160" cy="220" r="12" fill="none" stroke="#333" stroke-width="1.5"/>
    ${Array.from({ length: 6 }, (_, i) => {
      const angle = (i * 60 * Math.PI) / 180;
      const px = 160 + 20 * Math.cos(angle);
      const py = 220 + 20 * Math.sin(angle);
      return `<ellipse cx="${px}" cy="${py}" rx="10" ry="6" fill="none" stroke="#333" stroke-width="1.5" transform="rotate(${i * 60} ${px} ${py})"/>`;
    }).join("")}
    <circle cx="355" cy="230" r="22" fill="none" stroke="#333" stroke-width="2"/>
    <circle cx="355" cy="230" r="10" fill="none" stroke="#333" stroke-width="1.5"/>
    ${Array.from({ length: 6 }, (_, i) => {
      const angle = (i * 60 * Math.PI) / 180;
      const px = 355 + 18 * Math.cos(angle);
      const py = 230 + 18 * Math.sin(angle);
      return `<ellipse cx="${px}" cy="${py}" rx="8" ry="5" fill="none" stroke="#333" stroke-width="1.5" transform="rotate(${i * 60} ${px} ${py})"/>`;
    }).join("")}
  `,
};

function addIvyBorder(svg: string): string {
  const ivyElements = `
    <path d="M20 512 L20 400 Q10 380 20 360 Q30 340 20 320 Q10 300 20 280 Q30 260 20 240 Q10 220 20 200 Q30 180 20 160 Q10 140 20 120 Q30 100 20 80 Q10 60 20 40 Q30 20 20 0" fill="none" stroke="#333" stroke-width="2"/>
    <path d="M492 0 L492 120 Q502 140 492 160 Q482 180 492 200 Q502 220 492 240 Q482 260 492 280 Q502 300 492 320 Q482 340 492 360 Q502 380 492 400 Q482 420 492 440 Q502 460 492 512" fill="none" stroke="#333" stroke-width="2"/>
    ${Array.from({ length: 10 }, (_, i) => {
      const y = 30 + i * 50;
      const dir = i % 2 === 0 ? 1 : -1;
      return `
        <path d="M20 ${y} Q${20 + dir * 25} ${y - 15} ${20 + dir * 35} ${y - 5}" fill="none" stroke="#333" stroke-width="1.5"/>
        <path d="M${20 + dir * 30} ${y - 8} Q${20 + dir * 25} ${y - 25} ${20 + dir * 35} ${y - 5}" fill="none" stroke="#333" stroke-width="1.5"/>
        <path d="M492 ${y + 20} Q${492 - dir * 25} ${y + 5} ${492 - dir * 35} ${y + 15}" fill="none" stroke="#333" stroke-width="1.5"/>
        <path d="M${492 - dir * 30} ${y + 12} Q${492 - dir * 25} ${y - 5} ${492 - dir * 35} ${y + 15}" fill="none" stroke="#333" stroke-width="1.5"/>
      `;
    }).join("")}
    <path d="M0 500 Q60 490 120 500 Q180 510 240 500 Q300 490 360 500 Q420 510 512 500" fill="none" stroke="#333" stroke-width="2"/>
    ${Array.from({ length: 8 }, (_, i) => {
      const x = 40 + i * 60;
      return `
        <path d="M${x} 500 Q${x + 10} 485 ${x + 20} 495" fill="none" stroke="#333" stroke-width="1.5"/>
        <path d="M${x + 15} 497 Q${x + 10} 480 ${x + 20} 495" fill="none" stroke="#333" stroke-width="1.5"/>
      `;
    }).join("")}
  `;
  return svg.replace("</svg>", ivyElements + "</svg>");
}

function generateSvg(categoryName: string, addIvy: boolean): string {
  const design = categoryDesigns[categoryName] || categoryDesigns.mandalas;
  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
    <rect width="512" height="512" fill="white"/>
    ${design}
  </svg>`;

  if (addIvy) {
    svg = addIvyBorder(svg);
  }

  return `data:image/svg+xml;base64,${Buffer.from(svg).toString("base64")}`;
}

export async function POST(request: NextRequest) {
  try {
    const { categoryId, customPrompt, addIvyLeaves } = await request.json();

    const category = categories.find((c) => c.id === categoryId);

    if (!category && !customPrompt) {
      return NextResponse.json(
        { error: "Select a category or enter a custom prompt" },
        { status: 400 }
      );
    }

    const label = category?.name || "Custom";
    const designKey = categoryId || "mandalas";
    const imageUrl = generateSvg(designKey, !!addIvyLeaves);

    let prompt = customPrompt || category?.prompt || "";

    if (addIvyLeaves) {
      prompt += ", decorated with elegant ivy leaves and trailing vine borders";
    }

    return NextResponse.json({
      prompt,
      categoryId: categoryId || "custom",
      addIvyLeaves: !!addIvyLeaves,
      imageUrl,
      label,
      status: "success",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate coloring page" },
      { status: 500 }
    );
  }
}
