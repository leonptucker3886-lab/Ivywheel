"use client";

import { useState } from "react";

// Static coloring page data
const coloringPages = [
  {
    id: "pitbull-realistic",
    title: "Realistic Pitbull",
    description: "Highly detailed American Pit Bull Terrier with accurate anatomy",
    emoji: "🐶",
    imageData: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
      <rect width="1024" height="1024" fill="white"/>
      <g stroke="black" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <!-- Dog body -->
        <ellipse cx="512" cy="650" rx="140" ry="70"/>
        <ellipse cx="512" cy="480" rx="90" ry="80"/>

        <!-- Head -->
        <circle cx="512" cy="280" r="70"/>
        <ellipse cx="512" cy="320" rx="50" ry="30"/>

        <!-- Ears -->
        <polygon points="460,240 480,200 500,240"/>
        <polygon points="564,240 544,200 524,240"/>

        <!-- Eyes -->
        <circle cx="490" cy="270" r="8"/>
        <circle cx="534" cy="270" r="8"/>
        <circle cx="490" cy="270" r="3" fill="black"/>
        <circle cx="534" cy="270" r="3" fill="black"/>

        <!-- Nose -->
        <polygon points="512,320 507,330 517,330"/>

        <!-- Mouth -->
        <path d="M 500 340 Q 512 350 524 340"/>

        <!-- Legs -->
        <rect x="430" y="580" width="20" height="100"/>
        <rect x="474" y="580" width="20" height="100"/>
        <rect x="550" y="580" width="20" height="100"/>
        <rect x="594" y="580" width="20" height="100"/>

        <!-- Paws -->
        <circle cx="440" cy="690" r="15"/>
        <circle cx="484" cy="690" r="15"/>
        <circle cx="560" cy="690" r="15"/>
        <circle cx="604" cy="690" r="15"/>

        <!-- Tail -->
        <path d="M 692 520 Q 720 480 740 520"/>
      </g>
      <text x="512" y="950" text-anchor="middle" font-family="serif" font-size="16" fill="black">Ivy's Peace</text>
    </svg>`)}`,
  },
  {
    id: "biker-chick",
    title: "Confident Biker Chick",
    description: "Bold biker girl on a Harley motorcycle",
    emoji: "🏍️",
    imageData: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
      <rect width="1024" height="1024" fill="white"/>
      <g stroke="black" stroke-width="3" fill="none">
        <!-- Head -->
        <circle cx="512" cy="250" r="60"/>
        <ellipse cx="512" cy="290" rx="40" ry="30"/>

        <!-- Hair -->
        <path d="M 452 230 Q 480 200 512 230 Q 544 200 572 230 Q 590 250 580 280 Q 560 300 540 290 Q 520 280 512 290 Q 504 280 484 290 Q 464 300 444 280 Q 434 250 452 230"/>

        <!-- Eyes -->
        <circle cx="495" cy="240" r="6"/>
        <circle cx="529" cy="240" r="6"/>
        <circle cx="495" cy="240" r="2" fill="black"/>
        <circle cx="529" cy="240" r="2" fill="black"/>

        <!-- Nose -->
        <polygon points="512,260 509,270 515,270"/>

        <!-- Mouth -->
        <path d="M 500 280 Q 512 290 524 280"/>

        <!-- Jacket -->
        <path d="M 470 320 Q 450 400 460 500 Q 470 600 480 650"/>
        <path d="M 554 320 Q 574 400 564 500 Q 554 600 544 650"/>

        <!-- Shorts -->
        <ellipse cx="512" cy="650" rx="80" ry="40"/>

        <!-- Motorcycle -->
        <ellipse cx="512" cy="750" rx="200" ry="80"/>
        <circle cx="312" cy="760" r="35"/>
        <circle cx="712" cy="760" r="35"/>
      </g>
      <text x="512" y="950" text-anchor="middle" font-family="serif" font-size="16" fill="black">Ivy's Peace</text>
    </svg>`)}`,
  },
  {
    id: "tattoo-flash",
    title: "Tattoo Flash Sheet",
    description: "Classic tattoo designs - skulls, roses, daggers",
    emoji: "💀",
    imageData: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
      <rect width="1024" height="1024" fill="white"/>

      <!-- Skull 1 -->
      <g transform="translate(256,200)">
        <circle cx="0" cy="-20" r="40"/>
        <ellipse cx="0" cy="20" rx="30" ry="25"/>
        <circle cx="-12" cy="-30" r="5"/>
        <circle cx="12" cy="-30" r="5"/>
        <circle cx="-12" cy="-30" r="2" fill="black"/>
        <circle cx="12" cy="-30" r="2" fill="black"/>
        <polygon points="0,0 -5,10 5,10"/>
        <rect x="-20" y="10" width="8" height="20"/>
        <rect x="12" y="10" width="8" height="20"/>
      </g>

      <!-- Rose 2 -->
      <g transform="translate(768,200)">
        <circle cx="0" cy="0" r="25"/>
        <circle cx="-8" cy="-8" r="15"/>
        <circle cx="8" cy="-8" r="15"/>
        <circle cx="0" cy="-15" r="12"/>
        <circle cx="0" cy="15" r="8"/>
        <rect x="-2" y="25" width="4" height="20"/>
      </g>

      <!-- Dagger 3 -->
      <g transform="translate(256,500)">
        <polygon points="0,-50 15,20 10,50 0,45 -10,50 -15,20"/>
        <rect x="-5" y="50" width="10" height="30"/>
        <rect x="-8" y="80" width="16" height="15"/>
      </g>

      <!-- Anchor 4 -->
      <g transform="translate(768,500)">
        <circle cx="0" cy="-30" r="10"/>
        <rect x="-5" y="-20" width="10" height="80"/>
        <ellipse cx="-15" cy="40" rx="8" ry="15"/>
        <ellipse cx="15" cy="40" rx="8" ry="15"/>
        <rect x="-20" y="55" width="40" height="8"/>
      </g>

      <!-- Eagle 5 -->
      <g transform="translate(512,350)">
        <polygon points="0,-20 -20,10 20,10"/>
        <circle cx="-8" cy="-25" r="3"/>
        <circle cx="8" cy="-25" r="3"/>
        <path d="M -30 10 Q -20 0 0 10 Q 20 0 30 10"/>
        <path d="M -25 20 Q -15 15 0 20 Q 15 15 25 20"/>
      </g>

      <text x="512" y="950" text-anchor="middle" font-family="serif" font-size="16" fill="black">Ivy's Peace</text>
    </svg>`)}`,
  },
  {
    id: "military-skull",
    title: "Military Skull Warrior",
    description: "Skull wearing military helmet and dog tags",
    emoji: "💀",
    imageData: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
      <rect width="1024" height="1024" fill="white"/>
      <g stroke="black" stroke-width="3" fill="none">
        <!-- Skull -->
        <circle cx="512" cy="350" r="80"/>
        <ellipse cx="512" cy="420" rx="60" ry="50"/>
        <circle cx="485" cy="330" r="8"/>
        <circle cx="539" cy="330" r="8"/>
        <circle cx="485" cy="330" r="3" fill="black"/>
        <circle cx="539" cy="330" r="3" fill="black"/>
        <polygon points="512,400 507,415 517,415"/>
        <path d="M 500 425 Q 512 435 524 425"/>

        <!-- Military Helmet -->
        <ellipse cx="512" cy="280" rx="85" ry="40"/>
        <ellipse cx="512" cy="290" rx="75" ry="30"/>
        <ellipse cx="512" cy="265" rx="70" ry="15"/>
        <!-- Helmet details -->
        <ellipse cx="512" cy="275" rx="60" ry="8"/>
        <rect x="455" y="275" width="15" height="8"/>
        <rect x="550" y="275" width="15" height="8"/>

        <!-- Dog Tags -->
        <ellipse cx="480" cy="480" rx="8" ry="15"/>
        <ellipse cx="544" cy="480" rx="8" ry="15"/>
        <rect x="472" y="465" width="16" height="30"/>
        <rect x="536" y="465" width="16" height="30"/>
        <circle cx="480" cy="495" r="3"/>
        <circle cx="544" cy="495" r="3"/>

        <!-- Crossed Rifles -->
        <g transform="translate(512,600)">
          <line x1="-80" y1="-20" x2="80" y2="20" stroke-width="4"/>
          <line x1="-80" y1="20" x2="80" y2="-20" stroke-width="4"/>
          <!-- Rifle barrels -->
          <rect x="-90" y="-2" width="20" height="4"/>
          <rect x="70" y="-2" width="20" height="4"/>
          <!-- Rifle stocks -->
          <rect x="-85" y="-8" width="15" height="16"/>
          <rect x="70" y="-8" width="15" height="16"/>
        </g>

        <!-- American Flag Ribbon -->
        <g transform="translate(512,550)">
          <rect x="-40" y="-5" width="80" height="10" rx="2"/>
          <rect x="-40" y="-5" width="20" height="10" fill="none" stroke="red" stroke-width="1"/>
          <rect x="-20" y="-5" width="20" height="10" fill="white"/>
          <rect x="0" y="-5" width="20" height="10" fill="none" stroke="blue" stroke-width="1"/>
          <rect x="20" y="-5" width="20" height="10" fill="red"/>
          <!-- Stars -->
          <polygon points="-15,-2 -13,0 -15,2 -11,2 -9,0 -11,-2" fill="white"/>
          <polygon points="-5,-2 -3,0 -5,2 -1,2 1,0 -1,-2" fill="white"/>
        </g>

        <!-- Bullets -->
        <g transform="translate(450,520)">
          <rect x="0" y="0" width="4" height="20"/>
          <circle cx="2" cy="22" r="2"/>
        </g>
        <g transform="translate(470,520)">
          <rect x="0" y="0" width="4" height="20"/>
          <circle cx="2" cy="22" r="2"/>
        </g>
        <g transform="translate(490,520)">
          <rect x="0" y="0" width="4" height="20"/>
          <circle cx="2" cy="22" r="2"/>
        </g>
      </g>
      <text x="512" y="950" text-anchor="middle" font-family="serif" font-size="16" fill="black">Ivy's Peace</text>
    </svg>`)}`,
  },
  {
    id: "western-gunslinger",
    title: "Western Gunslinger",
    description: "Tough western gunslinger with dual revolvers",
    emoji: "🤠",
    imageData: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
      <rect width="1024" height="1024" fill="white"/>
      <g stroke="black" stroke-width="3" fill="none">
        <!-- Head -->
        <circle cx="512" cy="280" r="60"/>
        <ellipse cx="512" cy="320" rx="40" ry="30"/>

        <!-- Cowboy Hat -->
        <ellipse cx="512" cy="220" rx="80" ry="25"/>
        <ellipse cx="512" cy="235" rx="70" ry="15"/>
        <rect x="442" y="225" width="140" height="10"/>
        <ellipse cx="512" cy="250" rx="60" ry="8"/>

        <!-- Eyes -->
        <circle cx="495" cy="270" r="6"/>
        <circle cx="529" cy="270" r="6"/>
        <circle cx="495" cy="270" r="2" fill="black"/>
        <circle cx="529" cy="270" r="2" fill="black"/>

        <!-- Mustache -->
        <path d="M 490 310 Q 500 320 512 315 Q 524 320 534 310"/>
        <path d="M 485 315 Q 495 325 505 320"/>
        <path d="M 519 320 Q 529 325 539 315"/>

        <!-- Bandana -->
        <path d="M 452 285 Q 480 275 512 285 Q 544 275 572 285 Q 580 295 572 305 Q 544 315 512 305 Q 480 315 452 305 Q 444 295 452 285"/>

        <!-- Duster Coat -->
        <path d="M 470 380 Q 450 450 460 550 Q 470 650 480 720"/>
        <path d="M 554 380 Q 574 450 564 550 Q 554 650 544 720"/>
        <ellipse cx="512" cy="720" rx="60" ry="30"/>

        <!-- Dual Revolvers -->
        <g transform="translate(420,500)">
          <ellipse cx="0" cy="0" rx="25" ry="8"/>
          <rect x="-20" y="-5" width="40" height="10"/>
          <circle cx="18" cy="0" r="3"/>
          <rect x="-15" y="-8" width="6" height="16"/>
        </g>
        <g transform="translate(604,500)">
          <ellipse cx="0" cy="0" rx="25" ry="8"/>
          <rect x="-20" y="-5" width="40" height="10"/>
          <circle cx="18" cy="0" r="3"/>
          <rect x="-15" y="-8" width="6" height="16"/>
        </g>

        <!-- Holsters -->
        <ellipse cx="420" cy="540" rx="15" ry="25"/>
        <ellipse cx="604" cy="540" rx="15" ry="25"/>
        <path d="M 405 515 Q 420 505 435 515"/>
        <path d="M 589 515 Q 604 505 619 515"/>

        <!-- Spurs -->
        <g transform="translate(480,780)">
          <circle cx="0" cy="0" r="8"/>
          <polygon points="-3,-12 3,-12 0,-6"/>
          <polygon points="-12,-3 -12,3 -6,0"/>
          <polygon points="3,12 -3,12 0,6"/>
          <polygon points="12,3 12,-3 6,0"/>
        </g>
        <g transform="translate(544,780)">
          <circle cx="0" cy="0" r="8"/>
          <polygon points="-3,-12 3,-12 0,-6"/>
          <polygon points="-12,-3 -12,3 -6,0"/>
          <polygon points="3,12 -3,12 0,6"/>
          <polygon points="12,3 12,-3 6,0"/>
        </g>

        <!-- Wanted Poster Elements -->
        <g transform="translate(512,650)">
          <rect x="-60" y="-30" width="120" height="60" rx="5"/>
          <text x="0" y="-5" text-anchor="middle" font-family="serif" font-size="8" fill="black">WANTED</text>
          <text x="0" y="10" text-anchor="middle" font-family="serif" font-size="6" fill="black">$1000 REWARD</text>
        </g>
      </g>
      <text x="512" y="950" text-anchor="middle" font-family="serif" font-size="16" fill="black">Ivy's Peace</text>
    </svg>`)}`,
  },
  {
    id: "navy-anchor",
    title: "Navy Anchor",
    description: "Classic navy anchor with rope and eagle",
    emoji: "⚓",
    imageData: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
      <rect width="1024" height="1024" fill="white"/>
      <g stroke="black" stroke-width="3" fill="none">
        <!-- Anchor -->
        <circle cx="512" cy="350" r="20"/>
        <rect x="502" y="350" width="20" height="200"/>
        <ellipse cx="480" cy="520" rx="25" ry="15"/>
        <ellipse cx="544" cy="520" rx="25" ry="15"/>
        <rect x="465" y="535" width="60" height="15"/>
        <polygon points="512,370 500,390 524,390"/>
        <polygon points="512,530 500,510 524,510"/>

        <!-- Rope -->
        <path d="M 512 330 Q 480 320 450 330 Q 420 350 430 380 Q 450 400 480 390 Q 500 380 512 390" stroke-linecap="round"/>
        <path d="M 512 570 Q 520 580 510 600 Q 500 620 520 640 Q 540 650 560 640 Q 580 620 570 600 Q 560 580 540 570" stroke-linecap="round"/>

        <!-- Eagle -->
        <g transform="translate(512,200)">
          <polygon points="0,-30 -25,-10 25,-10"/>
          <circle cx="-10" cy="-35" r="3"/>
          <circle cx="10" cy="-35" r="3"/>
          <ellipse cx="0" cy="-20" rx="20" ry="8"/>
          <path d="M -35 -10 Q -25 -5 0 -10 Q 25 -5 35 -10"/>
          <path d="M -30 0 Q -20 -5 0 0 Q 20 -5 30 0"/>
          <polygon points="0,10 -5,25 5,25"/>
        </g>

        <!-- American Flag -->
        <g transform="translate(512,650)">
          <rect x="-40" y="-20" width="80" height="40" rx="3"/>
          <rect x="-40" y="-20" width="20" height="40" fill="none" stroke="red" stroke-width="1"/>
          <rect x="-20" y="-20" width="20" height="40" fill="white"/>
          <rect x="0" y="-20" width="20" height="40" fill="none" stroke="blue" stroke-width="1"/>
          <rect x="20" y="-20" width="20" height="40" fill="red"/>
          <!-- Stars -->
          <circle cx="-30" cy="-10" r="1.5" fill="white"/>
          <circle cx="-25" cy="-5" r="1.5" fill="white"/>
          <circle cx="-10" cy="-10" r="1.5" fill="white"/>
          <circle cx="-5" cy="-5" r="1.5" fill="white"/>
        </g>

        <!-- Waves -->
        <g transform="translate(512,750)">
          <path d="M -200 0 Q -150 -20 -100 0 Q -50 -20 0 0 Q 50 -20 100 0 Q 150 -20 200 0" stroke-linecap="round"/>
          <path d="M -180 20 Q -130 0 -80 20 Q -30 0 20 20 Q 70 0 120 20 Q 170 0 220 20" stroke-linecap="round"/>
        </g>

        <!-- Ship elements -->
        <g transform="translate(512,800)">
          <rect x="-30" y="-10" width="60" height="20" rx="10"/>
          <polygon points="-30,-10 -40,10 -20,10"/>
          <polygon points="30,-10 40,10 20,10"/>
          <rect x="-25" y="0" width="50" height="8"/>
        </g>
      </g>
      <text x="512" y="950" text-anchor="middle" font-family="serif" font-size="16" fill="black">Ivy's Peace</text>
    </svg>`)}`,
  },
  {
    id: "mildly-sexy-cowgirl",
    title: "Mildly Sexy Cowgirl",
    description: "Cowgirl in cowboy hat and boots holding lasso",
    emoji: "🤠",
    imageData: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
      <rect width="1024" height="1024" fill="white"/>
      <g stroke="black" stroke-width="3" fill="none">
        <!-- Head -->
        <circle cx="512" cy="280" r="55"/>
        <ellipse cx="512" cy="320" rx="35" ry="25"/>

        <!-- Cowboy Hat -->
        <ellipse cx="512" cy="220" rx="75" ry="25"/>
        <ellipse cx="512" cy="235" rx="65" ry="15"/>
        <rect x="447" y="230" width="130" height="10"/>
        <ellipse cx="512" cy="250" rx="55" ry="8"/>

        <!-- Hair -->
        <path d="M 457 265 Q 480 250 512 265 Q 544 250 567 265 Q 575 275 567 285 Q 544 295 512 285 Q 480 295 457 285 Q 449 275 457 265"/>

        <!-- Eyes -->
        <circle cx="495" cy="270" r="5"/>
        <circle cx="529" cy="270" r="5"/>
        <circle cx="495" cy="270" r="2" fill="black"/>
        <circle cx="529" cy="270" r="2" fill="black"/>

        <!-- Nose -->
        <polygon points="512,290 509,300 515,300"/>

        <!-- Mouth -->
        <path d="M 500 305 Q 512 315 524 305"/>

        <!-- Fringed Jacket -->
        <path d="M 470 380 Q 450 450 460 550 Q 470 650 480 720"/>
        <path d="M 554 380 Q 574 450 564 550 Q 554 650 544 720"/>
        <!-- Fringe -->
        <g stroke-width="2">
          <path d="M 465 400 Q 475 410 465 420"/>
          <path d="M 475 405 Q 485 415 475 425"/>
          <path d="M 485 410 Q 495 420 485 430"/>
          <path d="M 559 400 Q 549 410 559 420"/>
          <path d="M 549 405 Q 539 415 549 425"/>
          <path d="M 539 410 Q 529 420 539 430"/>
        </g>

        <!-- Jeans -->
        <ellipse cx="512" cy="720" rx="50" ry="25"/>
        <path d="M 462 720 Q 450 800 455 880"/>
        <path d="M 562 720 Q 574 800 569 880"/>

        <!-- Cowboy Boots -->
        <ellipse cx="455" cy="890" rx="20" ry="15"/>
        <ellipse cx="569" cy="890" rx="20" ry="15"/>
        <polygon points="435,890 455,870 475,890"/>
        <polygon points="549,890 569,870 589,890"/>
        <rect x="445" y="885" width="20" height="10"/>
        <rect x="559" y="885" width="20" height="10"/>

        <!-- Lasso -->
        <g transform="translate(450,400)">
          <path d="M 0 0 Q 50 -30 80 0 Q 50 30 0 0" stroke-linecap="round"/>
          <circle cx="80" cy="0" r="8"/>
          <circle cx="80" cy="0" r="12" opacity="0.3"/>
        </g>

        <!-- Fence -->
        <g transform="translate(512,850)">
          <rect x="-80" y="-20" width="160" height="8"/>
          <rect x="-70" y="-35" width="8" height="30"/>
          <rect x="-50" y="-35" width="8" height="30"/>
          <rect x="-30" y="-35" width="8" height="30"/>
          <rect x="-10" y="-35" width="8" height="30"/>
          <rect x="10" y="-35" width="8" height="30"/>
          <rect x="30" y="-35" width="8" height="30"/>
          <rect x="50" y="-35" width="8" height="30"/>
          <rect x="70" y="-35" width="8" height="30"/>
        </g>
      </g>
      <text x="512" y="950" text-anchor="middle" font-family="serif" font-size="16" fill="black">Ivy's Peace</text>
    </svg>`)}`,
  },
];

