"use client";

import { useState } from "react";

interface Leaf {
  id: number;
  left: number;
  delay: number;
  duration: number;
  size: number;
  rotate: number;
  opacity: number;
  color: string;
  spinDuration: number;
  swayDuration: number;
}

function IvyLeaf({ size, color }: { size: number; color: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 4C16 4 8 8 6 16C4 24 10 32 16 34C14 28 14 22 18 18C22 14 26 16 28 20C30 16 28 8 20 4Z"
        fill={color}
      />
      <path
        d="M20 4C20 4 20 20 16 34"
        stroke={color}
        strokeWidth="0.5"
        opacity="0.5"
      />
      <path
        d="M20 4C16 4 8 8 6 16C4 24 10 32 16 34C14 28 14 22 18 18C22 14 26 16 28 20C30 16 28 8 20 4Z"
        stroke="rgba(0,0,0,0.15)"
        strokeWidth="0.8"
        fill="none"
      />
    </svg>
  );
}

const COLORS = ["#2d6a4f", "#40916c", "#52b788", "#74c69d", "#1b4332", "#3a7d5e"];

function generateLeaves(): Leaf[] {
  return Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 12,
    duration: 10 + Math.random() * 10,
    size: 16 + Math.random() * 20,
    rotate: Math.random() * 360,
    opacity: 0.25 + Math.random() * 0.35,
    color: COLORS[i % COLORS.length],
    spinDuration: 8 + Math.random() * 6,
    swayDuration: 3 + Math.random() * 4,
  }));
}

export function FallingLeaves() {
  const [leaves] = useState<Leaf[]>(generateLeaves);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        {leaves.map((leaf) => (
          <div
            key={leaf.id}
            className="absolute"
            style={{
              top: "-5%",
              left: `${leaf.left}%`,
              animation: `leafFall ${leaf.duration}s linear ${leaf.delay}s infinite`,
              opacity: leaf.opacity,
            }}
          >
            <div
              style={{
                animation: `leafSway ${leaf.swayDuration}s ease-in-out ${leaf.delay}s infinite`,
              }}
            >
              <div
                style={{
                  transform: `rotate(${leaf.rotate}deg)`,
                  animation: `leafSpin ${leaf.spinDuration}s linear ${leaf.delay}s infinite`,
                }}
              >
                <IvyLeaf size={leaf.size} color={leaf.color} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes leafFall {
          0% { transform: translateY(-10vh); }
          100% { transform: translateY(115vh); }
        }
        @keyframes leafSway {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(40px); }
        }
        @keyframes leafSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
