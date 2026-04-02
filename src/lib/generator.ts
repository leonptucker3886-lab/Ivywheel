const SIZE = 1024;
const C = SIZE / 2;

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function rr(r: () => number, min: number, max: number) {
  return min + r() * (max - min);
}

function ri(r: () => number, min: number, max: number) {
  return Math.floor(rr(r, min, max));
}

function svg(tag: string, attrs: Record<string, string | number>) {
  const a = Object.entries(attrs)
    .map(([k, v]) => `${k}="${v}"`)
    .join(" ");
  return `<${tag} ${a}/>`;
}

function path(d: string, stroke = "#1a1a1a", sw = 2.5, fill = "none") {
  return `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function ellipse(
  cx: number,
  cy: number,
  rx: number,
  ry: number,
  stroke = "#1a1a1a",
  sw = 2.5,
  fill = "none",
  transform = ""
) {
  const t = transform ? ` transform="${transform}"` : "";
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${t}/>`;
}

function circle(
  cx: number,
  cy: number,
  r: number,
  stroke = "#1a1a1a",
  sw = 2,
  fill = "none"
) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
}

function line(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  stroke = "#1a1a1a",
  sw = 2
) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
}

function generatePitbulls(r: () => number): string {
  const bx = rr(r, 350, 680);
  const by = rr(r, 520, 620);
  const scale = rr(r, 0.85, 1.2);
  const headTilt = rr(r, -8, 8);
  const parts: string[] = [];

  parts.push(`<g transform="translate(${bx},${by}) scale(${scale})">`);
  parts.push(ellipse(0, 40, 130, 110));
  parts.push(ellipse(0, -50, 100, 85));
  parts.push(`<g transform="rotate(${headTilt} 0 -50)">`);

  const earSpread = rr(r, 55, 75);
  parts.push(ellipse(-earSpread, -95, 35, 50, "#1a1a1a", 2.5, "none", `rotate(${-15 - rr(r, 0, 10)} ${-earSpread} -95)`));
  parts.push(ellipse(earSpread, -95, 35, 50, "#1a1a1a", 2.5, "none", `rotate(${15 + rr(r, 0, 10)} ${earSpread} -95)`));

  const eyeSpacing = rr(r, 28, 38);
  parts.push(ellipse(-eyeSpacing, -60, 12, 14));
  parts.push(ellipse(eyeSpacing, -60, 12, 14));
  parts.push(circle(-eyeSpacing, -58, 5, "#1a1a1a", 2, "#1a1a1a"));
  parts.push(circle(eyeSpacing, -58, 5, "#1a1a1a", 2, "#1a1a1a"));
  parts.push(circle(-eyeSpacing - 2, -61, 2, "#1a1a1a", 1, "white"));
  parts.push(circle(eyeSpacing - 2, -61, 2, "#1a1a1a", 1, "white"));

  const noseW = rr(r, 20, 28);
  parts.push(ellipse(0, -25, noseW, noseW * 0.65));
  parts.push(circle(0, -25, noseW * 0.35, "#1a1a1a", 1.5, "#1a1a1a"));

  parts.push(path(`M0 ${-25 + noseW * 0.65} Q0 -5 ${-8 - rr(r, 0, 5)} ${rr(r, 2, 8)}`));
  parts.push(path(`M0 ${-25 + noseW * 0.65} Q0 -5 ${8 + rr(r, 0, 5)} ${rr(r, 2, 8)}`));

  const mouthW = rr(r, 30, 45);
  parts.push(path(`M${-mouthW} ${rr(r, 5, 15)} Q0 ${rr(r, 20, 35)} ${mouthW} ${rr(r, 5, 15)}`));

  const wrinkleCount = ri(r, 2, 5);
  for (let i = 0; i < wrinkleCount; i++) {
    const wy = -40 + i * 12;
    const ww = rr(r, 15, 30);
    parts.push(path(`M${-ww} ${wy} Q0 ${wy + rr(r, 3, 8)} ${ww} ${wy}`, "#1a1a1a", 1.5));
  }

  parts.push("</g>");

  const legSpread = rr(r, 60, 90);
  parts.push(ellipse(-legSpread, 130, 30, 60));
  parts.push(ellipse(legSpread, 130, 30, 60));

  const pawW = rr(r, 30, 42);
  parts.push(ellipse(-legSpread, 195, pawW, 18));
  parts.push(ellipse(legSpread, 195, pawW, 18));

  const tailCurve = rr(r, 200, 300);
  parts.push(path(`M120 0 Q${tailCurve} ${-rr(r, 60, 120)} ${rr(r, 180, 250)} ${rr(r, 20, 80)}`, "#1a1a1a", 3));

  const spotCount = ri(r, 0, 4);
  for (let i = 0; i < spotCount; i++) {
    const sx = rr(r, -80, 80);
    const sy = rr(r, -20, 60);
    parts.push(circle(sx, sy, rr(r, 8, 20), "#1a1a1a", 1.5));
  }

  parts.push("</g>");
  return parts.join("\n");
}

