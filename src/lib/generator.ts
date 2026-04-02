const SIZE = 1024;
const C = SIZE / 2;
const K = "#1a1a1a";

function rng(seed: number) {
  let s = seed | 0 || 1;
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) | 0;
    return (s >>> 0) / 4294967296;
  };
}

function hashText(t: string) {
  let h = 7;
  for (let i = 0; i < t.length; i++) h = Math.imul(h ^ t.charCodeAt(i), 2654435761);
  return ((h ^ h >>> 16) >>> 0);
}

function rr(r: () => number, a: number, b: number) { return a + r() * (b - a); }
function ri(r: () => number, a: number, b: number) { return (a + Math.floor(r() * (b - a + 1))); }
function pick<T>(r: () => number, arr: T[]): T { return arr[Math.floor(r() * arr.length)]; }

function P(d: string, sw = 2, fill = "none", s = K) {
  return `<path d="${d}" fill="${fill}" stroke="${s}" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function E(cx: number, cy: number, rx: number, ry: number, sw = 2, fill = "none", rot = 0, s = K) {
  const t = rot ? ` transform="rotate(${rot} ${cx} ${cy})"` : "";
  return `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${fill}" stroke="${s}" stroke-width="${sw}"${t}/>`;
}

function C2(cx: number, cy: number, rad: number, sw = 2, fill = "none", s = K) {
  return `<circle cx="${cx}" cy="${cy}" r="${rad}" fill="${fill}" stroke="${s}" stroke-width="${sw}"/>`;
}

function L(x1: number, y1: number, x2: number, y2: number, sw = 2, s = K) {
  return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${s}" stroke-width="${sw}" stroke-linecap="round"/>`;
}

function dot(x: number, y: number, rad = 1.5) {
  return `<circle cx="${x}" cy="${y}" r="${Math.max(rad, 0.6)}" fill="none" stroke="${K}" stroke-width="0.6"/>`;
}

function dotLine(x1: number, y1: number, x2: number, y2: number, n: number, dr = 1) {
  let o = "";
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const px = x1 + (x2 - x1) * t;
    const py = y1 + (y2 - y1) * t;
    const len = dr * 1.5;
    o += L(px - len, py - len, px + len, py + len, 0.5);
  }
  return o;
}

function dotArc(cx: number, cy: number, rad: number, a1: number, a2: number, n: number, dr = 1) {
  let o = "";
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const a = a1 + (a2 - a1) * t;
    const px = cx + Math.cos(a) * rad;
    const py = cy + Math.sin(a) * rad;
    const perp = a + Math.PI / 2;
    const len = dr * 1.5;
    o += L(px + Math.cos(perp) * len, py + Math.sin(perp) * len, px - Math.cos(perp) * len, py - Math.sin(perp) * len, 0.5);
  }
  return o;
}

function dotFill(cx: number, cy: number, w: number, h: number, density: number, r: () => number, maxR = 1.5) {
  let o = "";
  const count = Math.floor(w * h / density);
  for (let i = 0; i < count; i++) {
    const px = cx + rr(r, -w / 2, w / 2);
    const py = cy + rr(r, -h / 2, h / 2);
    const a = rr(r, 0, Math.PI);
    const len = rr(r, maxR * 0.8, maxR * 2.5);
    o += L(px + Math.cos(a) * len, py + Math.sin(a) * len, px - Math.cos(a) * len, py - Math.sin(a) * len, 0.4);
  }
  return o;
}

function dotFillCircle(cx: number, cy: number, rad: number, density: number, r: () => number, maxR = 1.5) {
  let o = "";
  const rings = Math.max(2, Math.floor(rad / (density * 1.5)));
  for (let ring = 1; ring <= rings; ring++) {
    const rr2 = (ring / rings) * rad;
    o += C2(cx, cy, rr2, 0.4);
  }
  const spokes = Math.max(4, Math.floor(rad * 0.5));
  for (let s = 0; s < spokes; s++) {
    const a = (s / spokes) * Math.PI * 2;
    const inner = rad * 0.15;
    const outer = rad * rr(r, 0.7, 1.0);
    o += L(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner, cx + Math.cos(a) * outer, cy + Math.sin(a) * outer, 0.3);
  }
  return o;
}

function petalPath(cx: number, cy: number, len: number, angle: number, curve: number) {
  const a = (angle * Math.PI) / 180;
  const perp = a + Math.PI / 2;
  const tipX = cx + Math.cos(a) * len;
  const tipY = cy + Math.sin(a) * len;
  const cp1x = cx + Math.cos(a) * len * 0.4 + Math.cos(perp) * curve;
  const cp1y = cy + Math.sin(a) * len * 0.4 + Math.sin(perp) * curve;
  const cp2x = cx + Math.cos(a) * len * 0.7 + Math.cos(perp) * curve * 0.6;
  const cp2y = cy + Math.sin(a) * len * 0.7 + Math.sin(perp) * curve * 0.6;
  const cp3x = cx + Math.cos(a) * len * 0.4 - Math.cos(perp) * curve;
  const cp3y = cy + Math.sin(a) * len * 0.4 - Math.sin(perp) * curve;
  const cp4x = cx + Math.cos(a) * len * 0.7 - Math.cos(perp) * curve * 0.6;
  const cp4y = cy + Math.sin(a) * len * 0.7 - Math.sin(perp) * curve * 0.6;
  return `M${cx} ${cy} C${cp1x} ${cp1y} ${cp2x} ${cp2y} ${tipX} ${tipY} C${cp4x} ${cp4y} ${cp3x} ${cp3y} ${cx} ${cy}`;
}

function leafPath(cx: number, cy: number, len: number, angle: number, width: number) {
  return petalPath(cx, cy, len, angle, width);
}

