export interface Category {
  id: string;
  name: string;
  description: string;
  emoji: string;
  prompt: string;
}

export const categories: Category[] = [
  {
    id: "tattoo-flash",
    name: "Tattoo Flash",
    description: "Bold flash sheet designs with skulls, roses, daggers & more",
    emoji: "💀",
    prompt: "tattoo flash sheet, black and grey realism, bold outlines, stippling shading, skull rose dagger snake anchor, professional tattoo artist quality, stencil ready, white background",
  },
  {
    id: "biker-chick",
    name: "Confident Biker Chick",
    description: "Bold biker girl on a Harley with tattoos and windswept hair",
    emoji: "🏍️",
    prompt: "Highly detailed adult coloring book page, bold thick black outlines, clean line art, no shading, high contrast, confident biker girl in leather jacket and shorts sitting on a Harley, tattoos on arms and thigh, windswept hair, dynamic pose, tattoo flash style",
  },
];

export const ivyLeavesSuffix =
  ", decorated with elegant ivy leaves and trailing vine borders woven throughout the design";