function generateGardens(r: () => number): string {
  const parts: string[] = [];

  const stemCount = ri(r, 5, 9);
  for (let i = 0; i < stemCount; i++) {
    const sx = rr(r, 120, 900);
    const stemH = rr(r, 200, 500);
    const curve = rr(r, -60, 60);
    parts.push(path(`M${sx} 950 Q${sx + curve} ${950 - stemH / 2} ${sx + curve * 0.5} ${950 - stemH}`, "#1a1a1a", 2.5));

    const leafCount = ri(r, 1, 4);
    for (let j = 0; j < leafCount; j++) {
      const ly = 950 - stemH * (0.3 + j * 0.2);
      const dir = r() > 0.5 ? 1 : -1;
      const lsize = rr(r, 25, 50);
      parts.push(ellipse(sx + curve * 0.5 * (1 - j * 0.2) + dir * lsize * 1.5, ly, lsize, lsize * 0.5, "#1a1a1a", 2, "none", `rotate(${dir * rr(r, 15, 45)} ${sx + dir * lsize * 1.5} ${ly})`));
    }

    const fx = sx + curve * 0.5;
    const fy = 950 - stemH;
    const flowerType = ri(r, 0, 3);

    if (flowerType === 0) {
      const petals = ri(r, 5, 9);
      const petalR = rr(r, 30, 60);
      parts.push(circle(fx, fy, petalR * 0.3));
      for (let p = 0; p < petals; p++) {
        const angle = (p / petals) * Math.PI * 2;
        const px = fx + Math.cos(angle) * petalR * 0.7;
        const py = fy + Math.sin(angle) * petalR * 0.7;
        parts.push(ellipse(px, py, petalR * 0.5, petalR * 0.3, "#1a1a1a", 2, "none", `rotate(${(angle * 180) / Math.PI} ${px} ${py})`));
      }
    } else if (flowerType === 1) {
      const layers = ri(r, 2, 4);
      for (let l = layers; l > 0; l--) {
        const lr = l * rr(r, 12, 20);
        parts.push(circle(fx, fy, lr));
      }
    } else {
      const rays = ri(r, 6, 12);
      const rayLen = rr(r, 25, 50);
      for (let p = 0; p < rays; p++) {
        const angle = (p / rays) * Math.PI * 2;
        parts.push(line(fx, fy, fx + Math.cos(angle) * rayLen, fy + Math.sin(angle) * rayLen, "#1a1a1a", 2));
      }
      parts.push(circle(fx, fy, rr(r, 8, 15)));
    }
  }

  parts.push(path(`M0 960 Q${rr(r, 100, 200)} 930 ${rr(r, 250, 350)} 960 Q${rr(r, 400, 500)} 990 ${rr(r, 550, 650)} 960 Q${rr(r, 700, 800)} 930 ${rr(r, 850, 950)} 960 Q${rr(r, 950, 1024)} 990 1024 960`, "#1a1a1a", 2.5));

  const grassClumps = ri(r, 8, 16);
  for (let i = 0; i < grassClumps; i++) {
    const gx = rr(r, 30, 990);
    const blades = ri(r, 3, 6);
    for (let b = 0; b < blades; b++) {
      const bh = rr(r, 20, 50);
      const bend = rr(r, -15, 15);
      parts.push(path(`M${gx + b * 5} 960 Q${gx + b * 5 + bend} ${960 - bh} ${gx + b * 5 + bend * 1.5} ${960 - bh * 1.2}`, "#1a1a1a", 1.5));
    }
  }

  const butterflyCount = ri(r, 0, 3);
  for (let i = 0; i < butterflyCount; i++) {
    const bx = rr(r, 150, 870);
    const by = rr(r, 100, 400);
    const bs = rr(r, 15, 30);
    parts.push(`<g transform="translate(${bx},${by}) rotate(${rr(r, -30, 30)})">`);
    parts.push(ellipse(-bs, 0, bs, bs * 0.7));
    parts.push(ellipse(bs, 0, bs, bs * 0.7));
    parts.push(line(0, -bs * 0.5, 0, bs * 0.5, "#1a1a1a", 1.5));
    parts.push("</g>");
  }

  return parts.join("\n");
}