function scrollPath(cx: number, cy: number, size: number, angle: number, dir: number) {
  const a = (angle * Math.PI) / 180;
  const s = size;
  let d = `M${cx} ${cy}`;
  const pts = [
    [s * 0.3, -s * 0.5 * dir],
    [s * 0.7, -s * 0.3 * dir],
    [s * 0.9, s * 0.1 * dir],
    [s * 0.6, s * 0.5 * dir],
    [s * 0.2, s * 0.4 * dir],
    [s * 0.1, s * 0.15 * dir],
  ];
  const cos = Math.cos(a);
  const sin = Math.sin(a);
  for (const [px, py] of pts) {
    const rx = cx + px * cos - py * sin;
    const ry = cy + px * sin + py * cos;
    d += ` L${rx} ${ry}`;
  }
  return d + "Z";
}

function frame(cx: number, cy: number, r: number, sw = 3) {
  let o = C2(cx, cy, r, sw);
  o += C2(cx, cy, r - 4, 0.8);
  o += C2(cx, cy, r - 8, 0.5);
  o += dotArc(cx, cy, r - 2, 0, Math.PI * 2, Math.floor(r * 0.3), 1.2);
  return o;
}

function ornamentalBorder(cx: number, cy: number, r1: number, r2: number, count: number, r: () => number) {
  let o = C2(cx, cy, r1, 1.5) + C2(cx, cy, r2, 1.5);
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    o += L(cx + Math.cos(a) * r1, cy + Math.sin(a) * r1, cx + Math.cos(a) * r2, cy + Math.sin(a) * r2, 0.8);
    const mid = (r1 + r2) / 2;
    const da = ((i + 0.5) / count) * Math.PI * 2;
    o += dot(cx + Math.cos(da) * mid, cy + Math.sin(da) * mid, 1.2);
  }
  return o;
}

function rose(cx: number, cy: number, size: number, r: () => number) {
  let o = "";
  const layers = ri(r, 4, 7);
  for (let l = layers; l >= 1; l--) {
    const lr = (l / layers) * size;
    const petals = ri(r, 5, 8);
    const offset = l * 23;
    for (let p = 0; p < petals; p++) {
      const a = (p / petals) * 360 + offset + rr(r, -10, 10);
      const curve = lr * rr(r, 0.3, 0.5);
      o += P(petalPath(cx, cy, lr, a, curve), 1.5);
      o += P(petalPath(cx, cy, lr * 0.9, a, curve * 0.9), 0.6);
    }
  }
  o += dotFillCircle(cx, cy, size * 0.12, 8, r, 1);
  o += C2(cx, cy, size * 0.12, 1.5);
  o += C2(cx, cy, size * 0.06, 1);
  return o;
}

function detailedLeaf(cx: number, cy: number, len: number, angle: number, r: () => number) {
  let o = "";
  const w = len * rr(r, 0.25, 0.4);
  o += P(leafPath(cx, cy, len, angle, w), 1.5);
  const a = (angle * Math.PI) / 180;
  o += L(cx, cy, cx + Math.cos(a) * len * 0.9, cy + Math.sin(a) * len * 0.9, 0.8);
  const veins = ri(r, 3, 7);
  for (let v = 1; v <= veins; v++) {
    const t = v / (veins + 1);
    const vx = cx + Math.cos(a) * len * t;
    const vy = cy + Math.sin(a) * len * t;
    const vl = w * 0.6 * (1 - t * 0.3);
    const perp = a + Math.PI / 2;
    o += P(`M${vx} ${vy} Q${vx + Math.cos(perp) * vl * 0.5 + Math.cos(a) * vl * 0.3} ${vy + Math.sin(perp) * vl * 0.5 + Math.sin(a) * vl * 0.3} ${vx + Math.cos(perp) * vl} ${vy + Math.sin(perp) * vl}`, 0.6);
    o += P(`M${vx} ${vy} Q${vx - Math.cos(perp) * vl * 0.5 + Math.cos(a) * vl * 0.3} ${vy - Math.sin(perp) * vl * 0.5 + Math.sin(a) * vl * 0.3} ${vx - Math.cos(perp) * vl} ${vy - Math.sin(perp) * vl}`, 0.6);
  }
  const hatchCount = ri(r, 4, 8);
  for (let h = 0; h < hatchCount; h++) {
    const ht = 0.2 + (h / hatchCount) * 0.6;
    const hx = cx + Math.cos(a) * len * ht;
    const hy = cy + Math.sin(a) * len * ht;
    const hl = w * 0.3 * (1 - ht * 0.3);
    const perpA = a + Math.PI / 2;
    o += L(hx + Math.cos(perpA) * hl * 0.2, hy + Math.sin(perpA) * hl * 0.2, hx + Math.cos(perpA) * hl * 0.8, hy + Math.sin(perpA) * hl * 0.8, 0.3);
    o += L(hx - Math.cos(perpA) * hl * 0.2, hy - Math.sin(perpA) * hl * 0.2, hx - Math.cos(perpA) * hl * 0.8, hy - Math.sin(perpA) * hl * 0.8, 0.3);
  }
  return o;
}

function stipple(cx: number, cy: number, w: number, h: number, density: number, r: () => number) {
  let o = "";
  const count = Math.floor(w * h / density);
  for (let i = 0; i < count; i++) {
    const px = cx + rr(r, -w / 2, w / 2);
    const py = cy + rr(r, -h / 2, h / 2);
    const rad = rr(r, 0.3, 1.2);
    o += `<circle cx="${px}" cy="${py}" r="${rad}" fill="${K}"/>`;
  }
  return o;
}

function stippleCircle(cx: number, cy: number, rad: number, density: number, r: () => number) {
  let o = "";
  const area = Math.PI * rad * rad;
  const count = Math.floor(area / density);
  for (let i = 0; i < count; i++) {
    const a = rr(r, 0, Math.PI * 2);
    const d = rr(r, 0, rad);
    const px = cx + Math.cos(a) * d;
    const py = cy + Math.sin(a) * d;
    const dotR = rr(r, 0.3, 1.0);
    o += `<circle cx="${px}" cy="${py}" r="${dotR}" fill="${K}"/>`;
  }
  return o;
}

