const fs = require('fs');

// Load current data
const data = JSON.parse(fs.readFileSync('./src/data/coloring-pages.json', 'utf8'));

// Recategorize miscellaneous items
data.forEach(item => {
  if (item.category === 'Miscellaneous') {
    const title = item.title.toLowerCase();
    const slug = item.sourceUrl.split('/').pop().toLowerCase();

    // Categorize based on patterns I observed
    if (title.includes('clown') || title.includes('girl faces') || title.includes('fata') || title.includes('remix') || title.includes('silly walks')) {
      item.category = 'Fantasy';
    } else if (title.includes('motorhome') || title.includes('vehicle') || title.includes('truck')) {
      item.category = 'Transportation';
    } else if (title.includes('endless knot')) {
      item.category = 'Spiritual';
    } else if (title.includes('santa') || title.includes('reindeer') || title.includes('gift') || title.includes('christmas bells')) {
      item.category = 'Holiday';
    } else if (title.includes('ice skating')) {
      item.category = 'Seasonal';
    } else if (title.includes('rocket') || title.includes('space') || title.includes('astronaut') || title.includes('wisconsin') || title.includes('independence hall')) {
      item.category = 'Space';
    } else if (title.includes('fish') || title.includes('octopus') || title.includes('cat') || title.includes('kitten') || title.includes('duck') || title.includes('koala') || title.includes('salmon') || title.includes('bee') || title.includes('ant') || title.includes('tooth') || title.includes('nurse') || title.includes('mop') || title.includes('kite') || title.includes('key') || title.includes('gift line art')) {
      item.category = 'Animals';
    } else if (title.includes('line art') || title.includes('yarn') || title.includes('rain') || title.includes('star') || title.includes('honeycomb') || title.includes('single line art') || title.includes('banana bunch') || title.includes('kitten tree')) {
      item.category = 'Nature';
    } else if (title.includes('food') || title.includes('sandwich') || title.includes('ice cream') || title.includes('coffee') || title.includes('honey') || title.includes('banana') || title.includes('fast food') || title.includes('glace') || title.includes('poison')) {
      item.category = 'Food';
    } else if (title.includes('flag') || title.includes('britain') || title.includes('slovakia') || title.includes('map') || title.includes('school') || title.includes('teacher') || title.includes('chess') || title.includes('crayons') || title.includes('school boy') || title.includes('school aged girl') || title.includes('connect the dots') || title.includes('pain scale') || title.includes('profile of dan')) {
      item.category = 'Educational';
    } else if (title.includes('jesus') || title.includes('virgin mary') || title.includes('god') || title.includes('prayer') || title.includes('creation') || title.includes('buddhist')) {
      item.category = 'Spiritual';
    } else if (title.includes('abstract') || title.includes('coloring squares')) {
      item.category = 'Abstract';
    } else if (title.includes('dachshund') || title.includes('german shepherd') || title.includes('golden retriever') || title.includes('irish terrier') || title.includes('animal heads')) {
      item.category = 'Cute Animals';
    } else if (title.includes('mobile home') || title.includes('trailer') || title.includes('rv') || title.includes('camper')) {
      item.category = 'Trailer Park';
    } else if (title.includes('marijuana') || title.includes('cannabis') || title.includes('weed') || title.includes('drug')) {
      item.category = 'Drug';
    } else {
      // Keep as miscellaneous for now - these will be few
      console.log('Still miscellaneous:', item.title);
    }
  }
});

// Save updated data
fs.writeFileSync('./src/data/coloring-pages.json', JSON.stringify(data, null, 2));
console.log('Recategorized data saved');

// Show final category distribution
const categories = {};
data.forEach(item => {
  categories[item.category] = (categories[item.category] || 0) + 1;
});

console.log('\nFinal category distribution:');
Object.entries(categories).sort((a, b) => b[1] - a[1]).forEach(([cat, count]) => {
  console.log(`${cat}: ${count}`);
});

const misc = data.filter(item => item.category === 'Miscellaneous');
console.log(`\nRemaining miscellaneous: ${misc.length}`);