"use client";

interface CategoryCardProps {
  name: string;
  description: string;
  emoji: string;
  isSelected: boolean;
  onClick: () => void;
}

export function CategoryCard({
  name,
  description,
  emoji,
  isSelected,
  onClick,
}: CategoryCardProps) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-start p-6 rounded-2xl border-2 transition-all duration-200 text-left w-full ${
        isSelected
          ? "border-rose-400 bg-rose-400/10 shadow-lg shadow-rose-400/20"
          : "border-neutral-700 bg-neutral-800 hover:border-neutral-500 hover:bg-neutral-750"
      }`}
    >
      <span className="text-4xl mb-3">{emoji}</span>
      <h3 className="text-lg font-semibold text-white">{name}</h3>
      <p className="text-sm text-neutral-400 mt-1">{description}</p>
    </button>
  );
}
