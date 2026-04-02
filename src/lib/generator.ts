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

function hatch(cx: number, cy: number, w: number, h: number, spacing: number, angle: number, sw = 0.6) {
  let o = "";
  const diag = Math.sqrt(w * w + h * h);
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  for (let i = -diag; i <= diag; i += spacing) {
    o += L(cx + i * cos - diag * sin, cy + i * sin + diag * cos, cx + i * cos + diag * sin, cy + i * sin - diag * cos, sw);
  }
  return o;
}

function crossHatch(cx: number, cy: number, w: number, h: number, spacing: number, sw = 0.5) {
  return hatch(cx, cy, w, h, spacing, 0, sw) + hatch(cx, cy, w, h, spacing, Math.PI / 2, sw);
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

function dahlia(cx: number, cy: number, size: number, r: () => number) {
  let o = "";
  const rings = ri(r, 5, 8);
  for (let ring = rings; ring >= 1; ring--) {
    const rr2 = (ring / rings) * size;
    const petals = ri(r, 8, 16);
    for (let p = 0; p < petals; p++) {
      const a = (p / petals) * 360 + ring * 17;
      const plen = rr2 * rr(r, 0.2, 0.35);
      o += P(petalPath(cx + Math.cos((a * Math.PI) / 180) * rr2 * 0.3, cy + Math.sin((a * Math.PI) / 180) * rr2 * 0.3, plen, a, plen * 0.3), 1);
    }
  }
  o += dotFillCircle(cx, cy, size * 0.15, 6, r, 1.2);
  o += C2(cx, cy, size * 0.15, 2);
  return o;
}

function sunflower(cx: number, cy: number, size: number, r: () => number) {
  let o = "";
  const petals = ri(r, 16, 28);
  for (let p = 0; p < petals; p++) {
    const a = (p / petals) * 360 + rr(r, -5, 5);
    o += P(petalPath(cx, cy, size, a, size * 0.15), 1.5);
    o += P(petalPath(cx, cy, size * 0.85, a, size * 0.1), 0.5);
  }
  o += C2(cx, cy, size * 0.28, 2.5);
  o += C2(cx, cy, size * 0.24, 1);
  o += dotFillCircle(cx, cy, size * 0.24, 4, r, 1.5);
  const spirals = ri(r, 8, 14);
  for (let s = 0; s < spirals; s++) {
    const a = (s / spirals) * Math.PI * 2;
    for (let t = 0; t < 5; t++) {
      const d = size * 0.05 + t * size * 0.04;
      const ang = a + t * 0.4;
      o += dot(cx + Math.cos(ang) * d, cy + Math.sin(ang) * d, 1.8);
    }
  }
  return o;
}

function lily(cx: number, cy: number, size: number, r: () => number) {
  let o = "";
  const petals = ri(r, 5, 8);
  for (let p = 0; p < petals; p++) {
    const a = (p / petals) * 360;
    o += P(petalPath(cx, cy, size, a, size * 0.4), 2);
    o += L(cx, cy, cx + Math.cos((a * Math.PI) / 180) * size * 0.9, cy + Math.sin((a * Math.PI) / 180) * size * 0.9, 0.8);
    for (let v = 1; v <= 3; v++) {
      const t = v * 0.2;
      const vx = cx + Math.cos((a * Math.PI) / 180) * size * t;
      const vy = cy + Math.sin((a * Math.PI) / 180) * size * t;
      const vl = size * 0.12 * (1 - t);
      const perp = ((a + 90) * Math.PI) / 180;
      o += P(`M${vx} ${vy} Q${vx + Math.cos(perp) * vl} ${vy + Math.sin(perp) * vl} ${vx + Math.cos(((a + 40) * Math.PI) / 180) * vl} ${vy + Math.sin(((a + 40) * Math.PI) / 180) * vl}`, 0.6);
      o += P(`M${vx} ${vy} Q${vx - Math.cos(perp) * vl} ${vy - Math.sin(perp) * vl} ${vx + Math.cos(((a - 40) * Math.PI) / 180) * vl} ${vy + Math.sin(((a - 40) * Math.PI) / 180) * vl}`, 0.6);
    }
  }
  o += C2(cx, cy, size * 0.08, 2);
  const stamens = ri(r, 4, 7);
  for (let s = 0; s < stamens; s++) {
    const a = (s / stamens) * Math.PI * 2;
    const sl = size * rr(r, 0.15, 0.3);
    o += L(cx, cy, cx + Math.cos(a) * sl, cy + Math.sin(a) * sl, 1);
    o += dot(cx + Math.cos(a) * sl, cy + Math.sin(a) * sl, 2.5);
  }
  return o;
}

function chrysanthemum(cx: number, cy: number, size: number, r: () => number) {
  let o = "";
  const layers = ri(r, 3, 5);
  for (let l = 0; l < layers; l++) {
    const lr = size * (0.5 + l * 0.17);
    const petals = ri(r, 14, 24);
    const pw = lr * rr(r, 0.06, 0.12);
    for (let p = 0; p < petals; p++) {
      const a = (p / petals) * 360 + l * 8;
      o += P(petalPath(cx, cy, lr, a, pw), 1);
    }
  }
  o += C2(cx, cy, size * 0.12, 2);
  o += dotFillCircle(cx, cy, size * 0.1, 5, r, 1.2);
  return o;
}

function flowerHead(cx: number, cy: number, size: number, r: () => number) {
  return pick(r, [rose, dahlia, sunflower, lily, chrysanthemum])(cx, cy, size, r);
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

function stem(x1: number, y1: number, x2: number, y2: number, curve: number, r: () => number) {
  let o = "";
  const mx = (x1 + x2) / 2 + curve;
  const my = (y1 + y2) / 2;
  o += P(`M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`, 2.5);
  o += P(`M${x1 + 1} ${y1 + 1} Q${mx + 1} ${my + 1} ${x2 + 1} ${y2 + 1}`, 0.5);
  return o;
}

function pitbullHead(cx: number, cy: number, sc: number, facing: number, expression: number, earType: number, r: () => number): string {
  let o = `<g transform="translate(${cx},${cy}) scale(${sc * facing},${sc})">`;
  const hw = 52, hh = 48;

  o += P(`M${-hw} 0 C${-hw - 8} ${-hh * 0.5} ${-hw - 4} ${-hh - 5} ${-hw * 0.6} ${-hh - 10} C${-hw * 0.2} ${-hh - 16} ${hw * 0.2} ${-hh - 16} ${hw * 0.6} ${-hh - 10} C${hw + 4} ${-hh - 5} ${hw + 8} ${-hh * 0.5} ${hw} 0 C${hw + 2} ${hh * 0.3} ${hw - 5} ${hh * 0.7} ${hw * 0.7} ${hh} C${hw * 0.3} ${hh + 6} ${-hw * 0.3} ${hh + 6} ${-hw * 0.7} ${hh} C${-hw + 5} ${hh * 0.7} ${-hw - 2} ${hh * 0.3} ${-hw} 0Z`, 2.8);
  o += P(`M${-hw + 2} 0 C${-hw - 6} ${-hh * 0.48} ${-hw - 2} ${-hh - 3} ${-hw * 0.58} ${-hh - 8} C${-hw * 0.18} ${-hh - 14} ${hw * 0.18} ${-hh - 14} ${hw * 0.58} ${-hh - 8} C${hw + 2} ${-hh - 3} ${hw + 6} ${-hh * 0.48} ${hw - 2} 0 C${hw} ${hh * 0.28} ${hw - 7} ${hh * 0.68} ${hw * 0.68} ${hh - 2} C${hw * 0.28} ${hh + 4} ${-hw * 0.28} ${hh + 4} ${-hw * 0.68} ${hh - 2} C${-hw + 7} ${hh * 0.68} ${-hw} ${hh * 0.28} ${-hw + 2} 0Z`, 0.8);

  o += dotFill(0, -hh * 0.2, hw * 1.6, hh * 1.6, 35, r, 0.5);

  o += P(`M${-hw * 0.4} ${-hh - 12} C${-hw * 0.5} ${-hh - 28} ${-hw * 0.25} ${-hh - 42} ${-hw * 0.05} ${-hh - 38} C${hw * 0.05} ${-hh - 34} ${-hw * 0.08} ${-hh - 18} ${-hw * 0.15} ${-hh - 6}`, 2.2);
  o += P(`M${hw * 0.4} ${-hh - 12} C${hw * 0.5} ${-hh - 28} ${hw * 0.25} ${-hh - 42} ${hw * 0.05} ${-hh - 38} C${-hw * 0.05} ${-hh - 34} ${hw * 0.08} ${-hh - 18} ${hw * 0.15} ${-hh - 6}`, 2.2);

  if (earType === 0) {
    o += P(`M${-hw * 0.65} ${-hh * 0.8} C${-hw * 0.85} ${-hh * 1.5} ${-hw * 0.5} ${-hh * 1.8} ${-hw * 0.3} ${-hh * 1.3} C${-hw * 0.2} ${-hh * 1.0} ${-hw * 0.35} ${-hh * 0.75} ${-hw * 0.5} ${-hh * 0.7}`, 2);
    o += P(`M${-hw * 0.63} ${-hh * 0.82} C${-hw * 0.8} ${-hh * 1.4} ${-hw * 0.48} ${-hh * 1.7} ${-hw * 0.32} ${-hh * 1.25}`, 0.7);
    o += dotFill(-hw * 0.5, -hh * 1.2, 18, 22, 10, r, 0.6);
    o += P(`M${hw * 0.65} ${-hh * 0.8} C${hw * 0.85} ${-hh * 1.5} ${hw * 0.5} ${-hh * 1.8} ${hw * 0.3} ${-hh * 1.3} C${hw * 0.2} ${-hh * 1.0} ${hw * 0.35} ${-hh * 0.75} ${hw * 0.5} ${-hh * 0.7}`, 2);
    o += P(`M${hw * 0.63} ${-hh * 0.82} C${hw * 0.8} ${-hh * 1.4} ${hw * 0.48} ${-hh * 1.7} ${hw * 0.32} ${-hh * 1.25}`, 0.7);
    o += dotFill(hw * 0.5, -hh * 1.2, 18, 22, 10, r, 0.6);
  } else if (earType === 1) {
    o += P(`M${-hw * 0.6} ${-hh * 0.85} C${-hw * 0.65} ${-hh * 1.1} ${-hw * 0.55} ${-hh * 1.3} ${-hw * 0.35} ${-hh * 1.1} C${-hw * 0.25} ${-hh * 0.95} ${-hw * 0.3} ${-hh * 0.8} ${-hw * 0.45} ${-hh * 0.75}`, 2.5);
    o += P(`M${-hw * 0.58} ${-hh * 0.87} C${-hw * 0.62} ${-hh * 1.05} ${-hw * 0.53} ${-hh * 1.22} ${-hw * 0.37} ${-hh * 1.05}`, 0.8);
    o += P(`M${hw * 0.6} ${-hh * 0.85} C${hw * 0.65} ${-hh * 1.1} ${hw * 0.55} ${-hh * 1.3} ${hw * 0.35} ${-hh * 1.1} C${hw * 0.25} ${-hh * 0.95} ${hw * 0.3} ${-hh * 0.8} ${hw * 0.45} ${-hh * 0.75}`, 2.5);
    o += P(`M${hw * 0.58} ${-hh * 0.87} C${hw * 0.62} ${-hh * 1.05} ${hw * 0.53} ${-hh * 1.22} ${hw * 0.37} ${-hh * 1.05}`, 0.8);
  } else {
    o += P(`M${-hw * 0.6} ${-hh * 0.8} C${-hw * 0.75} ${-hh * 1.3} ${-hw * 0.65} ${-hh * 1.7} ${-hw * 0.4} ${-hh * 1.5} C${-hw * 0.2} ${-hh * 1.3} ${-hw * 0.25} ${-hh * 0.9} ${-hw * 0.4} ${-hh * 0.75}`, 2.2);
    o += P(`M${-hw * 0.58} ${-hh * 0.82} C${-hw * 0.72} ${-hh * 1.25} ${-hw * 0.62} ${-hh * 1.6} ${-hw * 0.42} ${-hh * 1.45}`, 0.7);
    o += dotFill(-hw * 0.5, -hh * 1.2, 15, 25, 10, r, 0.5);
    o += P(`M${hw * 0.6} ${-hh * 0.8} C${hw * 0.75} ${-hh * 1.3} ${hw * 0.65} ${-hh * 1.7} ${hw * 0.4} ${-hh * 1.5} C${hw * 0.2} ${-hh * 1.3} ${hw * 0.25} ${-hh * 0.9} ${hw * 0.4} ${-hh * 0.75}`, 2.2);
    o += P(`M${hw * 0.58} ${-hh * 0.82} C${hw * 0.72} ${-hh * 1.25} ${hw * 0.62} ${-hh * 1.6} ${hw * 0.42} ${-hh * 1.45}`, 0.7);
    o += dotFill(hw * 0.5, -hh * 1.2, 15, 25, 10, r, 0.5);
  }

  for (const s of [-1, 1]) {
    const ex = s * 20, ey = -12;
    o += E(ex, ey, 10, 11, 2);
    o += E(ex, ey, 7, 8, 0.8);
    o += C2(ex, ey + 1, 5.5, 2);
    o += C2(ex, ey + 1, 2.5, 1.2);
    o += dot(ex - 2, ey - 3, 2.2);
    o += dot(ex + 1, ey - 1, 0.8);
    for (let l = 0; l < ri(r, 4, 7); l++) {
      const la = -Math.PI * 0.8 + (l / 6) * Math.PI * 0.55;
      o += P(`M${ex + Math.cos(la) * 10} ${ey + Math.sin(la) * 11} Q${ex + Math.cos(la) * 18} ${ey + Math.sin(la) * 17} ${ex + Math.cos(la) * 24} ${ey + Math.sin(la) * 15}`, 0.6);
    }
    for (let b = 0; b < ri(r, 3, 6); b++) {
      const ba = -Math.PI * 0.65 + (b / 5) * Math.PI * 0.45;
      o += P(`M${ex + Math.cos(ba) * 12} ${ey - 6 + Math.sin(ba) * 8} L${ex + Math.cos(ba) * 18} ${ey - 10 + Math.sin(ba) * 12}`, 0.5);
    }
  }

  const browW = rr(r, 14, 20);
  if (expression === 0) {
    o += P(`M${-browW} ${-30} C${-browW + 5} ${-34} ${-5} ${-35} 0 ${-33}`, 1.8);
    o += P(`M${browW} ${-30} C${browW - 5} ${-34} ${5} ${-35} 0 ${-33}`, 1.8);
  } else if (expression === 1) {
    o += P(`M${-browW} ${-28} C${-browW + 5} ${-32} ${-5} ${-33} 0 ${-31}`, 1.8);
    o += P(`M${browW} ${-28} C${browW - 5} ${-32} ${5} ${-33} 0 ${-31}`, 1.8);
  } else {
    o += P(`M${-browW} ${-32} Q${-browW + 5} ${-28} 0 ${-29}`, 1.8);
    o += P(`M${browW} ${-32} Q${browW - 5} ${-28} 0 ${-29}`, 1.8);
  }

  o += P(`M${-hw * 0.35} ${-hh * 0.35} C${-hw * 0.4} ${-hh * 0.55} ${-hw * 0.25} ${-hh * 0.65} 0 ${-hh * 0.6} C${hw * 0.25} ${-hh * 0.65} ${hw * 0.4} ${-hh * 0.55} ${hw * 0.35} ${-hh * 0.35}`, 1);
  for (let w = 0; w < ri(r, 5, 10); w++) {
    const wy = -hh * 0.55 + w * 3;
    const ww = rr(r, 15, 30);
    o += P(`M${-ww} ${wy} C${-ww * 0.3} ${wy + rr(r, 1, 4)} ${ww * 0.3} ${wy + rr(r, 1, 4)} ${ww} ${wy}`, 0.6);
  }

  o += P(`M-18 12 C-14 22 14 22 18 12 C22 22 18 32 0 35 C-18 32 -22 22 -18 12`, 2.2);
  o += P(`M-16 14 C-12 22 12 22 16 14`, 0.7);
  o += P(`M0 15 L0 33`, 0.7);
  for (let n = 0; n < ri(r, 4, 8); n++) {
    o += dot(rr(r, -10, 10), rr(r, 18, 30), rr(r, 0.4, 1));
  }
  o += P(`M0 35 C-4 38 -8 37 -10 40`, 1.3);
  o += P(`M0 35 C4 38 8 37 10 40`, 1.3);

  const mouthOpen = ri(r, 0, 3);
  if (mouthOpen === 0) {
    o += P(`M-25 38 C-10 48 10 48 25 38`, 2);
    o += P(`M-22 40 C-10 46 10 46 22 40`, 0.8);
    o += P(`M-20 42 C-12 52 12 52 20 42`, 1);
    o += P(`M-18 44 Q0 50 18 44`, 0.6);
    if (r() > 0.4) {
      o += P(`M-8 44 L-5 50 L0 44 L5 50 L8 44`, 0.7);
    }
  } else if (mouthOpen === 1) {
    o += P(`M-25 38 C-10 44 10 44 25 38`, 2);
    o += P(`M-22 40 C-10 43 10 43 22 40`, 0.8);
  } else {
    o += P(`M-25 38 C-12 50 12 50 25 38`, 2.2);
    o += P(`M-23 40 C-12 48 12 48 23 40`, 0.8);
    o += P(`M-22 43 C-10 52 10 52 22 43`, 1.2);
    o += P(`M-15 45 Q0 49 15 45`, 0.6);
    o += dotFill(0, 47, 18, 8, 12, r, 0.7);
  }

  for (const s of [-1, 1]) {
    for (let w = 0; w < ri(r, 6, 12); w++) {
      const wa = (s > 0 ? -0.1 : Math.PI - 0.1) + rr(r, -0.3, 0.3);
      const wl = rr(r, 18, 35);
      const wx = s * 22 + Math.cos(wa) * rr(r, 2, 6);
      const wy = 35 + Math.sin(wa) * rr(r, 2, 6);
      o += P(`M${wx} ${wy} C${wx + Math.cos(wa) * wl * 0.3} ${wy + Math.sin(wa) * wl * 0.3 - 3} ${wx + Math.cos(wa) * wl * 0.7} ${wy + Math.sin(wa) * wl * 0.7 - 2} ${wx + Math.cos(wa) * wl} ${wy + Math.sin(wa) * wl}`, 0.5);
      o += dot(wx + Math.cos(wa) * wl, wy + Math.sin(wa) * wl, 0.8);
    }
  }

  const wrinkleCount = ri(r, 2, 5);
  for (let w = 0; w < wrinkleCount; w++) {
    const wy = -hh * 0.8 + w * 8;
    const ww = rr(r, 15, 25);
    o += P(`M${-ww} ${wy} Q0 ${wy + rr(r, 2, 5)} ${ww} ${wy}`, 0.5);
  }

  o += `</g>`;
  return o;
}

function pitbullBody(cx: number, cy: number, sc: number, pose: number, facing: number, r: () => number): string {
  let o = `<g transform="translate(${cx},${cy}) scale(${sc * facing},${sc})">`;

  if (pose === 0) {
    o += P(`M-95 0 C-115 -20 -120 -55 -100 -80 C-80 -100 -30 -115 0 -118 C30 -115 80 -100 100 -80 C120 -55 115 -20 95 0 C85 30 70 70 55 100 L-55 100 C-70 70 -85 30 -95 0Z`, 2.8);
    o += P(`M-93 0 C-113 -18 -118 -53 -98 -78 C-78 -98 -28 -113 0 -116 C28 -113 78 -98 98 -78 C118 -53 113 -18 93 0 C83 28 68 68 53 98 L-53 98 C-68 68 -83 28 -93 0Z`, 0.8);
    o += dotFill(0, -30, 160, 120, 35, r, 0.5);
    o += P(`M-65 95 C-75 110 -70 130 -60 140 C-50 148 -38 148 -33 140 L-33 125 C-42 120 -50 115 -55 105 C-58 98 -62 95 -65 95`, 2.5);
    o += P(`M65 95 C75 110 70 130 60 140 C50 148 38 148 33 140 L33 125 C42 120 50 115 55 105 C58 98 62 95 65 95`, 2.5);
    o += P(`M-63 97 C-73 112 -68 128 -58 138`, 0.8);
    o += P(`M63 97 C73 112 68 128 58 138`, 0.8);
    for (const s of [-1, 1]) {
      for (let t = 0; t < ri(r, 2, 4); t++) {
        const tx = s * (40 + t * 10);
        o += E(tx, 145, 5, 10, 1.2);
      }
    }
    o += P(`M-52 100 C-52 104 -42 107 -30 107 C-15 107 15 107 30 107 C42 107 52 104 52 100`, 1.3);
  } else if (pose === 1) {
    o += P(`M-85 -10 C-105 -30 -110 -65 -90 -85 C-70 -100 -25 -110 0 -112 C25 -110 70 -100 90 -85 C110 -65 105 -30 85 -10 C75 15 60 50 45 75 L-45 75 C-60 50 -75 15 -85 -10Z`, 2.8);
    o += dotFill(0, -25, 150, 100, 35, r, 0.5);
    o += P(`M-60 70 C-72 90 -65 120 -50 135 C-40 145 -25 145 -22 135 L-22 118 C-32 112 -42 105 -48 92`, 2.5);
    o += P(`M60 70 C72 90 65 120 50 135 C40 145 25 145 22 135 L22 118 C32 112 42 105 48 92`, 2.5);
    o += P(`M-75 75 C-105 65 -130 50 -145 60 C-155 70 -145 85 -125 88 C-110 90 -90 82 -75 75`, 3);
    o += P(`M-75 75 C-100 67 -125 55 -140 62`, 1);
    o += P(`M-125 62 C-122 58 -118 60 -120 65`, 0.8);
  } else if (pose === 2) {
    o += P(`M-100 20 C-120 0 -118 -30 -95 -55 C-70 -75 -20 -85 0 -87 C20 -85 70 -75 95 -55 C118 -30 120 0 100 20 C88 45 70 65 50 78 L-50 78 C-70 65 -88 45 -100 20Z`, 2.8);
    o += dotFill(0, -10, 170, 80, 35, r, 0.5);
    o += P(`M-80 60 C-100 70 -110 90 -105 105 L-95 95`, 2.5);
    o += P(`M80 60 C100 70 110 90 105 105 L95 95`, 2.5);
    o += E(-95, 108, 20, 12, 1.5);
    o += E(95, 108, 20, 12, 1.5);
    o += P(`M-75 55 C-100 30 -115 10 -110 -10 C-105 -25 -95 -20 -85 -5`, 3);
    o += P(`M-108 -8 C-112 -18 -105 -25 -100 -15`, 1.5);
    o += P(`M-75 40 C-95 25 -110 15 -108 5`, 1);
  } else if (pose === 3) {
    o += P(`M-70 -20 C-90 -45 -85 -80 -60 -100 C-35 -115 35 -115 60 -100 C85 -80 90 -45 70 -20 C60 10 45 45 30 70 L-30 70 C-45 45 -60 10 -70 -20Z`, 2.8);
    o += dotFill(0, -25, 120, 90, 35, r, 0.5);
    o += P(`M-40 65 C-50 80 -45 100 -35 110 L-30 100`, 2.5);
    o += P(`M40 65 C50 80 45 100 35 110 L30 100`, 2.5);
    o += P(`M-55 55 C-80 45 -100 25 -110 35 C-118 45 -108 60 -90 62 C-75 63 -60 58 -55 55`, 3);
    o += P(`M-88 38 C-85 32 -80 35 -82 40`, 0.8);
  } else if (pose === 4) {
    o += P(`M-80 0 C-100 -25 -95 -60 -70 -85 C-45 -105 45 -105 70 -85 C95 -60 100 -25 80 0 C70 30 55 65 40 90 L-40 90 C-55 65 -70 30 -80 0Z`, 2.8);
    o += dotFill(0, -20, 140, 100, 35, r, 0.5);
    o += P(`M-55 85 C-65 100 -60 130 -48 145 C-38 155 -25 155 -22 145 L-22 130 C-32 125 -42 115 -48 105`, 2.5);
    o += P(`M55 85 C65 100 60 130 48 145 C38 155 25 155 22 145 L22 130 C32 125 42 115 48 105`, 2.5);
    o += P(`M40 40 C70 20 100 -10 130 -5 C150 0 145 25 120 35 C100 42 70 40 50 38`, 3.5);
    o += P(`M40 40 C65 22 95 -5 125 -2`, 1.2);
  } else if (pose === 5) {
    o += P(`M-60 -10 C-75 -35 -70 -70 -50 -90 C-30 -105 30 -105 50 -90 C70 -70 75 -35 60 -10 C50 15 38 50 25 75 L-25 75 C-38 50 -50 15 -60 -10Z`, 2.8);
    o += dotFill(0, -15, 100, 85, 35, r, 0.5);
    o += P(`M-35 70 C-42 85 -38 105 -30 115 L-27 105`, 2.5);
    o += P(`M35 70 C42 85 38 105 30 115 L27 105`, 2.5);
    o += P(`M-50 55 C-70 40 -85 20 -95 30 C-102 38 -93 52 -78 55 C-65 57 -55 55 -50 55`, 3);
    o += P(`M50 55 C70 40 85 20 95 30 C102 38 93 52 78 55 C65 57 55 55 50 55`, 3);
    o += P(`M-93 33 C-90 28 -85 31 -87 36`, 0.8);
    o += P(`M93 33 C90 28 85 31 87 36`, 0.8);
    o += P(`M-45 -85 C-55 -105 -45 -130 -35 -120 C-28 -112 -30 -90 -42 -80`, 2);
    o += P(`M45 -85 C55 -105 45 -130 35 -120 C28 -112 30 -90 42 -80`, 2);
  } else if (pose === 6) {
    o += P(`M-90 -5 C-110 -25 -108 -58 -85 -78 C-60 -95 -15 -105 0 -107 C15 -105 60 -95 85 -78 C108 -58 110 -25 90 -5 C80 20 65 55 50 80 L-50 80 C-65 55 -80 20 -90 -5Z`, 2.8);
    o += dotFill(0, -15, 155, 90, 35, r, 0.5);
    o += P(`M-55 75 C-55 85 -42 90 -30 90 C-15 90 15 90 30 90 C42 90 55 85 55 75`, 1.5);
    o += P(`M-60 75 C-80 85 -100 80 -115 90`, 2.5);
    o += P(`M60 75 C70 85 80 95 85 110 C88 120 80 125 70 120 C62 116 58 108 60 100`, 2.5);
    o += P(`M85 110 C90 118 82 125 72 120`, 0.8);
  } else if (pose === 7) {
    o += P(`M-85 10 C-105 -15 -102 -50 -80 -72 C-55 -90 -15 -100 0 -102 C15 -100 55 -90 80 -72 C102 -50 105 -15 85 10 C75 35 60 68 45 92 L-45 92 C-60 68 -75 35 -85 10Z`, 2.8);
    o += dotFill(0, -10, 145, 95, 35, r, 0.5);
    o += P(`M-50 87 C-58 100 -53 120 -43 130 L-40 118`, 2.5);
    o += P(`M50 87 C58 100 53 120 43 130 L40 118`, 2.5);
    o += P(`M45 30 C65 15 85 -5 105 0 C120 5 118 25 100 32 C85 37 65 35 50 33`, 3.5);
    o += P(`M80 -2 C78 -8 72 -5 75 0`, 0.8);
    o += P(`M-45 92 C-42 98 -35 100 -30 100 C-15 100 15 100 30 100 C35 100 42 98 45 92`, 1.2);
  } else if (pose === 8) {
    o += P(`M-75 -15 C-92 -40 -88 -72 -65 -92 C-42 -108 42 -108 65 -92 C88 -72 92 -40 75 -15 C65 12 52 48 38 72 L-38 72 C-52 48 -65 12 -75 -15Z`, 2.8);
    o += dotFill(0, -18, 130, 85, 35, r, 0.5);
    o += P(`M-45 68 C-52 80 -48 98 -40 108 L-37 98`, 2.5);
    o += P(`M45 68 C52 80 48 98 40 108 L37 98`, 2.5);
    o += P(`M-58 50 C-78 35 -95 15 -105 25 C-112 33 -103 47 -88 50 C-75 52 -63 52 -58 50`, 3);
    o += P(`M58 50 C78 35 95 15 105 25 C112 33 103 47 88 50 C75 52 63 52 58 50`, 3);
    o += P(`M-45 -88 C-52 -108 -42 -125 -32 -118 C-25 -112 -28 -92 -40 -85`, 2);
    o += P(`M45 -88 C52 -108 42 -125 32 -118 C25 -112 28 -92 40 -85`, 2);
  } else if (pose === 9) {
    o += P(`M-90 -20 C-112 -50 -105 -85 -80 -105 C-55 -120 -15 -128 0 -130 C15 -128 55 -120 80 -105 C105 -85 112 -50 90 -20 C78 10 60 50 45 80 L-45 80 C-60 50 -78 10 -90 -20Z`, 2.8);
    o += dotFill(0, -30, 150, 100, 35, r, 0.5);
    o += P(`M-50 75 C-55 88 -50 108 -42 118 L-40 108`, 2.5);
    o += P(`M50 75 C55 88 50 108 42 118 L40 108`, 2.5);
    for (const s of [-1, 1]) {
      o += P(`M${s * 50} ${-125} C${s * 55} ${-145} ${s * 48} ${-160} ${s * 40} ${-155} C${s * 34} ${-150} ${s * 36} ${-132} ${s * 45} ${-125}`, 2);
    }
    o += P(`M-50 -85 C-60 -110 -50 -140 -40 -132 C-33 -125 -35 -100 -48 -90`, 2.5);
    o += P(`M50 -85 C60 -110 50 -140 40 -132 C33 -125 35 -100 48 -90`, 2.5);
  } else {
    o += P(`M-80 15 C-100 -10 -95 -45 -72 -68 C-48 -85 -12 -95 0 -97 C12 -95 48 -85 72 -68 C95 -45 100 -10 80 15 C68 40 55 70 40 95 L-40 95 C-55 70 -68 40 -80 15Z`, 2.8);
    o += dotFill(0, -5, 140, 90, 35, r, 0.5);
    o += P(`M-45 90 C-50 102 -45 118 -38 128 L-36 118`, 2.5);
    o += P(`M45 90 C50 102 45 118 38 128 L36 118`, 2.5);
    o += P(`M-60 55 C-80 42 -95 25 -105 35 C-112 43 -103 57 -88 60 C-75 62 -65 58 -60 55`, 3);
    o += P(`M60 55 C80 42 95 25 105 35 C112 43 103 57 88 60 C75 62 65 58 60 55`, 3);
    o += P(`M-95 38 C-92 32 -88 35 -90 40`, 0.8);
    o += P(`M95 38 C92 32 88 35 90 40`, 0.8);
  }

  o += `</g>`;
  return o;
}

function pitbullCollar(cx: number, cy: number, sc: number, r: () => number): string {
  let o = "";
  const collarType = ri(r, 0, 5);
  if (collarType === 0) {
    o += P(`M${cx - 55 * sc} ${cy + 5 * sc} C${cx - 25 * sc} ${cy + 15 * sc} ${cx + 25 * sc} ${cy + 15 * sc} ${cx + 55 * sc} ${cy + 5 * sc}`, 3.5 * sc);
    o += P(`M${cx - 50 * sc} ${cy + 8 * sc} C${cx - 22 * sc} ${cy + 17 * sc} ${cx + 22 * sc} ${cy + 17 * sc} ${cx + 50 * sc} ${cy + 8 * sc}`, 1.2 * sc);
    o += C2(cx, cy + 18 * sc, 7 * sc, 2 * sc);
    o += C2(cx, cy + 18 * sc, 3 * sc, 1.5);
    o += P(`M${cx - 15 * sc} ${cy + 14 * sc} C${cx - 18 * sc} ${cy + 30 * sc} ${cx - 12 * sc} ${cy + 40 * sc} ${cx - 8 * sc} ${cy + 35 * sc}`, 1.5 * sc);
  } else if (collarType === 1) {
    o += P(`M${cx - 55 * sc} ${cy + 5 * sc} C${cx - 25 * sc} ${cy + 15 * sc} ${cx + 25 * sc} ${cy + 15 * sc} ${cx + 55 * sc} ${cy + 5 * sc}`, 5 * sc);
    o += P(`M${cx - 52 * sc} ${cy + 5 * sc} L${cx + 52 * sc} ${cy + 5 * sc}`, 0.5 * sc);
    o += P(`M${cx - 52 * sc} ${cy + 10 * sc} L${cx + 52 * sc} ${cy + 10 * sc}`, 0.5 * sc);
    o += P(`M${cx - 52 * sc} ${cy + 15 * sc} L${cx + 52 * sc} ${cy + 15 * sc}`, 0.5 * sc);
    o += C2(cx, cy + 18 * sc, 8 * sc, 2.5 * sc);
    o += C2(cx, cy + 18 * sc, 5 * sc, 0.8 * sc);
    o += P(`M${cx - 3 * sc} ${cy + 18 * sc} L${cx + 3 * sc} ${cy + 18 * sc} L${cx} ${cy + 13 * sc}Z`, 1 * sc);
  } else if (collarType === 2) {
    o += P(`M${cx - 55 * sc} ${cy + 3 * sc} C${cx - 25 * sc} ${cy + 13 * sc} ${cx + 25 * sc} ${cy + 13 * sc} ${cx + 55 * sc} ${cy + 3 * sc}`, 4 * sc);
    o += P(`M${cx - 50 * sc} ${cy + 6 * sc} C${cx - 22 * sc} ${cy + 15 * sc} ${cx + 22 * sc} ${cy + 15 * sc} ${cx + 50 * sc} ${cy + 6 * sc}`, 1 * sc);
    for (let s = 0; s < ri(r, 4, 8); s++) {
      const sx = cx + rr(r, -45, 45) * sc;
      const sy = cy + rr(r, 5, 14) * sc;
      o += P(`M${sx - 3 * sc} ${sy} L${sx} ${sy - 4 * sc} L${sx + 3 * sc} ${sy}`, 0.8 * sc);
    }
    o += C2(cx, cy + 16 * sc, 6 * sc, 2 * sc);
    o += dot(cx, cy + 16 * sc, 2.5 * sc);
  } else if (collarType === 3) {
    o += P(`M${cx - 55 * sc} ${cy + 5 * sc} C${cx - 25 * sc} ${cy + 15 * sc} ${cx + 25 * sc} ${cy + 15 * sc} ${cx + 55 * sc} ${cy + 5 * sc}`, 6 * sc);
    o += P(`M${cx - 48 * sc} ${cy + 8 * sc} L${cx + 48 * sc} ${cy + 8 * sc}`, 0.6 * sc);
    o += P(`M${cx - 48 * sc} ${cy + 12 * sc} L${cx + 48 * sc} ${cy + 12 * sc}`, 0.6 * sc);
    o += C2(cx, cy + 18 * sc, 9 * sc, 3 * sc);
    o += C2(cx, cy + 18 * sc, 7 * sc, 1 * sc);
    o += P(`M${cx - 5 * sc} ${cy + 16 * sc} L${cx} ${cy + 24 * sc} L${cx + 5 * sc} ${cy + 16 * sc}`, 1.5 * sc);
    o += P(`M${cx - 3 * sc} ${cy + 22 * sc} L${cx + 3 * sc} ${cy + 22 * sc}`, 0.8 * sc);
  } else if (collarType === 4) {
    o += P(`M${cx - 55 * sc} ${cy + 5 * sc} C${cx - 25 * sc} ${cy + 15 * sc} ${cx + 25 * sc} ${cy + 15 * sc} ${cx + 55 * sc} ${cy + 5 * sc}`, 3 * sc);
    o += P(`M${cx - 52 * sc} ${cy + 8 * sc} C${cx - 23 * sc} ${cy + 17 * sc} ${cx + 23 * sc} ${cy + 17 * sc} ${cx + 52 * sc} ${cy + 8 * sc}`, 0.8 * sc);
    o += P(`M${cx} ${cy + 12 * sc} C${cx - 12 * sc} ${cy + 8 * sc} ${cx - 15 * sc} ${cy + 22 * sc} ${cx - 5 * sc} ${cy + 28 * sc} C${cx} ${cy + 32 * sc} ${cx + 5 * sc} ${cy + 28 * sc} ${cx + 15 * sc} ${cy + 22 * sc} C${cx + 12 * sc} ${cy + 8 * sc} ${cx} ${cy + 12 * sc}`, 1.5 * sc);
    o += P(`M${cx - 8 * sc} ${cy + 20 * sc} C${cx - 5 * sc} ${cy + 25 * sc} ${cx + 5 * sc} ${cy + 25 * sc} ${cx + 8 * sc} ${cy + 20 * sc}`, 0.6 * sc);
  }
  return o;
}

function pitbullMarkings(cx: number, cy: number, sc: number, markType: number, r: () => number): string {
  let o = `<g transform="translate(${cx},${cy}) scale(${sc})">`;
  if (markType === 0) {
    for (let s = 0; s < ri(r, 8, 16); s++) {
      const sx = rr(r, -50, 50);
      const sy = rr(r, -50, 40);
      const sw = rr(r, 6, 22);
      const sh = rr(r, 5, 18);
      o += P(`M${sx - sw} ${sy} C${sx - sw} ${sy - sh * 0.6} ${sx + sw} ${sy - sh * 0.6} ${sx + sw} ${sy} C${sx + sw} ${sy + sh * 0.6} ${sx - sw} ${sy + sh * 0.6} ${sx - sw} ${sy}`, 1.2);
      o += dotFill(sx, sy, sw * 1.3, sh * 1.3, 18, r, 0.6);
    }
  } else if (markType === 1) {
    o += P(`M-25 -40 C-15 -55 15 -55 25 -40 C35 -25 30 -5 20 5 C10 15 -10 15 -20 5 C-30 -5 -35 -25 -25 -40`, 1.5);
    o += dotFill(0, -25, 35, 40, 15, r, 0.5);
  } else if (markType === 2) {
    for (let s = 0; s < ri(r, 5, 12); s++) {
      const sx = rr(r, -55, 55);
      const sy = rr(r, -55, 45);
      const sr = rr(r, 5, 18);
      o += C2(sx, sy, sr, 1.2);
      o += dotFill(sx, sy, sr * 1.5, sr * 1.5, 15, r, 0.5);
    }
  } else if (markType === 3) {
    for (let s = 0; s < ri(r, 15, 30); s++) {
      const sx = rr(r, -60, 60);
      const sy = rr(r, -60, 50);
      const sw = rr(r, 2, 6);
      const sh = rr(r, 8, 20);
      const a = rr(r, -30, 30);
      o += `<rect x="${sx - sw / 2}" y="${sy - sh / 2}" width="${sw}" height="${sh}" fill="none" stroke="${K}" stroke-width="0.8" transform="rotate(${a} ${sx} ${sy})"/>`;
    }
  } else if (markType === 4) {
    o += P(`M-30 -30 C-25 -50 25 -50 30 -30 C35 -10 25 10 15 15 C5 20 -5 20 -15 15 C-25 10 -35 -10 -30 -30`, 1.5);
    o += dotFill(0, -18, 40, 45, 12, r, 0.5);
  }
  o += `</g>`;
  return o;
}

function pitbullAccessories(cx: number, cy: number, sc: number, accType: number, r: () => number): string {
  let o = "";
  if (accType === 0) {
    o += P(`M${cx - 30 * sc} ${cy - 60 * sc} C${cx - 35 * sc} ${cy - 80 * sc} ${cx - 20 * sc} ${cy - 95 * sc} ${cx} ${cy - 85 * sc} C${cx + 20 * sc} ${cy - 95 * sc} ${cx + 35 * sc} ${cy - 80 * sc} ${cx + 30 * sc} ${cy - 60 * sc}`, 2.5 * sc);
    o += P(`M${cx - 25 * sc} ${cy - 62 * sc} C${cx - 28 * sc} ${cy - 75 * sc} ${cx - 15 * sc} ${cy - 85 * sc} ${cx} ${cy - 78 * sc} C${cx + 15 * sc} ${cy - 85 * sc} ${cx + 28 * sc} ${cy - 75 * sc} ${cx + 25 * sc} ${cy - 62 * sc}`, 0.8 * sc);
    o += P(`M${cx - 20 * sc} ${cy - 65 * sc} C${cx - 22 * sc} ${cy - 72 * sc} ${cx - 12 * sc} ${cy - 78 * sc} ${cx} ${cy - 73 * sc} C${cx + 12 * sc} ${cy - 78 * sc} ${cx + 22 * sc} ${cy - 72 * sc} ${cx + 20 * sc} ${cy - 65 * sc}`, 0.6 * sc);
  } else if (accType === 1) {
    o += P(`M${cx} ${cy - 50 * sc} L${cx - 20 * sc} ${cy - 65 * sc} L${cx} ${cy - 80 * sc} L${cx + 20 * sc} ${cy - 65 * sc} Z`, 2 * sc);
    o += P(`M${cx} ${cy - 55 * sc} L${cx} ${cy - 75 * sc}`, 0.8 * sc);
    o += P(`M${cx - 12 * sc} ${cy - 63 * sc} L${cx + 12 * sc} ${cy - 63 * sc}`, 0.8 * sc);
  } else if (accType === 2) {
    o += P(`M${cx - 25 * sc} ${cy - 55 * sc} C${cx - 28 * sc} ${cy - 70 * sc} ${cx - 15 * sc} ${cy - 82 * sc} ${cx} ${cy - 78 * sc} C${cx + 15 * sc} ${cy - 82 * sc} ${cx + 28 * sc} ${cy - 70 * sc} ${cx + 25 * sc} ${cy - 55 * sc}`, 2 * sc);
    o += P(`M${cx - 20 * sc} ${cy - 58 * sc} C${cx - 22 * sc} ${cy - 66 * sc} ${cx - 12 * sc} ${cy - 74 * sc} ${cx} ${cy - 71 * sc} C${cx + 12 * sc} ${cy - 74 * sc} ${cx + 22 * sc} ${cy - 66 * sc} ${cx + 20 * sc} ${cy - 58 * sc}`, 0.8 * sc);
    o += P(`M${cx - 15 * sc} ${cy - 60 * sc} L${cx + 15 * sc} ${cy - 60 * sc}`, 0.6 * sc);
    o += P(`M${cx - 15 * sc} ${cy - 64 * sc} L${cx + 15 * sc} ${cy - 64 * sc}`, 0.6 * sc);
    o += P(`M${cx - 15 * sc} ${cy - 68 * sc} L${cx + 15 * sc} ${cy - 68 * sc}`, 0.6 * sc);
  } else if (accType === 3) {
    o += P(`M${cx - 20 * sc} ${cy - 58 * sc} C${cx - 22 * sc} ${cy - 72 * sc} ${cx - 12 * sc} ${cy - 80 * sc} ${cx} ${cy - 76 * sc} C${cx + 12 * sc} ${cy - 80 * sc} ${cx + 22 * sc} ${cy - 72 * sc} ${cx + 20 * sc} ${cy - 58 * sc}`, 2.5 * sc);
    o += C2(cx, cy - 68 * sc, 5 * sc, 1.5 * sc);
    o += dot(cx, cy - 68 * sc, 2 * sc);
  }
  return o;
}

function pitbullBackground(r: () => number): string {
  let o = "";
  const groundY = rr(r, 850, 950);
  const groundType = ri(r, 0, 3);

  if (groundType === 0) {
    o += P(`M0 ${groundY} C100 ${groundY - 8} 200 ${groundY + 10} 350 ${groundY - 5} C500 ${groundY + 12} 650 ${groundY - 10} 800 ${groundY + 5} C900 ${groundY - 8} 1000 ${groundY + 6} 1024 ${groundY}`, 2);
    for (let g = 0; g < ri(r, 12, 25); g++) {
      const gx = rr(r, 20, 1004);
      const gy = groundY + rr(r, -8, 8);
      for (let b = 0; b < ri(r, 3, 7); b++) {
        const bh = rr(r, 15, 45);
        const bend = rr(r, -20, 20);
        o += P(`M${gx + b * 3} ${gy} C${gx + b * 3 + bend * 0.3} ${gy - bh * 0.4} ${gx + b * 3 + bend * 0.7} ${gy - bh * 0.8} ${gx + b * 3 + bend} ${gy - bh}`, 0.8);
      }
    }
  } else if (groundType === 1) {
    o += P(`M0 ${groundY} Q256 ${groundY + 15} 512 ${groundY} Q768 ${groundY - 15} 1024 ${groundY}`, 2);
    for (let c = 0; c < ri(r, 3, 6); c++) {
      const cx = rr(r, 100, 924);
      const cr = rr(r, 20, 40);
      o += P(`M${cx - cr} ${groundY} C${cx - cr} ${groundY - cr * 1.2} ${cx + cr} ${groundY - cr * 1.2} ${cx + cr} ${groundY}`, 1.5);
      o += dotFill(cx, groundY - cr * 0.4, cr * 1.5, cr, 15, r, 0.8);
    }
  }

  const bgElem = ri(r, 0, 4);
  if (bgElem === 0) {
    for (let i = 0; i < ri(r, 2, 5); i++) {
      const bx = rr(r, 100, 924);
      const by = rr(r, 80, 250);
      const bs = rr(r, 10, 20);
      o += P(`M${bx - bs} ${by} C${bx - bs * 0.3} ${by - bs * 0.8} ${bx + bs * 0.3} ${by - bs * 0.8} ${bx + bs} ${by}`, 1.5);
    }
  } else if (bgElem === 1) {
    for (let i = 0; i < ri(r, 1, 3); i++) {
      const tx = rr(r, 150, 874);
      const ty = rr(r, 100, 300);
      const ts = rr(r, 15, 30);
      o += P(`M${tx} ${ty} C${tx - ts * 0.3} ${ty + ts * 0.5} ${tx - ts * 0.5} ${ty + ts} ${tx - ts * 0.3} ${ty + ts * 1.3} C${tx - ts * 0.1} ${ty + ts * 1.5} ${tx + ts * 0.1} ${ty + ts * 1.5} ${tx + ts * 0.3} ${ty + ts * 1.3} C${tx + ts * 0.5} ${ty + ts} ${tx + ts * 0.3} ${ty + ts * 0.5} ${tx} ${ty}`, 1.5);
      o += P(`M${tx} ${ty} L${tx} ${ty + ts * 1.8}`, 0.8);
    }
  } else if (bgElem === 2) {
    for (let i = 0; i < ri(r, 2, 5); i++) {
      const px = rr(r, 100, 924);
      const py = rr(r, groundY - 50, groundY + 20);
      const ps = rr(r, 8, 15);
      o += P(`M${px} ${py} C${px - ps * 0.5} ${py - ps} ${px} ${py - ps * 1.5} ${px} ${py - ps * 2} C${px} ${py - ps * 1.5} ${px + ps * 0.5} ${py - ps} ${px} ${py}`, 1.2);
      o += P(`M${px - ps * 0.8} ${py - ps * 0.3} C${px - ps * 0.4} ${py - ps * 0.5} ${px + ps * 0.4} ${py - ps * 0.5} ${px + ps * 0.8} ${py - ps * 0.3}`, 0.8);
    }
  }

  return o;
}

function pitbullDetails(cx: number, cy: number, sc: number, r: () => number): string {
  let o = `<g transform="translate(${cx},${cy}) scale(${sc})">`;
  for (let f = 0; f < ri(r, 3, 8); f++) {
    const fy = rr(r, -60, -20);
    const fw = rr(r, 20, 45);
    o += P(`M${-fw} ${fy} C${-fw * 0.3} ${fy + rr(r, 2, 6)} ${fw * 0.3} ${fy + rr(r, 2, 6)} ${fw} ${fy}`, 0.8);
  }
  for (let w = 0; w < ri(r, 2, 6); w++) {
    const wy = rr(r, -40, 20);
    const wx = rr(r, -30, 30);
    const wl = rr(r, 5, 12);
    const wa = rr(r, -0.5, 0.5);
    o += P(`M${wx} ${wy} C${wx + Math.cos(wa) * wl * 0.3} ${wy + Math.sin(wa) * wl * 0.3} ${wx + Math.cos(wa) * wl * 0.7} ${wy + Math.sin(wa) * wl * 0.7} ${wx + Math.cos(wa) * wl} ${wy + Math.sin(wa) * wl}`, 0.4);
  }
  o += `</g>`;
  return o;
}

function pitbullPawprints(r: () => number): string {
  let o = "";
  const count = ri(r, 2, 6);
  for (let i = 0; i < count; i++) {
    const px = rr(r, 80, 944);
    const py = rr(r, 800, 980);
    const ps = rr(r, 8, 14);
    const pa = rr(r, -20, 20);
    o += `<g transform="translate(${px},${py}) rotate(${pa})">`;
    o += E(0, 0, ps * 0.6, ps * 0.8, 1.5);
    for (const s of [-1, 1]) {
      o += E(s * ps * 0.4, -ps * 0.6, ps * 0.22, ps * 0.28, 1);
      o += E(s * ps * 0.15, -ps * 0.85, ps * 0.2, ps * 0.25, 1);
    }
    o += E(0, -ps * 0.9, ps * 0.18, ps * 0.22, 1);
    o += `</g>`;
  }
  return o;
}

function generatePitbulls(r: () => number): string {
  let o = "";

  const pose = ri(r, 0, 10);
  const earType = ri(r, 0, 2);
  const expression = ri(r, 0, 2);
  const hasCollar = r() > 0.15;
  const accType = ri(r, 0, 3);
  const hasAccessory = r() > 0.5;
  const markType = ri(r, 0, 4);
  const hasMarkings = r() > 0.4;
  const facing = r() > 0.5 ? 1 : -1;
  const showBg = r() > 0.3;

  const cx = C + rr(r, -60, 60);
  const cy = C + rr(r, -30, 30);
  const sc = rr(r, 0.85, 1.25);

  if (showBg) {
    o += pitbullBackground(r);
  }

  o += pitbullBody(cx, cy, sc, pose, facing, r);

  const headOffsetY = -65 * sc;
  const headOffsetX = pose === 5 ? 30 * sc * facing : pose === 3 ? 25 * sc * facing : pose === 8 ? 20 * sc * facing : 0;
  o += pitbullHead(cx + headOffsetX, cy + headOffsetY, sc * 0.85, facing, expression, earType, r);

  if (hasCollar) {
    o += pitbullCollar(cx, cy - 10 * sc, sc, r);
  }

  if (hasAccessory) {
    o += pitbullAccessories(cx + headOffsetX, cy + headOffsetY, sc * 0.85, accType, r);
  }

  if (hasMarkings) {
    o += pitbullMarkings(cx, cy, sc, markType, r);
  }

  o += pitbullDetails(cx, cy, sc, r);
  o += pitbullPawprints(r);

  return o;
}

function generateGardens(r: () => number): string {
  let o = "";
  const groundY = rr(r, 900, 960);

  o += P(`M0 ${groundY + 20} C100 ${groundY - 10} 200 ${groundY + 15} 350 ${groundY} C500 ${groundY - 15} 650 ${groundY + 10} 800 ${groundY - 5} C900 ${groundY + 8} 1000 ${groundY - 12} 1024 ${groundY}`, 2.5);

  const grassClumps = ri(r, 15, 30);
  for (let g = 0; g < grassClumps; g++) {
    const gx = rr(r, 20, 1004);
    const gy = groundY + rr(r, -10, 10);
    const blades = ri(r, 4, 8);
    for (let b = 0; b < blades; b++) {
      const bh = rr(r, 20, 55);
      const bend = rr(r, -25, 25);
      o += P(`M${gx + b * 3} ${gy} C${gx + b * 3 + bend * 0.3} ${gy - bh * 0.4} ${gx + b * 3 + bend * 0.7} ${gy - bh * 0.8} ${gx + b * 3 + bend} ${gy - bh}`, 1);
    }
  }

  const flowers = ri(r, 7, 14);
  for (let i = 0; i < flowers; i++) {
    const fx = rr(r, 80, 944);
    const stemH = rr(r, 150, 500);
    const curve = rr(r, -60, 60);
    const topX = fx + curve;
    const topY = groundY - stemH;

    o += P(`M${fx} ${groundY} C${fx + curve * 0.2} ${groundY - stemH * 0.3} ${fx + curve * 0.6} ${groundY - stemH * 0.7} ${topX} ${topY}`, 2.5);

    const leaves = ri(r, 2, 5);
    for (let l = 0; l < leaves; l++) {
      const t = 0.2 + l * 0.18;
      const lx = fx + curve * t;
      const ly = groundY - stemH * t;
      const dir = l % 2 === 0 ? 1 : -1;
      o += detailedLeaf(lx, ly, rr(r, 25, 55), dir * rr(r, 30, 70) + (dir > 0 ? 80 : 260), r);
    }

    o += flowerHead(topX, topY, rr(r, 30, 70), r);
  }

  const butterflies = ri(r, 1, 4);
  for (let i = 0; i < butterflies; i++) {
    o += smallButterfly(rr(r, 100, 924), rr(r, 60, 400), rr(r, 0.4, 0.8), rr(r, -40, 40), r);
  }

  return o;
}

function smallButterfly(cx: number, cy: number, sc: number, rot: number, r: () => number): string {
  let o = `<g transform="translate(${cx},${cy}) scale(${sc}) rotate(${rot})">`;
  o += E(0, 0, 4, 28, 2);
  for (const s of [-1, 1]) {
    o += P(`M0 0 C${s * 15} ${-15} ${s * 40} ${-25} ${s * 35} ${-5} C${s * 40} ${5} ${s * 25} ${15} ${s * 15} ${10} Z`, 1.5);
    o += P(`M0 0 C${s * 10} ${-10} ${s * 30} ${-18} ${s * 27} ${-3} C${s * 30} ${3} ${s * 18} ${10} ${s * 10} ${7} Z`, 0.8);
    o += dotFill(s * 22, -5, 20, 18, 15, r, 1);
  }
  o += P(`M-2 -30 C-6 -42 -4 -48 -2 -45`, 1.2);
  o += P(`M2 -30 C6 -42 4 -48 2 -45`, 1.2);
  o += dot(-2, -45, 1.5);
  o += dot(2, -45, 1.5);
  o += `</g>`;
  return o;
}

function generateBirds(r: () => number): string {
  let o = "";

  const branches = ri(r, 2, 4);
  for (let i = 0; i < branches; i++) {
    const by = rr(r, 500, 800);
    const x1 = rr(r, -50, 150);
    const x2 = rr(r, 874, 1074);
    const sag = rr(r, 20, 80);
    o += P(`M${x1} ${by} C${(x1 + x2) * 0.3} ${by + sag * 0.8} ${(x1 + x2) * 0.7} ${by + sag * 1.2} ${x2} ${by + sag * 0.5}`, 4);
    o += P(`M${x1} ${by + 3} C${(x1 + x2) * 0.3} ${by + sag * 0.8 + 3} ${(x1 + x2) * 0.7} ${by + sag * 1.2 + 3} ${x2} ${by + sag * 0.5 + 3}`, 1);

    const barkCount = ri(r, 5, 12);
    for (let b = 0; b < barkCount; b++) {
      const t = rr(r, 0.05, 0.95);
      const bx = x1 + (x2 - x1) * t;
      const bby = by + sag * (4 * t * (1 - t));
      o += L(bx, bby - 2, bx + rr(r, -4, 4), bby + 2, 0.5);
    }

    const subs = ri(r, 2, 5);
    for (let s = 0; s < subs; s++) {
      const sx = x1 + (x2 - x1) * rr(r, 0.15, 0.85);
      const sy = by + sag * (4 * ((sx - x1) / (x2 - x1)) * (1 - (sx - x1) / (x2 - x1)));
      const sLen = rr(r, 80, 200);
      const sDir = r() > 0.5 ? 1 : -1;
      const sEndX = sx + sDir * sLen;
      const sEndY = sy - rr(r, 30, 100);
      o += P(`M${sx} ${sy} C${sx + sDir * 30} ${sy - 20} ${sEndX - sDir * 30} ${sEndY + 10} ${sEndX} ${sEndY}`, 2);

      const leaves = ri(r, 3, 7);
      for (let l = 0; l < leaves; l++) {
        const t = (l + 1) / (leaves + 1);
        const lx = sx + (sEndX - sx) * t;
        const ly = sy + (sEndY - sy) * t;
        const dir = l % 2 === 0 ? 1 : -1;
        o += detailedLeaf(lx, ly, rr(r, 18, 40), dir * rr(r, 25, 65) + (dir > 0 ? 60 : 240), r);
      }
    }
  }

  const birdCount = ri(r, 1, 3);
  for (let i = 0; i < birdCount; i++) {
    const bx = rr(r, 200, 824);
    const by = rr(r, 180, 480);
    const sc = rr(r, 0.9, 1.5);
    const facing = r() > 0.5 ? 1 : -1;
    o += `<g transform="translate(${bx},${by}) scale(${sc * facing},${sc})">`;

    o += P(`M-45 30 C-60 10 -55 -20 -30 -40 C-10 -55 10 -55 30 -40 C55 -20 60 10 45 30 C35 55 20 70 0 75 C-20 70 -35 55 -45 30`, 2.5);
    o += P(`M-43 30 C-58 10 -53 -18 -28 -38 C-8 -53 8 -53 28 -38 C53 -18 58 10 43 30 C33 53 18 68 0 73 C-18 68 -33 53 -43 30`, 0.8);
    o += dotFill(0, 15, 70, 60, 30, r, 0.7);

    o += C2(0, -60, 35, 2.5);
    o += C2(0, -60, 32, 0.8);
    o += dotFill(0, -60, 55, 55, 25, r, 0.6);

    for (const s of [-1, 1]) {
      o += E(s * 16, -68, 7, 8, 1.5);
      o += C2(s * 16, -67, 4, 1.5);
      o += dot(s * 14, -70, 1.5);
      const lashes = ri(r, 3, 5);
      for (let l = 0; l < lashes; l++) {
        const la = -Math.PI * 0.7 + (l / lashes) * Math.PI * 0.5;
        o += P(`M${s * 16 + Math.cos(la) * 7} ${-68 + Math.sin(la) * 8} Q${s * 16 + Math.cos(la) * 13} ${-68 + Math.sin(la) * 14} ${s * 16 + Math.cos(la) * 16} ${-68 + Math.sin(la) * 12}`, 0.6);
      }
    }

    o += P(`M0 -48 L-10 -35 L0 -28 L10 -35 Z`, 2.5);
    o += L(0, -48, 0, -28, 0.8);

    for (const s of [-1, 1]) {
      const span = rr(r, 60, 90);
      o += P(`M${s * 40} 15 C${s * (span + 10)} ${-20} ${s * (span + 30)} ${-40} ${s * (span + 40)} ${-10}`, 2.5);
      o += P(`M${s * 40} 15 C${s * (span + 8)} ${-15} ${s * (span + 25)} ${-35} ${s * (span + 35)} ${-8}`, 0.8);

      const feathers = ri(r, 5, 10);
      for (let f = 1; f < feathers; f++) {
        const ft = f / feathers;
        const fx = s * (40 + (span) * ft);
        const fy = 15 - (40 + 15) * ft;
        const fl = rr(r, 15, 35);
        const fa = s * rr(r, 15, 45);
        o += P(petalPath(fx, fy, fl, fa, fl * 0.2), 0.8);
        o += L(fx, fy, fx + Math.cos((fa * Math.PI) / 180) * fl * 0.8, fy + Math.sin((fa * Math.PI) / 180) * fl * 0.8, 0.4);
      }
    }

    const tailLen = rr(r, 40, 70);
    for (let t = 0; t < ri(r, 3, 6); t++) {
      const ta = 70 + t * 10 + rr(r, -8, 8);
      o += P(petalPath(0, 70, tailLen + rr(r, -10, 10), ta, tailLen * 0.15), 1.5);
      o += L(0, 70, Math.cos((ta * Math.PI) / 180) * tailLen * 0.9, 70 + Math.sin((ta * Math.PI) / 180) * tailLen * 0.9, 0.5);
    }

    for (const s of [-1, 1]) {
      o += P(`M${s * 12} 75 L${s * 14} 130`, 2.5);
      o += P(`M${s * 12} 75 L${s * 13} 130`, 0.8);
      o += P(`M${s * 25} 130 L${s * 5} 130 L${s * 14} 122 Z`, 2);
      o += P(`M${s * 22} 128 L${s * 8} 128`, 0.6);
    }

    o += P(`M0 -95 C-8 -110 -3 -130 5 -120 C10 -115 8 -100 0 -95`, 2);
    o += `</g>`;
  }

  return o;
}

function generateButterflies(r: () => number): string {
  let o = "";
  const count = ri(r, 1, 3);

  for (let i = 0; i < count; i++) {
    const cx = rr(r, 200, 824);
    const cy = rr(r, 200, 650);
    const sc = rr(r, 1, 1.6);
    const rot = rr(r, -30, 30);
    o += `<g transform="translate(${cx},${cy}) scale(${sc}) rotate(${rot})">`;

    o += E(0, 0, 10, 100, 3);
    o += E(0, 0, 7, 97, 0.8);
    for (let s = -4; s <= 4; s++) {
      o += L(-8, s * 20, 8, s * 20, 0.5);
    }

    o += C2(0, -110, 14, 2.5);
    o += C2(0, -110, 11, 0.8);

    for (const s of [-1, 1]) {
      const al = rr(r, 50, 80);
      o += P(`M${s * 5} -120 C${s * 15} -140 ${s * 25} -160 ${s * 20} -175`, 2);
      o += P(`M${s * 5} -120 C${s * 12} -138 ${s * 20} -155 ${s * 18} -170`, 0.8);
      o += C2(s * 20, -178, 5, 1.5);
      o += dot(s * 20, -178, 2);
    }

    for (const s of [-1, 1]) {
      const uw = rr(r, 120, 190);
      const uh = rr(r, 90, 150);
      const ux = s * uw * 0.45;
      const uy = -uh * 0.25;

      o += P(`M0 -10 C${s * 20} ${-uh * 0.3} ${s * uw * 0.3} ${-uh * 0.6} ${ux} ${uy} C${s * uw * 0.6} ${uy + uh * 0.15} ${s * uw * 0.3} ${uy + uh * 0.5} 0 ${uy + uh * 0.4} Z`, 2.5);
      o += P(`M0 -8 C${s * 18} ${-uh * 0.28} ${s * uw * 0.28} ${-uh * 0.55} ${ux * 0.9} ${uy * 0.9} C${s * uw * 0.55} ${uy + uh * 0.1} ${s * uw * 0.28} ${uy + uh * 0.45} 0 ${uy + uh * 0.35} Z`, 0.8);

      const rings = ri(r, 3, 6);
      for (let ring = 0; ring < rings; ring++) {
        const ratio = 0.3 + ring * 0.12;
        const rx2 = uw * ratio * 0.4;
        const ry2 = uh * ratio * 0.4;
        o += E(ux * 0.5, uy * 0.5, rx2, ry2, 0.8, "none", s * 15);
      }

      const spots = ri(r, 4, 10);
      for (let sp = 0; sp < spots; sp++) {
        const sa = rr(r, 0, Math.PI * 2);
        const sd = rr(r, 0.15, 0.7);
        const spx = ux * 0.5 + Math.cos(sa) * uw * sd * 0.3;
        const spy = uy * 0.5 + Math.sin(sa) * uh * sd * 0.3;
        const spr = rr(r, 3, 12);
        o += C2(spx, spy, spr, 1);
        o += dotArc(spx, spy, spr * 0.6, 0, Math.PI * 2, ri(r, 3, 7), 0.7);
      }

      o += dotFill(ux * 0.45, uy * 0.3, uw * 0.5, uh * 0.5, 25, r, 0.8);

      const lw = rr(r, 60, 100);
      const lh = rr(r, 50, 85);
      const ly = uh * 0.4;

      o += P(`M0 ${ly} C${s * 15} ${ly - 10} ${s * lw * 0.3} ${ly - lh * 0.4} ${s * lw * 0.45} ${ly} C${s * lw * 0.5} ${ly + lh * 0.2} ${s * lw * 0.2} ${ly + lh * 0.5} 0 ${ly + lh * 0.3} Z`, 2);
      o += P(`M0 ${ly + 2} C${s * 12} ${ly - 8} ${s * lw * 0.25} ${ly - lh * 0.35} ${s * lw * 0.4} ${ly + 2} C${s * lw * 0.45} ${ly + lh * 0.15} ${s * lw * 0.18} ${ly + lh * 0.42} 0 ${ly + lh * 0.25} Z`, 0.8);
      o += E(s * lw * 0.25, ly, lw * 0.15, lh * 0.15, 0.8);

      const tails = ri(r, 1, 3);
      for (let t = 0; t < tails; t++) {
        const ta = rr(r, Math.PI * 0.3, Math.PI * 0.7);
        const tl = rr(r, 15, 40);
        const tx = s * lw * 0.3 + Math.cos(ta) * lw * 0.15;
        const ty = ly + Math.sin(ta) * lh * 0.15;
        o += P(`M${tx} ${ty} C${tx + s * tl * 0.3} ${ty + tl * 0.2} ${tx + s * tl * 0.6} ${ty + tl * 0.5} ${tx + s * tl} ${ty + tl * 0.3}`, 1.5);
      }
    }

    o += `</g>`;
  }

  const flowerCount = ri(r, 2, 5);
  for (let i = 0; i < flowerCount; i++) {
    const fx = rr(r, 60, 964);
    const fy = rr(r, 800, 980);
    const stemH = rr(r, 40, 100);
    o += P(`M${fx} ${fy} C${fx + rr(r, -10, 10)} ${fy - stemH * 0.4} ${fx + rr(r, -8, 8)} ${fy - stemH * 0.8} ${fx + rr(r, -5, 5)} ${fy - stemH}`, 1.5);
    o += flowerHead(fx + rr(r, -5, 5), fy - stemH, rr(r, 8, 18), r);
  }

  return o;
}

function generateMandalas(r: () => number): string {
  let o = "";
  const cx = C, cy = C;
  const maxR = rr(r, 420, 480);
  const symmetry = pick(r, [6, 8, 10, 12, 16, 24]);

  o += frame(cx, cy, maxR, 3);
  o += frame(cx, cy, maxR * 0.95, 1.5);

  const layers = ri(r, 8, 15);
  for (let l = 0; l < layers; l++) {
    const lr = ((l + 1) / layers) * maxR * 0.92;
    o += C2(cx, cy, lr, l === layers - 1 ? 2.5 : l % 3 === 0 ? 1.5 : 0.8);
    if (l % 2 === 0) o += C2(cx, cy, lr - 2, 0.4);
  }

  for (let s = 0; s < symmetry; s++) {
    const a = (s / symmetry) * Math.PI * 2;
    o += L(cx + Math.cos(a) * maxR * 0.08, cy + Math.sin(a) * maxR * 0.08, cx + Math.cos(a) * maxR * 0.92, cy + Math.sin(a) * maxR * 0.92, 0.6);
  }

  for (let l = 0; l < layers - 1; l++) {
    const r1 = ((l + 1) / layers) * maxR * 0.92;
    const r2 = ((l + 2) / layers) * maxR * 0.92;
    const mid = (r1 + r2) / 2;
    const count = symmetry * ri(r, 1, 3);

    o += ornamentalBorder(cx, cy, r1, r2, count, r);

    for (let e = 0; e < count; e++) {
      const a = (e / count) * Math.PI * 2;
      const ex = cx + Math.cos(a) * mid;
      const ey = cy + Math.sin(a) * mid;
      const elem = ri(r, 0, 10);

      if (elem === 0) o += C2(ex, ey, rr(r, 3, 10), 1);
      else if (elem === 1) o += dot(ex, ey, rr(r, 1.5, 3));
      else if (elem === 2) {
        const ps = rr(r, 6, 15);
        o += P(petalPath(ex, ey, ps, (a * 180) / Math.PI, ps * 0.3), 0.8);
      }
      else if (elem === 3) {
        const sz = rr(r, 4, 9);
        o += `<rect x="${ex - sz}" y="${ey - sz}" width="${sz * 2}" height="${sz * 2}" fill="none" stroke="${K}" stroke-width="0.8" transform="rotate(${(a * 180) / Math.PI + 45} ${ex} ${ey})"/>`;
      }
      else if (elem === 4) o += dotArc(ex, ey, rr(r, 3, 8), a - 0.5, a + 0.5, ri(r, 3, 6), 0.7);
      else if (elem === 5) {
        const ts = rr(r, 4, 10);
        o += P(`M${ex + Math.cos(a) * ts} ${ey + Math.sin(a) * ts} L${ex + Math.cos(a + 0.2) * ts * 1.5} ${ey + Math.sin(a + 0.2) * ts * 1.5} L${ex + Math.cos(a - 0.2) * ts * 1.5} ${ey + Math.sin(a - 0.2) * ts * 1.5} Z`, 0.8);
      }
      else if (elem === 6) {
        const ns = rr(r, 3, 7);
        let d = "";
        for (let n = 0; n < ns * 2; n++) {
          const na = a + (n / (ns * 2)) * Math.PI * 2 / symmetry;
          const nr = n % 2 === 0 ? ns * 1.5 : ns * 0.6;
          d += (n === 0 ? "M" : "L") + `${ex + Math.cos(na) * nr} ${ey + Math.sin(na) * nr}`;
        }
        o += P(d + "Z", 0.8);
      }
      else if (elem === 7) {
        o += L(ex - rr(r, 3, 7), ey, ex + rr(r, 3, 7), ey, 0.6);
      }
      else if (elem === 8) {
        const cs = rr(r, 4, 10);
        o += E(ex, ey, cs, cs * 0.4, 0.8, "none", (a * 180) / Math.PI);
      }
      else {
        const fs = rr(r, 3, 8);
        o += P(scrollPath(ex, ey, fs, (a * 180) / Math.PI, e % 2 === 0 ? 1 : -1), 0.6);
      }
    }

    if (l % 2 === 0) o += dotArc(cx, cy, mid, 0, Math.PI * 2, count * 2, 0.6);
  }

  const innerRings = ri(r, 3, 7);
  for (let ring = 0; ring < innerRings; ring++) {
    const rr2 = ((ring + 1) / (innerRings + 1)) * maxR * 0.25;
    o += ornamentalBorder(cx, cy, rr2, rr2 + rr(r, 6, 12), ri(r, symmetry / 2, symmetry * 2), r);
  }

  const petalRings = ri(r, 2, 5);
  for (let pr = 0; pr < petalRings; pr++) {
    const prR = maxR * (0.3 + pr * 0.12);
    const pCount = ri(r, symmetry, symmetry * 2);
    for (let p = 0; p < pCount; p++) {
      const a = (p / pCount) * Math.PI * 2 + pr * 0.5;
      const pl = prR * rr(r, 0.15, 0.3);
      o += P(petalPath(cx + Math.cos(a) * prR * 0.7, cy + Math.sin(a) * prR * 0.7, pl, (a * 180) / Math.PI, pl * 0.3), 0.8);
    }
  }

  o += C2(cx, cy, maxR * 0.06, 3);
  o += C2(cx, cy, maxR * 0.035, 1.5);
  o += dotArc(cx, cy, maxR * 0.048, 0, Math.PI * 2, 8, 1.2);
  o += dotFillCircle(cx, cy, maxR * 0.03, 5, r, 1);

  const scrollR = maxR * 0.15;
  for (let s = 0; s < symmetry; s++) {
    const a = (s / symmetry) * Math.PI * 2;
    const sx = cx + Math.cos(a) * scrollR;
    const sy = cy + Math.sin(a) * scrollR;
    o += P(scrollPath(sx, sy, scrollR * 0.5, (a * 180) / Math.PI, s % 2 === 0 ? 1 : -1), 0.8);
  }

  return o;
}

function generateCats(r: () => number): string {
  let o = "";
  const pose = ri(r, 0, 2);
  const cx = C + rr(r, -60, 60);
  const cy = C + rr(r, -30, 30);
  const sc = rr(r, 0.9, 1.3);

  o += `<g transform="translate(${cx},${cy}) scale(${sc})">`;

  if (pose === 0) {
    o += P(`M-70 40 C-90 20 -85 -10 -50 -40 C-25 -60 25 -60 50 -40 C85 -10 90 20 70 40 C60 70 40 100 20 120 L-20 120 C-40 100 -60 70 -70 40`, 2.5);
    o += P(`M-68 40 C-88 20 -83 -8 -48 -38 C-23 -58 23 -58 48 -38 C83 -8 88 20 68 40 C58 68 38 98 18 118 L-18 118 C-38 98 -58 68 -68 40`, 0.8);
    o += dotFill(0, 20, 120, 80, 30, r, 0.6);

    o += P(`M-40 -55 C-50 -80 -40 -110 -25 -100 C-15 -90 -20 -65 -35 -55`, 2.5);
    o += P(`M40 -55 C50 -80 40 -110 25 -100 C15 -90 20 -65 35 -55`, 2.5);
    o += dotFill(-35, -80, 18, 25, 10, r, 0.7);
    o += dotFill(35, -80, 18, 25, 10, r, 0.7);

    const esp = rr(r, 22, 32);
    for (const s of [-1, 1]) {
      o += P(`M${s * esp - 12} -40 C${s * esp - 12} -48 ${s * esp + 12} -48 ${s * esp + 12} -40 C${s * esp + 12} -32 ${s * esp - 12} -32 ${s * esp - 12} -40`, 1.5);
      o += E(s * esp, -40, 3, 7, 1.5);
      o += dot(s * esp - 1, -42, 1.2);
    }

    o += P(`M0 -20 C-3 -15 3 -15 0 -20`, 1.5);
    o += L(0, -18, 0, -12, 0.8);
    o += P(`M0 -12 C-4 -8 -8 -10 -10 -8`, 1);
    o += P(`M0 -12 C4 -8 8 -10 10 -8`, 1);

    for (const s of [-1, 1]) {
      for (let w = 0; w < ri(r, 3, 5); w++) {
        const wl = rr(r, 40, 70);
        o += L(s * 18, -28 + w * 6, s * wl, -30 + w * 6 + rr(r, -3, 3), 0.8);
        o += dotLine(s * 20, -28 + w * 6, s * (wl - 5), -30 + w * 6, ri(r, 3, 6), 0.6);
      }
    }

    o += dotFill(0, -40, 100, 60, 25, r, 0.5);

    for (const s of [-1, 1]) {
      o += P(`M${s * 35} 110 C${s * 38} 125 ${s * 30} 140 ${s * 22} 145 C${s * 15} 148 ${s * 10} 142 ${s * 12} 135 L${s * 20} 120`, 2);
    }

    o += P(`M60 30 C100 10 140 -20 160 0 C175 15 165 40 140 45 C120 48 100 40 80 35`, 3);
    o += P(`M60 30 C95 12 135 -15 155 2`, 1);

    for (let s = 0; s < ri(r, 4, 8); s++) {
      const sy = -30 + s * 10;
      const sw = rr(r, 20, 50);
      o += P(`M${-sw} ${sy} C${-sw * 0.3} ${sy + rr(r, 3, 7)} ${sw * 0.3} ${sy + rr(r, 3, 7)} ${sw} ${sy}`, 1);
    }
  } else if (pose === 1) {
    o += P(`M-100 20 C-120 5 -115 -15 -80 -35 C-50 -50 50 -50 80 -35 C115 -15 120 5 100 20 C85 40 65 55 40 60 L-40 60 C-65 55 -85 40 -100 20`, 2.5);
    o += dotFill(0, 10, 180, 50, 30, r, 0.6);

    o += P(`M-90 15 C-110 30 -105 55 -95 65 L-85 55`, 2.5);
    o += P(`M90 15 C110 30 105 55 95 65 L85 55`, 2.5);
    o += E(-90, 68, 18, 10, 1.5);
    o += E(90, 68, 18, 10, 1.5);

    o += P(`M-70 20 C-100 -10 -110 -50 -95 -70 C-85 -80 -75 -75 -80 -60`, 3);
    o += P(`M-80 -60 C-78 -68 -72 -65 -75 -58`, 1.5);
    o += C2(-80, -62, 2.5, 1);

    o += P(`M70 20 C90 -5 95 -30 85 -45`, 2.5);
    o += P(`M65 -40 C70 -55 80 -60 85 -50 C88 -42 82 -35 75 -40`, 2);
    o += P(`M105 -40 C110 -55 100 -60 95 -50 C92 -42 98 -35 105 -40`, 2);

    o += P(`M72 -38 C76 -36 80 -36 84 -38`, 1.5);
    o += P(`M92 -38 C96 -36 100 -36 104 -38`, 1.5);

    o += P(`M85 -25 C83 -22 87 -22 85 -25`, 1.2);

    o += P(`M-100 60 C-130 45 -160 20 -170 40 C-178 55 -165 70 -140 72 C-120 73 -105 65 -100 60`, 3);
    o += P(`M-100 60 C-125 48 -155 25 -165 42`, 1);

    o += dotFill(0, 10, 160, 40, 25, r, 0.5);
  } else {
    o += P(`M-45 80 C-55 40 -50 -20 -40 -80 C-30 -130 -20 -160 0 -175 C20 -160 30 -130 40 -80 C50 -20 55 40 45 80 C35 120 20 140 0 150 C-20 140 -35 120 -45 80`, 2.5);
    o += P(`M-43 80 C-53 40 -48 -18 -38 -78 C-28 -128 -18 -158 0 -173 C18 -158 28 -128 38 -78 C48 -18 53 40 43 80 C33 118 18 138 0 148 C-18 138 -33 118 -43 80`, 0.8);
    o += dotFill(0, -20, 70, 180, 35, r, 0.6);

    o += P(`M-25 -170 C-30 -195 -20 -220 -10 -210 C-5 -205 -8 -185 -20 -170`, 2.5);
    o += P(`M25 -170 C30 -195 20 -220 10 -210 C5 -205 8 -185 20 -170`, 2.5);
    o += dotFill(-18, -195, 12, 20, 8, r, 0.6);
    o += dotFill(18, -195, 12, 20, 8, r, 0.6);

    for (const s of [-1, 1]) {
      o += P(`M${s * 14} -185 C${s * 14} -190 ${s * 22} -190 ${s * 22} -185 C${s * 22} -180 ${s * 14} -180 ${s * 14} -185`, 1.5);
      o += E(s * 18, -185, 2.5, 5, 1.2);
      o += dot(s * 17, -187, 1);
    }

    o += P(`M0 -165 C-2 -162 2 -162 0 -165`, 1.2);

    for (const s of [-1, 1]) {
      o += P(`M${s * 25} 140 C${s * 28} 150 ${s * 22} 160 ${s * 15} 162 C${s * 10} 163 ${s * 8} 158 ${s * 10} 152 L${s * 18} 142`, 2);
    }

    const tailDir = r() > 0.5 ? -1 : 1;
    o += P(`M${tailDir * 25} 145 C${tailDir * 45} 155 ${tailDir * 60} 140 ${tailDir * 70} 120 C${tailDir * 78} 105 ${tailDir * 72} 95 ${tailDir * 60} 100`, 3.5);
    o += P(`M${tailDir * 25} 145 C${tailDir * 42} 153 ${tailDir * 57} 138 ${tailDir * 67} 120`, 1.2);
    o += dotFill(tailDir * 55, 125, 20, 30, 15, r, 0.6);
  }

  o += `</g>`;

  for (let i = 0; i < ri(r, 2, 6); i++) {
    const ax = rr(r, 50, 974);
    const ay = rr(r, 50, 974);
    const at = ri(r, 0, 3);
    if (at === 0) o += dot(ax, ay, rr(r, 1, 3));
    else if (at === 1) o += P(`M${ax - 5} ${ay + 2} L${ax} ${ay - 6} L${ax + 5} ${ay + 2}`, 0.8);
    else o += P(`M${ax} ${ay} C${ax + rr(r, 8, 20)} ${ay - rr(r, 8, 15)} ${ax + rr(r, 15, 30)} ${ay} ${ax + rr(r, 20, 40)} ${ay + rr(r, -5, 5)}`, 0.8);
  }

  return o;
}

function generateCoastal(r: () => number): string {
  let o = "";
  const horizon = rr(r, 300, 400);

  const sunX = rr(r, 200, 824);
  const sunY = rr(r, 60, 180);
  const sunR = rr(r, 45, 90);
  o += C2(sunX, sunY, sunR, 3);
  o += C2(sunX, sunY, sunR - 4, 0.8);
  o += C2(sunX, sunY, sunR - 8, 0.5);
  o += dotFillCircle(sunX, sunY, sunR * 0.8, 8, r, 1.2);

  const rays = ri(r, 12, 24);
  for (let i = 0; i < rays; i++) {
    const a = (i / rays) * Math.PI * 2;
    const rl = rr(r, 25, 65);
    o += L(sunX + Math.cos(a) * (sunR + 6), sunY + Math.sin(a) * (sunR + 6), sunX + Math.cos(a) * (sunR + rl), sunY + Math.sin(a) * (sunR + rl), i % 2 === 0 ? 1.5 : 0.6);
    if (i % 3 === 0) o += dot(sunX + Math.cos(a) * (sunR + rl + 4), sunY + Math.sin(a) * (sunR + rl + 4), 1.2);
  }

  for (let i = 0; i < ri(r, 1, 4); i++) {
    const ccx = rr(r, 80, 944);
    const ccy = rr(r, 40, 220);
    const puffs = ri(r, 3, 7);
    for (let p = 0; p < puffs; p++) {
      const px = ccx + p * rr(r, 25, 50);
      const py = ccy + rr(r, -15, 15);
      const pr = rr(r, 20, 50);
      o += P(`M${px - pr} ${py} C${px - pr} ${py - pr * 0.7} ${px + pr} ${py - pr * 0.7} ${px + pr} ${py} C${px + pr} ${py + pr * 0.4} ${px - pr} ${py + pr * 0.4} ${px - pr} ${py}`, 1.5);
      o += dotFill(px, py, pr * 1.5, pr, 20, r, 0.6);
    }
  }

  const lhX = rr(r, 600, 920);
  const lhH = rr(r, 180, 300);
  const lhW = rr(r, 30, 50);
  o += `<rect x="${lhX - lhW}" y="${horizon - lhH}" width="${lhW * 2}" height="${lhH}" fill="none" stroke="${K}" stroke-width="2.5"/>`;
  o += `<rect x="${lhX - lhW + 3}" y="${horizon - lhH + 3}" width="${lhW * 2 - 6}" height="${lhH - 6}" fill="none" stroke="${K}" stroke-width="0.6"/>`;
  o += P(`M${lhX - lhW - 15} ${horizon - lhH} L${lhX + lhW + 15} ${horizon - lhH} L${lhX + lhW * 0.6} ${horizon - lhH - 35} L${lhX - lhW * 0.6} ${horizon - lhH - 35} Z`, 2.5);

  const stripes = ri(r, 4, 8);
  for (let s = 0; s < stripes; s++) {
    const sy = horizon - lhH + s * (lhH / stripes);
    o += L(lhX - lhW, sy, lhX + lhW, sy, s % 2 === 0 ? 2 : 0.8);
  }

  o += C2(lhX, horizon - lhH - 18, 12, 2.5);
  o += dot(lhX, horizon - lhH - 18, 4);
  o += dotArc(lhX, horizon - lhH - 18, 8, 0, Math.PI * 2, 8, 0.8);

  for (let i = 0; i < ri(r, 4, 8); i++) {
    const a = -0.9 + (i / 8) * 1.8;
    const rl = rr(r, 80, 200);
    o += L(lhX, horizon - lhH - 18, lhX + Math.cos(a) * rl, horizon - lhH - 18 + Math.sin(a) * rl, 0.6);
  }

  o += P(`M${lhX - lhW - 25} ${horizon} C${lhX - 20} ${horizon + 12} ${lhX + 20} ${horizon + 12} ${lhX + lhW + 25} ${horizon}`, 2);

  const rocks = ri(r, 2, 5);
  for (let i = 0; i < rocks; i++) {
    const rx = rr(r, 100, 924);
    const ry = horizon + rr(r, 5, 30);
    const rw = rr(r, 15, 40);
    const rh = rr(r, 10, 25);
    o += P(`M${rx - rw} ${ry} C${rx - rw} ${ry - rh} ${rx + rw} ${ry - rh} ${rx + rw} ${ry} C${rx + rw * 0.5} ${ry + rh * 0.3} ${rx - rw * 0.5} ${ry + rh * 0.3} ${rx - rw} ${ry}`, 2);
    o += dotFill(rx, ry - rh * 0.3, rw * 1.5, rh * 1.2, 15, r, 0.8);
  }

  const waves = ri(r, 5, 10);
  for (let w = 0; w < waves; w++) {
    const wy = horizon + 20 + w * rr(r, 30, 60);
    const segLen = rr(r, 30, 60);
    let d = `M0 ${wy}`;
    for (let x = 0; x <= SIZE; x += segLen) {
      const amp = rr(r, 8, 22);
      d += ` C${x + segLen * 0.3} ${wy - amp} ${x + segLen * 0.7} ${wy - amp} ${x + segLen} ${wy}`;
    }
    o += P(d, w < 2 ? 2 : 1);
    if (w < 3) {
      let d2 = `M0 ${wy + 3}`;
      for (let x = 0; x <= SIZE; x += segLen) {
        const amp = rr(r, 5, 15);
        d2 += ` C${x + segLen * 0.3} ${wy + 3 - amp} ${x + segLen * 0.7} ${wy + 3 - amp} ${x + segLen} ${wy + 3}`;
      }
      o += P(d2, 0.5);
    }
  }

  const shells = ri(r, 3, 8);
  for (let i = 0; i < shells; i++) {
    const sx = rr(r, 60, 964);
    const sy = rr(r, horizon + 80, 980);
    const st = ri(r, 0, 4);
    if (st === 0) {
      const sr = rr(r, 12, 28);
      let d = `M${sx} ${sy}`;
      for (let t = 0; t < 40; t++) {
        const a = (t / 12) * Math.PI;
        const rad = (t / 40) * sr;
        d += ` L${sx + Math.cos(a) * rad} ${sy + Math.sin(a) * rad}`;
      }
      o += P(d, 1.5);
      o += dotArc(sx, sy, sr * 0.4, 0, Math.PI, ri(r, 4, 8), 0.7);
    } else if (st === 1) {
      o += P(`M${sx - 15} ${sy + 10} C${sx - 10} ${sy - 10} ${sx + 10} ${sy - 10} ${sx + 15} ${sy + 10}`, 2);
      o += L(sx, sy - 8, sx, sy + 10, 0.8);
      for (let rib = 0; rib < ri(r, 3, 6); rib++) {
        const ry2 = sy - 6 + rib * 4;
        const rw = 12 * (1 - Math.abs(rib / 5 - 0.4));
        o += P(`M${sx - rw} ${ry2} C${sx - rw * 0.3} ${ry2 + 2} ${sx + rw * 0.3} ${ry2 + 2} ${sx + rw} ${ry2}`, 0.6);
      }
    } else if (st === 2) {
      o += E(sx, sy, rr(r, 10, 22), rr(r, 6, 12), 1.5, "none", rr(r, -30, 30));
      o += E(sx, sy, rr(r, 6, 14), rr(r, 3, 7), 0.6, "none", rr(r, -30, 30));
      o += dotFill(sx, sy, 20, 12, 20, r, 0.5);
    } else {
      const ps = rr(r, 8, 18);
      for (let p = 0; p < 5; p++) {
        const a = (p / 5) * Math.PI * 2 - Math.PI / 2;
        o += P(petalPath(sx, sy, ps, (a * 180) / Math.PI, ps * 0.25), 1);
      }
      o += dot(sx, sy, 2);
    }
  }

  const birds = ri(r, 3, 10);
  for (let i = 0; i < birds; i++) {
    const bx = rr(r, 60, 964);
    const by = rr(r, 20, 180);
    const bs = rr(r, 8, 22);
    o += P(`M${bx - bs} ${by} C${bx - bs * 0.3} ${by - bs * 0.9} ${bx + bs * 0.3} ${by - bs * 0.9} ${bx + bs} ${by}`, 1.5);
    o += P(`M${bx - bs * 0.7} ${by + 2} C${bx - bs * 0.2} ${by - bs * 0.5} ${bx + bs * 0.2} ${by - bs * 0.5} ${bx + bs * 0.7} ${by + 2}`, 0.6);
  }

  return o;
}

function generateFlorals(r: () => number): string {
  let o = "";
  const cx = C + rr(r, -40, 40);
  const cy = C + rr(r, -40, 40);

  const stemCount = ri(r, 7, 14);
  const tops: Array<[number, number]> = [];

  for (let i = 0; i < stemCount; i++) {
    const angle = -Math.PI * 0.45 + (i / (stemCount - 1)) * Math.PI * 0.9;
    const sl = rr(r, 200, 480);
    const curve = rr(r, -80, 80);
    const tx = cx + Math.sin(angle) * sl * 0.5 + curve;
    const ty = cy - Math.cos(angle) * sl * 0.2 - sl * 0.65;
    tops.push([tx, ty]);

    o += P(`M${cx + i * 2 - stemCount} ${cy + 200} C${cx + curve * 0.3} ${cy + 50} ${cx + curve * 0.7} ${ty + 100} ${tx} ${ty}`, 2.5);

    const leaves = ri(r, 2, 5);
    for (let l = 0; l < leaves; l++) {
      const t = 0.15 + l * 0.2;
      const lx = cx + (tx - cx) * t + curve * t * 0.3;
      const ly = cy + 200 + (ty - cy - 200) * t;
      const dir = l % 2 === 0 ? 1 : -1;
      o += detailedLeaf(lx, ly, rr(r, 22, 50), dir * rr(r, 25, 60) + (dir > 0 ? 80 : 260), r);
    }
  }

  for (const [fx, fy] of tops) {
    o += flowerHead(fx, fy, rr(r, 28, 70), r);
  }

  const ribbonY = cy + 170;
  o += P(`M${cx - 80} ${ribbonY} C${cx - 40} ${ribbonY + 25} ${cx + 40} ${ribbonY - 25} ${cx + 80} ${ribbonY}`, 3);
  o += P(`M${cx - 75} ${ribbonY + 3} C${cx - 35} ${ribbonY + 27} ${cx + 35} ${ribbonY - 23} ${cx + 75} ${ribbonY + 3}`, 1);
  o += P(`M${cx - 60} ${ribbonY + 15} C${cx - 80} ${ribbonY + 50} ${cx - 55} ${ribbonY + 80} ${cx - 40} ${ribbonY + 85}`, 2.5);
  o += P(`M${cx + 60} ${ribbonY + 15} C${cx + 80} ${ribbonY + 50} ${cx + 55} ${ribbonY + 80} ${cx + 40} ${ribbonY + 85}`, 2.5);
  o += P(`M${cx - 58} ${ribbonY + 18} C${cx - 76} ${ribbonY + 48} ${cx - 52} ${ribbonY + 76} ${cx - 38} ${ribbonY + 82}`, 0.8);
  o += P(`M${cx + 58} ${ribbonY + 18} C${cx + 76} ${ribbonY + 48} ${cx + 52} ${ribbonY + 76} ${cx + 38} ${ribbonY + 82}`, 0.8);

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
    const t = rr(r, 0.05, 0.95);
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

function generateCustom(r: () => number): string {
  let o = "";
  const cx = C, cy = C;

  o += frame(cx, cy, 460, 3);

  const sym = pick(r, [4, 6, 8, 12]);
  const rings = ri(r, 4, 8);
  for (let ring = 0; ring < rings; ring++) {
    const rr2 = ((ring + 1) / rings) * 420;
    o += C2(cx, cy, rr2, ring % 2 === 0 ? 1.5 : 0.8);
    const count = sym * (ring + 1);
    for (let e = 0; e < count; e++) {
      const a = (e / count) * Math.PI * 2;
      const ex = cx + Math.cos(a) * rr2;
      const ey = cy + Math.sin(a) * rr2;
      const t = ri(r, 0, 6);
      if (t === 0) o += C2(ex, ey, rr(r, 3, 10), 0.8);
      else if (t === 1) o += dot(ex, ey, rr(r, 1, 2.5));
      else if (t === 2) o += P(petalPath(ex, ey, rr(r, 5, 15), (a * 180) / Math.PI, rr(r, 2, 6)), 0.8);
      else if (t === 3) o += dotArc(ex, ey, rr(r, 3, 8), a - 0.4, a + 0.4, ri(r, 3, 6), 0.6);
      else if (t === 4) {
        const sz = rr(r, 3, 8);
        o += `<rect x="${ex - sz}" y="${ey - sz}" width="${sz * 2}" height="${sz * 2}" fill="none" stroke="${K}" stroke-width="0.6" transform="rotate(${(a * 180) / Math.PI + 45} ${ex} ${ey})"/>`;
      }
      else if (t === 5) o += P(scrollPath(ex, ey, rr(r, 4, 10), (a * 180) / Math.PI, e % 2 === 0 ? 1 : -1), 0.6);
      else o += L(ex - rr(r, 3, 6), ey, ex + rr(r, 3, 6), ey, 0.5);
    }
  }

  const elemCount = ri(r, 5, 10);
  for (let i = 0; i < elemCount; i++) {
    const a = (i / elemCount) * Math.PI * 2;
    const dist = rr(r, 100, 350);
    const ex = cx + Math.cos(a) * dist;
    const ey = cy + Math.sin(a) * dist;
    const choice = ri(r, 0, 4);

    if (choice === 0) o += smallButterfly(ex, ey, rr(r, 0.5, 1), (a * 180) + rr(r, -30, 30), r);
    else if (choice === 1) o += flowerHead(ex, ey, rr(r, 20, 45), r);
    else if (choice === 2) o += detailedLeaf(ex, ey, rr(r, 30, 60), (a * 180) + rr(r, -30, 30), r);
    else if (choice === 3) {
      const rings2 = ri(r, 3, 6);
      for (let ring = rings2; ring > 0; ring--) o += C2(ex, ey, ring * rr(r, 5, 12), 0.8);
      o += dot(ex, ey, 3);
    } else {
      o += rose(ex, ey, rr(r, 15, 35), r);
    }
  }

  o += ornamentalBorder(cx, cy, 180, 195, sym * 3, r);
  o += ornamentalBorder(cx, cy, 280, 292, sym * 4, r);

  o += C2(cx, cy, 15, 2.5);
  o += dotFillCircle(cx, cy, 12, 6, r, 1);

  return o;
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
  "tattoo-flash": generateTattooFlash,
  custom: generateCustom,
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

  for (let i = 0; i < ri(r, 3, 7); i++) {
    o += smallButterfly(rr(r, 60, 964), rr(r, 40, SIZE - 40), rr(r, 0.15, 0.35), rr(r, -40, 40), r);
  }

  return o;
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
