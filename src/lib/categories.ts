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
];

export const ivyLeavesSuffix =
  ", decorated with elegant ivy leaves and trailing vine borders woven throughout the design";
