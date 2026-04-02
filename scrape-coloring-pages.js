const https = require('https');
const fs = require('fs');

// Function to fetch HTML from a URL
function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        resolve(data);
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

// Function to extract coloring page data from HTML
function extractColoringPages(html) {
  const pages = [];

  // Simple regex approach - split by artwork divs
  const artworkBlocks = html.split('<div class="artwork">');

  for (const block of artworkBlocks) {
    if (block.includes('<a href="/detail/') && block.includes('<img src="/image/800px/')) {
      // Extract link
      const linkMatch = block.match(/<a href="\/detail\/(\d+)\/([^"]*)">/);
      if (!linkMatch) continue;

      const id = linkMatch[1];
      const slug = linkMatch[2];

      // Extract image
      const imgMatch = block.match(/<img src="\/image\/800px\/(\d+)" alt="([^"]*)"[^>]*>/);
      if (!imgMatch) continue;

      const imageId = imgMatch[1];
      const title = imgMatch[2];

      // Clean up title
      const cleanTitle = title.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#039;/g, "'");

      // Generate category based on keywords in title/slug
      let category = 'Miscellaneous';
      const lowerTitle = cleanTitle.toLowerCase();
      const lowerSlug = slug.toLowerCase();

      if (lowerTitle.includes('mandala') || lowerSlug.includes('mandala')) {
        category = 'Mandala';
      } else if (lowerTitle.includes('flower') || lowerTitle.includes('rose') || lowerSlug.includes('flower') || lowerSlug.includes('rose') || lowerTitle.includes('lilly')) {
        category = 'Flowers';
      } else if (lowerTitle.includes('butterfly') || lowerSlug.includes('butterfly')) {
        category = 'Nature';
      } else if (lowerTitle.includes('wolf') || lowerTitle.includes('dog') || lowerTitle.includes('husky') || lowerSlug.includes('wolf') || lowerSlug.includes('dog') || lowerTitle.includes('caribou')) {
        category = 'Animals';
      } else if (lowerTitle.includes('owl') || lowerTitle.includes('bird') || lowerSlug.includes('owl') || lowerSlug.includes('bird') || lowerTitle.includes('penguin')) {
        category = 'Birds';
      } else if (lowerTitle.includes('dragon') || lowerTitle.includes('fantasy') || lowerSlug.includes('dragon') || lowerSlug.includes('fantasy') || lowerTitle.includes('elf')) {
        category = 'Fantasy';
      } else if (lowerTitle.includes('coloring page') && (lowerTitle.includes('thanksgiving') || lowerTitle.includes('autumn') || lowerTitle.includes('fall') || lowerTitle.includes('pumpkin') || lowerTitle.includes('halloween'))) {
        category = 'Seasonal';
      } else if (lowerTitle.includes('coloring page') && lowerTitle.includes('christmas')) {
        category = 'Holiday';
      } else if (lowerTitle.includes('abstract') || lowerSlug.includes('abstract')) {
        category = 'Abstract';
      } else if (lowerTitle.includes('zen') || lowerSlug.includes('zen') || lowerTitle.includes('meditation')) {
        category = 'Zen';
      } else if (lowerTitle.includes('clock') || lowerSlug.includes('clock')) {
        category = 'Clocks';
      } else if (lowerTitle.includes('math') || lowerTitle.includes('pi') || lowerSlug.includes('math') || lowerSlug.includes('pi')) {
        category = 'Educational';
      } else if (lowerTitle.includes('prayer') || lowerTitle.includes('creation') || lowerSlug.includes('prayer') || lowerSlug.includes('creation')) {
        category = 'Spiritual';
      } else if (lowerTitle.includes('panda') || lowerTitle.includes('bear') || lowerTitle.includes('bunny') || lowerSlug.includes('panda') || lowerSlug.includes('bear') || lowerSlug.includes('bunny')) {
        category = 'Cute Animals';
      }

      // Generate description
      let description = `Beautiful ${category.toLowerCase()} design perfect for relaxation`;
      if (lowerTitle.includes('coloring page')) {
        description = cleanTitle.replace('Coloring page', '').replace('coloring page', '').trim();
        if (description.startsWith('of ') || description.startsWith('for ')) {
          description = description.charAt(0).toUpperCase() + description.slice(1);
        } else {
          description = description.charAt(0).toUpperCase() + description.slice(1);
        }
        if (!description.includes('coloring')) {
          description += ' coloring page';
        }
      }

      pages.push({
        id: `openclipart-${id}`,
        title: cleanTitle,
        description: description,
        category: category,
        source: 'Openclipart',
        sourceUrl: `https://openclipart.org/detail/${id}/${slug}`,
        imageUrl: `https://openclipart.org/image/800px/${imageId}`,
        fallbackSvg: generateFallbackSvg(category)
      });
    }
  }

  return pages;
}

