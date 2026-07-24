import { readFileSync, writeFileSync } from "node:fs";

const results = JSON.parse(readFileSync("temp/missing-thumbs-result.json", "utf8"));
const MD = "temp/ai-news-2026-07-22-onwards.md";
const HTML = "public/news/ai-news-digest-0722-0724.html";

let md = readFileSync(MD, "utf8");
let html = readFileSync(HTML, "utf8");
let mdAdded = 0;
let htmlAdded = 0;

for (const r of results) {
  if (!r.ogImage) continue;
  const escaped = r.url.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const reMd = new RegExp(
    `(\\[링크\\]\\(${escaped}\\))(?![^\\n]*!\\[thumb\\])`,
    "g"
  );
  const beforeMd = md;
  md = md.replace(reMd, `$1 | ![thumb](${r.ogImage})`);
  if (md !== beforeMd) mdAdded++;

  const artRe = new RegExp(
    `(<article class="article">\\s*<span class="tag[^"]*">[^<]*</span>)(\\s*)(<h4>\\s*<a href="${escaped}")`,
    "g"
  );
  const beforeHtml = html;
  html = html.replace(
    artRe,
    `$1\n          <img class="thumb" src="${r.ogImage}" alt="" loading="lazy" onerror="this.style.display='none'" />\n          $3`
  );
  if (html !== beforeHtml) htmlAdded++;
}

const thumbCountMd = (md.match(/!\[thumb\]/g) || []).length;
const linkCountMd = (md.match(/\[링크\]\(/g) || []).length;
html = html.replace(
  /(<div class="big">)\d+(<\/div><div class="lbl">Thumbnails<\/div>)/,
  `$1${thumbCountMd}$2`
);
html = html.replace(
  /썸네일 \d+\/\d+건 확보/,
  `썸네일 ${thumbCountMd}/${linkCountMd}건 확보`
);

writeFileSync(MD, md, "utf8");
writeFileSync(HTML, html, "utf8");
console.log(`MD +${mdAdded}, HTML +${htmlAdded}`);
console.log(`총 thumb md=${thumbCountMd}/${linkCountMd}`);

const miss = md
  .split("\n")
  .filter((l) => /\[링크\]\(https:\/\//.test(l) && !/!\[thumb\]/.test(l));
console.log("남은 없음:", miss.length);
for (const l of miss) {
  const m = l.match(/\[링크\]\((https:\/\/[^)]+)\)/);
  console.log(" ", m?.[1]);
}

// HTML articles without thumb
const arts = html.split('<article class="article">').slice(1);
let noThumbHtml = 0;
for (const a of arts) {
  if (!a.includes('class="thumb"')) noThumbHtml++;
}
console.log("HTML 썸네일 없는 article:", noThumbHtml);
