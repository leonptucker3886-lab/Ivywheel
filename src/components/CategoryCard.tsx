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
      className={`group relative flex flex-col items-start p-7 rounded-2xl border-2 transition-all duration-300 text-left w-full overflow-hidden ${
        isSelected
          ? "border-emerald-400 bg-emerald-400/10 shadow-lg shadow-emerald-400/20 scale-[1.02]"
          : "border-stone-700/60 bg-stone-800/80 hover:border-emerald-600/50 hover:bg-stone-800 hover:shadow-md hover:shadow-emerald-900/20 hover:scale-[1.01]"
      }`}
    >
      {isSelected && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/10 pointer-events-none" />
      )}
      <div className="absolute top-0 right-0 w-24 h-24 opacity-5 pointer-events-none">
        <svg viewBox="0 0 40 40" fill="none">
          <path
            d="M20 4C16 4 8 8 6 16C4 24 10 32 16 34C14 28 14 22 18 18C22 14 26 16 28 20C30 16 28 8 20 4Z"
            fill="white"
          />
        </svg>
      </div>
      <span className="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
        {emoji}
      </span>
      <h3
        className={`text-lg font-semibold transition-colors duration-200 ${
          isSelected ? "text-emerald-300" : "text-white group-hover:text-emerald-200"
        }`}
      >
        {name}
      </h3>
      <p className="text-sm text-stone-400 mt-1.5 leading-relaxed">
        {description}
      </p>
      {isSelected && (
        <div className="absolute top-3 right-3">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-emerald-400"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        </div>
      )}
    </button>
  );
}