// Generate a simple fallback SVG based on category
function generateFallbackSvg(category) {
  const svgs = {
    'Mandala': `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#f8f8f8"/>
      <g stroke="black" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="400" cy="400" r="350" stroke-width="3"/>
        <circle cx="400" cy="400" r="300"/>
        <circle cx="400" cy="400" r="250"/>
        <circle cx="400" cy="400" r="200"/>
        <circle cx="400" cy="400" r="150"/>
        <circle cx="400" cy="400" r="100"/>
        <circle cx="400" cy="400" r="50"/>
        <line x1="400" y1="50" x2="400" y2="750"/>
        <line x1="400" y1="50" x2="650" y2="650"/>
        <line x1="400" y1="50" x2="150" y2="650"/>
        <line x1="400" y1="50" x2="700" y2="400"/>
        <line x1="400" y1="50" x2="100" y2="400"/>
      </g>
      <text x="400" y="780" text-anchor="middle" font-family="serif" font-size="18" fill="black">Ivy's Peace</text>
    </svg>`,
    'Flowers': `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#f8f8f8"/>
      <g stroke="black" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <line x1="400" y1="700" x2="400" y2="450"/>
        <polygon points="400,550 385,545 390,535 400,540 410,535 415,545"/>
        <ellipse cx="350" cy="550" rx="25" ry="15"/>
        <ellipse cx="450" cy="550" rx="25" ry="15"/>
        <ellipse cx="400" cy="350" rx="40" ry="60"/>
        <ellipse cx="360" cy="370" rx="35" ry="50"/>
        <ellipse cx="440" cy="370" rx="35" ry="50"/>
        <ellipse cx="400" cy="410" rx="35" ry="45"/>
        <ellipse cx="400" cy="360" rx="25" ry="40"/>
        <circle cx="400" cy="385" r="8"/>
        <ellipse cx="400" cy="430" rx="15" ry="25"/>
      </g>
      <text x="400" y="780" text-anchor="middle" font-family="serif" font-size="18" fill="black">Ivy's Peace</text>
    </svg>`,
    'Animals': `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#f8f8f8"/>
      <g stroke="black" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <ellipse cx="400" cy="500" rx="80" ry="100"/>
        <circle cx="400" cy="350" r="70"/>
        <circle cx="375" cy="330" r="15"/>
        <circle cx="425" cy="330" r="15"/>
        <circle cx="375" cy="330" r="8" fill="black"/>
        <circle cx="425" cy="330" r="8" fill="black"/>
        <polygon points="400,360 395,375 405,375"/>
        <ellipse cx="400" cy="450" rx="40" ry="70"/>
        <ellipse cx="480" cy="450" rx="40" ry="70"/>
        <ellipse cx="320" cy="450" rx="40" ry="70"/>
      </g>
      <text x="400" y="780" text-anchor="middle" font-family="serif" font-size="18" fill="black">Ivy's Peace</text>
    </svg>`,
    'Birds': `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#f8f8f8"/>
      <g stroke="black" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <ellipse cx="400" cy="500" rx="60" ry="120"/>
        <ellipse cx="400" cy="350" rx="30" ry="80"/>
        <circle cx="400" cy="250" r="40"/>
        <line x1="380" y1="230" x2="360" y2="210"/>
        <line x1="420" y1="230" x2="440" y2="210"/>
        <circle cx="390" cy="240" r="6"/>
        <circle cx="410" cy="240" r="6"/>
        <circle cx="390" cy="240" r="3" fill="black"/>
        <circle cx="410" cy="240" r="3" fill="black"/>
        <polygon points="400,260 395,275 405,275"/>
        <path d="M 395 275 Q 400 285 405 275"/>
        <path d="M 350 400 Q 250 300 200 350 Q 230 380 280 370 Q 320 380 350 400"/>
        <path d="M 450 400 Q 550 300 600 350 Q 570 380 520 370 Q 480 380 450 400"/>
        <ellipse cx="370" cy="580" rx="12" ry="40"/>
        <ellipse cx="430" cy="580" rx="12" ry="40"/>
      </g>
      <text x="400" y="780" text-anchor="middle" font-family="serif" font-size="18" fill="black">Ivy's Peace</text>
    </svg>`,
    'Fantasy': `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#f8f8f8"/>
      <g stroke="black" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <ellipse cx="400" cy="500" rx="60" ry="120"/>
        <ellipse cx="400" cy="350" rx="30" ry="80"/>
        <circle cx="400" cy="250" r="40"/>
        <line x1="380" y1="230" x2="360" y2="210"/>
        <line x1="420" y1="230" x2="440" y2="210"/>
        <circle cx="390" cy="240" r="6"/>
        <circle cx="410" cy="240" r="6"/>
        <circle cx="390" cy="240" r="3" fill="black"/>
        <circle cx="410" cy="240" r="3" fill="black"/>
        <polygon points="400,260 395,275 405,275"/>
        <path d="M 395 275 Q 400 285 405 275"/>
        <path d="M 350 400 Q 250 300 200 350 Q 230 380 280 370 Q 320 380 350 400"/>
        <path d="M 450 400 Q 550 300 600 350 Q 570 380 520 370 Q 480 380 450 400"/>
        <ellipse cx="370" cy="580" rx="12" ry="40"/>
        <ellipse cx="430" cy="580" rx="12" ry="40"/>
      </g>
      <text x="400" y="780" text-anchor="middle" font-family="serif" font-size="18" fill="black">Ivy's Peace</text>
    </svg>`,
    'default': `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#f8f8f8"/>
      <g stroke="black" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="400" cy="400" r="300" stroke-width="3"/>
        <circle cx="400" cy="400" r="250"/>
        <circle cx="400" cy="400" r="200"/>
        <circle cx="400" cy="400" r="150"/>
        <circle cx="400" cy="400" r="100"/>
        <circle cx="400" cy="400" r="50"/>
        <line x1="400" y1="100" x2="400" y2="700"/>
        <line x1="100" y1="400" x2="700" y2="400"/>
      </g>
      <text x="400" y="780" text-anchor="middle" font-family="serif" font-size="18" fill="black">Ivy's Peace</text>
    </svg>`
  };

  return svgs[category] || svgs['default'];
}

