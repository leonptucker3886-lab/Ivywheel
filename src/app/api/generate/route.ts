import { NextRequest, NextResponse } from "next/server";
import { pitbullVariationHints } from "@/lib/categories";

const PITBULL_BASE_PROMPT =
  "A highly detailed, realistic black and white line art coloring page of a muscular American Pit Bull Terrier, accurate breed anatomy with broad head, strong jaw, expressive eyes, cropped or natural ears, powerful chest and shoulders, short coat with subtle muscle definition and wrinkles, friendly and confident expression, standing or sitting in a calm pose. Thick, clean, bold black outlines only, no shading, no gray tones, no color fills, high contrast, intricate but printable details on fur texture, facial features, and paws. White background, elegant ivy leaf border framing the entire page with delicate vines and leaves. Professional adult coloring book style, crisp vector-like lines, suitable for crayons or markers, high resolution, print-ready";

function enhancePitbullPrompt(userInput: string): string {
  const lower = userInput.toLowerCase().trim();

  if (!lower) return PITBULL_BASE_PROMPT;

  for (const [keyword, hint] of Object.entries(pitbullVariationHints)) {
    if (lower.includes(keyword)) {
      return `${PITBULL_BASE_PROMPT}, featuring ${hint}. Additional context: ${userInput}`;
    }
  }

  return `${PITBULL_BASE_PROMPT}. Scene: ${userInput}`;
}

// Fallback SVG generators for when image API fails
function generateFallbackPitbull(): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" width="2048" height="2048">
      <rect width="2048" height="2048" fill="white"/>
      <g stroke="black" stroke-width="6" fill="none">
        <!-- Dog body -->
        <ellipse cx="1024" cy="1300" rx="360" ry="240"/>
        <ellipse cx="1024" cy="960" rx="240" ry="320"/>

        <!-- Head -->
        <circle cx="1024" cy="560" r="180"/>
        <ellipse cx="1024" cy="640" rx="120" ry="80"/>

        <!-- Ears -->
        <polygon points="920,480 960,400 1000,480"/>
        <polygon points="1128,480 1088,400 1048,480"/>

        <!-- Eyes -->
        <circle cx="980" cy="540" r="16"/>
        <circle cx="1068" cy="540" r="16"/>
        <circle cx="980" cy="540" r="6" fill="black"/>
        <circle cx="1068" cy="540" r="6" fill="black"/>

        <!-- Nose -->
        <polygon points="1024,640 1014,660 1034,660"/>

        <!-- Mouth -->
        <path d="M 1000 680 Q 1024 700 1048 680" stroke-linecap="round"/>

        <!-- Legs -->
        <rect x="860" y="1160" width="40" height="200"/>
        <rect x="948" y="1160" width="40" height="200"/>
        <rect x="1100" y="1160" width="40" height="200"/>
        <rect x="1188" y="1160" width="40" height="200"/>

        <!-- Paws -->
        <circle cx="880" cy="1380" r="30"/>
        <circle cx="968" cy="1380" r="30"/>
        <circle cx="1120" cy="1380" r="30"/>
        <circle cx="1208" cy="1380" r="30"/>

        <!-- Tail -->
        <path d="M 1384 1040 Q 1440 960 1480 1040" stroke-linecap="round"/>

        <!-- Ivy border - detailed -->
        <g stroke-width="4">
          <path d="M 100 100 Q 200 40 300 100 Q 360 160 400 100" stroke-linecap="round"/>
          <path d="M 1648 100 Q 1748 40 1848 100 Q 1908 160 1948 100" stroke-linecap="round"/>
          <path d="M 100 1948 Q 200 2008 300 1948 Q 360 1888 400 1948" stroke-linecap="round"/>
          <path d="M 1648 1948 Q 1748 2008 1848 1948 Q 1908 1888 1948 1948" stroke-linecap="round"/>
          <!-- Corner ivy leaves -->
          <g transform="translate(50,50)">
            <path d="M20 4C16 4 8 8 6 16C4 24 10 32 16 34C14 28 14 22 18 18C22 14 26 16 28 20C30 16 28 8 20 4Z"/>
            <path d="M20 4C20 4 20 20 16 34"/>
          </g>
          <g transform="translate(1998,50) scale(-1,1)">
            <path d="M20 4C16 4 8 8 6 16C4 24 10 32 16 34C14 28 14 22 18 18C22 14 26 16 28 20C30 16 28 8 20 4Z"/>
            <path d="M20 4C20 4 20 20 16 34"/>
          </g>
          <g transform="translate(50,1998) scale(1,-1)">
            <path d="M20 4C16 4 8 8 6 16C4 24 10 32 16 34C14 28 14 22 18 18C22 14 26 16 28 20C30 16 28 8 20 4Z"/>
            <path d="M20 4C20 4 20 20 16 34"/>
          </g>
          <g transform="translate(1998,1998) scale(-1,-1)">
            <path d="M20 4C16 4 8 8 6 16C4 24 10 32 16 34C14 28 14 22 18 18C22 14 26 16 28 20C30 16 28 8 20 4Z"/>
            <path d="M20 4C20 4 20 20 16 34"/>
          </g>
        </g>
      </g>
      <text x="1024" y="1950" text-anchor="middle" font-family="serif" font-size="32" fill="black">Ivy's Peace</text>
      <text x="1024" y="1990" text-anchor="middle" font-family="serif" font-size="20" fill="black" opacity="0.7">Realistic Pitbull Coloring Page</text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

