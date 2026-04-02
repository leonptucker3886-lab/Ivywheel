import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { prompt, style } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Prompt is required" },
        { status: 400 }
      );
    }

    const stylePrefix = style === "tattoo-flash"
      ? "tattoo flash coloring page, bold thick black outlines, clean line art, no shading, high contrast, white background, intricate details, professional tattoo artist quality"
      : "adult coloring book page, bold thick black outlines only, clean line art, no shading or color, white background, intricate details, high contrast, suitable for printing and coloring";

    const ivySuffix =
      ", decorated with elegant ivy leaves and trailing vine borders woven throughout the design";

    const fullPrompt = `${stylePrefix}, ${prompt}${ivySuffix}`;

    const seed = Math.floor(Math.random() * 100000);
    const encodedPrompt = encodeURIComponent(fullPrompt);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1024&height=1024&seed=${seed}&nologo=true&model=flux`;

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000);

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
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