function generateBirds(r: () => number): string {
  const parts: string[] = [];

  const branchCount = ri(r, 2, 4);
  for (let i = 0; i < branchCount; i++) {
    const by = rr(r, 500, 800);
    const bstart = rr(r, -50, 200);
    const bend = rr(r, 800, 1100);
    const sag = rr(r, 20, 80);
    parts.push(path(`M${bstart} ${by} Q${(bstart + bend) / 2} ${by + sag} ${bend} ${by + sag * 0.5}`, "#1a1a1a", 3));

    const subCount = ri(r, 1, 4);
    for (let s = 0; s < subCount; s++) {
      const sx = rr(r, bstart + 100, bend - 100);
      const sEnd = sx + rr(r, 80, 200) * (r() > 0.5 ? 1 : -1);
      const sY = by + sag * ((sx - bstart) / (bend - bstart));
      parts.push(path(`M${sx} ${sY} Q${(sx + sEnd) / 2} ${sY - rr(r, 30, 80)} ${sEnd} ${sY - rr(r, 10, 40)}`, "#1a1a1a", 2));

      const leafCount = ri(r, 2, 5);
      for (let l = 0; l < leafCount; l++) {
        const lx = sx + (sEnd - sx) * ((l + 1) / (leafCount + 1));
        const ly = sY - rr(r, 10, 50);
        const dir = r() > 0.5 ? 1 : -1;
        parts.push(ellipse(lx + dir * 15, ly, 18, 9, "#1a1a1a", 1.5, "none", `rotate(${dir * rr(r, 20, 60)} ${lx + dir * 15} ${ly})`));
      }
    }
  }

  const birdCount = ri(r, 1, 3);
  for (let i = 0; i < birdCount; i++) {
    const bx = rr(r, 200, 820);
    const by = rr(r, 200, 480);
    const bs = rr(r, 0.9, 1.4);
    const facing = r() > 0.5 ? 1 : -1;

    parts.push(`<g transform="translate(${bx},${by}) scale(${bs * facing},${bs})">`);
    parts.push(ellipse(0, 40, 65, 55));
    parts.push(circle(0, -20, 38));

    const eyeX = rr(r, 12, 20);
    parts.push(ellipse(-eyeX, -28, 7, 8));
    parts.push(ellipse(eyeX, -28, 7, 8));
    parts.push(circle(-eyeX, -27, 3.5, "#1a1a1a", 1.5, "#1a1a1a"));
    parts.push(circle(eyeX, -27, 3.5, "#1a1a1a", 1.5, "#1a1a1a"));

    parts.push(path(`M0 -12 L${-8} 0 L0 5 L${8} 0 Z`, "#1a1a1a", 2));

    const wingSpan = rr(r, 60, 90);
    parts.push(path(`M-55 30 Q${-wingSpan - 20} ${-rr(r, 20, 60)} ${-wingSpan - rr(r, 20, 50)} ${rr(r, 0, 30)}`));
    parts.push(path(`M55 30 Q${wingSpan + 20} ${-rr(r, 20, 60)} ${wingSpan + rr(r, 20, 50)} ${rr(r, 0, 30)}`));

    const tailLen = rr(r, 40, 70);
    parts.push(path(`M-5 85 Q${-tailLen * 0.5} ${85 + tailLen} ${-tailLen} ${85 + tailLen * 0.7}`));
    parts.push(path(`M5 85 Q${tailLen * 0.5} ${85 + tailLen} ${tailLen} ${85 + tailLen * 0.7}`));

    parts.push(line(-15, 95, -20, 150));
    parts.push(line(15, 95, 20, 150));
    parts.push(path(`M-30 150 L-10 150 L-20 140 Z`));
    parts.push(path(`M10 150 L30 150 L20 140 Z`));

    const crestH = rr(r, 15, 35);
    parts.push(path(`M0 -58 Q${-rr(r, 5, 15)} ${-58 - crestH} ${rr(r, 5, 20)} ${-58 - crestH * 0.8}`));

    parts.push("</g>");
  }

  return parts.join("\n");
}

function generateButterflies(r: () => number): string {
  const parts: string[] = [];

  const count = ri(r, 1, 3);
  for (let i = 0; i < count; i++) {
    const bx = rr(r, 250, 770);
    const by = rr(r, 250, 650);
    const bs = rr(r, 0.9, 1.5);
    const rot = rr(r, -25, 25);

    parts.push(`<g transform="translate(${bx},${by}) scale(${bs}) rotate(${rot})">`);

    const bodyW = rr(r, 10, 18);
    parts.push(ellipse(0, 0, bodyW, 100, "#1a1a1a", 3));
    parts.push(circle(0, -110, bodyW * 0.9, "#1a1a1a", 2.5));

    const antLen = rr(r, 50, 80);
    const antCurve = rr(r, 15, 30);
    parts.push(path(`M${-bodyW * 0.3} -115 Q${-antCurve - 20} ${-115 - antLen} ${-antCurve - 30} ${-115 - antLen - 10}`));
    parts.push(path(`M${bodyW * 0.3} -115 Q${antCurve + 20} ${-115 - antLen} ${antCurve + 30} ${-115 - antLen - 10}`));
    parts.push(circle(-antCurve - 30, -115 - antLen - 10, 5));
    parts.push(circle(antCurve + 30, -115 - antLen - 10, 5));

    const upperW = rr(r, 120, 180);
    const upperH = rr(r, 90, 140);
    parts.push(ellipse(-upperW * 0.5, -upperH * 0.3, upperW, upperH));
    parts.push(ellipse(upperW * 0.5, -upperH * 0.3, upperW, upperH));

    parts.push(ellipse(-upperW * 0.5, -upperH * 0.3, upperW * 0.6, upperH * 0.6));
    parts.push(ellipse(upperW * 0.5, -upperH * 0.3, upperW * 0.6, upperH * 0.6));

    const innerRings = ri(r, 1, 3);
    for (let ring = 0; ring < innerRings; ring++) {
      const ratio = 0.3 + ring * 0.12;
      parts.push(ellipse(-upperW * 0.5, -upperH * 0.3, upperW * ratio, upperH * ratio, "#1a1a1a", 1.5));
      parts.push(ellipse(upperW * 0.5, -upperH * 0.3, upperW * ratio, upperH * ratio, "#1a1a1a", 1.5));
    }

    const lowerW = rr(r, 70, 110);
    const lowerH = rr(r, 60, 90);
    parts.push(ellipse(-lowerW * 0.45, upperH * 0.35, lowerW, lowerH));
    parts.push(ellipse(lowerW * 0.45, upperH * 0.35, lowerW, lowerH));

    parts.push(ellipse(-lowerW * 0.45, upperH * 0.35, lowerW * 0.5, lowerH * 0.5));
    parts.push(ellipse(lowerW * 0.45, upperH * 0.35, lowerW * 0.5, lowerH * 0.5));

    const spotCount = ri(r, 0, 6);
    for (let s = 0; s < spotCount; s++) {
      const side = r() > 0.5 ? 1 : -1;
      const sx = side * rr(r, 30, upperW * 0.7);
      const sy = rr(r, -upperH * 0.6, upperH * 0.3);
      parts.push(circle(sx, sy, rr(r, 4, 12), "#1a1a1a", 1.5));
    }

    parts.push("</g>");
  }

  const flowerCount = ri(r, 2, 5);
  for (let i = 0; i < flowerCount; i++) {
    const fx = rr(r, 80, 940);
    const fy = rr(r, 750, 950);
    const stemH = rr(r, 60, 150);
    parts.push(path(`M${fx} ${fy} Q${fx + rr(r, -20, 20)} ${fy - stemH / 2} ${fx + rr(r, -10, 10)} ${fy - stemH}`));
    const petals = ri(r, 4, 7);
    const pr = rr(r, 12, 25);
    for (let p = 0; p < petals; p++) {
      const angle = (p / petals) * Math.PI * 2;
      parts.push(ellipse(fx + Math.cos(angle) * pr, fy - stemH + Math.sin(angle) * pr, pr * 0.6, pr * 0.35, "#1a1a1a", 1.5, "none", `rotate(${(angle * 180) / Math.PI} ${fx + Math.cos(angle) * pr} ${fy - stemH + Math.sin(angle) * pr})`));
    }
    parts.push(circle(fx, fy - stemH, pr * 0.25));
  }

  return parts.join("\n");
}