function shadeGradient(cx: number, cy: number, w: number, h: number, density: number, r: () => number) {
  let o = "";
  const count = Math.floor(w * h / density);
  for (let i = 0; i < count; i++) {
    const px = cx + rr(r, -w / 2, w / 2);
    const py = cy + rr(r, -h / 2, h / 2);
    const normY = (py - (cy - h / 2)) / h;
    if (r() > normY * 0.8 + 0.2) continue;
    const dotR = rr(r, 0.3, 0.9);
    o += `<circle cx="${px}" cy="${py}" r="${dotR}" fill="${K}"/>`;
  }
  return o;
}

function flashSkull(cx: number, cy: number, sc: number, r: () => number): string {
  let o = `<g transform="translate(${cx},${cy}) scale(${sc})">`;
  o += P(`M-55 -10 C-60 -45 -50 -75 -25 -90 C-10 -98 10 -98 25 -90 C50 -75 60 -45 55 -10 C55 15 45 40 30 50 C20 58 10 62 0 62 C-10 62 -20 58 -30 50 C-45 40 -55 15 -55 -10Z`, 3);
  o += P(`M-53 -10 C-58 -43 -48 -73 -24 -88 C-10 -95 10 -95 24 -88 C48 -73 58 -43 53 -10 C53 14 43 38 28 48 C18 55 10 59 0 59 C-10 59 -18 55 -28 48 C-43 38 -53 14 -53 -10Z`, 1);
  o += stipple(0, -30, 100, 80, 12, r);

  for (const s of [-1, 1]) {
    o += P(`M${s * 14} -35 C${s * 14} -48 ${s * 32} -48 ${s * 32} -35 C${s * 32} -22 ${s * 14} -22 ${s * 14} -35`, 2.5);
    o += P(`M${s * 16} -35 C${s * 16} -45 ${s * 30} -45 ${s * 30} -35 C${s * 30} -25 ${s * 16} -25 ${s * 16} -35`, 1);
    o += stippleCircle(s * 23, -35, 7, 4, r);
    o += dot(s * 23, -35, 2.5);
  }

  o += P(`M0 -18 C-5 -28 -10 -18 0 -8 C10 -18 5 -28 0 -18`, 2);
  o += P(`M-4 -14 L4 -14 L0 -6 Z`, 1.2);
  o += stipple(0, -15, 12, 15, 6, r);

  o += P(`M-25 15 C-20 12 -10 10 0 12 C10 10 20 12 25 15 C28 25 22 32 18 35 L-18 35 C-22 32 -28 25 -25 15`, 2.5);
  for (let t = -4; t <= 4; t++) {
    const tx = t * 4;
    const ty = 14 + Math.abs(t) * 0.8;
    o += L(tx, ty, tx, ty + 10, t === 0 ? 1.5 : 1.2);
  }
  o += P(`M-18 25 L18 25`, 1);
  o += P(`M-16 30 L16 30`, 0.8);

  o += P(`M-40 -5 C-42 5 -38 15 -30 18`, 2);
  o += P(`M40 -5 C42 5 38 15 30 18`, 2);

  for (let c = 0; c < ri(r, 3, 6); c++) {
    const cy2 = -60 + c * 8;
    const cw = 35 - c * 3;
    o += P(`M${-cw} ${cy2} Q0 ${cy2 + rr(r, 3, 7)} ${cw} ${cy2}`, 0.8);
  }

  o += `</g>`;
  return o;
}

function flashRose(cx: number, cy: number, sc: number, r: () => number): string {
  let o = `<g transform="translate(${cx},${cy}) scale(${sc})">`;
  for (let layer = 3; layer >= 0; layer--) {
    const lr = 20 + layer * 15;
    const petals = 5 + layer;
    for (let p = 0; p < petals; p++) {
      const a = (p / petals) * 360 + layer * 35;
      const curve = lr * rr(r, 0.3, 0.5);
      o += P(petalPath(0, 0, lr, a, curve), layer === 0 ? 3 : layer < 2 ? 2 : 1.5);
      if (layer > 0) {
        o += P(petalPath(0, 0, lr * 0.85, a, curve * 0.85), 0.6);
      }
    }
    if (layer > 0) {
      o += stipple(0, 0, lr * 1.2, lr * 1.2, 15 + layer * 5, r);
    }
  }
  o += C2(0, 0, 8, 2.5);
  o += stippleCircle(0, 0, 6, 4, r);
  o += dot(0, 0, 2);

  o += P(`M0 65 C-5 80 -10 120 -8 160`, 3);
  o += P(`M1 65 C-4 80 -9 120 -7 160`, 1);

  for (const s of [-1, 1]) {
    const ly = 90 + rr(r, 0, 20);
    const lx = s * 20;
    const ll = 25 + rr(r, 0, 15);
    o += P(leafPath(lx, ly, ll, s > 0 ? 30 : 150, ll * 0.35), 2);
    o += L(lx, ly, lx + Math.cos((s > 0 ? 30 : 150) * Math.PI / 180) * ll * 0.8, ly + Math.sin((s > 0 ? 30 : 150) * Math.PI / 180) * ll * 0.8, 0.8);
    for (let v = 1; v <= 3; v++) {
      const t = v * 0.22;
      const vx = lx + Math.cos((s > 0 ? 30 : 150) * Math.PI / 180) * ll * t;
      const vy = ly + Math.sin((s > 0 ? 30 : 150) * Math.PI / 180) * ll * t;
      const perp = ((s > 0 ? 120 : 60)) * Math.PI / 180;
      const vl = ll * 0.2 * (1 - t * 0.3);
      o += P(`M${vx} ${vy} Q${vx + Math.cos(perp) * vl} ${vy + Math.sin(perp) * vl} ${vx + Math.cos(perp) * vl * 1.5} ${vy + Math.sin(perp) * vl * 1.5}`, 0.5);
      o += P(`M${vx} ${vy} Q${vx - Math.cos(perp) * vl} ${vy - Math.sin(perp) * vl} ${vx - Math.cos(perp) * vl * 1.5} ${vy - Math.sin(perp) * vl * 1.5}`, 0.5);
    }
  }

  for (let t = 0; t < ri(r, 3, 6); t++) {
    const ty = 75 + t * 22;
    const tx = rr(r, -8, 8);
    o += P(`M${tx} ${ty} L${tx + 4} ${ty - 4} L${tx + 2} ${ty} L${tx + 6} ${ty - 2}`, 1.2);
  }

  o += `</g>`;
  return o;
}

