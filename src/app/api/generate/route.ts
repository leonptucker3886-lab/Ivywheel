// Fallback SVG generators for when image API fails
function generateFallbackPitbull(): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2048 2048" width="2048" height="2048">
      <defs>
        <linearGradient id="furGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2d2d2d;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#404040;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="4" dy="4" stdDeviation="3" flood-color="#00000040"/>
        </filter>
      </defs>

      <rect width="2048" height="2048" fill="#f8f8f8"/>

      <!-- Ivy border frame -->
      <g stroke="#1a5f3a" stroke-width="8" fill="none" stroke-linecap="round">
        <!-- Top border -->
        <path d="M 100 100 Q 300 60 500 100 Q 700 140 900 100 Q 1100 60 1300 100 Q 1500 140 1700 100 Q 1900 60 1948 100"/>
        <!-- Bottom border -->
        <path d="M 100 1948 Q 300 1988 500 1948 Q 700 1908 900 1948 Q 1100 1988 1300 1948 Q 1500 1908 1700 1948 Q 1900 1988 1948 1948"/>
        <!-- Left border -->
        <path d="M 100 100 Q 60 300 100 500 Q 140 700 100 900 Q 60 1100 100 1300 Q 140 1500 100 1700 Q 60 1900 100 1948"/>
        <!-- Right border -->
        <path d="M 1948 100 Q 1988 300 1948 500 Q 1908 700 1948 900 Q 1988 1100 1948 1300 Q 1908 1500 1948 1700 Q 1988 1900 1948 1948"/>
      </g>

      <!-- Ivy leaves around border -->
      <g fill="#2d6a4f" stroke="#1a3a2e" stroke-width="2">
        <!-- Top left -->
        <g transform="translate(200,80)">
          <path d="M 0 20 Q -10 10 -20 20 Q -30 40 -20 60 Q -10 80 0 70 Q 10 60 20 70 Q 30 90 20 110 Q 10 130 0 120 Q -10 110 -20 120 Q -30 140 -20 160 Q -10 170 0 160" stroke-linecap="round"/>
          <path d="M 0 20 Q 0 80 0 140" stroke-width="1" opacity="0.6"/>
          <path d="M -8 40 Q -8 70 -8 100" stroke-width="1" opacity="0.4"/>
          <path d="M 8 50 Q 8 80 8 110" stroke-width="1" opacity="0.4"/>
        </g>
        <!-- Top right -->
        <g transform="translate(1848,80)">
          <path d="M 0 20 Q -10 10 -20 20 Q -30 40 -20 60 Q -10 80 0 70 Q 10 60 20 70 Q 30 90 20 110 Q 10 130 0 120 Q -10 110 -20 120 Q -30 140 -20 160 Q -10 170 0 160" stroke-linecap="round"/>
          <path d="M 0 20 Q 0 80 0 140" stroke-width="1" opacity="0.6"/>
          <path d="M -8 40 Q -8 70 -8 100" stroke-width="1" opacity="0.4"/>
          <path d="M 8 50 Q 8 80 8 110" stroke-width="1" opacity="0.4"/>
        </g>
        <!-- Bottom left -->
        <g transform="translate(200,1968)">
          <path d="M 0 -20 Q -10 -10 -20 -20 Q -30 -40 -20 -60 Q -10 -80 0 -70 Q 10 -60 20 -70 Q 30 -90 20 -110 Q 10 -130 0 -120 Q -10 -110 -20 -120 Q -30 -140 -20 -160 Q -10 -170 0 -160" stroke-linecap="round"/>
          <path d="M 0 -20 Q 0 -80 0 -140" stroke-width="1" opacity="0.6"/>
          <path d="M -8 -40 Q -8 -70 -8 -100" stroke-width="1" opacity="0.4"/>
          <path d="M 8 -50 Q 8 -80 8 -110" stroke-width="1" opacity="0.4"/>
        </g>
        <!-- Bottom right -->
        <g transform="translate(1848,1968)">
          <path d="M 0 -20 Q -10 -10 -20 -20 Q -30 -40 -20 -60 Q -10 -80 0 -70 Q 10 -60 20 -70 Q 30 -90 20 -110 Q 10 -130 0 -120 Q -10 -110 -20 -120 Q -30 -140 -20 -160 Q -10 -170 0 -160" stroke-linecap="round"/>
          <path d="M 0 -20 Q 0 -80 0 -140" stroke-width="1" opacity="0.6"/>
          <path d="M -8 -40 Q -8 -70 -8 -100" stroke-width="1" opacity="0.4"/>
          <path d="M 8 -50 Q 8 -80 8 -110" stroke-width="1" opacity="0.4"/>
        </g>
      </g>

      <!-- Main dog illustration -->
      <g transform="translate(1024,1100)" filter="url(#shadow)">
        <!-- Body outline -->
        <ellipse cx="0" cy="100" rx="280" ry="140" fill="none" stroke="black" stroke-width="8"/>
        <ellipse cx="0" cy="-60" rx="180" ry="160" fill="none" stroke="black" stroke-width="8"/>

        <!-- Fur texture patterns -->
        <g fill="none" stroke="black" stroke-width="2" opacity="0.8">
          <!-- Shoulder muscles -->
          <ellipse cx="-120" cy="40" rx="80" ry="60" stroke-dasharray="3,2"/>
          <ellipse cx="120" cy="40" rx="80" ry="60" stroke-dasharray="3,2"/>
          <!-- Chest definition -->
          <ellipse cx="0" cy="80" rx="120" ry="80" stroke-dasharray="4,3"/>
          <!-- Back muscles -->
          <ellipse cx="0" cy="-20" rx="140" ry="100" stroke-dasharray="3,2"/>
        </g>

        <!-- Head -->
        <circle cx="0" cy="-240" r="140" fill="none" stroke="black" stroke-width="8"/>
        <ellipse cx="0" cy="-180" rx="100" ry="60" fill="none" stroke="black" stroke-width="6"/>

        <!-- Ears - cropped style -->
        <polygon points="-80,-380 -100,-420 -60,-400" fill="none" stroke="black" stroke-width="6" stroke-linecap="round"/>
        <polygon points="80,-380 100,-420 60,-400" fill="none" stroke="black" stroke-width="6" stroke-linecap="round"/>

        <!-- Eyes - alert and intelligent -->
        <circle cx="-45" cy="-260" r="18" fill="none" stroke="black" stroke-width="4"/>
        <circle cx="45" cy="-260" r="18" fill="none" stroke="black" stroke-width="4"/>
        <!-- Pupils -->
        <circle cx="-45" cy="-260" r="8" fill="black"/>
        <circle cx="45" cy="-260" r="8" fill="black"/>
        <!-- Eye highlights -->
        <circle cx="-42" cy="-265" r="3" fill="white"/>
        <circle cx="42" cy="-265" r="3" fill="white"/>

        <!-- Nose -->
        <ellipse cx="0" cy="-170" rx="12" ry="8" fill="black"/>
        <!-- Nostrils -->
        <ellipse cx="-4" cy="-172" rx="2" ry="3" fill="none" stroke="black" stroke-width="1"/>
        <ellipse cx="4" cy="-172" rx="2" ry="3" fill="none" stroke="black" stroke-width="1"/>

        <!-- Mouth lines - confident expression -->
        <path d="M -20 -150 Q 0 -140 20 -150" fill="none" stroke="black" stroke-width="3" stroke-linecap="round"/>
        <!-- Jowl lines -->
        <path d="M -60 -160 Q -40 -170 -20 -165" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 60 -160 Q 40 -170 20 -165" fill="none" stroke="black" stroke-width="2"/>

        <!-- Neck wrinkles -->
        <g stroke="black" stroke-width="2" fill="none">
          <path d="M -80 -100 Q -60 -110 -40 -105" opacity="0.7"/>
          <path d="M 80 -100 Q 60 -110 40 -105" opacity="0.7"/>
          <path d="M -60 -80 Q -40 -90 -20 -85" opacity="0.7"/>
          <path d="M 60 -80 Q 40 -90 20 -85" opacity="0.7"/>
        </g>

        <!-- Front legs -->
        <rect x="-180" y="120" width="40" height="140" fill="none" stroke="black" stroke-width="6" rx="20"/>
        <rect x="140" y="120" width="40" height="140" fill="none" stroke="black" stroke-width="6" rx="20"/>
        <!-- Rear legs -->
        <rect x="-220" y="200" width="40" height="120" fill="none" stroke="black" stroke-width="6" rx="20"/>
        <rect x="180" y="200" width="40" height="120" fill="none" stroke="black" stroke-width="6" rx="20"/>

        <!-- Paws -->
        <ellipse cx="-180" cy="280" rx="25" ry="15" fill="none" stroke="black" stroke-width="5"/>
        <ellipse cx="140" cy="280" rx="25" ry="15" fill="none" stroke="black" stroke-width="5"/>
        <ellipse cx="-220" cy="340" rx="25" ry="15" fill="none" stroke="black" stroke-width="5"/>
        <ellipse cx="180" cy="340" rx="25" ry="15" fill="none" stroke="black" stroke-width="5"/>

        <!-- Paw pads -->
        <ellipse cx="-180" cy="285" rx="12" ry="6" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="140" cy="285" rx="12" ry="6" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="-220" cy="345" rx="12" ry="6" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="180" cy="345" rx="12" ry="6" fill="none" stroke="black" stroke-width="2"/>

        <!-- Tail -->
        <path d="M 240 140 Q 300 100 320 140" fill="none" stroke="black" stroke-width="6" stroke-linecap="round"/>
        <ellipse cx="310" cy="130" rx="8" ry="15" fill="none" stroke="black" stroke-width="4"/>
      </g>

      <!-- Title and branding -->
      <text x="1024" y="1950" text-anchor="middle" font-family="serif" font-size="36" fill="#2d6a4f" font-weight="bold">Ivy's Peace</text>
      <text x="1024" y="1990" text-anchor="middle" font-family="serif" font-size="24" fill="#1a5f3a">Realistic Pitbull Coloring Page</text>
      <text x="1024" y="2020" text-anchor="middle" font-family="serif" font-size="16" fill="#666" opacity="0.8">Professional Line Art • Print & Color</text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