export default function ColoringPages() {
  const [selectedPage, setSelectedPage] = useState<string | null>(null);

  const handleDownloadPNG = (page: typeof coloringPages[0]) => {
    const img = page.imageData;
    const a = document.createElement("a");
    a.href = img;
    a.download = `${page.title.toLowerCase().replace(/\s+/g, "-")}-coloring-page.png`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const handleDownloadPDF = (page: typeof coloringPages[0]) => {
    const img = page.imageData;
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = image.naturalWidth || 1024;
      canvas.height = image.naturalHeight || 1024;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.drawImage(image, 0, 0);

      const imgData = canvas.toDataURL("image/png");

      const pdfWidth = 595.28;
      const pdfHeight = 841.89;
      const margin = 20;
      const printableW = pdfWidth - margin * 2;
      const printableH = pdfHeight - margin * 2;
      const aspect = canvas.width / canvas.height;

      let drawW, drawH;
      if (printableW / printableH > aspect) {
        drawH = printableH;
        drawW = drawH * aspect;
      } else {
        drawW = printableW;
        drawH = drawW / aspect;
      }

      const offsetX = margin + (printableW - drawW) / 2;
      const offsetY = margin + (printableH - drawH) / 2;

      const stream = buildMinimalPDF(
        imgData,
        pdfWidth,
        pdfHeight,
        drawW,
        drawH,
        offsetX,
        offsetY
      );

      const blob = new Blob([new Uint8Array(stream)], {
        type: "application/pdf",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${page.title.toLowerCase().replace(/\s+/g, "-")}-coloring-page.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    };
    image.src = img;
  };

  const selectedPageData = coloringPages.find(p => p.id === selectedPage);

  return (
    <main className="min-h-screen bg-stone-950 text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
            Ivy&apos;s Peace
          </h1>
          <p className="text-stone-400 text-lg max-w-2xl mx-auto">
            Download beautiful adult-themed coloring pages. Print them out and enjoy coloring with your favorite mediums.
          </p>
        </header>

        {!selectedPageData ? (
          <section>
            <h2 className="text-2xl font-semibold mb-6">Choose a Coloring Page</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {coloringPages.map((page) => (
                <div
                  key={page.id}
                  onClick={() => setSelectedPage(page.id)}
                  className="bg-stone-800 rounded-xl p-6 cursor-pointer hover:bg-stone-750 transition-colors border border-stone-700 hover:border-emerald-600"
                >
                  <div className="text-6xl mb-4 text-center">{page.emoji}</div>
                  <h3 className="text-lg font-semibold mb-2">{page.title}</h3>
                  <p className="text-stone-400 text-sm">{page.description}</p>
                </div>
              ))}
            </div>
          </section>
        ) : (
          <section className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <h2 className="text-3xl font-bold text-emerald-300">
                {selectedPageData.title}
              </h2>
              <span className="text-4xl">{selectedPageData.emoji}</span>
            </div>
            <p className="text-stone-400 mb-8 max-w-lg mx-auto">
              {selectedPageData.description}
            </p>

            <div className="bg-white rounded-2xl p-8 max-w-2xl mx-auto mb-8">
              <img
                src={selectedPageData.imageData}
                alt={selectedPageData.title}
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>

            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <button
                onClick={() => handleDownloadPNG(selectedPageData)}
                className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                  <polyline points="7 10 12 15 17 10"/>
                  <line x1="12" y1="15" x2="12" y2="3"/>
                </svg>
                Download PNG
              </button>
              <button
                onClick={() => handleDownloadPDF(selectedPageData)}
                className="px-6 py-3 bg-teal-600 hover:bg-teal-500 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                Download PDF
              </button>
              <button
                onClick={() => setSelectedPage(null)}
                className="px-6 py-3 bg-stone-600 hover:bg-stone-500 text-white font-semibold rounded-xl transition-colors flex items-center gap-2"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="19" y1="12" x2="5" y2="12"/>
                  <polyline points="12 19 5 12 12 5"/>
                </svg>
                Browse More
              </button>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

function buildMinimalPDF(
  imgDataUrl: string,
  pageW: number,
  pageH: number,
  drawW: number,
  drawH: number,
  offsetX: number,
  offsetY: number
): Uint8Array {
  const base64 = imgDataUrl.split(",")[1];
  const binaryStr = atob(base64);
  const bytes = new Uint8Array(binaryStr.length);
  for (let i = 0; i < binaryStr.length; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }

  const watermarkText = "Ivy's Peace";
  const watermarkStream = `BT /F1 8 Tf 250 12 Td (${watermarkText}) Tj ET`;

  const imageStream = `q ${drawW.toFixed(2)} 0 0 ${drawH.toFixed(2)} ${offsetX.toFixed(2)} ${offsetY.toFixed(2)} cm /Img Do Q`;
  const fullStreamContent = `${watermarkStream}\n${imageStream}`;

  const objects: string[] = [];
  const offsets: number[] = [];

  function addObj(content: string) {
    offsets.push(objects.length === 0 ? 0 : getLength());
    objects.push(content);
  }

  function getLength() {
    let len = 0;
    for (let i = 0; i < objects.length; i++) {
      len += objects[i].length;
    }
    return len;
  }

  const header = "%PDF-1.4\n%\xE2\xE3\xCF\xD3\n";
  addObj(header);

  const obj1 = `1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n`;
  addObj(obj1);

  const obj2 = `2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n`;
  addObj(obj2);

  const obj3 = `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageW} ${pageH}] /Contents 4 0 R /Resources << /XObject << /Img 5 0 R >> /Font << /F1 6 0 R >> >> >>\nendobj\n`;
  addObj(obj3);

  const obj4 = `4 0 obj\n<< /Length ${fullStreamContent.length} >>\nstream\n${fullStreamContent}\nendstream\nendobj\n`;
  addObj(obj4);

  const obj5Header = `5 0 obj\n<< /Type /XObject /Subtype /Image /Width 1024 /Height 1024 /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${bytes.length} >>\nstream\n`;
  const obj5Footer = "\nendstream\nendobj\n";

  const obj6 = `6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n`;

  const totalLen =
    header.length +
    obj1.length +
    obj2.length +
    obj3.length +
    obj4.length +
    obj5Header.length +
    bytes.length +
    obj5Footer.length +
    obj6.length +
    512;

  const result = new Uint8Array(totalLen);
  let pos = 0;

  function writeStr(s: string) {
    for (let i = 0; i < s.length; i++) {
      result[pos++] = s.charCodeAt(i);
    }
  }

  function writeBytes(b: Uint8Array) {
    result.set(b, pos);
    pos += b.length;
  }

  let runningOffset = 0;
  const xrefOffsets: number[] = [];

  writeStr(header);
  xrefOffsets.push(runningOffset);
  runningOffset += header.length;

  writeStr(obj1);
  xrefOffsets.push(runningOffset);
  runningOffset += obj1.length;

  writeStr(obj2);
  xrefOffsets.push(runningOffset);
  runningOffset += obj2.length;

  writeStr(obj3);
  xrefOffsets.push(runningOffset);
  runningOffset += obj3.length;

  writeStr(obj4);
  xrefOffsets.push(runningOffset);
  runningOffset += obj4.length;

  writeStr(obj5Header);
  xrefOffsets.push(runningOffset);
  runningOffset += obj5Header.length;

  writeBytes(bytes);

  writeStr(obj5Footer);
  runningOffset += obj5Footer.length;

  writeStr(obj6);
  xrefOffsets.push(runningOffset);
  runningOffset += obj6.length;

  const xrefStart = runningOffset;
  writeStr("xref\n");
  writeStr("0 7\n");
  writeStr("0000000000 65535 f \n");
  for (let i = 0; i < xrefOffsets.length; i++) {
    const off = xrefOffsets[i].toString().padStart(10, "0");
    writeStr(`${off} 00000 n \n`);
  }

  writeStr("trailer\n");
  writeStr("<< /Size 7 /Root 1 0 R >>\n");
  writeStr("startxref\n");
  writeStr(`${xrefStart}\n`);
  writeStr("%%EOF\n");

  return result.slice(0, pos);
}