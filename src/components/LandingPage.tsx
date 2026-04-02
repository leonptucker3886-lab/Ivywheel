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
          {/* Ivy's Introduction */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-emerald-300 via-teal-200 to-green-300 bg-clip-text text-transparent">
              Ivy&apos;s Peace
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 mx-auto mb-8 rounded-full"></div>

            <div className="bg-stone-800/50 backdrop-blur-sm rounded-2xl p-8 mb-8 border border-emerald-600/20">
              <h2 className="text-3xl font-semibold text-emerald-300 mb-4">About Ivy&apos;s Peace</h2>
              <p className="text-xl text-stone-300 leading-relaxed mb-6">
                This collection is inspired by Ivy, who finds immense peace and tranquility in coloring.
                She&apos;s a huge fan of pit bulls and believes in the therapeutic power of creative expression.
                These pages aren&apos;t just about pretty pictures – they&apos;re carefully curated designs that help
                create moments of mindfulness and relaxation.
              </p>
              <p className="text-lg text-stone-400 leading-relaxed">
                Whether you&apos;re stressed from work, need a moment of calm, or just want to create something beautiful,
                we hope these coloring pages bring you the same sense of peace that inspires this collection.
              </p>
            </div>
          </div>

          {/* Featured Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="bg-stone-800/50 backdrop-blur-sm rounded-xl p-6 border border-emerald-600/20 hover:border-emerald-400/40 transition-colors">
              <div className="text-4xl mb-4">🐕</div>
              <h3 className="text-xl font-semibold text-emerald-300 mb-2">Pit Bulls</h3>
              <p className="text-stone-400 text-sm">
                My absolute favorites. These strong, loving dogs inspire me every day.
              </p>
            </div>

            <div className="bg-stone-800/50 backdrop-blur-sm rounded-xl p-6 border border-teal-600/20 hover:border-teal-400/40 transition-colors">
              <div className="text-4xl mb-4">🌸</div>
              <h3 className="text-xl font-semibold text-teal-300 mb-2">Nature & Flowers</h3>
              <p className="text-stone-400 text-sm">
                Beautiful botanical designs that remind me of peaceful walks in the park.
              </p>
            </div>

            <div className="bg-stone-800/50 backdrop-blur-sm rounded-xl p-6 border border-green-600/20 hover:border-green-400/40 transition-colors">
              <div className="text-4xl mb-4">🦋</div>
              <h3 className="text-xl font-semibold text-green-300 mb-2">Fantasy & Dreams</h3>
              <p className="text-stone-400 text-sm">
                Whimsical designs that let my imagination run free.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="space-y-6">
            <Link
              href="/gallery"
              className="inline-block px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xl rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg"
            >
              Explore Coloring Pages 🌿
            </Link>

            <p className="text-stone-500 text-sm max-w-md mx-auto">
              All pages are free to download and print. No registration required.
            </p>
          </div>
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