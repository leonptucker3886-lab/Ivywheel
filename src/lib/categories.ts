export interface Category {
  id: string;
  name: string;
  description: string;
  emoji: string;
  prompt: string;
}

export const categories: Category[] = [
  {
    id: "pitbull",
    name: "Realistic Pitbull",
    description: "Detailed American Pit Bull Terrier with accurate anatomy and gentle expression",
    emoji: "🐶",
    prompt: "A highly detailed, realistic black and white line art coloring page of a muscular American Pit Bull Terrier, accurate breed anatomy with broad head, strong jaw, expressive eyes, cropped or natural ears, powerful chest and shoulders, short coat with subtle muscle definition and wrinkles, friendly and confident expression, standing or sitting in a calm pose. Thick, clean, bold black outlines only, no shading, no gray tones, no color fills, high contrast, intricate but printable details on fur texture, facial features, and paws. White background, elegant ivy leaf border framing the entire page with delicate vines and leaves. Professional adult coloring book style, crisp vector-like lines, suitable for crayons or markers, high resolution, print-ready",
  },
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

export const pitbullVariationHints: Record<string, string> = {
  puppy: "adorable pitbull puppy with oversized paws, wrinkled face, playful innocent expression, big round eyes, soft chubby body",
  bandana: "pitbull wearing a stylish bandana around neck, relaxed confident pose",
  sitting: "pitbull sitting attentively with alert ears, chest puffed out, tail wagging",
  portrait: "close-up portrait of pitbull head and shoulders, highly detailed face with deep soulful eyes, wrinkled forehead, muscular jaw",
  playing: "pitbull in playful stance with a ball, tongue out, happy expression, energetic pose",
  sleeping: "peaceful pitbull curled up sleeping, relaxed body, gentle expression, cozy pose",
  running: "pitbull in full sprint, muscular body in motion, ears pinned back, powerful legs extended",
  wearing: "pitbull wearing a collar with tags, dignified expression, noble pose",
  with: "pitbull in a scenic outdoor setting, natural environment with grass and trees",
};
