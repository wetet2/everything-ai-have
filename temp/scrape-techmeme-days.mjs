const days = ['260830', '260831', '260901', '260902', '260903'];

async function run() {
  for (const day of days) {
    try {
      const res = await fetch('https://www.techmeme.com/' + day + '/');
      const text = await res.text();
      console.log(`\n=================== DAY: ${day} ===================`);
      
      // Match story links on techmeme
      const regex = /<strong class="ourh"><a href="([^"]+)"[^>]*>([\s\S]*?)<\/a><\/strong>/g;
      let m;
      let count = 0;
      while ((m = regex.exec(text)) !== null && count < 15) {
        const url = m[1];
        const title = m[2].replace(/<[^>]+>/g, '').trim();
        console.log(`- ${title}\n  URL: ${url}`);
        count++;
      }
    } catch (e) {
      console.error(`Error fetching day ${day}:`, e.message);
    }
  }
}

run();