function generateMandalas(r: () => number): string {
  const parts: string[] = [];

  const layers = ri(r, 5, 9);
  const maxR = rr(r, 380, 460);
  const cx = C;
  const cy = C;

  for (let l = 0; l < layers; l++) {
    const lr = ((l + 1) / layers) * maxR;
    parts.push(circle(cx, cy, lr, "#1a1a1a", l === layers - 1 ? 3 : 2));
  }

  const sym = ri(r, 6, 16);
  for (let s = 0; s < sym; s++) {
    const angle = (s / sym) * Math.PI * 2;
    parts.push(line(cx, cy, cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR, "#1a1a1a", 1.5));
  }

  for (let l = 0; l < layers - 1; l++) {
    const lr = ((l + 1) / layers) * maxR;
    const nextR = ((l + 2) / layers) * maxR;
    const midR = (lr + nextR) / 2;
    const elemCount = ri(r, 4, 12);

    for (let e = 0; e < elemCount; e++) {
      const angle = (e / elemCount) * Math.PI * 2;
      const ex = cx + Math.cos(angle) * midR;
      const ey = cy + Math.sin(angle) * midR;
      const etype = ri(r, 0, 5);

      if (etype === 0) {
        parts.push(circle(ex, ey, rr(r, 5, 15), "#1a1a1a", 1.5));
      } else if (etype === 1) {
        const er = rr(r, 8, 20);
        parts.push(ellipse(ex, ey, er, er * 0.5, "#1a1a1a", 1.5, "none", `rotate(${(angle * 180) / Math.PI} ${ex} ${ey})`));
      } else if (etype === 2) {
        const sz = rr(r, 6, 14);
        const innerAngle = angle + Math.PI / elemCount;
        const iex = cx + Math.cos(innerAngle) * (midR - sz);
        const iey = cy + Math.sin(innerAngle) * (midR - sz);
        parts.push(path(`M${ex} ${ey} L${iex + sz} ${iey} L${iex - sz} ${iey} Z`, "#1a1a1a", 1.5));
      } else if (etype === 3) {
        const petalL = rr(r, 10, 25);
        const petalW = rr(r, 5, 12);
        const perpAngle = angle + Math.PI / 2;
        parts.push(path(`M${ex} ${ey} Q${ex + Math.cos(angle) * petalL + Math.cos(perpAngle) * petalW} ${ey + Math.sin(angle) * petalL + Math.sin(perpAngle) * petalW} ${ex + Math.cos(angle) * petalL * 1.5} ${ey + Math.sin(angle) * petalL * 1.5} Q${ex + Math.cos(angle) * petalL - Math.cos(perpAngle) * petalW} ${ey + Math.sin(angle) * petalL - Math.sin(perpAngle) * petalW} ${ex} ${ey}`, "#1a1a1a", 1.5));
      } else {
        const sz = rr(r, 5, 12);
        parts.push(`<rect x="${ex - sz}" y="${ey - sz}" width="${sz * 2}" height="${sz * 2}" fill="none" stroke="#1a1a1a" stroke-width="1.5" transform="rotate(${(angle * 180) / Math.PI + 45} ${ex} ${ey})"/>`);
      }
    }
  }

  const innerRings = ri(r, 2, 5);
  for (let ring = 0; ring < innerRings; ring++) {
    const rr2 = ((ring + 1) / (innerRings + 1)) * maxR * 0.3;
    const petals = ri(r, 6, 12);
    for (let p = 0; p < petals; p++) {
      const angle = (p / petals) * Math.PI * 2;
      const px = cx + Math.cos(angle) * rr2;
      const py = cy + Math.sin(angle) * rr2;
      const ps = rr2 * 0.4;
      parts.push(ellipse(px, py, ps, ps * 0.5, "#1a1a1a", 1.5, "none", `rotate(${(angle * 180) / Math.PI} ${px} ${py})`));
    }
  }

  parts.push(circle(cx, cy, maxR * 0.06, "#1a1a1a", 2.5, "#1a1a1a"));

  return parts.join("\n");
}