// Main scraping function
async function scrapeColoringPages() {
  const allPages = [];
  const baseUrl = 'https://openclipart.org/search/?query=coloring+page&p=';

  console.log('Starting to scrape Openclipart coloring pages...');

  // Scrape first 10 pages (adjust as needed)
  for (let page = 0; page < 10; page++) {
    try {
      console.log(`Scraping page ${page + 1}...`);
      const url = `${baseUrl}${page}`;
      const html = await fetchHtml(url);

      // Debug: save first page HTML
      if (page === 0) {
        fs.writeFileSync('debug-page.html', html);
        console.log('Saved debug HTML to debug-page.html');
      }

      const pages = extractColoringPages(html);

      console.log(`Found ${pages.length} coloring pages on page ${page + 1}`);
      allPages.push(...pages);

      // Add delay to be respectful to the server
      await new Promise(resolve => setTimeout(resolve, 1000));

    } catch (error) {
      console.error(`Error scraping page ${page + 1}:`, error.message);
      break;
    }
  }

  // Remove duplicates based on id
  const uniquePages = allPages.filter((page, index, self) =>
    index === self.findIndex(p => p.id === page.id)
  );

  console.log(`Total unique coloring pages scraped: ${uniquePages.length}`);

  // Write to JSON file
  fs.writeFileSync('coloring-pages-data.json', JSON.stringify(uniquePages, null, 2));
  console.log('Data saved to coloring-pages-data.json');
}

// Run the scraper
scrapeColoringPages().catch(console.error);