function flashDagger(cx: number, cy: number, sc: number, r: () => number): string {
  let o = `<g transform="translate(${cx},${cy}) scale(${sc})">`;
  const bladeLen = 130;
  const bladeW = 18;

  o += P(`M0 ${-bladeLen} C${-bladeW * 0.3} ${-bladeLen * 0.8} ${-bladeW} ${-bladeLen * 0.3} ${-bladeW} 0 L0 ${bladeW * 0.3} L${bladeW} 0 C${bladeW} ${-bladeLen * 0.3} ${bladeW * 0.3} ${-bladeLen * 0.8} 0 ${-bladeLen}`, 3);
  o += L(0, -bladeLen, 0, bladeW * 0.3, 1.5);

  o += shadeGradient(0, -bladeLen * 0.5, bladeW * 1.8, bladeLen * 0.8, 10, r);

  const guardW = 45;
  const guardH = 12;
  o += P(`M${-guardW} ${bladeW * 0.15} C${-guardW} ${-guardH} ${guardW} ${-guardH} ${guardW} ${bladeW * 0.15} C${guardW} ${guardH} ${-guardW} ${guardH} ${-guardW} ${bladeW * 0.15}`, 2.5);
  o += P(`M${-guardW + 3} ${bladeW * 0.15} C${-guardW + 3} ${-guardH + 3} ${guardW - 3} ${-guardH + 3} ${guardW - 3} ${bladeW * 0.15}`, 0.8);

  for (const s of [-1, 1]) {
    o += C2(s * guardW, bladeW * 0.15, 5, 2);
    o += dot(s * guardW, bladeW * 0.15, 2);
  }

  const gripH = 55;
  o += P(`M${-10} ${bladeW * 0.3} L${-10} ${bladeW * 0.3 + gripH} L${10} ${bladeW * 0.3 + gripH} L${10} ${bladeW * 0.3} Z`, 2.5);
  for (let g = 0; g < 6; g++) {
    const gy = bladeW * 0.3 + g * (gripH / 6) + gripH / 12;
    o += L(-10, gy, 10, gy, 0.8);
  }
  for (let g = 0; g < 4; g++) {
    const gx = -6 + g * 4;
    o += L(gx, bladeW * 0.3, gx, bladeW * 0.3 + gripH, 0.4);
  }

  const pommelY = bladeW * 0.3 + gripH;
  o += C2(0, pommelY + 12, 12, 2.5);
  o += C2(0, pommelY + 12, 8, 0.8);
  o += dot(0, pommelY + 12, 3);
  o += P(`M0 ${pommelY + 24} L-3 ${pommelY + 30} L0 ${pommelY + 28} L3 ${pommelY + 30} Z`, 1.5);

  const snakeStart = -bladeLen * 0.4;
  o += P(`M${bladeW + 5} ${snakeStart} C${bladeW + 25} ${snakeStart + 20} ${bladeW + 30} ${snakeStart + 50} ${bladeW + 15} ${snakeStart + 70} C${bladeW} ${snakeStart + 85} ${bladeW + 20} ${snakeStart + 100} ${bladeW + 10} ${snakeStart + 115}`, 2.5);
  o += P(`M${bladeW + 5} ${snakeStart + 1} C${bladeW + 23} ${snakeStart + 21} ${bladeW + 28} ${snakeStart + 51} ${bladeW + 13} ${snakeStart + 71}`, 0.8);
  o += C2(bladeW + 10, snakeStart + 115, 8, 2);
  o += E(bladeW + 10, snakeStart + 112, 3, 5, 1.2);
  o += dot(bladeW + 10, snakeStart + 110, 1.2);
  o += P(`M${bladeW + 10} ${snakeStart + 123} L${bladeW + 6} ${snakeStart + 130} L${bladeW + 10} ${snakeStart + 128} L${bladeW + 14} ${snakeStart + 130} Z`, 1.2);

  o += `</g>`;
  return o;
}

function flashAnchor(cx: number, cy: number, sc: number, r: () => number): string {
  let o = `<g transform="translate(${cx},${cy}) scale(${sc})">`;
  o += C2(0, -100, 14, 3);
  o += C2(0, -100, 10, 1);
  o += L(0, -86, 0, 80, 3.5);

  o += P(`M-50 60 C-50 80 -20 100 0 100 C20 100 50 80 50 60`, 3);
  o += P(`M-48 62 C-48 78 -18 97 0 97 C18 97 48 78 48 62`, 1);

  o += P(`M-50 60 C-55 55 -60 45 -55 35 C-50 25 -40 30 -40 40 C-40 48 -45 55 -50 60`, 2.5);
  o += P(`M50 60 C55 55 60 45 55 35 C50 25 40 30 40 40 C40 48 45 55 50 60`, 2.5);
  o += stippleCircle(-48, 45, 10, 5, r);
  o += stippleCircle(48, 45, 10, 5, r);

  const barW = 35;
  o += P(`M${-barW} 30 L${barW} 30`, 3);
  o += P(`M${-barW} 27 L${barW} 27`, 1);
  o += P(`M${-barW} 33 L${barW} 33`, 1);

  o += P(`M0 -86 C-15 -100 -30 -95 -35 -85 C-38 -75 -28 -65 -18 -70 C-12 -74 -8 -80 0 -86`, 2);
  o += P(`M0 -86 C15 -100 30 -95 35 -85 C38 -75 28 -65 18 -70 C12 -74 8 -80 0 -86`, 2);

  o += P(`M-15 -86 C-25 -110 -50 -100 -45 -80`, 2.5);
  o += P(`M-13 -88 C-23 -108 -48 -100 -43 -82`, 0.8);
  o += P(`M-45 -80 C-55 -75 -52 -65 -42 -68 C-35 -70 -38 -80 -45 -80`, 1.5);

  for (let k = 0; k < ri(r, 5, 10); k++) {
    const kt = rr(r, 0.1, 0.9);
    const kx = -15 + kt * (-30);
    const ky = -86 + kt * 6;
    o += L(kx, ky, kx - 4, ky - 4, 1);
  }

  o += `</g>`;
  return o;
}

