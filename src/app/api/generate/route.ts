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

    if (style === "pitbull") {
      const baseWithMods = customModifiers
        ? `${PITBULL_BASE_PROMPT}. ${customModifiers}`
        : PITBULL_BASE_PROMPT;
      fullPrompt = enhancePitbullPrompt(
        customModifiers ? customModifiers : prompt
      );
      if (!customModifiers) {
        fullPrompt = enhancePitbullPrompt(prompt);
      }
    } else {
      const stylePrefix =
        style === "tattoo-flash"
          ? "tattoo flash coloring page, bold thick black outlines, clean line art, no shading, high contrast, white background, intricate details, professional tattoo artist quality"
          : "adult coloring book page, bold thick black outlines only, clean line art, no shading or color, white background, intricate details, high contrast, suitable for printing and coloring";

      const ivySuffix =
        ", decorated with elegant ivy leaves and trailing vine borders woven throughout the design";

      fullPrompt = `${stylePrefix}, ${prompt}${ivySuffix}`;
    }

    const seed = Math.floor(Math.random() * 100000);
    const encodedPrompt = encodeURIComponent(fullPrompt);
    const width = style === "pitbull" ? 2048 : 1024;
    const height = style === "pitbull" ? 2048 : 1024;
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=${width}&height=${height}&seed=${seed}&nologo=true&model=flux`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 180000);

    try {
      const response = await fetch(imageUrl, {
        signal: controller.signal,
        headers: {
          "User-Agent": "IvysPeace/1.0",
        },
      });

      clearTimeout(timeout);

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
      clearTimeout(timeout);

      if (fetchError instanceof Error && fetchError.name === "AbortError") {
        return NextResponse.json(
          { error: "Image generation timed out. Please try again." },
          { status: 504 }
        );
      }

      return NextResponse.json(
        { error: "Failed to generate image. Please try again." },
        { status: 502 }
      );
    }
  } catch {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
