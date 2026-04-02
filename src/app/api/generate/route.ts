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

    // TODO: Replace with actual image generation API (e.g., OpenAI DALL-E, Stability AI)
    // For now, return a placeholder response
    const label = category?.name || "Custom";
    return NextResponse.json({
      prompt,
      categoryId: categoryId || "custom",
      addIvyLeaves: !!addIvyLeaves,
      imageUrl: `https://placehold.co/512x512/ffffff/333333?text=${encodeURIComponent(label + " Coloring Page")}`,
      status: "success",
      message: "Connect an image generation API to generate real coloring pages",
    });
  } catch {
    return NextResponse.json(
      { error: "Failed to generate coloring page" },
      { status: 500 }
    );
  }
}
