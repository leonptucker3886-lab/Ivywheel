const SIZE = 1024;
const C = SIZE / 2;

function rng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff;
    return (s >>> 0) / 0xffffffff;
  };
}

function hashText(text: string): number {
  let h = 0;
  for (let i = 0; i < text.length; i++) {
    h = ((h << 5) - h + text.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

function rr(r: () => number, min: number, max: number) {
  return min + r() * (max - min);
}

function ri(r: () => number, min: number, max: number) {
  return Math.floor(rr(r, min, max));
}

function path(d: string, stroke = "#1a1a1a", sw = 2.5, fill = "none") {
  return `<path d="${d}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function ellipse(cx: number, cy: number, rx: number, ry: number, stroke = "#1a1a1a", sw = 2.5, fill = "none", transform = "") {
  const t = transform ? ` transform="${transform}"` : "";
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"${t}/>`;
}

function circle(cx: number, cy: number, r: number, stroke = "#1a1a1a", sw = 2, fill = "none") {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="${sw}"/>`;
}

function line(x1: number, y1: number, x2: number, y2: number, stroke = "#1a1a1a", sw = 2) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${stroke}" stroke-width="${sw}" stroke-linecap="round"/>`;
}

function dot(cx: number, cy: number, r = 1.5) {
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#1a1a1a"/>`;
}

function dotRow(x1: number, y1: number, x2: number, y2: number, count: number, dotR = 1.2) {
  const parts: string[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    parts.push(dot(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t, dotR));
  }
  return parts.join("");
}

function dotArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number, count: number, dotR = 1.2) {
  const parts: string[] = [];
  for (let i = 0; i < count; i++) {
    const t = i / (count - 1);
    const a = startAngle + (endAngle - startAngle) * t;
    parts.push(dot(cx + Math.cos(a) * r, cy + Math.sin(a) * r, dotR));
  }
  return parts.join("");
}

function crossHatch(cx: number, cy: number, w: number, h: number, spacing: number, angle = 0, sw = 0.8) {
  const parts: string[] = [];
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  for (let i = -w; i <= w; i += spacing) {
    const x1 = cx + i * cos - h * sin;
    const y1 = cy + i * sin + h * cos;
    const x2 = cx + i * cos + h * sin;
    const y2 = cy + i * sin - h * cos;
    parts.push(line(x1, y1, x2, y2, "#1a1a1a", sw));
  }
  return parts.join("");
}

function filigreeScroll(cx: number, cy: number, size: number, angle: number, r: () => number) {
  const parts: string[] = [];
  const dir = r() > 0.5 ? 1 : -1;
  const s = size;
  parts.push(`<g transform="translate(${cx},${cy}) rotate(${angle})">`);
  parts.push(path(`M0 0 Q${s * 0.3} ${-s * 0.4 * dir} ${s * 0.6} ${-s * 0.2 * dir} Q${s * 0.9} ${s * 0.1 * dir} ${s * 0.7} ${s * 0.4 * dir} Q${s * 0.5} ${s * 0.6 * dir} ${s * 0.2} ${s * 0.5 * dir}`, "#1a1a1a", 1.5));
  parts.push(path(`M${s * 0.2} ${s * 0.5 * dir} Q${s * 0.05} ${s * 0.35 * dir} ${s * 0.15} ${s * 0.15 * dir}`, "#1a1a1a", 1));
  const dotCount = ri(r, 3, 6);
  for (let i = 0; i < dotCount; i++) {
    const t = i / dotCount;
    parts.push(dot(s * 0.3 * t, -s * 0.2 * dir * t, 1 + r()));
  }
  parts.push("</g>");
  return parts.join("");
}

function ornamentalRing(cx: number, cy: number, r1: number, r2: number, segments: number, rnd: () => number) {
  const parts: string[] = [];
  parts.push(circle(cx, cy, r1, "#1a1a1a", 1.5));
  parts.push(circle(cx, cy, r2, "#1a1a1a", 1.5));
  for (let i = 0; i < segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    const na = ((i + 0.5) / segments) * Math.PI * 2;
    parts.push(line(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1, cx + Math.cos(a) * r2, cy + Math.sin(a) * r2, "#1a1a1a", 1));
    const pr = (r1 + r2) / 2;
    const ps = (r2 - r1) * 0.25;
    parts.push(ellipse(cx + Math.cos(na) * pr, cy + Math.sin(na) * pr, ps, ps * 0.5, "#1a1a1a", 1, "none", `rotate(${(na * 180) / Math.PI} ${cx + Math.cos(na) * pr} ${cy + Math.sin(na) * pr})`));
  }
  return parts.join("");
}

function featherDetail(cx: number, cy: number, length: number, angle: number, r: () => number) {
  const parts: string[] = [];
  parts.push(`<g transform="translate(${cx},${cy}) rotate(${angle})">`);
  parts.push(path(`M0 0 Q${length * 0.1} ${-length * 0.02} ${length} 0`, "#1a1a1a", 2));
  const barbs = ri(r, 8, 16);
  for (let i = 1; i < barbs; i++) {
    const t = i / barbs;
    const x = length * t;
    const barbLen = length * 0.2 * (1 - t * 0.5);
    parts.push(path(`M${x} 0 Q${x + barbLen * 0.3} ${-barbLen} ${x + barbLen * 0.5} ${-barbLen * 0.8}`, "#1a1a1a", 0.8));
    parts.push(path(`M${x} 0 Q${x + barbLen * 0.3} ${barbLen} ${x + barbLen * 0.5} ${barbLen * 0.8}`, "#1a1a1a", 0.8));
    const d = ri(r, 2, 5);
    parts.push(dotRow(x, 0, x + barbLen * 0.4, -barbLen * 0.6, d, 0.8));
    parts.push(dotRow(x, 0, x + barbLen * 0.4, barbLen * 0.6, d, 0.8));
  }
  parts.push("</g>");
  return parts.join("");
}

function furTexture(cx: number, cy: number, w: number, h: number, density: number, r: () => number) {
  const parts: string[] = [];
  for (let i = 0; i < density; i++) {
    const x = cx + rr(r, -w / 2, w / 2);
    const y = cy + rr(r, -h / 2, h / 2);
    const len = rr(r, 5, 15);
    const angle = rr(r, -0.5, 0.5);
    parts.push(path(`M${x} ${y} Q${x + Math.cos(angle) * len * 0.5} ${y + Math.sin(angle) * len * 0.5 - 2} ${x + Math.cos(angle) * len} ${y + Math.sin(angle) * len}`, "#1a1a1a", 0.7));
  }
  return parts.join("");
}

function petalDetailed(cx: number, cy: number, size: number, angle: number, r: () => number) {
  const parts: string[] = [];
  const a = (angle * Math.PI) / 180;
  const px = cx + Math.cos(a) * size * 0.5;
  const py = cy + Math.sin(a) * size * 0.5;
  const perp = a + Math.PI / 2;
  const w = size * 0.3;
  parts.push(path(`M${cx} ${cy} Q${px + Math.cos(perp) * w} ${py + Math.sin(perp) * w} ${cx + Math.cos(a) * size} ${cy + Math.sin(a) * size} Q${px - Math.cos(perp) * w} ${py - Math.sin(perp) * w} ${cx} ${cy}`, "#1a1a1a", 1.5));
  parts.push(path(`M${cx} ${cy} L${cx + Math.cos(a) * size * 0.85} ${cy + Math.sin(a) * size * 0.85}`, "#1a1a1a", 0.8));
  const veinCount = ri(r, 2, 5);
  for (let v = 0; v < veinCount; v++) {
    const t = 0.2 + v * 0.2;
    const vx = cx + Math.cos(a) * size * t;
    const vy = cy + Math.sin(a) * size * t;
    const vl = size * 0.15 * (1 - t);
    parts.push(path(`M${vx} ${vy} Q${vx + Math.cos(perp) * vl} ${vy + Math.sin(perp) * vl} ${vx + Math.cos(a + 0.3) * vl} ${vy + Math.sin(a + 0.3) * vl}`, "#1a1a1a", 0.6));
    parts.push(path(`M${vx} ${vy} Q${vx - Math.cos(perp) * vl} ${vy - Math.sin(perp) * vl} ${vx + Math.cos(a - 0.3) * vl} ${vy + Math.sin(a - 0.3) * vl}`, "#1a1a1a", 0.6));
  }
  return parts.join("");
}

function eyeDetailed(cx: number, cy: number, size: number, r: () => number) {
  const parts: string[] = [];
  parts.push(ellipse(cx, cy, size, size * 1.2));
  parts.push(circle(cx, cy, size * 0.55, "#1a1a1a", 2, "#1a1a1a"));
  parts.push(circle(cx - size * 0.15, cy - size * 0.15, size * 0.15, "#1a1a1a", 1, "white"));
  parts.push(ellipse(cx, cy, size * 0.85, size * 1.05, "#1a1a1a", 0.5));
  const lashCount = ri(r, 5, 9);
  for (let i = 0; i < lashCount; i++) {
    const a = -Math.PI * 0.7 + (i / (lashCount - 1)) * Math.PI * 1.4;
    const l = size * rr(r, 0.3, 0.6);
    parts.push(path(`M${cx + Math.cos(a) * size} ${cy + Math.sin(a) * size * 1.2} Q${cx + Math.cos(a) * (size + l * 0.5)} ${cy + Math.sin(a) * (size * 1.2 + l * 0.3)} ${cx + Math.cos(a) * (size + l)} ${cy + Math.sin(a) * (size * 1.2 + l * 0.5)}`, "#1a1a1a", 0.8));
  }
  return parts.join("");
}

function noseDetailed(cx: number, cy: number, size: number, r: () => number) {
  const parts: string[] = [];
  parts.push(path(`M${cx} ${cy - size * 0.3} Q${cx - size * 0.6} ${cy} ${cx - size * 0.4} ${cy + size * 0.4} Q${cx} ${cy + size * 0.6} ${cx + size * 0.4} ${cy + size * 0.4} Q${cx + size * 0.6} ${cy} ${cx} ${cy - size * 0.3}`, "#1a1a1a", 2));
  parts.push(path(`M${cx} ${cy - size * 0.1} L${cx} ${cy + size * 0.3}`, "#1a1a1a", 1));
  parts.push(path(`M${cx - size * 0.15} ${cy + size * 0.3} Q${cx} ${cy + size * 0.5} ${cx + size * 0.15} ${cy + size * 0.3}`, "#1a1a1a", 1));
  parts.push(dotArc(cx, cy + size * 0.1, size * 0.25, -Math.PI * 0.8, -Math.PI * 0.2, ri(r, 4, 8), 0.8));
  return parts.join("");
}

function generatePitbulls(r: () => number): string {
  const parts: string[] = [];
  const bx = rr(r, 380, 650);
  const by = rr(r, 500, 580);
  const scale = rr(r, 0.95, 1.3);
  const headTilt = rr(r, -10, 10);

  parts.push(`<g transform="translate(${bx},${by}) scale(${scale})">`);

  parts.push(ellipse(0, 60, 140, 120));
  parts.push(ellipse(0, 60, 135, 115, "#1a1a1a", 0.8));
  parts.push(furTexture(0, 60, 250, 200, 60, r));

  parts.push(ellipse(0, -60, 110, 90));
  parts.push(ellipse(0, -60, 105, 85, "#1a1a1a", 0.8));

  parts.push(`<g transform="rotate(${headTilt} 0 -60)">`);

  const earSpread = rr(r, 60, 80);
  for (const side of [-1, 1]) {
    const ex = side * earSpread;
    parts.push(ellipse(ex, -105, 38, 55, "#1a1a1a", 2.5, "none", `rotate(${side * (15 + rr(r, 0, 10))} ${ex} -105)`));
    parts.push(ellipse(ex, -105, 28, 42, "#1a1a1a", 1, "none", `rotate(${side * (15 + rr(r, 0, 10))} ${ex} -105)`));
    parts.push(crossHatch(ex, -105, 15, 25, 5, side * 0.3, 0.5));
  }

  const eyeSpacing = rr(r, 30, 42);
  for (const side of [-1, 1]) {
    parts.push(eyeDetailed(side * eyeSpacing, -72, 14, r));
  }

  const noseW = rr(r, 22, 32);
  parts.push(noseDetailed(0, -30, noseW, r));

  parts.push(path(`M0 ${-30 + noseW * 0.5} Q0 -5 ${-10 - rr(r, 0, 8)} ${rr(r, 2, 10)}`, "#1a1a1a", 2));
  parts.push(path(`M0 ${-30 + noseW * 0.5} Q0 -5 ${10 + rr(r, 0, 8)} ${rr(r, 2, 10)}`, "#1a1a1a", 2));

  const mouthW = rr(r, 35, 55);
  parts.push(path(`M${-mouthW} ${rr(r, 8, 18)} Q0 ${rr(r, 25, 40)} ${mouthW} ${rr(r, 8, 18)}`, "#1a1a1a", 2.5));
  parts.push(path(`M${-mouthW * 0.8} ${rr(r, 10, 20)} Q0 ${rr(r, 30, 45)} ${mouthW * 0.8} ${rr(r, 10, 20)}`, "#1a1a1a", 1));

  const lipLines = ri(r, 3, 7);
  for (let i = 0; i < lipLines; i++) {
    const lx = -mouthW + (i / lipLines) * mouthW * 2;
    parts.push(line(lx, rr(r, 5, 12), lx + rr(r, -3, 3), rr(r, 15, 25), "#1a1a1a", 0.5));
  }

  for (let i = 0; i < ri(r, 4, 8); i++) {
    const wy = -50 + i * 8;
    const ww = rr(r, 20, 40);
    parts.push(path(`M${-ww} ${wy} Q0 ${wy + rr(r, 4, 10)} ${ww} ${wy}`, "#1a1a1a", 1.2));
  }

  parts.push(furTexture(0, -60, 180, 140, 40, r));

  parts.push("</g>");

  for (const side of [-1, 1]) {
    const lx = side * rr(r, 65, 95);
    parts.push(ellipse(lx, 150, 32, 65));
    parts.push(ellipse(lx, 150, 28, 58, "#1a1a1a", 1));
    parts.push(furTexture(lx, 140, 50, 100, 15, r));
    parts.push(ellipse(lx, 220, rr(r, 32, 45), 20));
    for (let t = 0; t < 4; t++) {
      const tx = lx - 15 + t * 10;
      parts.push(ellipse(tx, 215, 4, 8, "#1a1a1a", 1));
    }
  }

  parts.push(path(`M130 20 Q${rr(r, 220, 320)} ${-rr(r, 60, 140)} ${rr(r, 200, 280)} ${rr(r, 30, 90)}`, "#1a1a1a", 3.5));
  parts.push(path(`M130 20 Q${rr(r, 220, 320)} ${-rr(r, 50, 120)} ${rr(r, 200, 280)} ${rr(r, 30, 90)}`, "#1a1a1a", 1.5));

  const collarY = rr(r, 90, 120);
  parts.push(path(`M-80 ${collarY} Q0 ${collarY + 15} 80 ${collarY}`, "#1a1a1a", 3));
  parts.push(path(`M-75 ${collarY + 3} Q0 ${collarY + 18} 75 ${collarY + 3}`, "#1a1a1a", 1.5));
  const tagX = rr(r, -10, 10);
  parts.push(circle(tagX, collarY + 20, 8));
  parts.push(dot(tagX, collarY + 20, 2));

  parts.push("</g>");
  return parts.join("\n");
}

function generateGardens(r: () => number): string {
  const parts: string[] = [];

  const groundY = rr(r, 920, 960);
  parts.push(path(`M0 ${groundY} Q${rr(r, 100, 200)} ${groundY - 20} ${rr(r, 300, 400)} ${groundY} Q${rr(r, 500, 600)} ${groundY + 15} ${rr(r, 700, 800)} ${groundY} Q${rr(r, 900, 950)} ${groundY - 10} 1024 ${groundY}`, "#1a1a1a", 2.5));

  for (let i = 0; i < ri(r, 3, 6); i++) {
    const gx = rr(r, 50, 970);
    const gy = groundY + rr(r, -5, 10);
    const blades = ri(r, 4, 8);
    for (let b = 0; b < blades; b++) {
      const bh = rr(r, 25, 60);
      const bend = rr(r, -20, 20);
      const bx = gx + b * 4;
      parts.push(path(`M${bx} ${gy} Q${bx + bend * 0.5} ${gy - bh * 0.6} ${bx + bend} ${gy - bh}`, "#1a1a1a", 1.2));
      if (r() > 0.5) parts.push(path(`M${bx + bend * 0.5} ${gy - bh * 0.4} Q${bx + bend * 0.5 + 5} ${gy - bh * 0.5} ${bx + bend * 0.5 + 8} ${gy - bh * 0.35}`, "#1a1a1a", 0.7));
    }
  }

  const stemCount = ri(r, 5, 10);
  const flowerPositions: Array<[number, number]> = [];

  for (let i = 0; i < stemCount; i++) {
    const sx = rr(r, 100, 920);
    const stemH = rr(r, 250, 550);
    const curve = rr(r, -80, 80);
    const fx = sx + curve * 0.6;
    const fy = groundY - stemH;
    flowerPositions.push([fx, fy]);

    parts.push(path(`M${sx} ${groundY} Q${sx + curve * 0.3} ${groundY - stemH * 0.5} ${fx} ${fy}`, "#1a1a1a", 2.5));
    parts.push(path(`M${sx + 2} ${groundY} Q${sx + curve * 0.3 + 2} ${groundY - stemH * 0.5} ${fx + 2} ${fy}`, "#1a1a1a", 0.8));

    const leafCount = ri(r, 2, 5);
    for (let j = 0; j < leafCount; j++) {
      const t = 0.2 + j * 0.2;
      const lx = sx + curve * 0.3 * t * 2;
      const ly = groundY - stemH * t;
      const dir = j % 2 === 0 ? 1 : -1;
      const ls = rr(r, 25, 55);
      parts.push(petalDetailed(lx, ly, ls, dir * rr(r, 20, 60) + 90, r));
    }

    const flowerType = ri(r, 0, 5);
    if (flowerType === 0) {
      const petals = ri(r, 7, 14);
      const petalR = rr(r, 35, 70);
      parts.push(circle(fx, fy, petalR * 0.25));
      parts.push(circle(fx, fy, petalR * 0.15, "#1a1a1a", 1));
      for (let p = 0; p < petals; p++) {
        parts.push(petalDetailed(fx, fy, petalR, (p / petals) * 360 + rr(r, -5, 5), r));
      }
      parts.push(dotArc(fx, fy, petalR * 0.2, 0, Math.PI * 2, ri(r, 6, 12), 1));
    } else if (flowerType === 1) {
      const layers = ri(r, 4, 7);
      for (let l = layers; l > 0; l--) {
        const lr = l * rr(r, 10, 20);
        parts.push(circle(fx, fy, lr));
        if (l > 1) parts.push(circle(fx, fy, lr - 3, "#1a1a1a", 0.5));
      }
      parts.push(dot(fx, fy, 4));
      parts.push(dotArc(fx, fy, layers * 8, 0, Math.PI * 2, ri(r, 8, 16), 1));
    } else if (flowerType === 2) {
      const rays = ri(r, 10, 18);
      const outerR = rr(r, 35, 60);
      for (let p = 0; p < rays; p++) {
        const a = (p / rays) * Math.PI * 2;
        parts.push(line(fx, fy, fx + Math.cos(a) * outerR, fy + Math.sin(a) * outerR, "#1a1a1a", 1.5));
        const mid = outerR * 0.6;
        parts.push(ellipse(fx + Math.cos(a) * mid, fy + Math.sin(a) * mid, 6, 3, "#1a1a1a", 0.8, "none", `rotate(${(a * 180) / Math.PI} ${fx + Math.cos(a) * mid} ${fy + Math.sin(a) * mid})`));
      }
      parts.push(circle(fx, fy, outerR * 0.35));
      parts.push(circle(fx, fy, outerR * 0.2, "#1a1a1a", 1));
      parts.push(dotArc(fx, fy, outerR * 0.28, 0, Math.PI * 2, ri(r, 5, 10), 1.2));
    } else if (flowerType === 3) {
      const budH = rr(r, 30, 55);
      const budW = rr(r, 15, 28);
      parts.push(path(`M${fx} ${fy} Q${fx - budW} ${fy - budH * 0.4} ${fx - budW * 0.3} ${fy - budH}`, "#1a1a1a", 2));
      parts.push(path(`M${fx} ${fy} Q${fx + budW} ${fy - budH * 0.4} ${fx + budW * 0.3} ${fy - budH}`, "#1a1a1a", 2));
      parts.push(path(`M${fx - budW * 0.3} ${fy - budH} Q${fx} ${fy - budH - budW * 0.5} ${fx + budW * 0.3} ${fy - budH}`, "#1a1a1a", 1.5));
      parts.push(path(`M${fx} ${fy - budH * 0.5} L${fx} ${fy - budH}`, "#1a1a1a", 0.8));
      parts.push(crossHatch(fx, fy - budH * 0.6, budW * 0.4, budH * 0.2, 4, 0, 0.4));
    } else {
      const dahliaR = rr(r, 25, 45);
      const rings = ri(r, 3, 5);
      for (let ring = rings; ring > 0; ring--) {
        const rr2 = (ring / rings) * dahliaR;
        const pCount = ri(r, 6, 12);
        for (let p = 0; p < pCount; p++) {
          const a = (p / pCount) * Math.PI * 2 + ring * 0.3;
          const px = fx + Math.cos(a) * rr2;
          const py = fy + Math.sin(a) * rr2;
          parts.push(dot(px, py, 1.5 + (rings - ring) * 0.3));
        }
      }
      parts.push(circle(fx, fy, dahliaR, "#1a1a1a", 1.5));
    }
  }

  const butterflyCount = ri(r, 1, 4);
  for (let i = 0; i < butterflyCount; i++) {
    const bx = rr(r, 100, 920);
    const by = rr(r, 80, 400);
    parts.push(generateButterflySmall(bx, by, rr(r, 0.4, 0.8), rr(r, -30, 30), r));
  }

  return parts.join("\n");
}

function generateButterflySmall(cx: number, cy: number, scale: number, rot: number, r: () => number): string {
  const parts: string[] = [];
  parts.push(`<g transform="translate(${cx},${cy}) scale(${scale}) rotate(${rot})">`);
  parts.push(ellipse(0, 0, 4, 30, "#1a1a1a", 2));
  for (const side of [-1, 1]) {
    parts.push(ellipse(side * 30, -10, 30, 22));
    parts.push(ellipse(side * 30, -10, 20, 15, "#1a1a1a", 1));
    parts.push(ellipse(side * 25, 15, 20, 15));
    parts.push(ellipse(side * 25, 15, 12, 10, "#1a1a1a", 1));
    parts.push(dotArc(side * 30, -10, 12, 0, Math.PI * 2, ri(r, 4, 8), 1));
  }
  parts.push(path(`M-3 -32 Q-12 -50 -8 -55`, "#1a1a1a", 1.5));
  parts.push(path(`M3 -32 Q12 -50 8 -55`, "#1a1a1a", 1.5));
  parts.push(dot(-8, -55, 2));
  parts.push(dot(8, -55, 2));
  parts.push("</g>");
  return parts.join("\n");
}

function generateBirds(r: () => number): string {
  const parts: string[] = [];

  const branchCount = ri(r, 2, 5);
  for (let i = 0; i < branchCount; i++) {
    const by = rr(r, 480, 780);
    const bstart = rr(r, -80, 150);
    const bend = rr(r, 850, 1120);
    const sag = rr(r, 20, 80);
    parts.push(path(`M${bstart} ${by} Q${(bstart + bend) / 2} ${by + sag} ${bend} ${by + sag * 0.5}`, "#1a1a1a", 3.5));
    parts.push(path(`M${bstart} ${by + 3} Q${(bstart + bend) / 2} ${by + sag + 3} ${bend} ${by + sag * 0.5 + 3}`, "#1a1a1a", 1));

    const barkLines = ri(r, 3, 8);
    for (let b = 0; b < barkLines; b++) {
      const t = rr(r, 0.1, 0.9);
      const bx = bstart + (bend - bstart) * t;
      const bby = by + sag * (4 * t * (1 - t));
      parts.push(line(bx, bby - 3, bx + rr(r, -5, 5), bby + 3, "#1a1a1a", 0.6));
    }

    const subCount = ri(r, 1, 5);
    for (let s = 0; s < subCount; s++) {
      const sx = rr(r, bstart + 80, bend - 80);
      const sEnd = sx + rr(r, 80, 220) * (r() > 0.5 ? 1 : -1);
      const sY = by + sag * ((sx - bstart) / (bend - bstart));
      parts.push(path(`M${sx} ${sY} Q${(sx + sEnd) / 2} ${sY - rr(r, 30, 90)} ${sEnd} ${sY - rr(r, 10, 50)}`, "#1a1a1a", 2));

      const leafCount = ri(r, 2, 6);
      for (let l = 0; l < leafCount; l++) {
        const lx = sx + (sEnd - sx) * ((l + 1) / (leafCount + 1));
        const ly = sY - rr(r, 10, 60);
        const dir = r() > 0.5 ? 1 : -1;
        parts.push(petalDetailed(lx, ly, rr(r, 20, 40), dir * rr(r, 30, 80), r));
      }
    }
  }

  const birdCount = ri(r, 1, 3);
  for (let i = 0; i < birdCount; i++) {
    const bx = rr(r, 200, 820);
    const by = rr(r, 180, 450);
    const bs = rr(r, 1, 1.5);
    const facing = r() > 0.5 ? 1 : -1;

    parts.push(`<g transform="translate(${bx},${by}) scale(${bs * facing},${bs})">`);
    parts.push(ellipse(0, 50, 70, 60));
    parts.push(ellipse(0, 50, 65, 55, "#1a1a1a", 0.8));
    parts.push(furTexture(0, 50, 120, 100, 30, r));

    parts.push(circle(0, -20, 42));
    parts.push(circle(0, -20, 38, "#1a1a1a", 0.8));

    for (const side of [-1, 1]) {
      parts.push(eyeDetailed(side * rr(r, 14, 22), -30, 8, r));
    }

    parts.push(path(`M0 -8 L${-10} 8 L0 15 L${10} 8 Z`, "#1a1a1a", 2.5));
    parts.push(line(0, -8, 0, 15, "#1a1a1a", 0.8));

    const wingSpan = rr(r, 70, 100);
    for (const side of [-1, 1]) {
      parts.push(path(`M${side * 60} 40 Q${side * (wingSpan + 30)} ${-rr(r, 30, 70)} ${side * (wingSpan + rr(r, 30, 60))} ${rr(r, 0, 40)}`, "#1a1a1a", 2.5));
      parts.push(path(`M${side * 60} 40 Q${side * (wingSpan + 25)} ${-rr(r, 25, 60)} ${side * (wingSpan + rr(r, 25, 55))} ${rr(r, 5, 35)}`, "#1a1a1a", 1));
      const featherCount = ri(r, 4, 8);
      for (let f = 1; f < featherCount; f++) {
        const ft = f / featherCount;
        const fx = side * (60 + (wingSpan - 30) * ft);
        const fy = 40 - (40 + rr(r, 10, 40)) * ft;
        parts.push(featherDetail(fx, fy, rr(r, 20, 40), side * rr(r, 20, 50), r));
      }
    }

    const tailLen = rr(r, 50, 80);
    for (const side of [-1, 1]) {
      parts.push(featherDetail(side * 5, 100, tailLen, side * rr(r, 10, 30) + 90, r));
    }

    for (const side of [-1, 1]) {
      parts.push(line(side * 18, 105, side * 22, 165, "#1a1a1a", 2.5));
      parts.push(line(side * 18, 105, side * 20, 165, "#1a1a1a", 0.8));
      parts.push(path(`M${side * 35} 165 L${side * 12} 165 L${side * 22} 155 Z`, "#1a1a1a", 2));
      parts.push(path(`M${side * 30} 162 L${side * 15} 162`, "#1a1a1a", 0.8));
    }

    const crestH = rr(r, 20, 45);
    parts.push(path(`M0 -62 Q${-rr(r, 8, 20)} ${-62 - crestH} ${rr(r, 5, 15)} ${-62 - crestH * 0.7}`, "#1a1a1a", 2));
    parts.push(path(`M0 -62 Q${-rr(r, 5, 15)} ${-62 - crestH * 0.8} ${rr(r, 8, 18)} ${-62 - crestH * 0.5}`, "#1a1a1a", 1));

    parts.push("</g>");
  }

  return parts.join("\n");
}

function generateButterflies(r: () => number): string {
  const parts: string[] = [];

  const count = ri(r, 1, 3);
  for (let i = 0; i < count; i++) {
    const bx = rr(r, 250, 770);
    const by = rr(r, 200, 600);
    const bs = rr(r, 1, 1.6);
    const rot = rr(r, -25, 25);

    parts.push(`<g transform="translate(${bx},${by}) scale(${bs}) rotate(${rot})">`);

    const bodyW = rr(r, 12, 20);
    parts.push(ellipse(0, 0, bodyW, 110, "#1a1a1a", 3));
    parts.push(ellipse(0, 0, bodyW - 4, 105, "#1a1a1a", 0.8));
    for (let s = -4; s <= 4; s++) {
      parts.push(line(-bodyW + 2, s * 20, bodyW - 2, s * 20, "#1a1a1a", 0.5));
    }

    parts.push(circle(0, -120, bodyW * 1.2, "#1a1a1a", 2.5));
    parts.push(circle(0, -120, bodyW * 0.8, "#1a1a1a", 0.8));

    const antLen = rr(r, 60, 90);
    for (const side of [-1, 1]) {
      const acx = side * (bodyW * 0.3 + rr(r, 15, 30));
      parts.push(path(`M${side * bodyW * 0.3} -125 Q${acx} ${-125 - antLen * 0.6} ${acx + side * 10} ${-125 - antLen}`, "#1a1a1a", 2));
      parts.push(path(`M${side * bodyW * 0.3} -125 Q${acx - side * 5} ${-125 - antLen * 0.5} ${acx + side * 5} ${-125 - antLen}`, "#1a1a1a", 0.8));
      parts.push(circle(acx + side * 10, -125 - antLen, 5, "#1a1a1a", 1.5));
      parts.push(dot(acx + side * 10, -125 - antLen, 2));
    }

    for (const side of [-1, 1]) {
      const upperW = rr(r, 130, 200);
      const upperH = rr(r, 100, 160);
      const ux = side * upperW * 0.5;
      const uy = -upperH * 0.3;

      parts.push(ellipse(ux, uy, upperW, upperH));
      parts.push(ellipse(ux, uy, upperW * 0.85, upperH * 0.85, "#1a1a1a", 0.8));

      const rings = ri(r, 3, 6);
      for (let ring = 0; ring < rings; ring++) {
        const ratio = 0.2 + ring * 0.13;
        parts.push(ellipse(ux, uy, upperW * ratio, upperH * ratio, "#1a1a1a", ring === 0 ? 1.5 : 0.8));
      }

      const spots = ri(r, 3, 8);
      for (let s = 0; s < spots; s++) {
        const sa = rr(r, 0, Math.PI * 2);
        const sr = rr(r, 0.2, 0.7);
        const spotX = ux + Math.cos(sa) * upperW * sr * 0.5;
        const spotY = uy + Math.sin(sa) * upperH * sr * 0.5;
        const spotR = rr(r, 4, 15);
        parts.push(circle(spotX, spotY, spotR, "#1a1a1a", 1));
        parts.push(dotArc(spotX, spotY, spotR * 0.6, 0, Math.PI * 2, ri(r, 3, 7), 0.8));
      }

      parts.push(dotArc(ux, uy, upperW * 0.4, 0, Math.PI * 2, ri(r, 8, 16), 1));

      const lowerW = rr(r, 75, 120);
      const lowerH = rr(r, 65, 100);
      const ly2 = upperH * 0.4;
      parts.push(ellipse(side * lowerW * 0.45, ly2, lowerW, lowerH));
      parts.push(ellipse(side * lowerW * 0.45, ly2, lowerW * 0.85, lowerH * 0.85, "#1a1a1a", 0.8));
      parts.push(ellipse(side * lowerW * 0.45, ly2, lowerW * 0.5, lowerH * 0.5, "#1a1a1a", 1));
      parts.push(ellipse(side * lowerW * 0.45, ly2, lowerW * 0.25, lowerH * 0.25, "#1a1a1a", 0.8));

      const tails = ri(r, 1, 3);
      for (let t = 0; t < tails; t++) {
        const ta = rr(r, Math.PI * 0.3, Math.PI * 0.7);
        const tLen = rr(r, 20, 45);
        parts.push(path(`M${side * lowerW * 0.45 + Math.cos(ta) * lowerW * 0.4} ${ly2 + Math.sin(ta) * lowerH * 0.4} Q${side * lowerW * 0.45 + Math.cos(ta) * (lowerW * 0.4 + tLen * 0.5)} ${ly2 + Math.sin(ta) * (lowerH * 0.4 + tLen * 0.3)} ${side * lowerW * 0.45 + Math.cos(ta) * (lowerW * 0.4 + tLen)} ${ly2 + Math.sin(ta) * (lowerH * 0.4 + tLen * 0.5)}`, "#1a1a1a", 1.5));
      }
    }

    parts.push("</g>");
  }

  const flowerCount = ri(r, 2, 5);
  for (let i = 0; i < flowerCount; i++) {
    const fx = rr(r, 80, 940);
    const fy = rr(r, 780, 950);
    const stemH = rr(r, 50, 120);
    parts.push(path(`M${fx} ${fy} Q${fx + rr(r, -15, 15)} ${fy - stemH / 2} ${fx + rr(r, -8, 8)} ${fy - stemH}`));
    const petals = ri(r, 4, 8);
    const pr = rr(r, 10, 20);
    for (let p = 0; p < petals; p++) {
      parts.push(petalDetailed(fx, fy - stemH, pr, (p / petals) * 360, r));
    }
    parts.push(dot(fx, fy - stemH, 3));
  }

  return parts.join("\n");
}

function generateMandalas(r: () => number): string {
  const parts: string[] = [];
  const cx = C;
  const cy = C;
  const maxR = rr(r, 400, 480);

  const layers = ri(r, 7, 12);
  for (let l = 0; l < layers; l++) {
    const lr = ((l + 1) / layers) * maxR;
    parts.push(circle(cx, cy, lr, "#1a1a1a", l === layers - 1 ? 3 : l === 0 ? 2 : 1.2));
    if (l > 0 && l < layers - 1) {
      parts.push(circle(cx, cy, lr - 2, "#1a1a1a", 0.5));
    }
  }

  const sym = ri(r, 8, 24);
  for (let s = 0; s < sym; s++) {
    const angle = (s / sym) * Math.PI * 2;
    parts.push(line(cx + Math.cos(angle) * maxR * 0.1, cy + Math.sin(angle) * maxR * 0.1, cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR, "#1a1a1a", 0.8));
  }

  for (let l = 0; l < layers - 1; l++) {
    const lr = ((l + 1) / layers) * maxR;
    const nextR = ((l + 2) / layers) * maxR;
    const midR = (lr + nextR) / 2;
    const elemCount = ri(r, sym, sym * 2);

    for (let e = 0; e < elemCount; e++) {
      const angle = (e / elemCount) * Math.PI * 2;
      const ex = cx + Math.cos(angle) * midR;
      const ey = cy + Math.sin(angle) * midR;
      const etype = ri(r, 0, 8);

      if (etype === 0) {
        parts.push(circle(ex, ey, rr(r, 4, 12), "#1a1a1a", 1.2));
        parts.push(dot(ex, ey, 1.5));
      } else if (etype === 1) {
        const er = rr(r, 6, 16);
        parts.push(ellipse(ex, ey, er, er * 0.4, "#1a1a1a", 1, "none", `rotate(${(angle * 180) / Math.PI} ${ex} ${ey})`));
      } else if (etype === 2) {
        parts.push(petalDetailed(cx, cy, midR * 0.3, (angle * 180) / Math.PI, r));
      } else if (etype === 3) {
        const sz = rr(r, 4, 10);
        parts.push(`<rect x="${ex - sz}" y="${ey - sz}" width="${sz * 2}" height="${sz * 2}" fill="none" stroke="#1a1a1a" stroke-width="1" transform="rotate(${(angle * 180) / Math.PI + 45} ${ex} ${ey})"/>`);
        parts.push(`<rect x="${ex - sz * 0.6}" y="${ey - sz * 0.6}" width="${sz * 1.2}" height="${sz * 1.2}" fill="none" stroke="#1a1a1a" stroke-width="0.5" transform="rotate(${(angle * 180) / Math.PI + 45} ${ex} ${ey})"/>`);
      } else if (etype === 4) {
        parts.push(dot(ex, ey, rr(r, 1.5, 3)));
      } else if (etype === 5) {
        const triS = rr(r, 5, 12);
        const a1 = angle;
        const a2 = angle + Math.PI * 0.15;
        const a3 = angle - Math.PI * 0.15;
        parts.push(path(`M${cx + Math.cos(a1) * midR} ${cy + Math.sin(a1) * midR} L${cx + Math.cos(a2) * (midR + triS)} ${cy + Math.sin(a2) * (midR + triS)} L${cx + Math.cos(a3) * (midR + triS)} ${cy + Math.sin(a3) * (midR + triS)} Z`, "#1a1a1a", 1));
      } else if (etype === 6) {
        const dotR = rr(r, 3, 8);
        parts.push(dotArc(ex, ey, dotR, angle - 0.5, angle + 0.5, ri(r, 3, 6), 0.8));
      } else {
        const ls = rr(r, 4, 10);
        parts.push(line(ex - ls, ey, ex + ls, ey, "#1a1a1a", 0.8));
        parts.push(line(ex, ey - ls, ex, ey + ls, "#1a1a1a", 0.8));
      }
    }

    if (l % 2 === 0) {
      parts.push(dotArc(cx, cy, midR, 0, Math.PI * 2, ri(r, sym * 2, sym * 4), 0.8));
    }
  }

  const innerRings = ri(r, 3, 6);
  for (let ring = 0; ring < innerRings; ring++) {
    const rr2 = ((ring + 1) / (innerRings + 1)) * maxR * 0.25;
    parts.push(ornamentalRing(cx, cy, rr2, rr2 + rr(r, 8, 15), ri(r, sym / 2, sym), r));
  }

  parts.push(circle(cx, cy, maxR * 0.06, "#1a1a1a", 3, "#1a1a1a"));
  parts.push(circle(cx, cy, maxR * 0.03, "#1a1a1a", 1));
  parts.push(dotArc(cx, cy, maxR * 0.045, 0, Math.PI * 2, 8, 1));

  for (let i = 0; i < ri(r, 2, 5); i++) {
    const scrollR = rr(r, maxR * 0.3, maxR * 0.7);
    const scrollA = rr(r, 0, Math.PI * 2);
    parts.push(filigreeScroll(cx + Math.cos(scrollA) * scrollR, cy + Math.sin(scrollA) * scrollR, rr(r, 20, 40), (scrollA * 180) / Math.PI, r));
  }

  return parts.join("\n");
}

function generateCats(r: () => number): string {
  const parts: string[] = [];

  const bx = rr(r, 350, 680);
  const by = rr(r, 450, 580);
  const scale = rr(r, 0.9, 1.3);
  const pose = ri(r, 0, 3);

  parts.push(`<g transform="translate(${bx},${by}) scale(${scale})">`);

  if (pose === 0) {
    parts.push(ellipse(0, 60, 110, 80));
    parts.push(ellipse(0, 60, 105, 75, "#1a1a1a", 0.8));
    parts.push(furTexture(0, 60, 190, 140, 50, r));

    parts.push(ellipse(0, -50, 75, 65));
    parts.push(ellipse(0, -50, 70, 60, "#1a1a1a", 0.8));
    parts.push(furTexture(0, -50, 130, 110, 35, r));

    for (const side of [-1, 1]) {
      parts.push(path(`M${side * 50} -90 L${side * rr(r, 48, 62)} ${-rr(r, 140, 175)} L${side * rr(r, 22, 38)} -78`, "#1a1a1a", 2.5));
      parts.push(path(`M${side * 48} -88 L${side * rr(r, 46, 58)} ${-rr(r, 135, 168)} L${side * rr(r, 24, 36)} -76`, "#1a1a1a", 1));
      parts.push(crossHatch(side * 50, -130, 12, 20, 4, side * 0.2, 0.4));
    }

    const eyeX = rr(r, 22, 32);
    for (const side of [-1, 1]) {
      parts.push(eyeDetailed(side * eyeX, -58, 12, r));
    }

    parts.push(noseDetailed(0, -30, 10, r));

    parts.push(path(`M0 -20 Q${-rr(r, 6, 14)} ${-rr(r, 6, 12)} ${-rr(r, 14, 24)} ${-rr(r, 10, 18)}`, "#1a1a1a", 1.5));
    parts.push(path(`M0 -20 Q${rr(r, 6, 14)} ${-rr(r, 6, 12)} ${rr(r, 14, 24)} ${-rr(r, 10, 18)}`, "#1a1a1a", 1.5));

    for (const side of [-1, 1]) {
      for (let w = 0; w < ri(r, 3, 5); w++) {
        const wy = -35 + w * 8;
        const wl = rr(r, 55, 90);
        parts.push(line(side * 28, wy, side * wl, wy + rr(r, -5, 5), "#1a1a1a", 1));
        parts.push(dotRow(side * 30, wy, side * (wl - 5), wy, ri(r, 3, 6), 0.6));
      }
    }

    for (const side of [-1, 1]) {
      parts.push(ellipse(side * 55, 135, 28, 18));
      parts.push(ellipse(side * 55, 135, 24, 14, "#1a1a1a", 0.8));
      for (let t = 0; t < 3; t++) {
        parts.push(ellipse(side * 55 + (t - 1) * 8, 132, 3, 6, "#1a1a1a", 0.8));
      }
    }

    const tailCurve = rr(r, 160, 300);
    parts.push(path(`M100 50 Q${tailCurve} ${-rr(r, 30, 100)} ${rr(r, 140, 220)} ${rr(r, 30, 90)}`, "#1a1a1a", 3.5));
    parts.push(path(`M100 50 Q${tailCurve + 3} ${-rr(r, 25, 95)} ${rr(r, 143, 223)} ${rr(r, 33, 93)}`, "#1a1a1a", 1.2));

    for (let s = 0; s < ri(r, 5, 10); s++) {
      const sy = -30 + s * 10;
      const sw = rr(r, 25, 55);
      parts.push(path(`M${-sw} ${sy} Q0 ${sy + rr(r, 3, 8)} ${sw} ${sy}`, "#1a1a1a", 1.2));
    }
  } else if (pose === 1) {
    parts.push(ellipse(0, 35, 130, 55));
    parts.push(ellipse(0, 35, 125, 50, "#1a1a1a", 0.8));
    parts.push(furTexture(0, 35, 230, 90, 45, r));

    parts.push(path(`M-110 25 Q-140 55 -120 85`, "#1a1a1a", 3));
    parts.push(path(`M110 25 Q140 55 120 85`, "#1a1a1a", 3));
    parts.push(ellipse(-110, 90, 22, 14));
    parts.push(ellipse(110, 90, 22, 14));

    parts.push(path(`M-90 35 Q-130 -25 -100 -70`, "#1a1a1a", 3.5));
    parts.push(path(`M-100 -70 Q-105 -82 -90 -78`, "#1a1a1a", 2));
    parts.push(circle(-100, -72, 3.5, "#1a1a1a", 1.5, "#1a1a1a"));

    parts.push(path(`M90 35 Q105 -15 85 -45`, "#1a1a1a", 3));
    parts.push(circle(85, -45, 28));
    parts.push(circle(85, -45, 24, "#1a1a1a", 0.8));

    for (const side of [-1, 1]) {
      parts.push(path(`M${85 + side * 18} -68 L${85 + side * 28} -95 L${85 + side * 10} -75`, "#1a1a1a", 2));
    }

    const sleepEye = rr(r, 3, 8);
    parts.push(path(`M70 -52 Q78 ${-52 + sleepEye} 85 -52`, "#1a1a1a", 2));
    parts.push(path(`M85 -52 Q92 ${-52 + sleepEye} 100 -52`, "#1a1a1a", 2));

    parts.push(noseDetailed(85, -28, 8, r));

    const curlTail = rr(r, 50, 90);
    parts.push(path(`M-120 75 Q${-140 - curlTail} 35 ${-110 - curlTail * 0.5} 65`, "#1a1a1a", 3.5));
    parts.push(path(`M-120 75 Q${-138 - curlTail} 38 ${-108 - curlTail * 0.5} 68`, "#1a1a1a", 1.2));

    parts.push(furTexture(0, 35, 200, 50, 30, r));
  } else {
    parts.push(ellipse(0, 0, 65, 170));
    parts.push(ellipse(0, 0, 60, 165, "#1a1a1a", 0.8));
    parts.push(furTexture(0, 0, 110, 300, 50, r));

    parts.push(ellipse(0, -180, 55, 50));
    parts.push(ellipse(0, -180, 50, 45, "#1a1a1a", 0.8));

    for (const side of [-1, 1]) {
      parts.push(path(`M${side * 38} -215 L${side * rr(r, 35, 50)} ${-rr(r, 260, 295)} L${side * rr(r, 12, 28)} -205`, "#1a1a1a", 2.5));
      parts.push(crossHatch(side * 40, -255, 10, 15, 4, side * 0.2, 0.4));
    }

    for (const side of [-1, 1]) {
      parts.push(eyeDetailed(side * 20, -188, 10, r));
    }
    parts.push(noseDetailed(0, -165, 10, r));

    for (const side of [-1, 1]) {
      parts.push(ellipse(side * 32, 155, 25, 16));
      parts.push(ellipse(side * 32, 155, 21, 12, "#1a1a1a", 0.8));
    }

    const bushyTail = rr(r, 35, 65);
    parts.push(path(`M0 165 Q${-bushyTail} 190 ${-bushyTail * 1.6} 140`, "#1a1a1a", 4.5));
    parts.push(path(`M${-bushyTail * 1.6} 140 Q${-bushyTail * 1.9} 115 ${-bushyTail * 1.3} 120`, "#1a1a1a", 3.5));
    parts.push(furTexture(-bushyTail * 1.4, 140, 40, 40, 15, r));
  }

  parts.push("</g>");

  for (let i = 0; i < ri(r, 1, 5); i++) {
    const ax = rr(r, 50, 970);
    const ay = rr(r, 50, 970);
    const atype = ri(r, 0, 4);
    if (atype === 0) {
      parts.push(dot(ax, ay, rr(r, 1.5, 4)));
    } else if (atype === 1) {
      parts.push(path(`M${ax - 6} ${ay + 3} L${ax} ${ay - 8} L${ax + 6} ${ay + 3}`, "#1a1a1a", 1));
    } else if (atype === 2) {
      parts.push(star(ax, ay, rr(r, 5, 10), ri(r, 4, 6), r));
    } else {
      parts.push(path(`M${ax} ${ay} Q${ax + rr(r, 10, 25)} ${ay - rr(r, 10, 20)} ${ax + rr(r, 20, 40)} ${ay}`, "#1a1a1a", 0.8));
    }
  }

  return parts.join("\n");
}

function star(cx: number, cy: number, size: number, points: number, r: () => number) {
  const parts: string[] = [];
  let d = "";
  for (let i = 0; i < points * 2; i++) {
    const a = (i / (points * 2)) * Math.PI * 2 - Math.PI / 2;
    const rad = i % 2 === 0 ? size : size * 0.4;
    const px = cx + Math.cos(a) * rad;
    const py = cy + Math.sin(a) * rad;
    d += (i === 0 ? "M" : "L") + `${px} ${py}`;
  }
  d += "Z";
  parts.push(path(d, "#1a1a1a", 1.2));
  return parts.join("");
}

function generateCoastal(r: () => number): string {
  const parts: string[] = [];

  const horizonY = rr(r, 300, 400);

  const sunX = rr(r, 200, 820);
  const sunY = rr(r, 80, 180);
  const sunR = rr(r, 45, 85);
  parts.push(circle(sunX, sunY, sunR, "#1a1a1a", 3));
  parts.push(circle(sunX, sunY, sunR - 4, "#1a1a1a", 0.8));

  const rayCount = ri(r, 12, 24);
  for (let i = 0; i < rayCount; i++) {
    const angle = (i / rayCount) * Math.PI * 2;
    const rLen = rr(r, 25, 60);
    const innerR = sunR + 8;
    const outerR = sunR + rLen;
    parts.push(line(sunX + Math.cos(angle) * innerR, sunY + Math.sin(angle) * innerR, sunX + Math.cos(angle) * outerR, sunY + Math.sin(angle) * outerR, "#1a1a1a", i % 2 === 0 ? 1.5 : 0.8));
    if (i % 3 === 0) {
      parts.push(dot(sunX + Math.cos(angle) * (outerR + 5), sunY + Math.sin(angle) * (outerR + 5), 1.5));
    }
  }

  parts.push(dotArc(sunX, sunY, sunR * 0.7, 0, Math.PI * 2, ri(r, 12, 20), 1));

  const cloudCount = ri(r, 1, 4);
  for (let i = 0; i < cloudCount; i++) {
    const ccx = rr(r, 100, 920);
    const ccy = rr(r, 50, 220);
    const puffs = ri(r, 3, 7);
    for (let p = 0; p < puffs; p++) {
      const px = ccx + p * rr(r, 25, 50);
      const py = ccy + rr(r, -18, 18);
      const pr = rr(r, 22, 50);
      parts.push(circle(px, py, pr, "#1a1a1a", 1.5));
      parts.push(circle(px, py + 3, pr - 3, "#1a1a1a", 0.5));
    }
  }

  const lighthouseX = rr(r, 600, 900);
  const lhH = rr(r, 200, 300);
  const lhW = rr(r, 32, 55);
  parts.push(`<rect x="${lighthouseX - lhW}" y="${horizonY - lhH}" width="${lhW * 2}" height="${lhH}" fill="none" stroke="#1a1a1a" stroke-width="2.5"/>`);
  parts.push(`<rect x="${lighthouseX - lhW + 3}" y="${horizonY - lhH + 3}" width="${lhW * 2 - 6}" height="${lhH - 6}" fill="none" stroke="#1a1a1a" stroke-width="0.8"/>`);
  parts.push(path(`M${lighthouseX - lhW - 12} ${horizonY - lhH} L${lighthouseX + lhW + 12} ${horizonY - lhH} L${lighthouseX + lhW * 0.5} ${horizonY - lhH - 35} L${lighthouseX - lhW * 0.5} ${horizonY - lhH - 35} Z`, "#1a1a1a", 2.5));

  const stripeCount = ri(r, 4, 8);
  for (let s = 0; s < stripeCount; s++) {
    const sy = horizonY - lhH + s * (lhH / stripeCount);
    parts.push(line(lighthouseX - lhW, sy, lighthouseX + lhW, sy, "#1a1a1a", s % 2 === 0 ? 2.5 : 1));
  }

  parts.push(circle(lighthouseX, horizonY - lhH - 18, 12, "#1a1a1a", 2.5));
  parts.push(dot(lighthouseX, horizonY - lhH - 18, 4));
  parts.push(dotArc(lighthouseX, horizonY - lhH - 18, 8, 0, Math.PI * 2, 8, 0.8));

  for (let i = 0; i < ri(r, 4, 8); i++) {
    const angle = -0.9 + (i / 8) * 1.8;
    const rLen = rr(r, 100, 250);
    parts.push(line(lighthouseX, horizonY - lhH - 18, lighthouseX + Math.cos(angle) * rLen, horizonY - lhH - 18 + Math.sin(angle) * rLen, "#1a1a1a", 0.8));
  }

  parts.push(path(`M${lighthouseX - lhW - 20} ${horizonY} Q${lighthouseX - 10} ${horizonY + 15} ${lighthouseX + lhW + 20} ${horizonY}`, "#1a1a1a", 2));

  const waveCount = ri(r, 4, 8);
  for (let w = 0; w < waveCount; w++) {
    const wy = horizonY + 25 + w * rr(r, 35, 70);
    let d = `M0 ${wy}`;
    const segLen = rr(r, 25, 50);
    for (let x = 0; x <= SIZE; x += segLen) {
      const amp = rr(r, 8, 20);
      d += ` Q${x + segLen * 0.5} ${wy - amp} ${x + segLen} ${wy}`;
    }
    parts.push(path(d, "#1a1a1a", w === 0 ? 2.5 : 1.2));
    if (w < 3) {
      parts.push(path(d.replace(/Q/g, "Q").replace(/\d+/g, (m) => String(Number(m) + 2)), "#1a1a1a", 0.5));
    }
  }

  const shellCount = ri(r, 3, 8);
  for (let i = 0; i < shellCount; i++) {
    const sx = rr(r, 80, 940);
    const sy = rr(r, horizonY + 120, 950);
    const stype = ri(r, 0, 4);
    if (stype === 0) {
      const sr = rr(r, 14, 30);
      let d = `M${sx} ${sy}`;
      const turns = rr(r, 2.5, 5);
      for (let t = 0; t < turns * 12; t++) {
        const angle = (t / 12) * Math.PI;
        const r2 = (t / (turns * 12)) * sr;
        d += ` L${sx + Math.cos(angle) * r2} ${sy + Math.sin(angle) * r2}`;
      }
      parts.push(path(d, "#1a1a1a", 1.5));
      parts.push(dotArc(sx, sy, sr * 0.5, 0, Math.PI, ri(r, 4, 8), 0.8));
    } else if (stype === 1) {
      parts.push(path(`M${sx - 18} ${sy + 12} Q${sx} ${sy - 18} ${sx + 18} ${sy + 12}`, "#1a1a1a", 2));
      parts.push(line(sx, sy - 12, sx, sy + 12, "#1a1a1a", 1));
      const ribs = ri(r, 3, 6);
      for (let rib = 0; rib < ribs; rib++) {
        const ry = sy - 10 + (rib / ribs) * 22;
        const rw = 15 * (1 - Math.abs(rib / ribs - 0.5) * 2);
        parts.push(path(`M${sx - rw} ${ry} Q${sx} ${ry + 3} ${sx + rw} ${ry}`, "#1a1a1a", 0.6));
      }
    } else if (stype === 2) {
      parts.push(ellipse(sx, sy, rr(r, 12, 24), rr(r, 7, 14), "#1a1a1a", 1.5, "none", `rotate(${rr(r, -30, 30)} ${sx} ${sy})`));
      parts.push(ellipse(sx, sy, rr(r, 8, 16), rr(r, 4, 9), "#1a1a1a", 0.8, "none", `rotate(${rr(r, -30, 30)} ${sx} ${sy})`));
    } else {
      const ps = rr(r, 10, 20);
      for (let p = 0; p < 5; p++) {
        const pa = (p / 5) * Math.PI * 2 - Math.PI / 2;
        parts.push(ellipse(sx + Math.cos(pa) * ps * 0.5, sy + Math.sin(pa) * ps * 0.5, ps * 0.4, ps * 0.2, "#1a1a1a", 1, "none", `rotate(${(pa * 180) / Math.PI} ${sx + Math.cos(pa) * ps * 0.5} ${sy + Math.sin(pa) * ps * 0.5})`));
      }
      parts.push(dot(sx, sy, 2));
    }
  }

  const birdCount = ri(r, 3, 10);
  for (let i = 0; i < birdCount; i++) {
    const bx = rr(r, 80, 940);
    const by = rr(r, 30, 180);
    const bs = rr(r, 8, 22);
    parts.push(path(`M${bx - bs} ${by} Q${bx} ${by - bs * 0.8} ${bx + bs} ${by}`, "#1a1a1a", 1.5));
    parts.push(path(`M${bx - bs * 0.7} ${by + 2} Q${bx} ${by - bs * 0.5} ${bx + bs * 0.7} ${by + 2}`, "#1a1a1a", 0.6));
  }

  return parts.join("\n");
}

function generateFlorals(r: () => number): string {
  const parts: string[] = [];

  const bouquetCx = C;
  const bouquetCy = rr(r, 320, 430);

  const stemCount = ri(r, 6, 12);
  const stemEnds: Array<[number, number]> = [];

  for (let i = 0; i < stemCount; i++) {
    const angle = -Math.PI * 0.45 + (i / (stemCount - 1)) * Math.PI * 0.9;
    const stemLen = rr(r, 220, 450);
    const curve = rr(r, -90, 90);
    const endX = bouquetCx + Math.sin(angle) * stemLen * 0.6 + curve;
    const endY = bouquetCy - Math.cos(angle) * stemLen * 0.3 - stemLen * 0.6;
    stemEnds.push([endX, endY]);

    parts.push(path(`M${bouquetCx + i * 3 - stemCount * 1.5} ${bouquetCy + 220} Q${bouquetCx + curve * 0.5} ${(bouquetCy + endY) / 2} ${endX} ${endY}`, "#1a1a1a", 2.5));
    parts.push(path(`M${bouquetCx + i * 3 - stemCount * 1.5 + 2} ${bouquetCy + 220} Q${bouquetCx + curve * 0.5 + 2} ${(bouquetCy + endY) / 2} ${endX + 2} ${endY}`, "#1a1a1a", 0.8));

    const leafCount = ri(r, 2, 4);
    for (let l = 0; l < leafCount; l++) {
      const t = 0.2 + l * 0.22;
      const lx = bouquetCx + (endX - bouquetCx) * t;
      const ly = bouquetCy + 220 + (endY - bouquetCy - 220) * t;
      const dir = l % 2 === 0 ? 1 : -1;
      parts.push(petalDetailed(lx, ly, rr(r, 25, 50), dir * rr(r, 25, 55) + 90, r));
    }
  }

  for (const [fx, fy] of stemEnds) {
    const ftype = ri(r, 0, 6);

    if (ftype === 0) {
      const petals = ri(r, 7, 14);
      const petalR = rr(r, 35, 65);
      parts.push(circle(fx, fy, petalR * 0.22));
      parts.push(dotArc(fx, fy, petalR * 0.18, 0, Math.PI * 2, ri(r, 5, 10), 1));
      for (let p = 0; p < petals; p++) {
        parts.push(petalDetailed(fx, fy, petalR, (p / petals) * 360 + rr(r, -8, 8), r));
      }
    } else if (ftype === 1) {
      const layers = ri(r, 4, 7);
      for (let l = layers; l > 0; l--) {
        const lr = l * rr(r, 9, 16);
        parts.push(circle(fx, fy, lr));
        if (l > 1) parts.push(circle(fx, fy, lr - 2.5, "#1a1a1a", 0.5));
      }
      parts.push(dot(fx, fy, 5));
      parts.push(dotArc(fx, fy, layers * 7, 0, Math.PI * 2, ri(r, 8, 15), 0.8));
    } else if (ftype === 2) {
      const rays = ri(r, 10, 20);
      const outerR = rr(r, 35, 60);
      for (let p = 0; p < rays; p++) {
        const angle = (p / rays) * Math.PI * 2;
        parts.push(line(fx, fy, fx + Math.cos(angle) * outerR, fy + Math.sin(angle) * outerR, "#1a1a1a", 1.2));
        const mid = outerR * 0.6;
        parts.push(ellipse(fx + Math.cos(angle) * mid, fy + Math.sin(angle) * mid, 5, 3, "#1a1a1a", 0.8, "none", `rotate(${(angle * 180) / Math.PI} ${fx + Math.cos(angle) * mid} ${fy + Math.sin(angle) * mid})`));
      }
      parts.push(circle(fx, fy, outerR * 0.35));
      parts.push(circle(fx, fy, outerR * 0.22, "#1a1a1a", 1));
      parts.push(dotArc(fx, fy, outerR * 0.28, 0, Math.PI * 2, ri(r, 6, 12), 1));
    } else if (ftype === 3) {
      const budH = rr(r, 30, 55);
      const budW = rr(r, 15, 28);
      parts.push(path(`M${fx} ${fy} Q${fx - budW} ${fy - budH * 0.45} ${fx - budW * 0.3} ${fy - budH}`, "#1a1a1a", 2));
      parts.push(path(`M${fx} ${fy} Q${fx + budW} ${fy - budH * 0.45} ${fx + budW * 0.3} ${fy - budH}`, "#1a1a1a", 2));
      parts.push(path(`M${fx - budW * 0.3} ${fy - budH} Q${fx} ${fy - budH - budW * 0.6} ${fx + budW * 0.3} ${fy - budH}`, "#1a1a1a", 1.5));
      parts.push(path(`M${fx} ${fy - budH * 0.5} L${fx} ${fy - budH}`, "#1a1a1a", 0.8));
      parts.push(path(`M${fx - budW * 0.15} ${fy - budH * 0.3} L${fx - budW * 0.2} ${fy - budH * 0.7}`, "#1a1a1a", 0.5));
      parts.push(path(`M${fx + budW * 0.15} ${fy - budH * 0.3} L${fx + budW * 0.2} ${fy - budH * 0.7}`, "#1a1a1a", 0.5));
    } else if (ftype === 4) {
      const dahliaR = rr(r, 28, 50);
      const rings = ri(r, 4, 7);
      for (let ring = rings; ring > 0; ring--) {
        const rr2 = (ring / rings) * dahliaR;
        const pCount = ri(r, 8, 16);
        for (let p = 0; p < pCount; p++) {
          const a = (p / pCount) * Math.PI * 2 + ring * 0.4;
          parts.push(dot(fx + Math.cos(a) * rr2, fy + Math.sin(a) * rr2, 1.2 + (rings - ring) * 0.4));
        }
      }
      parts.push(circle(fx, fy, dahliaR, "#1a1a1a", 1.5));
      parts.push(circle(fx, fy, dahliaR * 0.9, "#1a1a1a", 0.5));
    } else {
      const petals = ri(r, 5, 9);
      const pr = rr(r, 20, 40);
      for (let p = 0; p < petals; p++) {
        const a = (p / petals) * Math.PI * 2;
        const px = fx + Math.cos(a) * pr * 0.4;
        const py = fy + Math.sin(a) * pr * 0.4;
        parts.push(path(`M${fx} ${fy} Q${px + Math.cos(a + 0.3) * pr * 0.5} ${py + Math.sin(a + 0.3) * pr * 0.5} ${fx + Math.cos(a) * pr} ${fy + Math.sin(a) * pr} Q${px + Math.cos(a - 0.3) * pr * 0.5} ${py + Math.sin(a - 0.3) * pr * 0.5} ${fx} ${fy}`, "#1a1a1a", 1.2));
      }
      parts.push(dot(fx, fy, 3));
    }
  }

  const ribbonX = bouquetCx;
  const ribbonY = bouquetCy + 160;
  parts.push(path(`M${ribbonX - 70} ${ribbonY} Q${ribbonX - 35} ${ribbonY + 25} ${ribbonX} ${ribbonY} Q${ribbonX + 35} ${ribbonY - 25} ${ribbonX + 70} ${ribbonY}`, "#1a1a1a", 3));
  parts.push(path(`M${ribbonX - 65} ${ribbonY + 4} Q${ribbonX - 30} ${ribbonY + 28} ${ribbonX + 5} ${ribbonY + 4}`, "#1a1a1a", 1));
  parts.push(path(`M${ribbonX - 55} ${ribbonY + 12} Q${ribbonX - 75} ${ribbonY + 55} ${ribbonX - 45} ${ribbonY + 80}`, "#1a1a1a", 2.5));
  parts.push(path(`M${ribbonX + 55} ${ribbonY + 12} Q${ribbonX + 75} ${ribbonY + 55} ${ribbonX + 45} ${ribbonY + 80}`, "#1a1a1a", 2.5));
  parts.push(path(`M${ribbonX - 52} ${ribbonY + 15} Q${ribbonX - 70} ${ribbonY + 50} ${ribbonX - 42} ${ribbonY + 75}`, "#1a1a1a", 0.8));
  parts.push(path(`M${ribbonX + 52} ${ribbonY + 15} Q${ribbonX + 70} ${ribbonY + 50} ${ribbonX + 42} ${ribbonY + 75}`, "#1a1a1a", 0.8));

  for (let i = 0; i < ri(r, 2, 5); i++) {
    const sx = rr(r, 100, 920);
    const sy = rr(r, 50, 250);
    parts.push(filigreeScroll(sx, sy, rr(r, 15, 30), rr(r, 0, 360), r));
  }

  return parts.join("\n");
}

function generateCustom(r: () => number): string {
  const parts: string[] = [];
  const cx = C;
  const cy = C;

  const elemCount = ri(r, 4, 8);
  for (let i = 0; i < elemCount; i++) {
    const angle = (i / elemCount) * Math.PI * 2;
    const dist = rr(r, 100, 350);
    const ex = cx + Math.cos(angle) * dist;
    const ey = cy + Math.sin(angle) * dist;
    const choice = ri(r, 0, 5);

    if (choice === 0) {
      parts.push(generateButterflySmall(ex, ey, rr(r, 0.6, 1.2), (angle * 180) / Math.PI + rr(r, -20, 20), r));
    } else if (choice === 1) {
      const petals = ri(r, 6, 12);
      const pr = rr(r, 30, 60);
      for (let p = 0; p < petals; p++) {
        parts.push(petalDetailed(ex, ey, pr, (p / petals) * 360 + rr(r, -8, 8), r));
      }
      parts.push(circle(ex, ey, pr * 0.2));
      parts.push(dotArc(ex, ey, pr * 0.15, 0, Math.PI * 2, 6, 1));
    } else if (choice === 2) {
      parts.push(featherDetail(ex, ey, rr(r, 40, 80), (angle * 180) / Math.PI + rr(r, -30, 30), r));
    } else if (choice === 3) {
      const rings = ri(r, 3, 6);
      for (let ring = rings; ring > 0; ring--) {
        parts.push(circle(ex, ey, ring * rr(r, 8, 15)));
      }
      parts.push(dot(ex, ey, 3));
      parts.push(dotArc(ex, ey, rings * 10, 0, Math.PI * 2, ri(r, 6, 14), 1));
    } else {
      parts.push(filigreeScroll(ex, ey, rr(r, 20, 45), (angle * 180) / Math.PI, r));
    }
  }

  const frameR = rr(r, 380, 460);
  parts.push(circle(cx, cy, frameR, "#1a1a1a", 3));
  parts.push(circle(cx, cy, frameR - 5, "#1a1a1a", 1));
  parts.push(circle(cx, cy, frameR - 10, "#1a1a1a", 0.5));
  parts.push(dotArc(cx, cy, frameR - 2, 0, Math.PI * 2, ri(r, 30, 60), 1.2));

  const scrollCount = ri(r, 6, 12);
  for (let i = 0; i < scrollCount; i++) {
    const a = (i / scrollCount) * Math.PI * 2;
    parts.push(filigreeScroll(cx + Math.cos(a) * (frameR - 25), cy + Math.sin(a) * (frameR - 25), rr(r, 15, 30), (a * 180) / Math.PI + 90, r));
  }

  const innerR = rr(r, 150, 250);
  parts.push(ornamentalRing(cx, cy, innerR, innerR + 12, ri(r, 12, 24), r));

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
  custom: generateCustom,
};

function generateIvyBorder(r: () => number): string {
  const parts: string[] = [];

  for (const side of [-1, 1]) {
    const x = side === -1 ? 18 : SIZE - 18;
    const vineSegs = ri(r, 14, 24);
    let d = `M${x} ${SIZE}`;
    for (let i = 0; i < vineSegs; i++) {
      const y = SIZE - (i / vineSegs) * SIZE;
      const cx2 = x + side * rr(r, 15, 40);
      d += ` Q${cx2} ${y + rr(r, 10, 30)} ${x} ${y}`;
    }
    parts.push(path(d, "#1a1a1a", 3));
    parts.push(path(d, "#1a1a1a", 1));

    for (let i = 0; i < vineSegs * 2; i++) {
      const y = SIZE - (i / (vineSegs * 2)) * SIZE;
      const dir = side * (i % 2 === 0 ? 1 : -1);
      const leafSize = rr(r, 18, 38);
      const lx = x + dir * leafSize * 1.5;
      const ly = y + rr(r, -10, 10);

      parts.push(petalDetailed(x, y, leafSize, dir * rr(r, 30, 70), r));

      const tendrils = ri(r, 1, 3);
      for (let t = 0; t < tendrils; t++) {
        const tx = x + dir * rr(r, 5, 20);
        const ty = y + rr(r, -15, 15);
        const tLen = rr(r, 10, 25);
        parts.push(path(`M${tx} ${ty} Q${tx + dir * tLen * 0.5} ${ty - tLen * 0.3} ${tx + dir * tLen} ${ty - tLen * 0.8} Q${tx + dir * tLen * 1.1} ${ty - tLen * 0.5} ${tx + dir * tLen * 0.9} ${ty - tLen * 0.3}`, "#1a1a1a", 0.8));
      }
    }
  }

  let topVine = `M0 ${SIZE - 18}`;
  const segments = ri(r, 6, 12);
  for (let i = 0; i <= segments; i++) {
    const x = (i / segments) * SIZE;
    const y = SIZE - 18 + rr(r, -28, 28);
    topVine += ` Q${x - SIZE / segments * 0.3} ${y + rr(r, -10, 10)} ${x} ${y}`;
  }
  parts.push(path(topVine, "#1a1a1a", 2.5));
  parts.push(path(topVine, "#1a1a1a", 0.8));

  for (let i = 0; i < segments * 2; i++) {
    const x = rr(r, 30, SIZE - 30);
    const y = SIZE - 18 + rr(r, -18, 18);
    const dir = r() > 0.5 ? 1 : -1;
    parts.push(petalDetailed(x, y, rr(r, 12, 25), dir * rr(r, 30, 70) + (dir > 0 ? 180 : 0), r));
  }

  for (let i = 0; i < ri(r, 4, 10); i++) {
    const bx = rr(r, 80, 940);
    const by = rr(r, 60, SIZE - 60);
    parts.push(generateButterflySmall(bx, by, rr(r, 0.15, 0.35), rr(r, -40, 40), r));
  }

  return parts.join("\n");
}

export function generateColoringPage(categoryId: string, addIvy: boolean, seed: number, customPrompt?: string): string {
  let finalSeed = seed;
  if (customPrompt && categoryId === "custom") {
    finalSeed = seed + hashText(customPrompt);
  }

  const r = rng(finalSeed);
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