function flashSacredHeart(cx: number, cy: number, sc: number, r: () => number): string {
  let o = `<g transform="translate(${cx},${cy}) scale(${sc})">`;
  const hw = 50, hh = 55;
  o += P(`M0 ${hh} C${-hw * 0.3} ${hh - 20} ${-hw} ${hh * 0.3} ${-hw} ${-hh * 0.1} C${-hw} ${-hh * 0.5} ${-hw * 0.6} ${-hh} 0 ${-hh * 0.6} C${hw * 0.6} ${-hh} ${hw} ${-hh * 0.5} ${hw} ${-hh * 0.1} C${hw} ${hh * 0.3} ${hw * 0.3} ${hh - 20} 0 ${hh}`, 3);
  o += P(`M0 ${hh - 2} C${-hw * 0.3} ${hh - 22} ${-hw + 2} ${hh * 0.3} ${-hw + 2} ${-hh * 0.1} C${-hw + 2} ${-hh * 0.5 + 2} ${-hw * 0.6 + 2} ${-hh + 2} 0 ${-hh * 0.6 + 2} C${hw * 0.6 - 2} ${-hh + 2} ${hw - 2} ${-hh * 0.5 + 2} ${hw - 2} ${-hh * 0.1} C${hw - 2} ${hh * 0.3} ${hw * 0.3} ${hh - 22} 0 ${hh - 2}`, 1);
  o += stipple(0, 0, hw * 1.6, hh * 1.5, 10, r);

  o += L(0, -hh * 0.3, 0, hh - 5, 1.5);

  for (const s of [-1, 1]) {
    o += P(`M0 ${hh * 0.3} C${s * 15} ${hh * 0.1} ${s * 25} ${hh * 0.2} ${s * 30} ${hh * 0.05}`, 1.2);
    o += P(`M0 ${hh * 0.5} C${s * 12} ${hh * 0.35} ${s * 20} ${hh * 0.4} ${s * 25} ${hh * 0.25}`, 1);
  }

  for (let f = 0; f < ri(r, 8, 14); f++) {
    const fa = -Math.PI * 0.8 + (f / 13) * Math.PI * 0.6;
    const fl = rr(r, 20, 45);
    const fx = Math.cos(fa) * (hw + 5);
    const fy = -hh * 0.3 + Math.sin(fa) * (hh * 0.4);
    o += P(`M${fx} ${fy} C${fx + Math.cos(fa) * fl * 0.3} ${fy + Math.sin(fa) * fl * 0.3 - 8} ${fx + Math.cos(fa) * fl * 0.7} ${fy + Math.sin(fa) * fl * 0.7 - 5} ${fx + Math.cos(fa) * fl} ${fy + Math.sin(fa) * fl}`, 1.5);
    o += P(`M${fx + Math.cos(fa) * fl} ${fy + Math.sin(fa) * fl} C${fx + Math.cos(fa) * fl + 3} ${fy + Math.sin(fa) * fl - 5} ${fx + Math.cos(fa) * fl - 3} ${fy + Math.sin(fa) * fl - 5} ${fx + Math.cos(fa) * fl} ${fy + Math.sin(fa) * fl}`, 1);
  }
  for (const s of [-1, 1]) {
    for (let f = 0; f < ri(r, 5, 9); f++) {
      const fa = -Math.PI * 0.3 + (f / 8) * Math.PI * 0.6;
      const fl = rr(r, 15, 35);
      const fx = s * (hw + 3);
      const fy = -hh * 0.1 + (f - 4) * 8;
      o += P(`M${fx} ${fy} C${fx + s * fl * 0.3} ${fy - 5} ${fx + s * fl * 0.7} ${fy - 3} ${fx + s * fl} ${fy}`, 1.2);
    }
  }

  o += P(`M-15 ${-hh * 0.6 - 8} C-20 ${-hh * 0.6 - 25} -10 ${-hh * 0.6 - 35} 0 ${-hh * 0.6 - 30} C10 ${-hh * 0.6 - 35} 20 ${-hh * 0.6 - 25} 15 ${-hh * 0.6 - 8}`, 2);
  for (let t = 0; t < ri(r, 4, 8); t++) {
    const ta = rr(r, 0, Math.PI * 2);
    const tr = rr(r, 8, 14);
    const tx = Math.cos(ta) * tr;
    const ty = -hh * 0.6 - 20 + Math.sin(ta) * tr * 0.5;
    o += L(tx - 3, ty, tx + 3, ty - 3, 1);
  }

  o += `</g>`;
  return o;
}

function flashSkullAndRoses(cx: number, cy: number, sc: number, r: () => number): string {
  let o = `<g transform="translate(${cx},${cy}) scale(${sc})">`;
  o += flashSkull(0, -20, 0.7, r);
  o += flashRose(-55, 30, 0.5, r);
  o += flashRose(55, 30, 0.5, r);
  o += flashRose(0, 60, 0.45, r);

  for (const s of [-1, 1]) {
    o += P(`M${s * 30} 10 C${s * 45} 20 ${s * 50} 35 ${s * 48} 50`, 1.5);
    for (let t = 0; t < 3; t++) {
      const ly = 15 + t * 14;
      const lx = s * (35 + t * 5);
      o += P(leafPath(lx, ly, 12, s > 0 ? 40 : 140, 5), 1);
    }
  }

  o += `</g>`;
  return o;
}