function generateFallbackBikerChick(): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
      <rect width="1024" height="1024" fill="white"/>
      <g stroke="black" stroke-width="3" fill="none">
        <!-- Head -->
        <circle cx="512" cy="250" r="60"/>
        <ellipse cx="512" cy="290" rx="40" ry="30"/>

        <!-- Hair -->
        <path d="M 452 230 Q 480 200 512 230 Q 544 200 572 230 Q 590 250 580 280 Q 560 300 540 290 Q 520 280 512 290 Q 504 280 484 290 Q 464 300 444 280 Q 434 250 452 230" fill="black"/>

        <!-- Eyes -->
        <circle cx="495" cy="240" r="6"/>
        <circle cx="529" cy="240" r="6"/>
        <circle cx="495" cy="240" r="2" fill="black"/>
        <circle cx="529" cy="240" r="2" fill="black"/>

        <!-- Nose -->
        <polygon points="512,260 509,270 515,270"/>

        <!-- Mouth -->
        <path d="M 500 280 Q 512 290 524 280" stroke-linecap="round"/>

        <!-- Jacket -->
        <path d="M 470 320 Q 450 400 460 500 Q 470 600 480 650"/>
        <path d="M 554 320 Q 574 400 564 500 Q 554 600 544 650"/>

        <!-- Shorts -->
        <ellipse cx="512" cy="650" rx="80" ry="40"/>
        <ellipse cx="512" cy="720" rx="60" ry="30"/>

        <!-- Arms -->
        <path d="M 450 350 Q 420 400 430 480"/>
        <path d="M 574 350 Q 604 400 594 480"/>

        <!-- Hands -->
        <circle cx="430" cy="490" r="12"/>
        <circle cx="594" cy="490" r="12"/>

        <!-- Legs -->
        <path d="M 480 720 Q 470 800 475 870"/>
        <path d="M 544 720 Q 554 800 549 870"/>

        <!-- Boots -->
        <ellipse cx="475" cy="880" rx="20" ry="15"/>
        <ellipse cx="549" cy="880" rx="20" ry="15"/>

        <!-- Motorcycle outline -->
        <ellipse cx="512" cy="750" rx="200" ry="80"/>
        <ellipse cx="512" cy="720" rx="120" ry="60"/>
        <circle cx="312" cy="760" r="35"/>
        <circle cx="712" cy="760" r="35"/>
        <circle cx="312" cy="760" r="20" fill="black"/>
        <circle cx="712" cy="760" r="20" fill="black"/>

        <!-- Handlebars -->
        <path d="M 312 720 L 280 700 L 290 690"/>
        <path d="M 312 720 L 344 700 L 334 690"/>
        <path d="M 712 720 L 680 700 L 690 690"/>
        <path d="M 712 720 L 744 700 L 734 690"/>
      </g>
      <text x="512" y="950" text-anchor="middle" font-family="serif" font-size="16" fill="black">Ivy's Peace</text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

export async function POST(request: NextRequest) {
  try {
    const { prompt, style, customModifiers } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    let fullPrompt: string;
    let width = 1024;
    let height = 1024;

    if (style === "pitbull") {
      fullPrompt = enhancePitbullPrompt(customModifiers || prompt);
      width = 2048;
      height = 2048;
    } else {
      fullPrompt = `${style === "tattoo-flash" ? "tattoo flash coloring page, bold thick black outlines, clean line art, no shading, high contrast, white background, intricate details, professional tattoo artist quality" : "adult coloring book page, bold thick black outlines only, clean line art, no shading or color, white background, intricate details, high contrast, suitable for printing and coloring"}, ${prompt}, decorated with elegant ivy leaves and trailing vine borders woven throughout the design`;
    }

    const seed = Math.floor(Math.random() * 100000);
    const encodedPrompt = encodeURIComponent(fullPrompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true&model=flux`;

    try {
      const response = await fetch(imageUrl, {
        signal: AbortSignal.timeout(120000),
        headers: {
          "User-Agent": "IvysPeace/1.0",
        },
      });

      if (!response.ok) {
        throw new Error(`Image generation failed: ${response.status}`);
      }

      const contentType = response.headers.get("content-type") || "image/jpeg";
      const imageBuffer = await response.arrayBuffer();
      const base64 = Buffer.from(imageBuffer).toString("base64");
      const dataUrl = `data:${contentType};base64,${base64}`;

      return NextResponse.json({
        imageUrl: dataUrl,
        prompt: fullPrompt,
        width,
        height,
      });
    } catch (fetchError) {
      console.warn("Image generation failed, using fallback SVG:", fetchError);

      // Fallback to SVG generation
      let fallbackImageUrl: string;
      if (style === "pitbull") {
        fallbackImageUrl = generateFallbackPitbull();
      } else if (style === "biker-chick") {
        fallbackImageUrl = generateFallbackBikerChick();
      } else {
        // Generic fallback for other styles
        fallbackImageUrl = generateFallbackPitbull(); // Use pitbull as default
      }

      return NextResponse.json({
        imageUrl: fallbackImageUrl,
        prompt: fullPrompt,
        width: style === "pitbull" ? 2048 : 1024,
        height: style === "pitbull" ? 2048 : 1024,
        fallback: true,
      });
    }
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}