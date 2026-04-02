export interface Category {
  id: string;
  name: string;
  description: string;
  emoji: string;
  prompt: string;
}

export const categories: Category[] = [
  {
    id: "pitbulls",
    name: "Pitbulls",
    description: "Leonardo da Vinci-style anatomical studies with cross-hatching",
    emoji: "🐶",
    prompt: "coloring book page, Renaissance pen and ink drawing style, anatomical study of a pitbull dog, cross-hatching for depth, natural relaxed pose, detailed musculature visible through short coat, Leonardo da Vinci study page style, masterful line work with varying weight, clean outlines, white background, adult coloring book style",
  },
  {
    id: "gardens",
    name: "Garden Blooms",
    description: "Lush flower gardens and cottage scenes",
    emoji: "🌸",
    prompt: "coloring book page, black and white line art, a lush cottage garden with roses, daisies, and wildflowers, clean outlines, no shading, white background, adult coloring book style",
  },
  {
    id: "birds",
    name: "Songbirds",
    description: "Graceful birds perched among branches",
    emoji: "🐦",
    prompt: "coloring book page, black and white line art, songbirds perched on flowering branches, detailed feathers, clean outlines, no shading, white background, adult coloring book style",
  },
  {
    id: "butterflies",
    name: "Butterflies",
    description: "Intricate butterfly and moth designs",
    emoji: "🦋",
    prompt: "coloring book page, black and white line art, detailed butterfly with intricate wing patterns, surrounded by small flowers, clean outlines, no shading, white background, adult coloring book style",
  },
  {
    id: "mandalas",
    name: "Mandalas",
    description: "Calming symmetrical mandala patterns",
    emoji: "✨",
    prompt: "coloring book page, black and white line art, intricate mandala pattern with floral and geometric elements, symmetrical design, clean outlines, no shading, white background, adult coloring book style",
  },
  {
    id: "cats",
    name: "Cats",
    description: "Elegant cats in cozy scenes",
    emoji: "🐱",
    prompt: "coloring book page, black and white line art, an elegant cat curled up in a cozy setting, detailed fur, clean outlines, no shading, white background, adult coloring book style",
  },
  {
    id: "coastal",
    name: "Coastal Scenes",
    description: "Serene beach and ocean vistas",
    emoji: "🐚",
    prompt: "coloring book page, black and white line art, a serene coastal scene with seashells, gentle waves, and a lighthouse, clean outlines, no shading, white background, adult coloring book style",
  },
  {
    id: "florals",
    name: "Floral Bouquets",
    description: "Elegant floral arrangements and wreaths",
    emoji: "💐",
    prompt: "coloring book page, black and white line art, an elegant floral bouquet with roses, peonies, and lavender, detailed petals, clean outlines, no shading, white background, adult coloring book style",
  },
  {
    id: "tattoo-flash",
    name: "Tattoo Flash",
    description: "Bold flash sheet designs with skulls, roses, daggers & more",
    emoji: "💀",
    prompt: "tattoo flash sheet, black and grey realism, bold outlines, stippling shading, skull rose dagger snake anchor, professional tattoo artist quality, stencil ready, white background",
  },
];

export const ivyLeavesSuffix =
  ", decorated with elegant ivy leaves and trailing vine borders woven throughout the design";