function generateCats(r: () => number): string {
  const parts: string[] = [];

  const bx = rr(r, 350, 680);
  const by = rr(r, 480, 600);
  const scale = rr(r, 0.85, 1.2);
  const pose = ri(r, 0, 3);

  parts.push(`<g transform="translate(${bx},${by}) scale(${scale})">`);

  if (pose === 0) {
    parts.push(ellipse(0, 50, 100, 70));
    parts.push(ellipse(0, -40, 70, 60));

    parts.push(path(`M-55 -80 L${-rr(r, 50, 65)} ${-rr(r, 130, 160)} L${-rr(r, 25, 40)} -65`));
    parts.push(path(`M55 -80 L${rr(r, 50, 65)} ${-rr(r, 130, 160)} L${rr(r, 25, 40)} -65`));

    const eyeX = rr(r, 20, 30);
    parts.push(ellipse(-eyeX, -48, 10, 14));
    parts.push(ellipse(eyeX, -48, 10, 14));
    parts.push(ellipse(-eyeX, -46, 4, 8, "#1a1a1a", 2, "#1a1a1a"));
    parts.push(ellipse(eyeX, -46, 4, 8, "#1a1a1a", 2, "#1a1a1a"));

    parts.push(path(`M0 -25 L0 -15`, "#1a1a1a", 2));
    parts.push(path(`M0 -15 Q${-rr(r, 5, 12)} ${-rr(r, 5, 10)} ${-rr(r, 12, 20)} ${-rr(r, 8, 15)}`));
    parts.push(path(`M0 -15 Q${rr(r, 5, 12)} ${-rr(r, 5, 10)} ${rr(r, 12, 20)} ${-rr(r, 8, 15)}`));

    for (let side = -1; side <= 1; side += 2) {
      for (let w = 0; w < ri(r, 2, 4); w++) {
        const wy = -30 + w * 10;
        const wl = rr(r, 50, 80);
        parts.push(line(side * 25, wy, side * wl, wy + rr(r, -8, 8), "#1a1a1a", 1.5));
      }
    }

    parts.push(ellipse(-50, 120, 25, 15));
    parts.push(ellipse(50, 120, 25, 15));

    const tailCurve = rr(r, 150, 280);
    parts.push(path(`M90 40 Q${tailCurve} ${-rr(r, 20, 80)} ${rr(r, 130, 200)} ${rr(r, 30, 80)}`, "#1a1a1a", 3));

    const stripeCount = ri(r, 3, 7);
    for (let s = 0; s < stripeCount; s++) {
      const sy = -20 + s * 12;
      const sw = rr(r, 20, 50);
      parts.push(path(`M${-sw} ${sy} Q0 ${sy + rr(r, 3, 8)} ${sw} ${sy}`, "#1a1a1a", 1.5));
    }
  } else if (pose === 1) {
    parts.push(ellipse(0, 30, 120, 50));
    parts.push(path(`M-100 20 Q-130 50 -110 80`, "#1a1a1a", 2.5));
    parts.push(path(`M100 20 Q130 50 110 80`, "#1a1a1a", 2.5));
    parts.push(ellipse(-100, 85, 20, 12));
    parts.push(ellipse(100, 85, 20, 12));

    parts.push(path(`M-80 30 Q-120 -20 -90 -60`, "#1a1a1a", 3));
    parts.push(path(`M-90 -60 Q-95 -75 -80 -70`));
    parts.push(circle(-90, -65, 3, "#1a1a1a", 1.5, "#1a1a1a"));

    parts.push(path(`M90 30 Q100 -10 80 -40`, "#1a1a1a", 2.5));
    parts.push(circle(80, -40, 25));
    parts.push(path(`M65 -60 L55 -85 L75 -65`));
    parts.push(path(`M95 -60 L105 -85 L85 -65`));

    const sleepEye = rr(r, 3, 8);
    parts.push(path(`M65 -42 Q72 ${-42 + sleepEye} 80 -42`, "#1a1a1a", 2));
    parts.push(path(`M80 -42 Q87 ${-42 + sleepEye} 95 -42`, "#1a1a1a", 2));

    const curlTail = rr(r, 40, 80);
    parts.push(path(`M-110 70 Q${-130 - curlTail} 30 ${-100 - curlTail * 0.5} 60`, "#1a1a1a", 3));
  } else {
    parts.push(ellipse(0, 0, 60, 160));
    parts.push(ellipse(0, -170, 50, 45));

    parts.push(path(`M-35 -205 L${-rr(r, 30, 45)} ${-rr(r, 250, 280)} L${-rr(r, 10, 25)} -195`));
    parts.push(path(`M35 -205 L${rr(r, 30, 45)} ${-rr(r, 250, 280)} L${rr(r, 10, 25)} -195`));

    parts.push(ellipse(-18, -178, 8, 10));
    parts.push(ellipse(18, -178, 8, 10));
    parts.push(ellipse(-18, -176, 3, 6, "#1a1a1a", 2, "#1a1a1a"));
    parts.push(ellipse(18, -176, 3, 6, "#1a1a1a", 2, "#1a1a1a"));

    parts.push(path(`M0 -155 L0 -148`, "#1a1a1a", 2));

    parts.push(ellipse(-30, 140, 22, 14));
    parts.push(ellipse(30, 140, 22, 14));

    const bushyTail = rr(r, 30, 60);
    parts.push(path(`M0 155 Q${-bushyTail} 180 ${-bushyTail * 1.5} 130`, "#1a1a1a", 4));
    parts.push(path(`M${-bushyTail * 1.5} 130 Q${-bushyTail * 1.8} 110 ${-bushyTail * 1.2} 115`, "#1a1a1a", 3));
  }

  parts.push("</g>");

  const ambientCount = ri(r, 0, 4);
  for (let i = 0; i < ambientCount; i++) {
    const ax = rr(r, 50, 970);
    const ay = rr(r, 50, 970);
    const atype = ri(r, 0, 3);
    if (atype === 0) {
      parts.push(circle(ax, ay, rr(r, 3, 8), "#1a1a1a", 1));
    } else if (atype === 1) {
      parts.push(path(`M${ax - 8} ${ay} L${ax} ${ay - 10} L${ax + 8} ${ay}`, "#1a1a1a", 1));
    } else {
      parts.push(path(`M${ax} ${ay} Q${ax + rr(r, 10, 25)} ${ay - rr(r, 10, 20)} ${ax + rr(r, 20, 40)} ${ay}`, "#1a1a1a", 1));
    }
  }

  return parts.join("\n");
}

