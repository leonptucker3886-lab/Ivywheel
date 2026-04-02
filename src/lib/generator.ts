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
  return `<circle cx="${x}" cy="${y}" r="${rad}" fill="${K}"/>`;
}

function dotLine(x1: number, y1: number, x2: number, y2: number, n: number, dr = 1) {
  let o = "";
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1);
    o += dot(x1 + (x2 - x1) * t, y1 + (y2 - y1) * t, dr);
  }
  return o;
}

function dotArc(cx: number, cy: number, rad: number, a1: number, a2: number, n: number, dr = 1) {
  let o = "";
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1);
    const a = a1 + (a2 - a1) * t;
    o += dot(cx + Math.cos(a) * rad, cy + Math.sin(a) * rad, dr);
  }
  return o;
}

function dotFill(cx: number, cy: number, w: number, h: number, density: number, r: () => number, maxR = 1.5) {
  let o = "";
  const count = Math.floor(w * h / density);
  for (let i = 0; i < count; i++) {
    o += dot(cx + rr(r, -w / 2, w / 2), cy + rr(r, -h / 2, h / 2), rr(r, 0.4, maxR));
  }
  return o;
}

function dotFillCircle(cx: number, cy: number, rad: number, density: number, r: () => number, maxR = 1.5) {
  let o = "";
  const count = Math.floor(rad * rad * Math.PI / density);
  for (let i = 0; i < count; i++) {
    const a = rr(r, 0, Math.PI * 2);
    const d = rad * Math.sqrt(r());
    o += dot(cx + Math.cos(a) * d, cy + Math.sin(a) * d, rr(r, 0.3, maxR));
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
  o += C2(cx, cy, size * 0.08, 2, K);
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
  o += dotFill(cx + Math.cos(a) * len * 0.5, cy + Math.sin(a) * len * 0.5, len * 0.6, w * 1.2, 30, r, 0.8);
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

function generatePitbulls(r: () => number): string {
  let o = "";
  const variant = ri(r, 0, 4);
  const cx = C + rr(r, -80, 80);
  const cy = C + rr(r, -40, 40);
  const sc = rr(r, 0.9, 1.3);

  o += `<g transform="translate(${cx},${cy}) scale(${sc})">`;

  o += P(`M-110 40 C-130 0 -120 -60 -80 -90 C-50 -110 50 -110 80 -90 C120 -60 130 0 110 40 C100 80 80 120 60 140 L-60 140 C-80 120 -100 80 -110 40Z`, 3);
  o += P(`M-108 40 C-128 0 -118 -58 -78 -88 C-48 -108 48 -108 78 -88 C118 -58 128 0 108 40 C98 78 78 118 58 138 L-58 138 C-78 118 -98 78 -108 40Z`, 0.8);

  o += P(`M-60 -100 C-70 -130 -55 -160 -40 -150 C-30 -140 -35 -115 -50 -100`, 2.5);
  o += P(`M60 -100 C70 -130 55 -160 40 -150 C30 -140 35 -115 50 -100`, 2.5);
  o += P(`M-58 -98 C-65 -125 -52 -150 -42 -145`, 0.8);
  o += P(`M58 -98 C65 -125 52 -150 42 -145`, 0.8);
  o += dotFill(-48, -125, 20, 25, 12, r, 0.8);
  o += dotFill(48, -125, 20, 25, 12, r, 0.8);

  const esp = rr(r, 28, 38);
  for (const s of [-1, 1]) {
    const ex = s * esp;
    o += E(ex, -45, 14, 16, 2);
    o += E(ex, -45, 10, 12, 0.8);
    o += C2(ex, -44, 7, 2, K);
    o += C2(ex, -44, 3, 0, K);
    o += dot(ex - 3, -48, 2);
    const lashes = ri(r, 4, 7);
    for (let l = 0; l < lashes; l++) {
      const la = -Math.PI * 0.8 + (l / lashes) * Math.PI * 0.6;
      o += P(`M${ex + Math.cos(la) * 14} ${-45 + Math.sin(la) * 16} Q${ex + Math.cos(la) * 22} ${-45 + Math.sin(la) * 22} ${ex + Math.cos(la) * 28} ${-45 + Math.sin(la) * 20}`, 0.7);
    }
  }

  o += P(`M-20 -15 C-15 -5 15 -5 20 -15 C25 -5 20 5 0 8 C-20 5 -25 -5 -20 -15`, 2);
  o += P(`M-18 -13 C-13 -5 13 -5 18 -13`, 0.8);
  o += P(`M0 -5 L0 8`, 0.8);
  o += dotFill(0, -10, 15, 8, 10, r, 0.8);
  o += P(`M0 8 C-5 12 -10 10 -12 14`, 1.5);
  o += P(`M0 8 C5 12 10 10 12 14`, 1.5);

  o += P(`M-40 18 C-20 30 20 30 40 18`, 2.5);
  o += P(`M-35 20 C-18 30 18 30 35 20`, 0.8);

  for (let w = 0; w < ri(r, 4, 8); w++) {
    const wy = -70 + w * 8;
    const ww = rr(r, 25, 50);
    o += P(`M${-ww} ${wy} C${-ww * 0.3} ${wy + rr(r, 3, 8)} ${ww * 0.3} ${wy + rr(r, 3, 8)} ${ww} ${wy}`, 1);
  }

  const spots = ri(r, 2, 6);
  for (let i = 0; i < spots; i++) {
    const sx = rr(r, -60, 60);
    const sy = rr(r, -80, 20);
    const sr = rr(r, 8, 25);
    o += P(`M${sx - sr} ${sy} C${sx - sr} ${sy - sr * 0.6} ${sx + sr} ${sy - sr * 0.6} ${sx + sr} ${sy} C${sx + sr} ${sy + sr * 0.6} ${sx - sr} ${sy + sr * 0.6} ${sx - sr} ${sy}`, 1.2);
    o += dotFill(sx, sy, sr * 1.5, sr * 1.5, 15, r, 0.6);
  }

  o += P(`M-80 80 C-85 110 -75 150 -60 165 C-50 175 -35 175 -30 165 L-30 145 C-40 140 -50 135 -55 120 C-60 105 -70 85 -80 80`, 2.5);
  o += P(`M80 80 C85 110 75 150 60 165 C50 175 35 175 30 165 L30 145 C40 140 50 135 55 120 C60 105 70 85 80 80`, 2.5);

  for (const s of [-1, 1]) {
    for (let t = 0; t < 3; t++) {
      const tx = s * (42 + t * 8);
      o += E(tx, 168, 5, 9, 1);
    }
  }

  o += P(`M-55 140 C-55 145 -45 148 -30 148 C-15 148 15 148 30 148 C45 148 55 145 55 140`, 1.5);

  const collar = ri(r, 0, 2);
  if (collar === 0) {
    o += P(`M-65 55 C-30 65 30 65 65 55`, 3);
    o += P(`M-60 58 C-28 67 28 67 60 58`, 1);
    o += C2(0, 62, 8, 2);
    o += C2(0, 62, 3, 0, K);
  }

  o += P(`M105 20 C160 -30 200 -80 180 -40 C165 -10 140 10 110 25`, 3.5);
  o += P(`M105 20 C155 -25 195 -70 178 -38`, 1.2);

  o += dotFill(0, 20, 180, 120, 40, r, 0.7);
  o += dotFill(0, -50, 150, 100, 35, r, 0.6);

  o += `</g>`;
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
      o += C2(s * 16, -67, 4, 1.5, K);
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

  o += C2(cx, cy, maxR * 0.06, 3, K);
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
      o += E(s * esp, -40, 3, 7, 1.5, K);
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
    o += C2(-80, -62, 2.5, 1, K);

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
      o += E(s * 18, -185, 2.5, 5, 1.2, K);
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

  o += C2(cx, cy, 15, 2.5, K);
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
  custom: generateCustom,
};

function generateIvyBorder(r: () => number): string {
  let o = "";

  for (const side of [-1, 1]) {
    const x = side === -1 ? 15 : SIZE - 15;
    const segs = ri(r, 10, 18);
    let d = `M${x} ${SIZE}`;
    for (let i = 0; i < segs; i++) {
      const y = SIZE - (i / segs) * SIZE;
      const cx2 = x + side * rr(r, 15, 35);
      d += ` C${cx2} ${y + rr(r, 10, 25)} ${cx2} ${y - rr(r, 10, 25)} ${x} ${y}`;
    }
    o += P(d, 3);
    o += P(d, 0.8);

    for (let i = 0; i < segs * 2; i++) {
      const y = SIZE - (i / (segs * 2)) * SIZE;
      const dir = side * (i % 2 === 0 ? 1 : -1);
      o += detailedLeaf(x, y, rr(r, 18, 35), dir * rr(r, 30, 70) + (dir > 0 ? 0 : 180), r);
    }
  }

  const segs = ri(r, 6, 12);
  let d = `M0 ${SIZE - 15}`;
  for (let i = 0; i <= segs; i++) {
    const x = (i / segs) * SIZE;
    const y = SIZE - 15 + rr(r, -20, 20);
    d += ` C${x - SIZE / segs * 0.3} ${y + rr(r, -8, 8)} ${x + SIZE / segs * 0.3} ${y + rr(r, -8, 8)} ${x} ${y}`;
  }
  o += P(d, 2.5);
  o += P(d, 0.6);

  for (let i = 0; i < segs * 2; i++) {
    const x = rr(r, 25, SIZE - 25);
    const y = SIZE - 15 + rr(r, -15, 15);
    const dir = r() > 0.5 ? 1 : -1;
    o += detailedLeaf(x, y, rr(r, 10, 22), dir * rr(r, 30, 70) + (dir > 0 ? 270 : 90), r);
  }

  for (let i = 0; i < ri(r, 3, 8); i++) {
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