function flashEagle(cx: number, cy: number, sc: number, r: () => number): string {
  let o = `<g transform="translate(${cx},${cy}) scale(${sc})">`;
  o += C2(0, -20, 22, 3);
  o += C2(0, -20, 19, 1);
  o += stippleCircle(0, -20, 17, 8, r);

  o += P(`M-5 -40 C-8 -55 -3 -65 0 -60 C3 -65 8 -55 5 -40`, 2.5);
  o += P(`M-3 -60 L-6 -68 L0 -63 L6 -68 L3 -60`, 1.5);

  for (const s of [-1, 1]) {
    o += E(s * 10, -25, 5, 4, 1.5);
    o += dot(s * 10, -25, 1.8);
    o += dot(s * 9, -26, 0.6);
  }

  o += P(`M0 -2 L-6 5 L0 2 L6 5 Z`, 2.5);

  for (const s of [-1, 1]) {
    const wingSpan = 120;
    o += P(`M${s * 20} 0 C${s * 40} ${-30} ${s * 80} ${-50} ${s * wingSpan} ${-20} C${s * (wingSpan + 15)} ${-15} ${s * (wingSpan + 10)} ${-5} ${s * (wingSpan - 10)} ${-10} C${s * 80} ${-25} ${s * 50} ${-10} ${s * 25} 10`, 3);
    o += P(`M${s * 20} 2 C${s * 38} ${-27} ${s * 78} ${-47} ${s * (wingSpan - 2)} ${-18}`, 1);

    for (let f = 0; f < ri(r, 6, 10); f++) {
      const ft = 0.2 + (f / 9) * 0.7;
      const fx = s * (20 + ft * (wingSpan - 20));
      const fy = -ft * 30 + (1 - ft) * 10;
      const fl = 15 + rr(r, 0, 15);
      const fa = s * (20 + rr(r, 0, 30));
      o += P(petalPath(fx, fy, fl, fa, fl * 0.2), 0.8);
      o += L(fx, fy, fx + Math.cos(fa * Math.PI / 180) * fl * 0.7, fy + Math.sin(fa * Math.PI / 180) * fl * 0.7, 0.4);
    }

    o += stipple(s * 60, -15, 50, 30, 18, r);
  }

  for (const s of [-1, 1]) {
    o += P(`M${s * 10} 5 L${s * 12} 35`, 3);
    o += P(`M${s * 25} 35 L${s * 5} 35 L${s * 12} 28 Z`, 2);
    o += P(`M${s * 22} 33 L${s * 8} 33`, 0.8);
  }

  o += `</g>`;
  return o;
}

function flashBanner(cx: number, cy: number, sc: number, text: string, r: () => number): string {
  let o = `<g transform="translate(${cx},${cy}) scale(${sc})">`;
  const bw = 100, bh = 20;
  o += P(`M${-bw} ${-bh} C${-bw + 15} ${-bh - 8} ${bw - 15} ${-bh - 8} ${bw} ${-bh} L${bw} ${bh} C${bw - 15} ${bh + 8} ${-bw + 15} ${bh + 8} ${-bw} ${bh} Z`, 2.5);
  o += P(`M${-bw + 3} ${-bh + 2} C${-bw + 15} ${-bh - 5} ${bw - 15} ${-bh - 5} ${bw - 3} ${-bh + 2}`, 0.8);

  o += P(`M${-bw - 10} ${-bh - 5} L${-bw - 10} ${bh + 5} L${-bw + 5} ${bh} L${-bw} ${bh} L${-bw} ${-bh} L${-bw + 5} ${-bh} Z`, 2);
  o += P(`M${bw + 10} ${-bh - 5} L${bw + 10} ${bh + 5} L${bw - 5} ${bh} L${bw} ${bh} L${bw} ${-bh} L${bw - 5} ${-bh} Z`, 2);

  o += P(`M${-bw + 15} 0 L${bw - 15} 0`, 0.6);

  o += `<text x="0" y="5" text-anchor="middle" font-family="serif" font-size="14" font-weight="bold" fill="${K}" letter-spacing="3">${text}</text>`;

  o += `</g>`;
  return o;
}

function flashDice(cx: number, cy: number, sc: number, r: () => number): string {
  let o = `<g transform="translate(${cx},${cy}) scale(${sc})">`;
  const s = 30;
  const rot = rr(r, -15, 15);

  for (const d of [-1, 1]) {
    const dx = d * 20;
    const dy = d * -15;
    o += `<g transform="translate(${dx},${dy}) rotate(${rot + d * 10})">`;
    o += `<rect x="${-s}" y="${-s}" width="${s * 2}" height="${s * 2}" rx="4" fill="none" stroke="${K}" stroke-width="3"/>`;
    o += `<rect x="${-s + 2}" y="${-s + 2}" width="${s * 2 - 4}" height="${s * 2 - 4}" rx="3" fill="none" stroke="${K}" stroke-width="0.8"/>`;

    const val = ri(r, 1, 6);
    const dotR = 3.5;
    const positions: Record<number, [number, number][]> = {
      1: [[0, 0]],
      2: [[-10, -10], [10, 10]],
      3: [[-10, -10], [0, 0], [10, 10]],
      4: [[-10, -10], [10, -10], [-10, 10], [10, 10]],
      5: [[-10, -10], [10, -10], [0, 0], [-10, 10], [10, 10]],
      6: [[-10, -10], [10, -10], [-10, 0], [10, 0], [-10, 10], [10, 10]],
    };
    for (const [px, py] of positions[val]) {
      o += `<circle cx="${px}" cy="${py}" r="${dotR}" fill="${K}"/>`;
    }
    o += `</g>`;
  }

  o += `</g>`;
  return o;
}

