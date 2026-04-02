import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt, style, customModifiers } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    // Always use fallback SVG generation since image APIs are failing
    let fallbackImageUrl: string;
    let width = 1024;
    let height = 1024;

    if (style === "pitbull") {
      fallbackImageUrl = generatePitbullSVG();
      width = 1024;
      height = 1024;
    } else if (style === "biker-chick") {
      fallbackImageUrl = generateBikerChickSVG();
    } else {
      fallbackImageUrl = generateTattooFlashSVG();
    }

    return NextResponse.json({
      imageUrl: fallbackImageUrl,
      prompt: prompt,
      width,
      height,
      fallback: true,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// Simplified SVG generators
function generatePitbullSVG(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
    <rect width="1024" height="1024" fill="#f8f8f8"/>
    <g stroke="black" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
      <!-- Dog body -->
      <ellipse cx="512" cy="650" rx="140" ry="70"/>
      <ellipse cx="512" cy="480" rx="90" ry="80"/>
      <!-- Head -->
      <circle cx="512" cy="280" r="70"/>
      <ellipse cx="512" cy="320" rx="50" ry="30"/>
      <!-- Ears -->
      <polygon points="460,240 480,200 500,240"/>
      <polygon points="564,240 544,200 524,240"/>
      <!-- Eyes -->
      <circle cx="490" cy="270" r="8"/>
      <circle cx="534" cy="270" r="8"/>
      <circle cx="490" cy="270" r="3" fill="black"/>
      <circle cx="534" cy="270" r="3" fill="black"/>
      <!-- Nose -->
      <polygon points="512,320 507,330 517,330"/>
      <!-- Mouth -->
      <path d="M 500 340 Q 512 350 524 340"/>
      <!-- Legs -->
      <rect x="430" y="580" width="20" height="100"/>
      <rect x="474" y="580" width="20" height="100"/>
      <rect x="550" y="580" width="20" height="100"/>
      <rect x="594" y="580" width="20" height="100"/>
      <!-- Paws -->
      <circle cx="440" cy="690" r="15"/>
      <circle cx="484" cy="690" r="15"/>
      <circle cx="560" cy="690" r="15"/>
      <circle cx="604" cy="690" r="15"/>
      <!-- Tail -->
      <path d="M 692 520 Q 720 480 740 520"/>
    </g>
    <g stroke="#2d6a4f" stroke-width="4" fill="none" stroke-linecap="round">
      <path d="M 50 50 Q 150 20 250 50 Q 350 80 450 50 Q 550 20 650 50 Q 750 80 850 50 Q 950 20 974 50"/>
      <path d="M 50 974 Q 150 1004 250 974 Q 350 944 450 974 Q 550 1004 650 974 Q 750 944 850 974 Q 950 1004 974 974"/>
    </g>
    <text x="512" y="950" text-anchor="middle" font-family="serif" font-size="16" fill="black">Ivy's Peace</text>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

function generateBikerChickSVG(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
    <rect width="1024" height="1024" fill="#f8f8f8"/>
    <g stroke="black" stroke-width="3" fill="none">
      <!-- Head -->
      <circle cx="512" cy="250" r="60"/>
      <ellipse cx="512" cy="290" rx="40" ry="30"/>
      <!-- Hair -->
      <path d="M 452 230 Q 480 200 512 230 Q 544 200 572 230 Q 590 250 580 280 Q 560 300 540 290 Q 520 280 512 290 Q 504 280 484 290 Q 464 300 444 280 Q 434 250 452 230"/>
      <!-- Eyes -->
      <circle cx="495" cy="240" r="6"/>
      <circle cx="529" cy="240" r="6"/>
      <circle cx="495" cy="240" r="2" fill="black"/>
      <circle cx="529" cy="240" r="2" fill="black"/>
      <!-- Nose -->
      <polygon points="512,260 509,270 515,270"/>
      <!-- Mouth -->
      <path d="M 500 280 Q 512 290 524 280"/>
      <!-- Jacket -->
      <path d="M 470 320 Q 450 400 460 500 Q 470 600 480 650"/>
      <path d="M 554 320 Q 574 400 564 500 Q 554 600 544 650"/>
      <!-- Shorts -->
      <ellipse cx="512" cy="650" rx="80" ry="40"/>
      <!-- Motorcycle -->
      <ellipse cx="512" cy="750" rx="200" ry="80"/>
      <circle cx="312" cy="760" r="35"/>
      <circle cx="712" cy="760" r="35"/>
    </g>
    <g stroke="#2d6a4f" stroke-width="4" fill="none" stroke-linecap="round">
      <path d="M 50 50 Q 150 20 250 50 Q 350 80 450 50 Q 550 20 650 50 Q 750 80 850 50 Q 950 20 974 50"/>
      <path d="M 50 974 Q 150 1004 250 974 Q 350 944 450 974 Q 550 1004 650 974 Q 750 944 850 974 Q 950 1004 974 974"/>
    </g>
    <text x="512" y="950" text-anchor="middle" font-family="serif" font-size="16" fill="black">Ivy's Peace</text>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

function generateTattooFlashSVG(): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
    <rect width="1024" height="1024" fill="#f8f8f8"/>
    <!-- Skull -->
    <g transform="translate(256,200)">
      <circle cx="0" cy="-20" r="40"/>
      <ellipse cx="0" cy="20" rx="30" ry="25"/>
      <circle cx="-12" cy="-30" r="5"/>
      <circle cx="12" cy="-30" r="5"/>
      <circle cx="-12" cy="-30" r="2" fill="black"/>
      <circle cx="12" cy="-30" r="2" fill="black"/>
      <polygon points="0,0 -5,10 5,10"/>
      <rect x="-20" y="10" width="8" height="20"/>
      <rect x="12" y="10" width="8" height="20"/>
    </g>
    <!-- Rose -->
    <g transform="translate(768,200)">
      <circle cx="0" cy="0" r="25"/>
      <circle cx="-8" cy="-8" r="15"/>
      <circle cx="8" cy="-8" r="15"/>
      <circle cx="0" cy="-15" r="12"/>
      <circle cx="0" cy="15" r="8"/>
      <rect x="-2" y="25" width="4" height="20"/>
    </g>
    <!-- Dagger -->
    <g transform="translate(256,500)">
      <polygon points="0,-50 15,20 10,50 0,45 -10,50 -15,20"/>
      <rect x="-5" y="50" width="10" height="30"/>
      <rect x="-8" y="80" width="16" height="15"/>
    </g>
    <!-- Anchor -->
    <g transform="translate(768,500)">
      <circle cx="0" cy="-30" r="10"/>
      <rect x="-5" y="-20" width="10" height="80"/>
      <ellipse cx="-15" cy="40" rx="8" ry="15"/>
      <ellipse cx="15" cy="40" rx="8" ry="15"/>
      <rect x="-20" y="55" width="40" height="8"/>
    </g>
    <g stroke="#8B4513" stroke-width="4" fill="none" stroke-linecap="round">
      <rect x="80" y="80" width="864" height="864" rx="20" fill="none"/>
    </g>
    <text x="512" y="950" text-anchor="middle" font-family="serif" font-size="16" fill="black">Ivy's Peace</text>
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}