function generateCoastal(r: () => number): string {
  const parts: string[] = [];

  const horizonY = rr(r, 300, 400);

  const sunX = rr(r, 200, 820);
  const sunY = rr(r, 80, 200);
  const sunR = rr(r, 40, 80);
  parts.push(circle(sunX, sunY, sunR, "#1a1a1a", 2.5));

  const rayCount = ri(r, 8, 16);
  for (let i = 0; i < rayCount; i++) {
    const angle = (i / rayCount) * Math.PI * 2;
    const rLen = rr(r, 20, 50);
    parts.push(line(sunX + Math.cos(angle) * (sunR + 5), sunY + Math.sin(angle) * (sunR + 5), sunX + Math.cos(angle) * (sunR + rLen), sunY + Math.sin(angle) * (sunR + rLen), "#1a1a1a", 1.5));
  }

  const cloudCount = ri(r, 1, 4);
  for (let i = 0; i < cloudCount; i++) {
    const cx = rr(r, 100, 920);
    const cy = rr(r, 60, 250);
    const puffs = ri(r, 3, 6);
    for (let p = 0; p < puffs; p++) {
      const px = cx + p * rr(r, 25, 45);
      const py = cy + rr(r, -15, 15);
      const pr = rr(r, 20, 45);
      parts.push(circle(px, py, pr, "#1a1a1a", 1.5));
    }
  }

  const lighthouseX = rr(r, 600, 900);
  const lhH = rr(r, 180, 280);
  const lhW = rr(r, 30, 50);
  parts.push(`<rect x="${lighthouseX - lhW}" y="${horizonY - lhH}" width="${lhW * 2}" height="${lhH}" fill="none" stroke="#1a1a1a" stroke-width="2.5"/>`);
  parts.push(path(`M${lighthouseX - lhW - 10} ${horizonY - lhH} L${lighthouseX + lhW + 10} ${horizonY - lhH} L${lighthouseX + lhW * 0.5} ${horizonY - lhH - 30} L${lighthouseX - lhW * 0.5} ${horizonY - lhH - 30} Z`, "#1a1a1a", 2.5));

  const stripeCount = ri(r, 3, 6);
  for (let s = 0; s < stripeCount; s++) {
    const sy = horizonY - lhH + s * (lhH / stripeCount);
    parts.push(line(lighthouseX - lhW, sy, lighthouseX + lhW, sy, "#1a1a1a", 2));
  }

  parts.push(circle(lighthouseX, horizonY - lhH - 15, 10, "#1a1a1a", 2));

  const lightRays = ri(r, 3, 6);
  for (let i = 0; i < lightRays; i++) {
    const angle = -0.8 + (i / lightRays) * 1.6;
    const rLen = rr(r, 80, 200);
    parts.push(line(lighthouseX, horizonY - lhH - 15, lighthouseX + Math.cos(angle) * rLen, horizonY - lhH - 15 + Math.sin(angle) * rLen, "#1a1a1a", 1));
  }

  const waveCount = ri(r, 3, 6);
  for (let w = 0; w < waveCount; w++) {
    const wy = horizonY + 30 + w * rr(r, 40, 80);
    let d = `M0 ${wy}`;
    for (let x = 0; x <= SIZE; x += rr(r, 30, 60)) {
      const amp = rr(r, 10, 25);
      d += ` Q${x + 15} ${wy - amp} ${x + 30} ${wy}`;
    }
    parts.push(path(d, "#1a1a1a", w === 0 ? 2.5 : 1.5));
  }

  const shellCount = ri(r, 2, 6);
  for (let i = 0; i < shellCount; i++) {
    const sx = rr(r, 80, 940);
    const sy = rr(r, horizonY + 100, 950);
    const stype = ri(r, 0, 3);
    if (stype === 0) {
      const sr = rr(r, 12, 25);
      const spiralTurns = rr(r, 2, 4);
      let d = `M${sx} ${sy}`;
      for (let t = 0; t < spiralTurns * 10; t++) {
        const angle = (t / 10) * Math.PI;
        const r2 = (t / (spiralTurns * 10)) * sr;
        d += ` L${sx + Math.cos(angle) * r2} ${sy + Math.sin(angle) * r2}`;
      }
      parts.push(path(d, "#1a1a1a", 1.5));
    } else if (stype === 1) {
      parts.push(path(`M${sx - 15} ${sy + 10} Q${sx} ${sy - 15} ${sx + 15} ${sy + 10}`, "#1a1a1a", 1.5));
      parts.push(line(sx, sy - 10, sx, sy + 10, "#1a1a1a", 1));
    } else {
      parts.push(ellipse(sx, sy, rr(r, 10, 20), rr(r, 6, 12), "#1a1a1a", 1.5, "none", `rotate(${rr(r, -30, 30)} ${sx} ${sy})`));
    }
  }

  const birdCount = ri(r, 2, 8);
  for (let i = 0; i < birdCount; i++) {
    const bx = rr(r, 100, 920);
    const by = rr(r, 40, 180);
    const bs = rr(r, 8, 20);
    parts.push(path(`M${bx - bs} ${by} Q${bx} ${by - bs * 0.8} ${bx + bs} ${by}`, "#1a1a1a", 1.5));
  }

  return parts.join("\n");
}

