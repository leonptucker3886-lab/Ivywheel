// Static coloring page data
const coloringPages = [
  {
    id: "pitbull-realistic",
    title: "Realistic Pitbull",
    description: "Highly detailed American Pit Bull Terrier with accurate anatomy and flowing fur textures",
    emoji: "🐶",
    imageData: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="1200" height="1200">
      <defs>
        <linearGradient id="furGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#2d2d2d;stop-opacity:1" />
          <stop offset="50%" style="stop-color:#1a1a1a;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#404040;stop-opacity:1" />
        </linearGradient>
        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="4" dy="4" stdDeviation="3" flood-color="#00000040"/>
        </filter>
        <pattern id="furTexture" patternUnits="userSpaceOnUse" width="20" height="20">
          <circle cx="5" cy="5" r="0.8" fill="none" stroke="black" stroke-width="0.3" opacity="0.4"/>
          <circle cx="15" cy="15" r="0.6" fill="none" stroke="black" stroke-width="0.3" opacity="0.3"/>
          <circle cx="10" cy="18" r="0.5" fill="none" stroke="black" stroke-width="0.2" opacity="0.2"/>
        </pattern>
      </defs>

      <rect width="1200" height="1200" fill="#f8f8f8"/>

      <!-- Ivy border frame -->
      <g stroke="#2d6a4f" stroke-width="6" fill="none" stroke-linecap="round">
        <!-- Top border -->
        <path d="M 60 60 Q 200 30 400 60 Q 600 90 800 60 Q 1000 30 1200 60 Q 1350 90 1440 60"/>
        <!-- Bottom border -->
        <path d="M 60 1140 Q 200 1170 400 1140 Q 600 1110 800 1140 Q 1000 1170 1200 1140 Q 1350 1110 1440 1140"/>
        <!-- Left border -->
        <path d="M 60 60 Q 30 200 60 400 Q 90 600 60 800 Q 30 1000 60 1140"/>
        <!-- Right border -->
        <path d="M 1440 60 Q 1470 200 1440 400 Q 1410 600 1440 800 Q 1470 1000 1440 1140"/>
      </g>

      <!-- Ivy leaves around border -->
      <g fill="#2d6a4f" stroke="#1a3a2e" stroke-width="2">
        <!-- Top left -->
        <g transform="translate(120,40)">
          <path d="M 0 25 Q -12 12 -24 25 Q -36 48 -24 72 Q -12 96 0 84 Q 12 72 24 84 Q 36 108 24 132 Q 12 156 0 144 Q -12 132 -24 144 Q -36 168 -24 192 Q -12 204 0 192" stroke-linecap="round"/>
          <path d="M 0 25 Q 0 104 0 183" stroke-width="1.5" opacity="0.7"/>
          <path d="M -12 52 Q -12 88 -12 124" stroke-width="1" opacity="0.5"/>
          <path d="M 12 64 Q 12 100 12 136" stroke-width="1" opacity="0.5"/>
          <path d="M -6 76 Q -6 112 -6 148" stroke-width="0.8" opacity="0.3"/>
          <path d="M 6 88 Q 6 124 6 160" stroke-width="0.8" opacity="0.3"/>
        </g>
        <!-- Top right -->
        <g transform="translate(1320,40)">
          <path d="M 0 25 Q -12 12 -24 25 Q -36 48 -24 72 Q -12 96 0 84 Q 12 72 24 84 Q 36 108 24 132 Q 12 156 0 144 Q -12 132 -24 144 Q -36 168 -24 192 Q -12 204 0 192" stroke-linecap="round"/>
          <path d="M 0 25 Q 0 104 0 183" stroke-width="1.5" opacity="0.7"/>
          <path d="M -12 52 Q -12 88 -12 124" stroke-width="1" opacity="0.5"/>
          <path d="M 12 64 Q 12 100 12 136" stroke-width="1" opacity="0.5"/>
        </g>
        <!-- Bottom left -->
        <g transform="translate(120,1160)">
          <path d="M 0 -25 Q -12 -12 -24 -25 Q -36 -48 -24 -72 Q -12 -96 0 -84 Q 12 -72 24 -84 Q 36 -108 24 -132 Q 12 -156 0 -144 Q -12 -132 -24 -144 Q -36 -168 -24 -192 Q -12 -204 0 -192" stroke-linecap="round"/>
          <path d="M 0 -25 Q 0 -104 0 -183" stroke-width="1.5" opacity="0.7"/>
          <path d="M -12 -52 Q -12 -88 -12 -124" stroke-width="1" opacity="0.5"/>
          <path d="M 12 -64 Q 12 -100 12 -136" stroke-width="1" opacity="0.5"/>
        </g>
        <!-- Bottom right -->
        <g transform="translate(1320,1160)">
          <path d="M 0 -25 Q -12 -12 -24 -25 Q -36 -48 -24 -72 Q -12 -96 0 -84 Q 12 -72 24 -84 Q 36 -108 24 -132 Q 12 -156 0 -144 Q -12 -132 -24 -144 Q -36 -168 -24 -192 Q -12 -204 0 -192" stroke-linecap="round"/>
          <path d="M 0 -25 Q 0 -104 0 -183" stroke-width="1.5" opacity="0.7"/>
          <path d="M -12 -52 Q -12 -88 -12 -124" stroke-width="1" opacity="0.5"/>
          <path d="M 12 -64 Q 12 -100 12 -136" stroke-width="1" opacity="0.5"/>
        </g>
      </g>

      <!-- Main dog illustration -->
      <g transform="translate(600,650)" filter="url(#shadow)">
        <!-- Body outline with muscular definition -->
        <ellipse cx="0" cy="120" rx="320" ry="160" fill="none" stroke="black" stroke-width="8"/>
        <ellipse cx="0" cy="-40" rx="200" ry="180" fill="none" stroke="black" stroke-width="8"/>

        <!-- Muscle definition lines -->
        <g stroke="black" stroke-width="3" fill="none" opacity="0.8">
          <!-- Shoulder muscles -->
          <path d="M -160 60 Q -120 20 -80 40" stroke-linecap="round"/>
          <path d="M 160 60 Q 120 20 80 40" stroke-linecap="round"/>
          <!-- Chest definition -->
          <path d="M -120 100 Q 0 80 120 100" stroke-linecap="round"/>
          <!-- Back muscles -->
          <path d="M -140 -20 Q 0 -40 140 -20" stroke-linecap="round"/>
          <!-- Abdominal definition -->
          <path d="M -80 140 Q 0 120 80 140" stroke-linecap="round"/>
        </g>

        <!-- Fur texture overlay -->
        <ellipse cx="0" cy="120" rx="310" ry="150" fill="url(#furTexture)" opacity="0.3"/>
        <ellipse cx="0" cy="-40" rx="190" ry="170" fill="url(#furTexture)" opacity="0.3"/>

        <!-- Head with detailed features -->
        <circle cx="0" cy="-280" r="160" fill="none" stroke="black" stroke-width="8"/>
        <ellipse cx="0" cy="-200" rx="120" ry="70" fill="none" stroke="black" stroke-width="6"/>

        <!-- Ears - cropped American Pit Bull style -->
        <polygon points="-100,-420 -120,-480 -70,-440" fill="none" stroke="black" stroke-width="6" stroke-linecap="round"/>
        <polygon points="100,-420 120,-480 70,-440" fill="none" stroke="black" stroke-width="6" stroke-linecap="round"/>
        <!-- Inner ear detail -->
        <polygon points="-95,-430 -110,-460 -75,-435" fill="none" stroke="black" stroke-width="2" opacity="0.6"/>
        <polygon points="95,-430 110,-460 75,-435" fill="none" stroke="black" stroke-width="2" opacity="0.6"/>

        <!-- Eyes - alert and intelligent expression -->
        <circle cx="-55" cy="-300" r="20" fill="none" stroke="black" stroke-width="4"/>
        <circle cx="55" cy="-300" r="20" fill="none" stroke="black" stroke-width="4"/>
        <!-- Pupils -->
        <circle cx="-55" cy="-300" r="9" fill="black"/>
        <circle cx="55" cy="-300" r="9" fill="black"/>
        <!-- Eye highlights -->
        <circle cx="-50" cy="-307" r="4" fill="white"/>
        <circle cx="50" cy="-307" r="4" fill="white"/>
        <!-- Eyelids -->
        <path d="M -75 -300 Q -55 -320 -35 -300" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 75 -300 Q 55 -320 35 -300" fill="none" stroke="black" stroke-width="2"/>

        <!-- Nose - detailed with nostrils -->
        <ellipse cx="0" cy="-190" rx="14" ry="10" fill="black"/>
        <ellipse cx="-6" cy="-192" rx="2.5" ry="4" fill="none" stroke="black" stroke-width="1"/>
        <ellipse cx="6" cy="-192" rx="2.5" ry="4" fill="none" stroke="black" stroke-width="1"/>
        <!-- Nose bridge -->
        <path d="M 0 -200 Q -8 -210 -12 -205" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 0 -200 Q 8 -210 12 -205" fill="none" stroke="black" stroke-width="2"/>

        <!-- Mouth lines - confident expression with jowls -->
        <path d="M -25 -170 Q 0 -155 25 -170" fill="none" stroke="black" stroke-width="4" stroke-linecap="round"/>
        <!-- Jowl lines -->
        <path d="M -70 -160 Q -50 -175 -30 -165" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 70 -160 Q 50 -175 30 -165" fill="none" stroke="black" stroke-width="2"/>
        <!-- Corner of mouth details -->
        <path d="M -25 -165 Q -35 -160 -30 -155" fill="none" stroke="black" stroke-width="1.5"/>
        <path d="M 25 -165 Q 35 -160 30 -155" fill="none" stroke="black" stroke-width="1.5"/>

        <!-- Neck wrinkles and folds - characteristic of Pit Bulls -->
        <g stroke="black" stroke-width="2" fill="none" opacity="0.8">
          <path d="M -100 -120 Q -80 -135 -60 -125" stroke-linecap="round"/>
          <path d="M 100 -120 Q 80 -135 60 -125" stroke-linecap="round"/>
          <path d="M -80 -100 Q -60 -115 -40 -105" stroke-linecap="round"/>
          <path d="M 80 -100 Q 60 -115 40 -105" stroke-linecap="round"/>
          <!-- Dewlap folds -->
          <path d="M -60 -80 Q -40 -90 -20 -85" stroke-linecap="round"/>
          <path d="M 60 -80 Q 40 -90 20 -85" stroke-linecap="round"/>
        </g>

        <!-- Front legs - powerful and muscular -->
        <ellipse cx="-200" cy="140" rx="45" ry="160" fill="none" stroke="black" stroke-width="7" rx="22"/>
        <ellipse cx="200" cy="140" rx="45" ry="160" fill="none" stroke="black" stroke-width="7" rx="22"/>
        <!-- Leg muscle definition -->
        <g stroke="black" stroke-width="3" fill="none" opacity="0.7">
          <path d="M -200 40 Q -180 60 -160 50" stroke-linecap="round"/>
          <path d="M 200 40 Q 180 60 160 50" stroke-linecap="round"/>
          <path d="M -200 100 Q -180 120 -160 110" stroke-linecap="round"/>
          <path d="M 200 100 Q 180 120 160 110" stroke-linecap="round"/>
        </g>

        <!-- Rear legs -->
        <ellipse cx="-240" cy="220" rx="45" ry="140" fill="none" stroke="black" stroke-width="7" rx="22"/>
        <ellipse cx="240" cy="220" rx="45" ry="140" fill="none" stroke="black" stroke-width="7" rx="22"/>
        <!-- Rear leg muscles -->
        <g stroke="black" stroke-width="3" fill="none" opacity="0.7">
          <path d="M -240 120 Q -220 140 -200 130" stroke-linecap="round"/>
          <path d="M 240 120 Q 220 140 200 130" stroke-linecap="round"/>
          <path d="M -240 180 Q -220 200 -200 190" stroke-linecap="round"/>
          <path d="M 240 180 Q 220 200 200 190" stroke-linecap="round"/>
        </g>

        <!-- Paws with detailed pads -->
        <ellipse cx="-200" cy="310" rx="30" ry="18" fill="none" stroke="black" stroke-width="5"/>
        <ellipse cx="200" cy="310" rx="30" ry="18" fill="none" stroke="black" stroke-width="5"/>
        <ellipse cx="-240" cy="370" rx="30" ry="18" fill="none" stroke="black" stroke-width="5"/>
        <ellipse cx="240" cy="370" rx="30" ry="18" fill="none" stroke="black" stroke-width="5"/>

        <!-- Paw pads - detailed -->
        <ellipse cx="-200" cy="315" rx="14" ry="7" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="200" cy="315" rx="14" ry="7" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="-240" cy="375" rx="14" ry="7" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="240" cy="375" rx="14" ry="7" fill="none" stroke="black" stroke-width="2"/>
        <!-- Toe pads -->
        <circle cx="-190" cy="320" r="4" fill="none" stroke="black" stroke-width="1.5"/>
        <circle cx="-210" cy="320" r="4" fill="none" stroke="black" stroke-width="1.5"/>
        <circle cx="-190" cy="305" r="3" fill="none" stroke="black" stroke-width="1.5"/>
        <circle cx="-210" cy="305" r="3" fill="none" stroke="black" stroke-width="1.5"/>
        <circle cx="190" cy="320" r="4" fill="none" stroke="black" stroke-width="1.5"/>
        <circle cx="210" cy="320" r="4" fill="none" stroke="black" stroke-width="1.5"/>
        <circle cx="190" cy="305" r="3" fill="none" stroke="black" stroke-width="1.5"/>
        <circle cx="210" cy="305" r="3" fill="none" stroke="black" stroke-width="1.5"/>
        <circle cx="-230" cy="380" r="4" fill="none" stroke="black" stroke-width="1.5"/>
        <circle cx="-250" cy="380" r="4" fill="none" stroke="black" stroke-width="1.5"/>
        <circle cx="-230" cy="365" r="3" fill="none" stroke="black" stroke-width="1.5"/>
        <circle cx="-250" cy="365" r="3" fill="none" stroke="black" stroke-width="1.5"/>
        <circle cx="230" cy="380" r="4" fill="none" stroke="black" stroke-width="1.5"/>
        <circle cx="250" cy="380" r="4" fill="none" stroke="black" stroke-width="1.5"/>
        <circle cx="230" cy="365" r="3" fill="none" stroke="black" stroke-width="1.5"/>
        <circle cx="250" cy="365" r="3" fill="none" stroke="black" stroke-width="1.5"/>

        <!-- Tail - docked Pit Bull style -->
        <path d="M 280 160 Q 320 120 340 160" fill="none" stroke="black" stroke-width="6" stroke-linecap="round"/>
        <ellipse cx="330" cy="150" rx="10" ry="18" fill="none" stroke="black" stroke-width="4"/>
      </g>

      <!-- Title and branding -->
      <text x="600" y="1150" text-anchor="middle" font-family="serif" font-size="42" fill="#2d6a4f" font-weight="bold">Ivy's Peace</text>
      <text x="600" y="1190" text-anchor="middle" font-family="serif" font-size="28" fill="#1a5f3a">Realistic Pitbull Coloring Page</text>
      <text x="600" y="1220" text-anchor="middle" font-family="serif" font-size="18" fill="#666" opacity="0.8">Professional Line Art • Print & Color</text>
    </svg>`)}`,
  },
  {
    id: "biker-chick",
    title: "Confident Biker Chick",
    description: "Bold biker girl on a Harley motorcycle with flowing hair and leather jacket",
    emoji: "🏍️",
    imageData: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="1200" height="1200">
      <defs>
        <linearGradient id="skinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f5d5c0;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#d4a574;stop-opacity:1" />
        </linearGradient>
        <filter id="leatherShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="3" dy="3" stdDeviation="2" flood-color="#00000030"/>
        </filter>
        <pattern id="leatherTexture" patternUnits="userSpaceOnUse" width="30" height="30">
          <circle cx="8" cy="8" r="1" fill="none" stroke="black" stroke-width="0.3" opacity="0.6"/>
          <circle cx="22" cy="22" r="0.8" fill="none" stroke="black" stroke-width="0.3" opacity="0.4"/>
          <path d="M 5 15 Q 15 10 25 15" fill="none" stroke="black" stroke-width="0.2" opacity="0.3"/>
        </pattern>
      </defs>

      <rect width="1200" height="1200" fill="#f8f8f8"/>

      <!-- Ivy border -->
      <g stroke="#2d6a4f" stroke-width="6" fill="none" stroke-linecap="round">
        <path d="M 60 60 Q 200 30 400 60 Q 600 90 800 60 Q 1000 30 1140 60"/>
        <path d="M 60 1140 Q 200 1170 400 1140 Q 600 1110 800 1140 Q 1000 1170 1140 1140"/>
        <path d="M 60 60 Q 30 200 60 400 Q 90 600 60 800 Q 30 1000 60 1140"/>
        <path d="M 1140 60 Q 1170 200 1140 400 Q 1110 600 1140 800 Q 1170 1000 1140 1140"/>
      </g>

      <!-- Ivy leaves -->
      <g fill="#2d6a4f" stroke="#1a3a2e" stroke-width="2">
        <g transform="translate(120,60)">
          <path d="M 0 20 Q -10 8 -20 20 Q -30 40 -20 60 Q -10 80 0 70 Q 10 60 20 70 Q 30 90 20 110 Q 10 130 0 120 Q -10 110 -20 120 Q -30 140 -20 160 Q -10 170 0 160" stroke-linecap="round"/>
          <path d="M 0 20 Q 0 80 0 140" stroke-width="1.5" opacity="0.7"/>
          <path d="M -10 45 Q -10 75 -10 105" stroke-width="1" opacity="0.5"/>
          <path d="M 10 50 Q 10 80 10 110" stroke-width="1" opacity="0.5"/>
        </g>
        <g transform="translate(1080,60)">
          <path d="M 0 20 Q -10 8 -20 20 Q -30 40 -20 60 Q -10 80 0 70 Q 10 60 20 70 Q 30 90 20 110 Q 10 130 0 120 Q -10 110 -20 120 Q -30 140 -20 160 Q -10 170 0 160" stroke-linecap="round"/>
          <path d="M 0 20 Q 0 80 0 140" stroke-width="1.5" opacity="0.7"/>
        </g>
        <g transform="translate(120,1140)">
          <path d="M 0 -20 Q -10 -8 -20 -20 Q -30 -40 -20 -60 Q -10 -80 0 -70 Q 10 -60 20 -70 Q 30 -90 20 -110 Q 10 -130 0 -120 Q -10 -110 -20 -120 Q -30 -140 -20 -160 Q -10 -170 0 -160" stroke-linecap="round"/>
          <path d="M 0 -20 Q 0 -80 0 -140" stroke-width="1.5" opacity="0.7"/>
        </g>
        <g transform="translate(1080,1140)">
          <path d="M 0 -20 Q -10 -8 -20 -20 Q -30 -40 -20 -60 Q -10 -80 0 -70 Q 10 -60 20 -70 Q 30 -90 20 -110 Q 10 -130 0 -120 Q -10 -110 -20 -120 Q -30 -140 -20 -160 Q -10 -170 0 -160" stroke-linecap="round"/>
          <path d="M 0 -20 Q 0 -80 0 -140" stroke-width="1.5" opacity="0.7"/>
        </g>
      </g>

      <!-- Motorcycle -->
      <g transform="translate(600,850)" filter="url(#leatherShadow)">
        <!-- Main body with leather texture -->
        <ellipse cx="0" cy="0" rx="240" ry="100" fill="none" stroke="black" stroke-width="8"/>
        <ellipse cx="0" cy="-40" rx="160" ry="80" fill="none" stroke="black" stroke-width="6"/>
        <ellipse cx="0" cy="0" rx="230" ry="90" fill="url(#leatherTexture)" opacity="0.4"/>
        <ellipse cx="0" cy="-40" rx="150" ry="70" fill="url(#leatherTexture)" opacity="0.4"/>

        <!-- Engine details -->
        <ellipse cx="0" cy="15" rx="90" ry="45" fill="none" stroke="black" stroke-width="4"/>
        <circle cx="0" cy="15" r="30" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="-45" cy="-5" r="18" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="45" cy="-5" r="18" fill="none" stroke="black" stroke-width="2"/>
        <!-- Engine bolts -->
        <circle cx="-20" cy="15" r="4" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="20" cy="15" r="4" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="0" cy="-5" r="6" fill="none" stroke="black" stroke-width="2"/>

        <!-- Exhaust system -->
        <ellipse cx="-200" cy="25" rx="30" ry="10" fill="none" stroke="black" stroke-width="5"/>
        <ellipse cx="200" cy="25" rx="30" ry="10" fill="none" stroke="black" stroke-width="5"/>
        <!-- Exhaust tips -->
        <path d="M -170 25 Q -155 20 -140 25" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 170 25 Q 155 20 140 25" fill="none" stroke="black" stroke-width="2"/>
        <!-- Heat shields -->
        <ellipse cx="-200" cy="25" rx="25" ry="8" fill="none" stroke="black" stroke-width="1.5" opacity="0.6"/>
        <ellipse cx="200" cy="25" rx="25" ry="8" fill="none" stroke="black" stroke-width="1.5" opacity="0.6"/>

        <!-- Wheels with detailed spokes -->
        <circle cx="-220" cy="70" r="50" fill="none" stroke="black" stroke-width="7"/>
        <circle cx="220" cy="70" r="50" fill="none" stroke="black" stroke-width="7"/>
        <!-- Tire treads -->
        <circle cx="-220" cy="70" r="38" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="220" cy="70" r="38" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="-220" cy="70" r="28" fill="none" stroke="black" stroke-width="1" stroke-dasharray="3,2"/>
        <circle cx="220" cy="70" r="28" fill="none" stroke="black" stroke-width="1" stroke-dasharray="3,2"/>
        <!-- Spokes -->
        <g stroke="black" stroke-width="3">
          <line x1="-220" y1="20" x2="-220" y2="120"/>
          <line x1="-245" y1="35" x2="-195" y2="85"/>
          <line x1="-245" y1="85" x2="-195" y2="35"/>
          <line x1="-220" y1="45" x2="-220" y2="95"/>
          <line x1="-235" y1="60" x2="-205" y2="80"/>
          <line x1="220" y1="20" x2="220" y2="120"/>
          <line x1="195" y1="35" x2="245" y2="85"/>
          <line x1="195" y1="85" x2="245" y2="35"/>
          <line x1="220" y1="45" x2="220" y2="95"/>
          <line x1="205" y1="60" x2="235" y2="80"/>
        </g>

        <!-- Handlebars with detailed grips -->
        <path d="M -240 -70 L -300 -90 L -290 -100" fill="none" stroke="black" stroke-width="5" stroke-linecap="round"/>
        <path d="M -240 -70 L -180 -90 L -190 -100" fill="none" stroke="black" stroke-width="5" stroke-linecap="round"/>
        <path d="M 240 -70 L 300 -90 L 290 -100" fill="none" stroke="black" stroke-width="5" stroke-linecap="round"/>
        <path d="M 240 -70 L 180 -90 L 190 -100" fill="none" stroke="black" stroke-width="5" stroke-linecap="round"/>
        <!-- Hand grips -->
        <ellipse cx="-300" cy="-90" r="8" ry="4" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="-180" cy="-90" r="8" ry="4" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="300" cy="-90" r="8" ry="4" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="180" cy="-90" r="8" ry="4" fill="none" stroke="black" stroke-width="3"/>
        <!-- Throttle details -->
        <circle cx="-180" cy="-90" r="6" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="180" cy="-90" r="6" fill="none" stroke="black" stroke-width="2"/>
        <!-- Brake levers -->
        <rect x="-310" y="-95" width="15" height="3" rx="1" fill="none" stroke="black" stroke-width="2"/>
        <rect x="295" y="-95" width="15" height="3" rx="1" fill="none" stroke="black" stroke-width="2"/>

        <!-- Seat with stitching -->
        <ellipse cx="0" cy="-100" rx="120" ry="35" fill="none" stroke="black" stroke-width="5"/>
        <ellipse cx="0" cy="-95" rx="110" ry="25" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="0" cy="-100" rx="100" ry="20" fill="url(#leatherTexture)" opacity="0.5"/>
        <!-- Seat stitching -->
        <path d="M -95 -95 Q 0 -90 95 -95" fill="none" stroke="black" stroke-width="1.5" stroke-dasharray="4,3"/>
        <path d="M -90 -105 Q 0 -110 90 -105" fill="none" stroke="black" stroke-width="1" opacity="0.7"/>
      </g>

      <!-- Rider -->
      <g transform="translate(600,500)">
        <!-- Head with detailed features -->
        <circle cx="0" cy="-140" r="42" fill="none" stroke="black" stroke-width="5"/>
        <ellipse cx="0" cy="-105" rx="32" ry="18" fill="none" stroke="black" stroke-width="4"/>
        <!-- Face contour -->
        <path d="M -35 -140 Q -25 -160 -15 -155" fill="none" stroke="black" stroke-width="2"/>
        <path d="M 35 -140 Q 25 -160 15 -155" fill="none" stroke="black" stroke-width="2"/>

        <!-- Wind-blown hair with intricate strands -->
        <path d="M -42 -175 Q -60 -210 -42 -245 Q -24 -220 0 -245 Q 24 -220 42 -245 Q 60 -210 42 -175 Q 24 -200 0 -175 Q -24 -200 -42 -175" fill="none" stroke="black" stroke-width="4"/>
        <!-- Hair strands -->
        <path d="M -32 -175 Q -22 -195 -32 -215" fill="none" stroke="black" stroke-width="2.5" opacity="0.9"/>
        <path d="M -15 -175 Q -5 -195 -15 -215" fill="none" stroke="black" stroke-width="2" opacity="0.8"/>
        <path d="M 0 -175 Q 10 -195 0 -215" fill="none" stroke="black" stroke-width="2.5" opacity="0.9"/>
        <path d="M 15 -175 Q 25 -195 15 -215" fill="none" stroke="black" stroke-width="2" opacity="0.8"/>
        <path d="M 32 -175 Q 42 -195 32 -215" fill="none" stroke="black" stroke-width="2.5" opacity="0.9"/>
        <!-- Wispy ends -->
        <path d="M -35 -240 Q -30 -250 -32 -245" fill="none" stroke="black" stroke-width="1.5" opacity="0.7"/>
        <path d="M 35 -240 Q 30 -250 32 -245" fill="none" stroke="black" stroke-width="1.5" opacity="0.7"/>

        <!-- Eyes with attitude -->
        <ellipse cx="-12" cy="-135" rx="5" ry="7" fill="none" stroke="black" stroke-width="2.5"/>
        <ellipse cx="12" cy="-135" rx="5" ry="7" fill="none" stroke="black" stroke-width="2.5"/>
        <!-- Pupils -->
        <ellipse cx="-12" cy="-135" rx="2.5" ry="3.5" fill="black"/>
        <ellipse cx="12" cy="-135" rx="2.5" ry="3.5" fill="black"/>
        <!-- Eye highlights -->
        <circle cx="-10" cy="-138" r="1.5" fill="white"/>
        <circle cx="14" cy="-138" r="1.5" fill="white"/>
        <!-- Eyelashes -->
        <path d="M -17 -135 Q -20 -140 -16 -142" fill="none" stroke="black" stroke-width="1.5"/>
        <path d="M -7 -135 Q -4 -140 -8 -142" fill="none" stroke="black" stroke-width="1.5"/>
        <path d="M 7 -135 Q 4 -140 8 -142" fill="none" stroke="black" stroke-width="1.5"/>
        <path d="M 17 -135 Q 20 -140 16 -142" fill="none" stroke="black" stroke-width="1.5"/>

        <!-- Nose and mouth -->
        <polygon points="0,-115 -4,-108 4,-108" fill="none" stroke="black" stroke-width="2"/>
        <path d="M -10 -105 Q 0 -100 10 -105" fill="none" stroke="black" stroke-width="3" stroke-linecap="round"/>
        <!-- Lip detail -->
        <path d="M -8 -105 Q 0 -102 8 -105" fill="none" stroke="black" stroke-width="1.5" opacity="0.8"/>

        <!-- Leather jacket with detailed stitching and patches -->
        <path d="M -55 -70 Q -70 -20 -60 50 Q -55 100 -45 150" fill="none" stroke="black" stroke-width="6"/>
        <path d="M 55 -70 Q 70 -20 60 50 Q 55 100 45 150" fill="none" stroke="black" stroke-width="6"/>
        <!-- Jacket texture -->
        <ellipse cx="-55" cy="40" rx="50" ry="60" fill="url(#leatherTexture)" opacity="0.5"/>
        <ellipse cx="55" cy="40" rx="50" ry="60" fill="url(#leatherTexture)" opacity="0.5"/>
        <!-- Zipper -->
        <path d="M 0 -70 Q 0 30 0 130" fill="none" stroke="black" stroke-width="1.5"/>
        <!-- Jacket stitching -->
        <path d="M -65 -20 Q -45 -10 -25 -15" fill="none" stroke="black" stroke-width="1" opacity="0.8"/>
        <path d="M 65 -20 Q 45 -10 25 -15" fill="none" stroke="black" stroke-width="1" opacity="0.8"/>
        <!-- Patches -->
        <rect x="-45" y="-30" width="18" height="18" rx="2" fill="none" stroke="black" stroke-width="2"/>
        <rect x="27" y="-30" width="18" height="18" rx="2" fill="none" stroke="black" stroke-width="2"/>
        <!-- Patch details -->
        <circle cx="-36" cy="-21" r="3" fill="none" stroke="black" stroke-width="1"/>
        <polygon points="-27,-21 -24,-18 -30,-18" fill="none" stroke="black" stroke-width="1"/>
        <circle cx="36" cy="-21" r="3" fill="none" stroke="black" stroke-width="1"/>
        <polygon points="45,-21 42,-18 48,-18" fill="none" stroke="black" stroke-width="1"/>

        <!-- Arms with muscle definition -->
        <ellipse cx="-70" cy="80" rx="16" ry="45" fill="none" stroke="black" stroke-width="5"/>
        <ellipse cx="70" cy="80" rx="16" ry="45" fill="none" stroke="black" stroke-width="5"/>
        <!-- Bicep definition -->
        <ellipse cx="-70" cy="60" rx="12" ry="15" fill="none" stroke="black" stroke-width="2" opacity="0.7"/>
        <ellipse cx="70" cy="60" rx="12" ry="15" fill="none" stroke="black" stroke-width="2" opacity="0.7"/>
        <!-- Hands -->
        <ellipse cx="-70" cy="125" r="12" fill="none" stroke="black" stroke-width="4"/>
        <ellipse cx="70" cy="125" r="12" fill="none" stroke="black" stroke-width="4"/>
        <!-- Finger details -->
        <rect x="-76" y="125" width="3" height="12" fill="none" stroke="black" stroke-width="2"/>
        <rect x="-70" y="125" width="3" height="12" fill="none" stroke="black" stroke-width="2"/>
        <rect x="-64" y="125" width="3" height="12" fill="none" stroke="black" stroke-width="2"/>
        <rect x="64" y="125" width="3" height="12" fill="none" stroke="black" stroke-width="2"/>
        <rect x="70" y="125" width="3" height="12" fill="none" stroke="black" stroke-width="2"/>
        <rect x="76" y="125" width="3" height="12" fill="none" stroke="black" stroke-width="2"/>

        <!-- Legs -->
        <ellipse cx="-25" cy="170" rx="18" ry="50" fill="none" stroke="black" stroke-width="5"/>
        <ellipse cx="25" cy="170" rx="16" ry="50" fill="none" stroke="black" stroke-width="5"/>
        <!-- Riding position -->
        <ellipse cx="-25" cy="215" rx="14" ry="10" fill="none" stroke="black" stroke-width="4"/>
        <ellipse cx="25" cy="215" rx="12" ry="10" fill="none" stroke="black" stroke-width="4"/>

        <!-- Boots with detailed stitching -->
        <ellipse cx="-25" cy="230" rx="22" ry="14" fill="none" stroke="black" stroke-width="5"/>
        <ellipse cx="25" cy="230" rx="20" ry="14" fill="none" stroke="black" stroke-width="5"/>
        <!-- Boot details -->
        <ellipse cx="-25" cy="235" rx="16" ry="8" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="25" cy="235" rx="14" ry="8" fill="none" stroke="black" stroke-width="2"/>
        <!-- Boot stitching -->
        <path d="M -35 230 Q -25 225 -15 230" fill="none" stroke="black" stroke-width="1.5"/>
        <path d="M 15 230 Q 25 225 35 230" fill="none" stroke="black" stroke-width="1.5"/>
        <!-- Spurs -->
        <g transform="translate(-25,245)">
          <circle cx="0" cy="0" r="10" fill="none" stroke="black" stroke-width="2"/>
          <polygon points="-5,-15 5,-15 0,-8" fill="none" stroke="black" stroke-width="1.5"/>
          <polygon points="-15,-5 -15,5 -8,0" fill="none" stroke="black" stroke-width="1.5"/>
          <polygon points="5,15 -5,15 0,8" fill="none" stroke="black" stroke-width="1.5"/>
          <polygon points="15,5 15,-5 8,0" fill="none" stroke="black" stroke-width="1.5"/>
        </g>
        <g transform="translate(25,245)">
          <circle cx="0" cy="0" r="10" fill="none" stroke="black" stroke-width="2"/>
          <polygon points="-5,-15 5,-15 0,-8" fill="none" stroke="black" stroke-width="1.5"/>
          <polygon points="-15,-5 -15,5 -8,0" fill="none" stroke="black" stroke-width="1.5"/>
          <polygon points="5,15 -5,15 0,8" fill="none" stroke="black" stroke-width="1.5"/>
          <polygon points="15,5 15,-5 8,0" fill="none" stroke="black" stroke-width="1.5"/>
        </g>
      </g>

      <!-- Title -->
      <text x="600" y="1150" text-anchor="middle" font-family="serif" font-size="42" fill="#2d6a4f" font-weight="bold">Ivy's Peace</text>
      <text x="600" y="1190" text-anchor="middle" font-family="serif" font-size="28" fill="#1a5f3a">Confident Biker Chick Coloring Page</text>
      <text x="600" y="1220" text-anchor="middle" font-family="serif" font-size="18" fill="#666" opacity="0.8">Professional Line Art • Print & Color</text>
    </svg>`)}`,
  },
  {
    id: "tattoo-flash",
    title: "Tattoo Flash Sheet",
    description: "Classic tattoo flash designs - skulls, roses, daggers, anchors, eagles",
    emoji: "💀",
    imageData: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="1200" height="1200">
      <rect width="1200" height="1200" fill="#f8f8f8"/>

      <!-- Decorative border -->
      <g stroke="#8B4513" stroke-width="4" fill="none" stroke-linecap="round">
        <rect x="80" y="80" width="1040" height="1040" rx="20" fill="none"/>
        <rect x="90" y="90" width="1020" height="1020" rx="15" fill="none" stroke-dasharray="10,5"/>
      </g>

      <!-- Skull 1 - Top Left -->
      <g transform="translate(300,250)">
        <circle cx="0" cy="-25" r="45" fill="none" stroke="black" stroke-width="6"/>
        <ellipse cx="0" cy="10" rx="35" ry="30" fill="none" stroke="black" stroke-width="5"/>
        <!-- Eyes -->
        <circle cx="-18" cy="-35" r="6" fill="none" stroke="black" stroke-width="3"/>
        <circle cx="18" cy="-35" r="6" fill="none" stroke="black" stroke-width="3"/>
        <!-- Nose -->
        <polygon points="0,0 -6,12 6,12" fill="none" stroke="black" stroke-width="3"/>
        <!-- Teeth -->
        <rect x="-15" y="15" width="6" height="10" fill="none" stroke="black" stroke-width="2"/>
        <rect x="-7" y="15" width="6" height="10" fill="none" stroke="black" stroke-width="2"/>
        <rect x="1" y="15" width="6" height="10" fill="none" stroke="black" stroke-width="2"/>
        <rect x="9" y="15" width="6" height="10" fill="none" stroke="black" stroke-width="2"/>
        <!-- Jaw details -->
        <ellipse cx="0" cy="35" rx="20" ry="8" fill="none" stroke="black" stroke-width="2"/>
      </g>

      <!-- Rose 2 - Top Right -->
      <g transform="translate(900,250)">
        <!-- Stem -->
        <rect x="-3" y="40" width="6" height="80" fill="none" stroke="black" stroke-width="4"/>
        <!-- Thorns -->
        <polygon points="-8,60 -12,55 -4,55" fill="none" stroke="black" stroke-width="2"/>
        <polygon points="4,80 8,85 4,75" fill="none" stroke="black" stroke-width="2"/>
        <!-- Leaves -->
        <ellipse cx="-15" cy="70" rx="12" ry="8" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="18" cy="90" rx="10" ry="7" fill="none" stroke="black" stroke-width="3"/>
        <!-- Outer petals -->
        <ellipse cx="0" cy="-10" rx="25" ry="20" fill="none" stroke="black" stroke-width="4"/>
        <ellipse cx="-15" cy="-5" rx="18" ry="15" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="15" cy="-5" rx="18" ry="15" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="0" cy="5" rx="20" ry="16" fill="none" stroke="black" stroke-width="3"/>
        <!-- Inner petals -->
        <ellipse cx="0" cy="-2" rx="12" ry="10" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="-8" cy="2" rx="10" ry="8" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="8" cy="2" rx="10" ry="8" fill="none" stroke="black" stroke-width="2"/>
        <!-- Center -->
        <circle cx="0" cy="8" r="5" fill="none" stroke="black" stroke-width="2"/>
      </g>

      <!-- Dagger 3 - Middle Left -->
      <g transform="translate(300,550)">
        <!-- Blade -->
        <polygon points="0,-80 12,50 8,60 0,55 -8,60 -12,50" fill="none" stroke="black" stroke-width="5"/>
        <!-- Blade edge -->
        <line x1="-8" y1="-40" x2="8" y2="-40" stroke="black" stroke-width="1"/>
        <line x1="-6" y1="-20" x2="6" y2="-20" stroke="black" stroke-width="1"/>
        <line x1="-4" y1="0" x2="4" y2="0" stroke="black" stroke-width="1"/>
        <!-- Blood groove -->
        <rect x="-1" y="-60" width="2" height="100" fill="none" stroke="black" stroke-width="1" opacity="0.7"/>
        <!-- Handle -->
        <rect x="-8" y="50" width="16" height="25" rx="3" fill="none" stroke="black" stroke-width="4"/>
        <!-- Guard -->
        <rect x="-20" y="45" width="40" height="5" fill="none" stroke="black" stroke-width="3"/>
        <!-- Pommel -->
        <circle cx="0" y="85" r="8" fill="none" stroke="black" stroke-width="3"/>
        <!-- Handle wrapping -->
        <ellipse cx="0" y="62" rx="6" ry="8" fill="none" stroke="black" stroke-width="2"/>
        <ellipse cx="0" y="72" rx="5" ry="7" fill="none" stroke="black" stroke-width="2"/>
      </g>

      <!-- Anchor 4 - Middle Right -->
      <g transform="translate(900,550)">
        <!-- Crown -->
        <polygon points="-15,-90 -10,-100 0,-95 10,-100 15,-90 10,-85 5,-90 0,-85 -5,-90 -10,-85" fill="none" stroke="black" stroke-width="4"/>
        <!-- Stock -->
        <rect x="-5" y="-85" width="10" height="30" fill="none" stroke="black" stroke-width="4"/>
        <!-- Arms -->
        <ellipse cx="-35" cy="-30" rx="15" ry="8" fill="none" stroke="black" stroke-width="4"/>
        <ellipse cx="35" cy="-30" rx="15" ry="8" fill="none" stroke="black" stroke-width="4"/>
        <!-- Shackle -->
        <ellipse cx="0" cy="-60" rx="8" ry="5" fill="none" stroke="black" stroke-width="3"/>
        <rect x="-3" y="-65" width="6" height="10" fill="none" stroke="black" stroke-width="2"/>
        <!-- Flukes -->
        <polygon points="-35,-22 -45,-15 -40,-8 -30,-15" fill="none" stroke="black" stroke-width="3"/>
        <polygon points="35,-22 45,-15 40,-8 30,-15" fill="none" stroke="black" stroke-width="3"/>
        <!-- Ring -->
        <circle cx="0" cy="10" r="6" fill="none" stroke="black" stroke-width="3"/>
      </g>

      <!-- Eagle 5 - Bottom Center -->
      <g transform="translate(600,850)">
        <!-- Body -->
        <ellipse cx="0" cy="20" rx="35" ry="25" fill="none" stroke="black" stroke-width="5"/>
        <!-- Head -->
        <circle cx="0" cy="-20" r="18" fill="none" stroke="black" stroke-width="4"/>
        <!-- Beak -->
        <polygon points="0,-15 -8,-5 8,-5" fill="none" stroke="black" stroke-width="3"/>
        <!-- Eyes -->
        <circle cx="-6" cy="-25" r="3" fill="none" stroke="black" stroke-width="2"/>
        <circle cx="6" cy="-25" r="3" fill="none" stroke="black" stroke-width="2"/>
        <!-- Eyebrows -->
        <path d="M -10 -28 Q -6 -32 -2 -28" fill="none" stroke="black" stroke-width="1.5"/>
        <path d="M 10 -28 Q 6 -32 2 -28" fill="none" stroke="black" stroke-width="1.5"/>
        <!-- Wings -->
        <path d="M -40 10 Q -60 -10 -40 -30 Q -20 -20 0 -30 Q 20 -20 40 -30 Q 60 -10 40 10" fill="none" stroke="black" stroke-width="4"/>
        <!-- Tail -->
        <polygon points="-15,45 -25,55 -20,65 -10,60 0,65 10,60 20,65 25,55 15,45" fill="none" stroke="black" stroke-width="3"/>
        <!-- Legs -->
        <rect x="-8" y="35" width="3" height="15" fill="none" stroke="black" stroke-width="2"/>
        <rect x="5" y="35" width="3" height="15" fill="none" stroke="black" stroke-width="2"/>
        <!-- Talons -->
        <polygon points="-10,50 -15,55 -12,60 -8,55" fill="none" stroke="black" stroke-width="2"/>
        <polygon points="-5,50 -10,55 -7,60 -3,55" fill="none" stroke="black" stroke-width="2"/>
        <polygon points="3,50 -2,55 1,60 7,55" fill="none" stroke="black" stroke-width="2"/>
        <polygon points="8,50 3,55 6,60 12,55" fill="none" stroke="black" stroke-width="2"/>
        <!-- Feathers -->
        <path d="M -35 5 Q -45 -5 -35 -15" fill="none" stroke="black" stroke-width="2" opacity="0.8"/>
        <path d="M -25 -5 Q -35 -15 -25 -25" fill="none" stroke="black" stroke-width="2" opacity="0.8"/>
        <path d="M 35 5 Q 45 -5 35 -15" fill="none" stroke="black" stroke-width="2" opacity="0.8"/>
        <path d="M 25 -5 Q 35 -15 25 -25" fill="none" stroke="black" stroke-width="2" opacity="0.8"/>
      </g>

      <!-- Title -->
      <text x="600" y="1100" text-anchor="middle" font-family="serif" font-size="36" fill="#8B4513" font-weight="bold">Tattoo Flash Sheet</text>
      <text x="600" y="1140" text-anchor="middle" font-family="serif" font-size="18" fill="#666">Traditional Tattoo Designs</text>
    </svg>`)}`,
  },
  {
    id: "military-skull",
    title: "Military Skull Warrior",
    description: "Skull wearing military helmet and dog tags with crossed rifles",
    emoji: "💀",
    imageData: `data:image/svg+xml;base64,${btoa(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200" width="1200" height="1200">
      <rect width="1200" height="1200" fill="#f8f8f8"/>

      <!-- Military camo border -->
      <defs>
        <pattern id="camo" patternUnits="userSpaceOnUse" width="40" height="40">
          <rect width="40" height="40" fill="#4a5d23"/>
          <rect x="10" y="10" width="20" height="20" fill="#5d6b2a"/>
          <rect x="15" y="15" width="10" height="10" fill="#3d4a1a"/>
          <circle cx="25" cy="25" r="3" fill="#6b7d35"/>
        </pattern>
      </defs>
      <rect x="40" y="40" width="1120" height="1120" fill="url(#camo)" opacity="0.3"/>
      <rect x="50" y="50" width="1100" height="1100" fill="none" stroke="#2d4a1e" stroke-width="3"/>

      <!-- Main skull -->
      <g transform="translate(600,500)">
        <!-- Helmet -->
        <ellipse cx="0" cy="-120" rx="100" ry="50" fill="none" stroke="black" stroke-width="8"/>
        <ellipse cx="0" cy="-110" rx="85" ry="35" fill="none" stroke="black" stroke-width="4"/>
        <!-- Helmet netting -->
        <ellipse cx="0" cy="-115" rx="75" ry="25" fill="none" stroke="black" stroke-width="1" stroke-dasharray="3,2"/>
        <!-- Helmet details -->
        <ellipse cx="0" cy="-125" rx="60" ry="15" fill="none" stroke="black" stroke-width="2"/>
        <rect x="-45" y="-125" width="15" height="8" fill="none" stroke="black" stroke-width="2"/>
        <rect x="30" y="-125" width="15" height="8" fill="none" stroke="black" stroke-width="2"/>
        <!-- Camo pattern on helmet -->
        <ellipse cx="0" cy="-120" rx="95" ry="45" fill="url(#camo)" opacity="0.4"/>

        <!-- Skull -->
        <circle cx="0" cy="0" r="90" fill="none" stroke="black" stroke-width="8"/>
        <ellipse cx="0" cy="50" rx="70" ry="50" fill="none" stroke="black" stroke-width="6"/>
        <!-- Jaw detail -->
        <ellipse cx="0" cy="70" rx="50" ry="20" fill="none" stroke="black" stroke-width="3"/>
        <!-- Teeth -->
        <g stroke="black" stroke-width="2">
          <rect x="-40" y="60" width="5" height="12"/>
          <rect x="-30" y="60" width="5" height="12"/>
          <rect x="-20" y="60" width="5" height="12"/>
          <rect x="-10" y="60" width="5" height="12"/>
          <rect x="0" y="60" width="5" height="12"/>
          <rect x="10" y="60" width="5" height="12"/>
          <rect x="20" y="60" width="5" height="12"/>
          <rect x="30" y="60" width="5" height="12"/>
          <rect x="40" y="60" width="5" height="12"/>
        </g>

        <!-- Eyes -->
        <circle cx="-30" cy="-20" r="12" fill="none" stroke="black" stroke-width="4"/>
        <circle cx="30" cy="-20" r="12" fill="none" stroke="black" stroke-width="4"/>
        <!-- Pupils -->
        <circle cx="-30" cy="-20" r="6" fill="black"/>
        <circle cx="30" cy="-20" r="6" fill="black"/>
        <!-- Eye details -->
        <circle cx="-27" cy="-23" r="2" fill="white"/>
        <circle cx="33" cy="-23" r="2" fill="white"/>
        <!-- Eyebrows -->
        <path d="M -45 -35 Q -30 -45 -15 -35" fill="none" stroke="black" stroke-width="3"/>
        <path d="M 45 -35 Q 30 -45 15 -35" fill="none" stroke="black" stroke-width="3"/>

        <!-- Nose -->
        <ellipse cx="0" cy="10" rx="8" ry="12" fill="none" stroke="black" stroke-width="3"/>
        <!-- Nostrils -->
        <ellipse cx="-3" cy="8" rx="2" ry="4" fill="none" stroke="black" stroke-width="1.5"/>
        <ellipse cx="3" cy="8" rx="2" ry="4" fill="none" stroke="black" stroke-width="1.5"/>
      </g>

      <!-- Dog tags -->
      <g transform="translate(520,700)">
        <ellipse cx="0" cy="0" rx="10" ry="18" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="0" cy="20" rx="6" ry="4" fill="none" stroke="black" stroke-width="2"/>
        <rect x="-5" y="-15" width="10" height="35" fill="none" stroke="black" stroke-width="1.5"/>
        <!-- Chain -->
        <ellipse cx="0" cy="-25" rx="8" ry="3" fill="none" stroke="black" stroke-width="2"/>
        <path d="M -6 -25 Q 0 -30 6 -25" fill="none" stroke="black" stroke-width="1"/>
      </g>
      <g transform="translate(680,700)">
        <ellipse cx="0" cy="0" rx="10" ry="18" fill="none" stroke="black" stroke-width="3"/>
        <ellipse cx="0" cy="20" rx="6" ry="4" fill="none" stroke="black" stroke-width="2"/>
        <rect x="-5" y="-15" width="10" height="35" fill="none" stroke="black" stroke-width="1.5"/>
        <!-- Chain -->
        <ellipse cx="0" cy="-25" rx="8" ry="3" fill="none" stroke="black" stroke-width="2"/>
        <path d="M -6 -25 Q 0 -30 6 -25" fill="none" stroke="black" stroke-width="1"/>
      </g>

      <!-- Crossed rifles -->
      <g transform="translate(600,850)">
        <!-- First rifle -->
        <g transform="rotate(-15)">
          <rect x="-2" y="-60" width="4" height="120" fill="none" stroke="black" stroke-width="4"/>
          <rect x="-6" y="-60" width="12" height="20" fill="none" stroke="black" stroke-width="3"/>
          <rect x="-4" y="50" width="8" height="25" fill="none" stroke="black" stroke-width="3"/>
          <circle cx="0" cy="-75" r="8" fill="none" stroke="black" stroke-width="2"/>
        </g>
        <!-- Second rifle -->
        <g transform="rotate(15)">
          <rect x="-2" y="-60" width="4" height="120" fill="none" stroke="black" stroke-width="4"/>
          <rect x="-6" y="-60" width="12" height="20" fill="none" stroke="black" stroke-width="3"/>
          <rect x="-4" y="50" width="8" height="25" fill="none" stroke="black" stroke-width="3"/>
          <circle cx="0" cy="-75" r="8" fill="none" stroke="black" stroke-width="2"/>
        </g>
        <!-- Bayonets -->
        <line x1="-60" y1="-20" x2="-40" y2="-10" stroke="black" stroke-width="3"/>
        <line x1="60" y1="-20" x2="40" y2="-10" stroke="black" stroke-width="3"/>
      </g>

      <!-- American flag ribbon -->
      <g transform="translate(600,950)">
        <rect x="-50" y="-8" width="100" height="16" rx="2" fill="none" stroke="black" stroke-width="2"/>
        <!-- Stripes -->
        <rect x="-50" y="-8" width="100" height="3" fill="none" stroke="#B22234" stroke-width="1"/>
        <rect x="-50" y="-2" width="100" height="3" fill="white"/>
        <rect x="-50" y="4" width="100" height="3" fill="none" stroke="#B22234" stroke-width="1"/>
        <!-- Stars -->
        <rect x="-45" y="-6" width="25" height="12" fill="none" stroke="#003366" stroke-width="1"/>
        <g fill="white" stroke="none">
          <polygon points="-42,-2 -40,0 -42,2 -38,2 -36,0 -38,-2"/>
          <polygon points="-32,-2 -30,0 -32,2 -28,2 -26,0 -28,-2"/>
          <polygon points="-42,2 -40,4 -42,6 -38,6 -36,4 -38,2"/>
        </g>
      </g>

      <!-- Title -->
      <text x="600" y="1100" text-anchor="middle" font-family="serif" font-size="36" fill="#2d4a1e" font-weight="bold">Military Skull Warrior</text>
      <text x="600" y="1140" text-anchor="middle" font-family="serif" font-size="18" fill="#666">Patriotic Military Tattoo Design</text>
    </svg>`)}`,
  },
];