function generateFallbackBikerChick(): string {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024" width="1024" height="1024">
      <defs>
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f5d5c0;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#d4a574;stop-opacity:1" />
        </linearGradient>
        <filter id="leatherShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="3" dy="3" stdDeviation="2" flood-color="#00000030"/>
        </filter>
      </defs>

      <rect width="1024" height="1024" fill="#f8f8f8"/>

      <!-- Ivy border -->
      <g stroke="#2d6a4f" stroke-width="4" fill="none" stroke-linecap="round">
        <path d="M 50 50 Q 150 20 250 50 Q 350 80 450 50 Q 550 20 650 50 Q 750 80 850 50 Q 950 20 974 50"/>
        <path d="M 50 974 Q 150 1004 250 974 Q 350 944 450 974 Q 550 1004 650 974 Q 750 944 850 974 Q 950 1004 974 974"/>
        <path d="M 50 50 Q 20 150 50 250 Q 80 350 50 450 Q 20 550 50 650 Q 80 750 50 850 Q 20 950 50 974"/>
        <path d="M 974 50 Q 1004 150 974 250 Q 944 350 974 450 Q 1004 550 974 650 Q 944 750 974 850 Q 1004 950 974 974"/>
      </g>

      <!-- Ivy leaves -->
      <g fill="#2d6a4f" stroke="#1a3a2e" stroke-width="1">
        <g transform="translate(80,60)">
          <path d="M 0 15 Q -8 8 -16 15 Q -24 28 -16 42 Q -8 56 0 49 Q 8 42 16 49 Q 24 63 16 77 Q 8 91 0 84 Q -8 77 -16 84 Q -24 98 -16 112 Q -8 119 0 112"/>
          <path d="M 0 15 Q 0 56 0 98" stroke-width="0.8" opacity="0.6"/>
        </g>
        <g transform="translate(944,60)">
          <path d="M 0 15 Q -8 8 -16 15 Q -24 28 -16 42 Q -8 56 0 49 Q 8 42 16 49 Q 24 63 16 77 Q 8 91 0 84 Q -8 77 -16 84 Q -24 98 -16 112 Q -8 119 0 112"/>
          <path d="M 0 15 Q 0 56 0 98" stroke-width="0.8" opacity="0.6"/>
        </g>
        <g transform="translate(80,964)">
          <path d="M 0 -15 Q -8 -8 -16 -15 Q -24 -28 -16 -42 Q -8 -56 0 -49 Q 8 -42 16 -49 Q 24 -63 16 -77 Q 8 -91 0 -84 Q -8 -77 -16 -84 Q -24 -98 -16 -112 Q -8 -119 0 -112"/>
          <path d="M 0 -15 Q 0 -56 0 -98" stroke-width="0.8" opacity="0.6"/>
        </g>
        <g transform="translate(944,964)">
          <path d="M 0 -15 Q -8 -8 -16 -15 Q -24 -28 -16 -42 Q -8 -56 0 -49 Q 8 -42 16 -49 Q 24 -63 16 -77 Q 8 -91 0 -84 Q -8 -77 -16 -84 Q -24 -98 -16 -112 Q -8 -119 0 -112"/>
          <path d="M 0 -15 Q 0 -56 0 -98" stroke-width="0.8" opacity="0.6"/>
        </g>
      </g>

      <!-- Motorcycle -->
      <g transform="translate(512,750)" filter="url(#leatherShadow)">
        <!-- Main body -->
        <ellipse cx="0" cy="0" rx="220" ry="90" fill="none" stroke="black" stroke-width="6"/>
        <ellipse cx="0" cy="-30" rx="140" ry="70" fill="none" stroke="black" stroke-width="5"/>

        <!-- Engine details -->
        <ellipse cx="0" cy="10" rx="80" ry="40" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="0" cy="10" r="25" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="-40" cy="-10" r="15" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="40" cy="-10" r="15" fill="none" stroke="black" stroke-width="2"/>

        <!-- Exhaust pipes -->
        <ellipse cx="-180" cy="20" rx="25" ry="8" fill="none" stroke="black" stroke-width="4"/>
        <ellipse cx="180" cy="20" rx="25" ry="8" fill="none" stroke="black" stroke-width="4"/>
        <path d="M -155 20 Q -140 15 -125 20" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 155 20 Q 140 15 125 20" fill="none" stroke="black" stroke-width="2"/>

        <!-- Wheels -->
        <circle cx="-200" cy="60" r="45" fill="none" stroke="black" stroke-width="6"/>
        <circle cx="200" cy="60" r="45" fill="none" stroke="black" stroke-width="6"/>
        <!-- Tire treads -->
        <circle cx="-200" cy="60" r="35" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="200" cy="60" r="35" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="-200" cy="60" r="25" fill="none" stroke="black" stroke-width="1" stroke-dasharray="2,1"/>
        <circle cx="200" cy="60" r="25" fill="none" stroke="black" stroke-width="1" stroke-dasharray="2,1"/>
        <!-- Spokes -->
        <g stroke="black" stroke-width="2">
          <line x1="-200" y1="25" x2="-200" y2="95"/>
          <line x1="-225" y1="40" x2="-175" y2="80"/>
          <line x1="-225" y1="80" x2="-175" y2="40"/>
          <line x1="200" y1="25" x2="200" y2="95"/>
          <line x1="175" y1="40" x2="225" y2="80"/>
          <line x1="175" y1="80" x2="225" y2="40"/>
        </g>

        <!-- Handlebars -->
        <path d="M -220 -60 L -280 -80 L -270 -90" fill="none" stroke="black" stroke-width="4" stroke-linecap="round"/>
        <path d="M -220 -60 L -160 -80 L -170 -90" fill="none" stroke="black" stroke-width="4" stroke-linecap="round"/>
        <path d="M 220 -60 L 280 -80 L 270 -90" fill="none" stroke="black" stroke-width="4" stroke-linecap="round"/>
        <path d="M 220 -60 L 160 -80 L 170 -90" fill="none" stroke="black" stroke-width="4" stroke-linecap="round"/>
        <!-- Hand grips -->
        <circle cx="-280" cy="-80" r="6" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="-160" cy="-80" r="6" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="280" cy="-80" r="6" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="160" cy="-80" r="6" fill="none" stroke="black" stroke-width="2"/>

        <!-- Seat -->
        <ellipse cx="0" cy="-80" rx="100" ry="30" fill="none" stroke="black" stroke-width="4"/>
        <ellipse cx="0" cy="-75" rx="90" ry="20" fill="none" stroke="black" stroke-width="2"/>
        <!-- Seat stitching -->
        <path d="M -85 -75 Q 0 -70 85 -75" fill="none" stroke="black" stroke-width="1" stroke-dasharray="3,2"/>
      </g>

      <!-- Rider -->
      <g transform="translate(512,400)">
        <!-- Head -->
        <circle cx="0" cy="-120" r="35" fill="none" stroke="black" stroke-width="4"/>
        <ellipse cx="0" cy="-90" rx="25" ry="15" fill="none" stroke="black" stroke-width="3"/>

        <!-- Wind-blown hair -->
        <path d="M -35 -155 Q -50 -180 -35 -205 Q -20 -190 0 -205 Q 20 -190 35 -205 Q 50 -180 35 -155 Q 20 -170 0 -155 Q -20 -170 -35 -155" fill="none" stroke="black" stroke-width="3"/>
        <!-- Hair strands -->
        <path d="M -25 -155 Q -15 -175 -25 -195" fill="none" stroke="black" stroke-width="2" opacity="0.8"/>
        <path d="M 0 -155 Q 10 -175 0 -195" fill="none" stroke="black" stroke-width="2" opacity="0.8"/>
        <path d="M 25 -155 Q 35 -175 25 -195" fill="none" stroke="black" stroke-width="2" opacity="0.8"/>

        <!-- Eyes -->
        <circle cx="-10" cy="-130" r="4" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="10" cy="-130" r="4" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="-10" cy="-130" r="1.5" fill="black"/>
        <circle cx="10" cy="-130" r="1.5" fill="black"/>

        <!-- Nose and mouth -->
        <polygon points="0,-115 -3,-108 3,-108" fill="none" stroke="black" stroke-width="1.5"/>
        <path d="M -8 -105 Q 0 -100 8 -105" fill="none" stroke="black" stroke-width="2" stroke-linecap="round"/>

        <!-- Leather jacket -->
        <path d="M -45 -60 Q -60 -20 -50 40 Q -45 80 -35 120" fill="none" stroke="black" stroke-width="5"/>
        <path d="M 45 -60 Q 60 -20 50 40 Q 45 80 35 120" fill="none" stroke="black" stroke-width="5"/>
        <!-- Jacket zipper -->
        <path d="M 0 -60 Q 0 20 0 100" fill="none" stroke="black" stroke-width="1"/>
        <!-- Jacket details -->
        <ellipse cx="-25" cy="0" rx="8" ry="15" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="25" cy="0" rx="8" ry="15" fill="none" stroke="black" stroke-width="2"/>
        <!-- Patches -->
        <rect x="-35" y="-20" width="12" height="12" rx="2" fill="none" stroke="black" stroke-width="1.5"/>
        <rect x="23" y="-20" width="12" height="12" rx="2" fill="none" stroke="black" stroke-width="1.5"/>

        <!-- Arms -->
        <ellipse cx="-55" cy="60" rx="12" ry="35" fill="none" stroke="black" stroke-width="4"/>
        <ellipse cx="55" cy="60" rx="12" ry="35" fill="none" stroke="black" stroke-width="4"/>
        <!-- Hands -->
        <circle cx="-55" cy="105" r="10" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="55" cy="105" r="10" fill="none" stroke="black" stroke-width="3"/>
        <!-- Handlebar grips -->
        <ellipse cx="-55" cy="110" rx="8" ry="4" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="55" cy="110" rx="8" ry="4" fill="none" stroke="black" stroke-width="2"/>

        <!-- Legs -->
        <ellipse cx="-20" cy="140" rx="15" ry="40" fill="none" stroke="black" stroke-width="4"/>
        <ellipse cx="20" cy="140" rx="12" ry="40" fill="none" stroke="black" stroke-width="4"/>
        <!-- Riding position -->
        <ellipse cx="-20" cy="185" rx="12" ry="8" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="20" cy="185" rx="10" ry="8" fill="none" stroke="black" stroke-width="3"/>

        <!-- Boots -->
        <ellipse cx="-20" cy="200" rx="18" ry="12" fill="none" stroke="black" stroke-width="4"/>
        <ellipse cx="20" cy="200" rx="16" ry="12" fill="none" stroke="black" stroke-width="4"/>
        <!-- Boot details -->
        <ellipse cx="-20" cy="205" rx="12" ry="6" fill="none" stroke="black" stroke-width="1.5"/>
        <ellipse cx="20" cy="205" rx="10" ry="6" fill="none" stroke="black" stroke-width="1.5"/>
      </g>

      <!-- Title -->
      <text x="512" y="950" text-anchor="middle" font-family="serif" font-size="20" fill="#2d6a4f" font-weight="bold">Ivy's Peace</text>
      <text x="512" y="975" text-anchor="middle" font-family="serif" font-size="14" fill="#1a5f3a">Confident Biker Chick Coloring Page</text>
    </svg>
  `;
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}