function generateFlorals(r: () => number): string {
  const parts: string[] = [];

  const bouquetCx = C;
  const bouquetCy = rr(r, 350, 450);

  const stemCount = ri(r, 5, 10);
  const stemEnds: Array<[number, number]> = [];

  for (let i = 0; i < stemCount; i++) {
    const angle = -Math.PI * 0.4 + (i / (stemCount - 1)) * Math.PI * 0.8;
    const stemLen = rr(r, 200, 400);
    const curve = rr(r, -80, 80);
    const endX = bouquetCx + Math.sin(angle) * stemLen * 0.6 + curve;
    const endY = bouquetCy - Math.cos(angle) * stemLen * 0.3 - stemLen * 0.6;
    stemEnds.push([endX, endY]);

    parts.push(path(`M${bouquetCx + i * 3 - stemCount * 1.5} ${bouquetCy + 200} Q${bouquetCx + curve * 0.5} ${(bouquetCy + endY) / 2} ${endX} ${endY}`, "#1a1a1a", 2.5));

    const leafCount = ri(r, 1, 3);
    for (let l = 0; l < leafCount; l++) {
      const t = 0.3 + l * 0.25;
      const lx = bouquetCx + (endX - bouquetCx) * t;
      const ly = bouquetCy + 200 + (endY - bouquetCy - 200) * t;
      const dir = r() > 0.5 ? 1 : -1;
      parts.push(ellipse(lx + dir * 25, ly, 25, 12, "#1a1a1a", 1.5, "none", `rotate(${dir * rr(r, 20, 50)} ${lx + dir * 25} ${ly})`));
    }
  }

  for (const [fx, fy] of stemEnds) {
    const ftype = ri(r, 0, 4);

    if (ftype === 0) {
      const petals = ri(r, 5, 12);
      const petalR = rr(r, 30, 55);
      for (let p = 0; p < petals; p++) {
        const angle = (p / petals) * Math.PI * 2 + rr(r, -0.1, 0.1);
        const px = fx + Math.cos(angle) * petalR * 0.6;
        const py = fy + Math.sin(angle) * petalR * 0.6;
        parts.push(ellipse(px, py, petalR * 0.45, petalR * 0.25, "#1a1a1a", 2, "none", `rotate(${(angle * 180) / Math.PI} ${px} ${py})`));
      }
      parts.push(circle(fx, fy, petalR * 0.2));
    } else if (ftype === 1) {
      const layers = ri(r, 3, 5);
      for (let l = layers; l > 0; l--) {
        const lr = l * rr(r, 10, 18);
        parts.push(circle(fx, fy, lr));
      }
      parts.push(circle(fx, fy, 5, "#1a1a1a", 2, "#1a1a1a"));
    } else if (ftype === 2) {
      const rays = ri(r, 8, 16);
      const outerR = rr(r, 30, 50);
      for (let p = 0; p < rays; p++) {
        const angle = (p / rays) * Math.PI * 2;
        parts.push(line(fx, fy, fx + Math.cos(angle) * outerR, fy + Math.sin(angle) * outerR, "#1a1a1a", 1.5));
      }
      parts.push(circle(fx, fy, outerR * 0.35));
      parts.push(circle(fx, fy, outerR * 0.15, "#1a1a1a", 1.5, "#1a1a1a"));
    } else {
      const budH = rr(r, 25, 45);
      const budW = rr(r, 12, 22);
      parts.push(path(`M${fx} ${fy} Q${fx - budW} ${fy - budH * 0.5} ${fx} ${fy - budH}`, "#1a1a1a", 2));
      parts.push(path(`M${fx} ${fy} Q${fx + budW} ${fy - budH * 0.5} ${fx} ${fy - budH}`, "#1a1a1a", 2));
      parts.push(path(`M${fx} ${fy - budH} Q${fx - budW * 0.5} ${fy - budH - budW * 0.5} ${fx} ${fy - budH - budW}`, "#1a1a1a", 1.5));
      parts.push(path(`M${fx} ${fy - budH} Q${fx + budW * 0.5} ${fy - budH - budW * 0.5} ${fx} ${fy - budH - budW}`, "#1a1a1a", 1.5));
    }
  }

  const ribbonX = bouquetCx;
  const ribbonY = bouquetCy + 150;
  parts.push(path(`M${ribbonX - 60} ${ribbonY} Q${ribbonX - 30} ${ribbonY + 20} ${ribbonX} ${ribbonY} Q${ribbonX + 30} ${ribbonY - 20} ${ribbonX + 60} ${ribbonY}`, "#1a1a1a", 2.5));
  parts.push(path(`M${ribbonX - 50} ${ribbonY + 10} Q${ribbonX - 70} ${ribbonY + 50} ${ribbonX - 40} ${ribbonY + 70}`, "#1a1a1a", 2));
  parts.push(path(`M${ribbonX + 50} ${ribbonY + 10} Q${ribbonX + 70} ${ribbonY + 50} ${ribbonX + 40} ${ribbonY + 70}`, "#1a1a1a", 2));

  return parts.join("\n");
}