function flashSnake(cx: number, cy: number, sc: number, r: () => number): string {
  let o = `<g transform="translate(${cx},${cy}) scale(${sc})">`;
  const coils = ri(r, 2, 4);
  let pathD = `M-30 60`;
  for (let c = 0; c < coils; c++) {
    const dir = c % 2 === 0 ? 1 : -1;
    const yOff = c * 30;
    pathD += ` C${dir * 60} ${50 - yOff} ${dir * 60} ${20 - yOff} ${-dir * 10} ${10 - yOff}`;
  }
  pathD += ` C20 ${-coils * 30} 30 ${-coils * 30 - 30} 0 ${-coils * 30 - 50}`;
  o += P(pathD, 4);
  o += P(pathD, 1.5);

  const headX = 0, headY = -coils * 30 - 50;
  o += P(`M${headX} ${headY} C${headX - 15} ${headY - 10} ${headX - 20} ${headY - 25} ${headX - 10} ${headY - 30} C${headX} ${headY - 33} ${headX + 10} ${headY - 30} ${headX + 20} ${headY - 25} C${headX + 15} ${headY - 10} ${headX} ${headY} ${headX} ${headY}`, 2.5);
  o += E(headX - 6, headY - 15, 3, 4, 1.5);
  o += E(headX + 6, headY - 15, 3, 4, 1.5);
  o += dot(headX - 6, headY - 15, 1.5);
  o += dot(headX + 6, headY - 15, 1.5);

  o += P(`M${headX} ${headY - 30} L${headX - 3} ${headY - 40} L${headX} ${headY - 38} L${headX + 3} ${headY - 40} Z`, 1.5);

  for (let s = 0; s < ri(r, 20, 40); s++) {
    const angle = rr(r, 0, Math.PI * 2);
    o += P(`M${rr(r, -40, 40)} ${rr(r, -coils * 30, 60)} L${rr(r, -40, 40) + Math.cos(angle) * 6} ${rr(r, -coils * 30, 60) + Math.sin(angle) * 6}`, 0.5);
  }

  o += `</g>`;
  return o;
}

function flashBannerWithText(cx: number, cy: number, sc: number, r: () => number): string {
  const texts = ["MOM", "LOVE", "HOPE", "FATE", "LIVE", "FREEDOM", "HONOR", "FAITH"];
  return flashBanner(cx, cy, sc, pick(r, texts), r);
}

function generateTattooFlash(r: () => number): string {
  let o = "";

  o += P(`M10 10 L1014 10 L1014 1014 L10 1014 Z`, 3);
  o += P(`M14 14 L1010 14 L1010 1010 L14 1010 Z`, 1);

  o += `<text x="512" y="55" text-anchor="middle" font-family="serif" font-size="28" font-weight="bold" fill="${K}" letter-spacing="8">FLASH SHEET</text>`;
  o += P(`M200 65 L824 65`, 1.5);
  o += P(`M250 70 L774 70`, 0.6);

  const designs: Array<(r: () => number) => string> = [
    (r) => flashSkull(0, 0, 1.2, r),
    (r) => flashRose(0, 0, 1.1, r),
    (r) => flashDagger(0, 0, 0.9, r),
    (r) => flashAnchor(0, 0, 0.9, r),
    (r) => flashSacredHeart(0, 0, 1.0, r),
    (r) => flashSkullAndRoses(0, 0, 0.85, r),
    (r) => flashEagle(0, 0, 0.8, r),
    (r) => flashBannerWithText(0, 0, 1.0, r),
    (r) => flashDice(0, 0, 1.1, r),
    (r) => flashSnake(0, 0, 0.85, r),
  ];

  const positions = [
    { x: 256, y: 270 },
    { x: 768, y: 270 },
    { x: 256, y: 530 },
    { x: 768, y: 530 },
    { x: 512, y: 380 },
    { x: 256, y: 790 },
    { x: 768, y: 790 },
  ];

  const shuffled = [...designs].sort(() => r() - 0.5);
  const count = ri(r, 5, 7);

  for (let i = 0; i < count; i++) {
    const pos = positions[i];
    o += `<g transform="translate(${pos.x},${pos.y})">`;
    o += shuffled[i](r);
    o += `</g>`;
  }

  for (let i = 0; i < ri(r, 3, 8); i++) {
    const sx = rr(r, 40, 984);
    const sy = rr(r, 900, 1000);
    const ss = rr(r, 0.2, 0.4);
    const elem = ri(r, 0, 3);
    if (elem === 0) o += flashRose(sx, sy, ss, r);
    else if (elem === 1) o += flashSkull(sx, sy, ss, r);
    else o += flashDagger(sx, sy, ss, r);
  }

  o += P(`M30 990 L994 990`, 1.5);
  for (let d = 0; d < ri(r, 5, 10); d++) {
    const dx = rr(r, 50, 974);
    o += dot(dx, 990, rr(r, 1, 2));
  }

  return o;
}

const generators: Record<string, (r: () => number) => string> = {
  "tattoo-flash": generateTattooFlash,
};

