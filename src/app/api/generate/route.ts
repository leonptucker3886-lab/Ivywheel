import { NextRequest, NextResponse } from "next/server";
import { categories, ivyLeavesSuffix } from "@/lib/categories";

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

    let prompt = customPrompt || category?.prompt || "";

    if (addIvyLeaves) {
      prompt += ivyLeavesSuffix;
    }

    const encodedPrompt = encodeURIComponent(prompt);
    const seed = Math.floor(Math.random() * 100000);
    const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=512&height=512&seed=${seed}&nologo=true`;

    const response = await fetch(imageUrl);
    if (!response.ok) {
      throw new Error("Image generation failed");
    }

    const imageBuffer = await response.arrayBuffer();
    const base64 = Buffer.from(imageBuffer).toString("base64");
    const mimeType = response.headers.get("content-type") || "image/png";
    const dataUrl = `data:${mimeType};base64,${base64}`;

    return NextResponse.json({
      imageUrl: dataUrl,
      status: "success",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate coloring page" },
      { status: 500 }
    );
  }
}