const generators: Record<string, (r: () => number) => string> = {
  pitbulls: generatePitbulls,
  gardens: generateGardens,
  birds: generateBirds,
  butterflies: generateButterflies,
  mandalas: generateMandalas,
  cats: generateCats,
  coastal: generateCoastal,
  florals: generateFlorals,
};

function generateIvyBorder(r: () => number): string {
  const parts: string[] = [];

  for (const side of [-1, 1]) {
    const x = side === -1 ? 20 : SIZE - 20;
    const vine = ri(r, 12, 20);
    let d = `M${x} ${SIZE}`;
    for (let i = 0; i < vine; i++) {
      const y = SIZE - (i / vine) * SIZE;
      const cx2 = x + side * rr(r, 15, 35);
      d += ` Q${cx2} ${y + rr(r, 10, 30)} ${x} ${y}`;
    }
    parts.push(path(d, "#1a1a1a", 2.5));

    for (let i = 0; i < vine * 2; i++) {
      const y = SIZE - (i / (vine * 2)) * SIZE;
      const dir = side * (i % 2 === 0 ? 1 : -1);
      const leafSize = rr(r, 18, 35);
      const lx = x + dir * leafSize * 1.5;
      const ly = y + rr(r, -10, 10);

      parts.push(path(`M${x} ${y} Q${x + dir * leafSize} ${y - leafSize * 0.5} ${lx} ${ly}`, "#1a1a1a", 1.5));
      parts.push(path(`M${lx} ${ly} Q${x + dir * leafSize * 0.5} ${ly - leafSize * 0.8} ${x + dir * leafSize * 0.3} ${y - leafSize * 0.3}`, "#1a1a1a", 1));
      parts.push(ellipse(lx, ly, leafSize, leafSize * 0.5, "#1a1a1a", 1.5, "none", `rotate(${dir * rr(r, 20, 50)} ${lx} ${ly})`));
    }
  }

  let topVine = `M0 ${SIZE - 20}`;
  const segments = ri(r, 5, 10);
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * SIZE;
    const y = SIZE - 20 + rr(r, -25, 25);
    topVine += ` L${x} ${y}`;
  }
  parts.push(path(topVine, "#1a1a1a", 2.5));

  for (let i = 0; i < segments * 2; i++) {
    const x = rr(r, 30, SIZE - 30);
    const y = SIZE - 20 + rr(r, -15, 15);
    const dir = r() > 0.5 ? 1 : -1;
    const ls = rr(r, 12, 25);
    parts.push(ellipse(x + dir * ls, y + ls * 0.5, ls, ls * 0.5, "#1a1a1a", 1.5, "none", `rotate(${dir * rr(r, 30, 60)} ${x + dir * ls} ${y + ls * 0.5})`));
  }

  for (let i = 0; i < ri(r, 3, 8); i++) {
    const bx = rr(r, 100, 920);
    const by = rr(r, 80, SIZE - 80);
    const bs = rr(r, 10, 22);
    parts.push(`<g transform="translate(${bx},${by}) scale(${bs / 20}) rotate(${rr(r, -30, 30)})">`);
    parts.push(ellipse(-8, 0, 8, 6));
    parts.push(ellipse(8, 0, 8, 6));
    parts.push(line(0, -4, 0, 4, "#1a1a1a", 1));
    parts.push(path(`M-2 -5 Q-5 -10 -3 -12`, "#1a1a1a", 1));
    parts.push(path(`M2 -5 Q5 -10 3 -12`, "#1a1a1a", 1));
    parts.push("</g>");
  }

  return parts.join("\n");
}

export function generateColoringPage(categoryId: string, addIvy: boolean, seed: number): string {
  const r = rng(seed);
  const gen = generators[categoryId] || generators.mandalas;

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">`;
  svg += `<rect width="${SIZE}" height="${SIZE}" fill="white"/>`;
  svg += gen(r);

  if (addIvy) {
    svg += generateIvyBorder(r);
  }

  svg += `</svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