function heartIvyLeaf(cx: number, cy: number, size: number, angle: number): string {
  const a = (angle * Math.PI) / 180;
  const s = size;
  const dx = Math.cos(a), dy = Math.sin(a);
  const nx = -dy, ny = dx;

  const tipX = cx + dx * s * 1.2;
  const tipY = cy + dy * s * 1.2;
  const lobe1X = cx + nx * s * 0.7 - dx * s * 0.1;
  const lobe1Y = cy + ny * s * 0.7 - dy * s * 0.1;
  const lobe2X = cx - nx * s * 0.7 - dx * s * 0.1;
  const lobe2Y = cy - ny * s * 0.7 - dy * s * 0.1;
  const cpLX = cx + nx * s * 0.9 + dx * s * 0.3;
  const cpLY = cy + ny * s * 0.9 + dy * s * 0.3;
  const cpRX = cx - nx * s * 0.9 + dx * s * 0.3;
  const cpRY = cy - ny * s * 0.9 + dy * s * 0.3;

  let o = P(`M${cx} ${cy} C${cpLX} ${cpLY} ${lobe1X} ${lobe1Y} ${tipX} ${tipY} C${lobe2X} ${lobe2Y} ${cpRX} ${cpRY} ${cx} ${cy}`, 1.8);
  o += L(cx, cy, tipX, tipY, 0.7);
  for (let v = 1; v <= 3; v++) {
    const t = v * 0.22;
    const vx = cx + dx * s * t;
    const vy = cy + dy * s * t;
    const vl = s * 0.4 * (1 - t * 0.4);
    o += P(`M${vx} ${vy} Q${vx + nx * vl * 0.5 + dx * vl * 0.2} ${vy + ny * vl * 0.5 + dy * vl * 0.2} ${vx + nx * vl} ${vy + ny * vl}`, 0.5);
    o += P(`M${vx} ${vy} Q${vx - nx * vl * 0.5 + dx * vl * 0.2} ${vy - ny * vl * 0.5 + dy * vl * 0.2} ${vx - nx * vl} ${vy - ny * vl}`, 0.5);
  }
  return o;
}

function curlingTendril(x: number, y: number, length: number, angle: number, curlDir: number, r: () => number): string {
  const a = (angle * Math.PI) / 180;
  const cp1x = x + Math.cos(a) * length * 0.4 + Math.cos(a + Math.PI / 2) * length * 0.2 * curlDir;
  const cp1y = y + Math.sin(a) * length * 0.4 + Math.sin(a + Math.PI / 2) * length * 0.2 * curlDir;
  const endX = x + Math.cos(a) * length * 0.7;
  const endY = y + Math.sin(a) * length * 0.7;
  let o = P(`M${x} ${y} Q${cp1x} ${cp1y} ${endX} ${endY}`, 0.8);
  const curlR = length * 0.15;
  const cStart = endX + Math.cos(a) * curlR * 0.3;
  const cStartY = endY + Math.sin(a) * curlR * 0.3;
  o += P(`M${cStart} ${cStartY} C${endX + Math.cos(a + 0.5 * curlDir) * curlR * 2} ${endY + Math.sin(a + 0.5 * curlDir) * curlR * 2} ${endX + Math.cos(a + 2 * curlDir) * curlR} ${endY + Math.sin(a + 2 * curlDir) * curlR} ${endX + Math.cos(a + 2.5 * curlDir) * curlR * 0.5} ${endY + Math.sin(a + 2.5 * curlDir) * curlR * 0.5}`, 0.6);
  return o;
}

function generateIvyBorder(r: () => number): string {
  let o = "";

  for (const side of [-1, 1]) {
    const x = side === -1 ? 20 : SIZE - 20;
    const segs = ri(r, 10, 16);
    let d = `M${x} ${SIZE}`;
    for (let i = 0; i < segs; i++) {
      const y = SIZE - (i / segs) * SIZE;
      const cx2 = x + side * rr(r, 20, 45);
      d += ` C${cx2} ${y + rr(r, 12, 28)} ${cx2} ${y - rr(r, 12, 28)} ${x} ${y}`;
    }
    o += P(d, 3);
    o += P(d, 0.8);

    for (let i = 0; i < segs * 2; i++) {
      const y = SIZE - (i / (segs * 2)) * SIZE;
      const dir = side * (i % 2 === 0 ? 1 : -1);
      const leafAngle = dir * rr(r, 30, 70) + (dir > 0 ? 0 : 180);
      o += heartIvyLeaf(x, y, rr(r, 10, 20), leafAngle);
      if (r() > 0.4) {
        o += curlingTendril(x, y, rr(r, 15, 30), leafAngle + rr(r, -30, 30), r() > 0.5 ? 1 : -1, r);
      }
    }
  }

  const segs = ri(r, 6, 10);
  let d = `M0 ${SIZE - 18}`;
  for (let i = 0; i <= segs; i++) {
    const x = (i / segs) * SIZE;
    const y = SIZE - 18 + rr(r, -15, 15);
    d += ` C${x - SIZE / segs * 0.3} ${y + rr(r, -6, 6)} ${x + SIZE / segs * 0.3} ${y + rr(r, -6, 6)} ${x} ${y}`;
  }
  o += P(d, 2.5);
  o += P(d, 0.6);

  for (let i = 0; i < segs * 2; i++) {
    const x = rr(r, 25, SIZE - 25);
    const y = SIZE - 18 + rr(r, -12, 12);
    const dir = r() > 0.5 ? 1 : -1;
    const leafAngle = dir * rr(r, 30, 70) + (dir > 0 ? 270 : 90);
    o += heartIvyLeaf(x, y, rr(r, 7, 15), leafAngle);
    if (r() > 0.5) {
      o += curlingTendril(x, y, rr(r, 10, 22), leafAngle + rr(r, -25, 25), r() > 0.5 ? 1 : -1, r);
    }
  }

  return o;
}

export function generateColoringPage(categoryId: string, addIvy: boolean, seed: number, customPrompt?: string): string {
  let finalSeed = seed;
  if (customPrompt && categoryId === "custom") {
    finalSeed = seed + hashText(customPrompt);
  }

  const r = rng(finalSeed);
  const gen = generators[categoryId];

  if (!gen) {
    return "";
  }

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIZE} ${SIZE}" width="${SIZE}" height="${SIZE}">`;
  svg += `<rect width="${SIZE}" height="${SIZE}" fill="white"/>`;
  svg += gen(r);

  if (addIvy) {
    svg += generateIvyBorder(r);
  }

  svg += `</svg>`;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}
