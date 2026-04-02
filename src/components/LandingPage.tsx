"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

interface IvyLeaf {
  id: number;
  x: number;
  y: number;
  rotation: number;
  speed: number;
  size: number;
}

export default function LandingPage() {
  const [ivyLeaves, setIvyLeaves] = useState<IvyLeaf[]>([]);

  useEffect(() => {
    // Generate initial ivy leaves
    const initialLeaves: IvyLeaf[] = [];
    for (let i = 0; i < 15; i++) {
      initialLeaves.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -50 - Math.random() * 100,
        rotation: Math.random() * 360,
        speed: 0.5 + Math.random() * 1.5,
        size: 20 + Math.random() * 30,
      });
    }
    setIvyLeaves(initialLeaves);

    // Animate ivy leaves
    const animateLeaves = () => {
      setIvyLeaves(prevLeaves =>
        prevLeaves.map(leaf => ({
          ...leaf,
          y: leaf.y + leaf.speed,
          rotation: leaf.rotation + 0.5,
          x: leaf.x + Math.sin(leaf.y * 0.01) * 0.5,
        })).filter(leaf => leaf.y < window.innerHeight + 100)
      );

      // Add new leaves occasionally
      if (Math.random() < 0.02) {
        setIvyLeaves(prevLeaves => [...prevLeaves, {
          id: Date.now(),
          x: Math.random() * window.innerWidth,
          y: -50,
          rotation: Math.random() * 360,
          speed: 0.5 + Math.random() * 1.5,
          size: 20 + Math.random() * 30,
        }]);
      }
    };

    const interval = setInterval(animateLeaves, 50);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-stone-900 to-teal-900 relative overflow-hidden">
      {/* Animated Ivy Leaves */}
      {ivyLeaves.map(leaf => (
        <div
          key={leaf.id}
          className="absolute pointer-events-none opacity-30"
          style={{
            left: `${leaf.x}px`,
            top: `${leaf.y}px`,
            transform: `rotate(${leaf.rotation}deg)`,
            fontSize: `${leaf.size}px`,
          }}
        >
          🌿
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-bold mb-12 bg-gradient-to-r from-emerald-300 via-teal-200 to-green-300 bg-clip-text text-transparent">
            Ivy&apos;s Peace
          </h1>

          <Link
            href="/gallery"
            className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xl rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
          >
            Enter
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 w-full py-8 mt-16 border-t border-stone-700/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-stone-500 text-sm">
            Inspired by Ivy • All coloring pages sourced from public domain resources
          </p>
        </div>
      </footer>
    </div>
  );
}